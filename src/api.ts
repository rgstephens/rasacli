import axios from "axios";
import * as fs from "fs";
import { flags } from '@oclif/command';

export interface Conn {
  hostname: string;
  port: string;
  protocol: string;
  username?: string;
  password?: string;
  token?: string;
}

export function printFlagsArgs(flags: any) {
  console.log('flags.hostname:', flags.hostname, 'RASA_HOST:', process.env.RASA_HOST);
  console.log('flags.port:', flags.port, 'RASA_PORT:', process.env.RASA_PORT);
  console.log('flags.username:', flags.username, 'RASA_USER:', process.env.RASA_USER);
  const pass: string | undefined = process.env.RASA_PASS;
  console.log('flags.password:', flags.password.substring(0, 1) + '****', 'RASA_PASS:', pass ? pass.substring(0, 1) + '****' : '');
}

export function parseFilenames(args: string[]) {
  let filenames: string[] = [];
  let parmFound = false;
  args.forEach((element, i) => {
    if (i > 2) {
      if (element.startsWith('-'))  {
        parmFound = true;
      }
      if (!parmFound) {
        const fileList = element.split(',');
        fileList.forEach(name => {
          filenames.push(name);
        })
      }
    }
  });
  //console.log('filenames:', filenames);
  return filenames;
}

export async function getChatToken(conn: Conn) {
  try {
    const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/chatToken";
    console.log("getChatToken Calling: " + url);
    const response = await axios.get(url, { headers: { Authorization: "bearer " + conn.token } });
    console.log(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getToken(conn: Conn) {
  try {
    const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/auth";
    //console.log("getToken Calling: " + url);
    const token = await axios.post(url, { username: conn.username, password: conn.password });
    conn.token = token.data.access_token;
    return conn.token;
  } catch (error) {
    //console.error("getToken", error);
    throw error;
  }
}

export async function login(conn: Conn) {
  // if you have a token, test to see if it works
  if (conn.token) {
    try {
      const chatToken = await getChatToken(conn);
    } catch (error) {
      // try logging in with username/password
      try {
        process.env.RASA_TOKEN = await getToken(conn);
      } catch (error) {
        throw error;
      }
    }
  } else {
    // no token, login with username/password
    try {
      if (!conn.username) {
        throw new Error("login failed, username not provided");
      }
      if (!conn.password) {
        throw new Error("login failed, password not provided");
      }
      process.env.RASA_TOKEN = await getToken(conn);
    } catch (error) {
      if (error.config) {
        throw new Error("login failed, user: " + conn.username + ", host: " + error.config.url);
      } else {
        throw error;
      }
    }
  }
}

export const getVers = async (conn: Conn): Promise<any> => {
  try {
    let url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/version";
    const resp = await axios.get(url, { headers: { Authorization: "Bearer " + conn.token } });
    console.log('resp.data:', resp.data);
    //const vers = JSON.parse(resp.data);
    //url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/status";
    //const status = await axios.get(url, { headers: { Authorization: "Bearer " + conn.token } });
    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const getStories = async (conn: Conn): Promise<any> => {
  try {
    const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/stories";
    const response = await axios.get(url, { headers: { Authorization: "Bearer " + conn.token } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStoriesMarkdown = async (conn: Conn): Promise<string> => {
  try {
    const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/stories.md";
    const response = await axios.get(url, { headers: { Authorization: "Bearer " + conn.token } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export async function delStories (conn: Conn, docs: [any]) {
  docs.forEach(async (doc) => {
    //console.log("Deleting id", doc.id)
    const status = await delStory(conn, doc.id);
  })
}

export async function delStory(conn: Conn, id: number) {
  try {
    //await login(conn);
    try {
      const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/stories/" + id;
      const response = await axios.delete(url, { headers: { Authorization: "Bearer " + conn.token } });
      return response.data;
    } catch (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
}

export const addStories = async (conn: Conn, md: string) => {
  try {
    const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/stories";

    const mdStream = fs.createReadStream(md);
    mdStream.on("error", console.log);
    const { size } = fs.statSync(md);

    //console.log(md, "=", mdStream);

    const response = await axios({
      url: url,
      method: "POST",
      responseType: "json",
      data: fs.createReadStream(md),
      headers: { "Content-Type": "text/markdown", "Content-Length": size, Authorization: "Bearer " + conn.token }
    });
    return response;
  } catch (error) {
    console.log('error:', error);
    throw error;
  }
};

export const updStories = async (conn: Conn, md: string) => {
  try {
    const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/stories";

    const mdStream = fs.createReadStream(md);
    mdStream.on("error", console.log);
    const { size } = fs.statSync(md);

    const response = await axios({
      url: url,
      method: "PUT",
      responseType: "json",
      data: fs.createReadStream(md),
      headers: { "Content-Type": "text/markdown", "Content-Length": size, Authorization: "Bearer " + conn.token }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getTraining = async (conn: Conn, project: string): Promise<any> => {
  try {
    const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/projects/" + project + "/data";
    //console.log('url:', url);
    const response = await axios.get(url, { headers: { Authorization: "Bearer " + conn.token } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEntities = async (conn: Conn, project: string): Promise<any> => {
  try {
    const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/projects/" + project + "/entities";
    const response = await axios.get(url, { headers: { Authorization: "Bearer " + conn.token } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const trainModel = async (conn: Conn) => {
  try {
    const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/projects/default/models/jobs";

    const response = await axios({
      url: url,
      method: "POST",
      responseType: "json",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + conn.token }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const activateModel = async (conn: Conn, modelName: string) => {
  const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/projects/default/models/" + modelName + "/tags/production";
  try {
    const response = await axios({
      url: url,
      method: "PUT",
      responseType: "json",
      headers: { "Content-Type": "application/json;charset=utf-8", Authorization: "Bearer " + conn.token }
    });
    // response should be a 204
    return response;
  } catch (error) {
    console.error('called endpoint:', url);
    throw error;
  }
};

export async function delTrainingAll (conn: Conn, project: string, docs: [any]) {
  docs.forEach(async (doc) => {
    const status = await delTraining(conn, project, doc.id);
  })
}

export async function delTraining(conn: Conn, project: string, id: number) {
  try {
    //await login(conn);
    try {
      const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/projects/" + project + "/data/" + id;
      const response = await axios.delete(url, { headers: { Authorization: "Bearer " + conn.token } });
      return response.data;
    } catch (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
}

export const addTraining = async (conn: Conn, md: string) => {
  try {
    const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/stories";

    const mdStream = fs.createReadStream(md);
    mdStream.on("error", console.log);
    const { size } = fs.statSync(md);

    //console.log(md, "=", mdStream);

    const response = await axios({
      url: url,
      method: "POST",
      responseType: "json",
      data: fs.createReadStream(md),
      headers: { "Content-Type": "text/markdown", "Content-Length": size, Authorization: "Bearer " + conn.token }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const replaceBulkTraining = async (conn: Conn, project: string, fileContent: string, format: string, verbose: boolean) => {
  try {
    const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/projects/" + project + "/data/";

    let contentType = "text/markdown";
    if (format == "json") {
      contentType = "text/json";
    }
    if (verbose) {
      console.log('url:', url);
      console.log('content length:', fileContent.length);
      console.log('format:', format);
      console.log('contentType:', contentType);
      //console.log('fileContent:', fileContent);
    }
    const response = await axios({
      url: url,
      method: "PUT",
      responseType: "json",
      data: fileContent,
      headers: { "Content-Type": contentType, "Content-Length": fileContent.length, Authorization: "Bearer " + conn.token }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDomain = async (conn: Conn): Promise<any> => {
  try {
    const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/domain";
    //console.log('url:', url);
    const response = await axios.get(url, { headers: { Authorization: "Bearer " + conn.token } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updDomain = async (conn: Conn, yaml: string, storeTemplates: boolean) => {
  try {
    let url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/domain";
    if (storeTemplates) {
      url += "?store_templates=true";
    }

    const fileStream = fs.createReadStream(yaml);
    fileStream.on("error", console.log);
    const { size } = fs.statSync(yaml);
    //console.log("url:", url);

    const response = await axios({
      url: url,
      method: "PUT",
      responseType: "json",
      data: fs.createReadStream(yaml),
      headers: { "Content-Type": "text/markdown", "Content-Length": size, Authorization: "Bearer " + conn.token }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const delDomain = async (conn: Conn, storeTemplates: boolean) => {
  try {
    let url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/domain";
    //console.log('url:', url);
    if (storeTemplates) {
      url += "?store_templates=true";
    }

    const response = await axios({
      url: url,
      method: "PUT",
      responseType: "json",
      data: "",
      headers: { "Content-Type": "text/markdown", "Content-Length": 0, Authorization: "Bearer " + conn.token }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

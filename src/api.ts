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

// AxiosResponse
export function printFlagsArgs(flags: any) {
  console.log('flags.hostname:', flags.hostname, 'RASA_HOST:', process.env.RASA_HOST);
  console.log('flags.port:', flags.port, 'RASA_PORT:', process.env.RASA_PORT);
  console.log('flags.username:', flags.username, 'RASA_USER:', process.env.RASA_USER);
  const pass: string | undefined = process.env.RASA_PASS;
  console.log('flags.password:', flags.password && flags.password.substring(0, 1) + '****', 'RASA_PASS:', (typeof pass !== 'undefined' && pass.length > 0) ? pass.substring(0, 1) + '****' : '');
}

export function httpStatusCheck(resp: any) {
  //console.log('httpStatusCheck:', resp);
  if (resp && resp.status) {
    switch (resp.status) {
      case 400:
        console.log(resp.status, resp.statusText);
        if (resp.data) {
          console.log(resp.data);
        }
        process.exit(1);
        break;
      case 401:
       console.log('Not logged in or not authorized');
      process.exit(1);
      break;
    }
  }
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
  const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/chatToken";
  try {
    console.log("getChatToken Calling: " + url);
    const response = await axios.get(url, { headers: { Authorization: "bearer " + conn.token } });
    console.log(response);
  } catch (error) {
    httpStatusCheck(error.response);
    console.error("url:", url);
    console.error(error);
    throw error;
  }
}

async function getToken(conn: Conn) {
  const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/auth";
  try {
    //console.log("getToken Calling: " + url);
    const token = await axios.post(url, { username: conn.username, password: conn.password });
    conn.token = token.data.access_token;
    return conn.token;
  } catch (error) {
    httpStatusCheck(error.response);
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
  let url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/version";
  try {
    const resp = await axios.get(url, { headers: { Authorization: "Bearer " + conn.token } });
    return resp.data;
  } catch (error) {
    httpStatusCheck(error.response);
    console.error("url:", url);
    throw error;
  }
};

export const getStories = async (conn: Conn): Promise<any> => {
  const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/stories";
  try {
    const response = await axios.get(url, { headers: { Authorization: "Bearer " + conn.token } });
    return response.data;
  } catch (error) {
    httpStatusCheck(error.response);
    console.error("url:", url);
    throw error;
  }
};

export const getStoriesMarkdown = async (conn: Conn): Promise<string> => {
  const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/stories.md";
  try {
    const response = await axios.get(url, { headers: { Authorization: "Bearer " + conn.token } });
    return response.data;
  } catch (error) {
    httpStatusCheck(error.response);
    console.error("url:", url);
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
    const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/stories/" + id;
    try {
      const response = await axios.delete(url, { headers: { Authorization: "Bearer " + conn.token } });
      return response.data;
    } catch (error) {
    httpStatusCheck(error.response);
      console.error("url:", url);
      throw error;
    }
  } catch (error) {
    throw error;
  }
}

export const addStories = async (conn: Conn, md: string) => {
  const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/stories";
  try {
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
    httpStatusCheck(error.response);
    console.error("url:", url);
    console.log('error:', error);
    throw error;
  }
};

export const updStories = async (conn: Conn, md: string) => {
  const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/stories";
  try {
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
    httpStatusCheck(error.response);
    console.error("url:", url);
    throw error;
  }
};

export const getConfig = async (conn: Conn, project: string): Promise<any> => {
  const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/projects/" + project + "/settings";
  try {
    const response = await axios.get(url, { headers: { Authorization: "Bearer " + conn.token } });
    return response.data;
  } catch (error) {
    httpStatusCheck(error.response);
    console.error("url:", url);
    throw error;
  }
};

export const updConfig = async (conn: Conn, project: string, yaml: string) => {
  const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/projects/" + project + "/settings";
  try {
    const configYaml = fs.readFileSync(yaml, 'utf8');
    const configYamlJSON = '{ "config": "' + configYaml.replace(/\"/g, "\\\"") + '" }';
    const size = configYamlJSON.length;
    //console.log('configYamlJSON:', configYamlJSON);

    const response = await axios({
      url: url,
      method: "PUT",
      responseType: "json",
      data: configYamlJSON,
      headers: { "Content-Type": "application/json;charset=UTF-8", "Content-Length": size, Authorization: "Bearer " + conn.token }
    });
    return response;
  } catch (error) {
    httpStatusCheck(error.response);
    console.error("url:", url);
    throw error;
  }
};

export const getTraining = async (conn: Conn, project: string): Promise<any> => {
  const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/projects/" + project + "/data";
  try {
    //console.log('url:', url);
    const response = await axios.get(url, { headers: { Authorization: "Bearer " + conn.token } });
    return response.data;
  } catch (error) {
    httpStatusCheck(error.response);
    console.error("url:", url);
    throw error;
  }
};

export const getEntities = async (conn: Conn, project: string): Promise<any> => {
  const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/projects/" + project + "/entities";
  try {
    const response = await axios.get(url, { headers: { Authorization: "Bearer " + conn.token } });
    return response.data;
  } catch (error) {
    httpStatusCheck(error.response);
    console.error("url:", url);
    //console.error("status:", error.status, error.status)
    throw error;
  }
};

export const modelGetList = async (conn: Conn, project: string): Promise<any> => {
  const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/projects/" + project + "/models";
  try {
    const response = await axios.get(url, { headers: { Authorization: "Bearer " + conn.token } });
    //console.log(response);
    return response.data;
  } catch (error) {
    console.error("url:", url);
    httpStatusCheck(error.response);
    //console.error("status:", error.status, error.status)
    throw error;
  }
};

export const modelGetTag = async (conn: Conn, project: string, tag: string): Promise<any> => {
  const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/projects/" + project + "/models/tags/" + tag;
  try {
    const response = await axios.get(url, { headers: { Authorization: "Bearer " + conn.token } });
    return response.data;
  } catch (error) {
    httpStatusCheck(error.response);
    console.error("url:", url);
    //console.error("status:", error.status, error.status)
    throw error;
  }
};

export const modelAddTag = async (conn: Conn, project: string, model: string, tag: string): Promise<any> => {
  console.log(conn);
  const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/projects/" + project + "/models/" + model + "/tags/" + tag;
  try {
    const response = await axios.put(url, { headers: { Authorization: "Bearer " + conn.token } });
    return response.data;
  } catch (error) {
    httpStatusCheck(error.response);
    console.error("url:", url);
    //console.error("status:", error.status, error.status)
    throw error;
  }
};

export const modelDeleteTag = async (conn: Conn, project: string, model: string, tag: string): Promise<any> => {
  const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/projects/" + project + "/models/" + model + "/tags/" + tag;
  try {
    const response = await axios.delete(url, { headers: { Authorization: "Bearer " + conn.token } });
    return response.data;
  } catch (error) {
    httpStatusCheck(error.response);
    console.error("url:", url);
    //console.error("status:", error.status, error.status)
    throw error;
  }
};

export const modelDelete = async (conn: Conn, project: string, model: string): Promise<any> => {
  const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/projects/" + project + "/models/" + model;
  try {
    const response = await axios.delete(url, { headers: { Authorization: "Bearer " + conn.token } });
    return response.data;
  } catch (error) {
    httpStatusCheck(error.response);
      throw error;
  }
};

export const modelTrain = async (conn: Conn, project: string) => {
  const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/projects/" + project + "/models/jobs";
  try {
    const response = await axios({
      url: url,
      method: "POST",
      responseType: "json",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + conn.token }
    });
    return response.data;
  } catch (error) {
    httpStatusCheck(error.response);
    console.error("url:", url);
    //console.error("error.response:", error.response);
    throw error;
  }
};

export const modelActivate = async (conn: Conn, project: string, modelName: string) => {
  const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/projects/" + project + "/models/" + modelName + "/tags/production";
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
    httpStatusCheck(error.response);
    console.error("url:", url);
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
    const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/projects/" + project + "/data/" + id;
    try {
      const response = await axios.delete(url, { headers: { Authorization: "Bearer " + conn.token } });
      return response.data;
    } catch (error) {
    httpStatusCheck(error.response);
      console.error("url:", url);
      throw error;
    }
  } catch (error) {
    throw error;
  }
}

export const addTraining = async (conn: Conn, md: string) => {
  const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/stories";
  try {
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
    httpStatusCheck(error.response);
    console.error("url:", url);
    if (error.response.status == 500) {
      console.log("Internal server error, importing", md);
    }
    throw error;
  }
};

export const replaceBulkTraining = async (conn: Conn, project: string, fileContent: string, format: string, verbose: boolean) => {
  const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/projects/" + project + "/data/";
  try {
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
    httpStatusCheck(error.response);
    console.error("url:", url);
    throw error;
  }
};

export const getDomain = async (conn: Conn): Promise<any> => {
  const url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/domain";
  try {
    //console.log('url:', url);
    const response = await axios.get(url, { headers: { Authorization: "Bearer " + conn.token } });
    return response.data;
  } catch (error) {
    httpStatusCheck(error.response);
    console.error("url:", url);
    throw error;
  }
};

export const updDomain = async (conn: Conn, yaml: string, storeTemplates: boolean) => {
  let url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/domain";
  try {
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
    httpStatusCheck(error.response);
    console.error("url:", url);
    throw error;
  }
};

export const delDomain = async (conn: Conn, storeTemplates: boolean) => {
  let url = conn.protocol + "://" + conn.hostname + ":" + conn.port + "/api/domain";
  try {
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
    httpStatusCheck(error.response);
    console.error("url:", url);
    throw error;
  }
};

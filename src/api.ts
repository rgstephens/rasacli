import axios from "axios";
import * as fs from "fs";

export interface Conn {
  hostname: string;
  port: string;
  protocol: string;
  username?: string;
  password?: string;
  token?: string;
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
      throw new Error("login failed, user: " + conn.username + ", host: " + error.config.url);
    }
  }
}

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
    console.log("url:", url);

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

import { Command, flags } from "@oclif/command";
import * as fs from "fs";
import { login, replaceBulkTraining, parseFilenames, Conn } from "../api";

export default class Updtraining extends Command {
  static description = "Update training";
  static strict = false;

  static flags = {
    help: flags.help({ char: "h" }),
    verbose: flags.boolean({ char: "v", description: "verbose", default: false }),
    hostname: flags.string({ char: "n", description: "hostname", default: "localhost", env: "RASA_HOST" }),
    port: flags.string({ char: "p", description: "port", default: "80", env: "RASA_PORT" }),
    protocol: flags.string({ description: "protocol", default: "http", env: "RASA_PROTO" }),
    username: flags.string({ description: "username", default: "me", env: "RASA_USER" }),
    password: flags.string({ description: "password", env: "RASA_PASS" }),
    token: flags.string({ description: "token", env: "RASA_TOKEN" }),
    project: flags.string({ description: "Project name", default: "default" }),
    format: flags.string({ char: "f", description: "format (json, md)", default: "md" })
  };

  static args = [{ name: "file", required: true, description: "NLU training files (accepts multiple files)" }];

  conn: Conn = { hostname: "", port: "", protocol: "" };

  async updTrainingList(conn: Conn, project: string, fileList: string[], format: string, verbose: boolean) {
    if (verbose) {
      console.log("updTraining, fileList:", fileList);
    }
    let fileContent = "";
    // merge file content since Replace API call doesn't support multiple files
    fileList.forEach(async (filename, i) => {
      if (verbose) {
        console.log("reading:", filename);
        //console.log("stream:", JSON.stringify(fs.readFileSync(filename, "utf8")));
      }
      fileContent += fs.readFileSync(filename, "utf8") + "\n";
    });
    // now make call with merged markdown
    var docCount = await replaceBulkTraining(this.conn, project, fileContent, format, verbose);
  }

  async run() {
    const { args, flags } = this.parse(Updtraining);
    this.conn = {
      hostname: flags.hostname,
      port: flags.port,
      protocol: flags.protocol,
      username: flags.username,
      password: flags.password,
      token: flags.token
    };
    const fileList = parseFilenames(process.argv);
    //console.log('fileList:', fileList);

    try {
      await login(this.conn);
      var docCount = await this.updTrainingList(this.conn, flags.project, fileList, flags.format, flags.verbose);
      if (flags.verbose) {
        console.log("docCount:", docCount);
      }
    } catch (error) {
      throw error;
    }
  }
}

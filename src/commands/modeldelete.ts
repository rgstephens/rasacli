import { Command, flags } from "@oclif/command";
import { login, modelDelete, Conn, printFlagsArgs } from "../api";

export default class Modeldelete extends Command {
  static description = "Delete a model";

  static flags = {
    help: flags.help({ char: "h" }),
    verbose: flags.boolean({ char: "v", description: "verbose", default: false }),
    hostname: flags.string({ char: "n", description: "hostname", default: "localhost", env: "RASA_HOST" }),
    port: flags.string({ char: "p", description: "port", default: "80", env: "RASA_PORT" }),
    protocol: flags.string({ description: "protocol", default: "http", env: "RASA_PROTO" }),
    username: flags.string({ description: "username", default: "me", env: "RASA_USER" }),
    password: flags.string({ description: "password", env: "RASA_PASS" }),
    token: flags.string({ description: "token", env: "RASA_TOKEN" }),
    model: flags.string({ char: 'm', description: 'model', required: true }),
    project: flags.string({ description: 'Project name', default: 'default' })
  };

  static args = [];

  conn: Conn = { hostname: "", port: "", protocol: "" };

  async run() {
    const { args, flags } = this.parse(Modeldelete);
    this.conn = {
      hostname: flags.hostname,
      port: flags.port,
      protocol: flags.protocol,
      username: flags.username,
      password: flags.password,
      token: flags.token
    };
    if (flags.verbose) {
      printFlagsArgs(flags);
    }

    try {
      await login(this.conn);
      var resp = await modelDelete(this.conn, flags.project, flags.model);
      console.log("model deleted");
      if (resp.status == 404) {
        console.log("Unknown model");
      } else {
      }
    } catch (error) {
      if (error.response.status == 404) {
        console.error('Unknown model');
        process.exit(1);
      }
      throw error;
    }
  }
}

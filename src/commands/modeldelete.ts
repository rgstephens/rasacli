import {Command, flags} from '@oclif/command'
import { login, modelDelete, Conn, printFlagsArgs } from '../api'

export default class Modeldelete extends Command {
  static description = 'Delete a model'

  static flags = {
    help: flags.help({char: 'h'}),
    verbose: flags.boolean({char: 'v', description: 'verbose', default: false}),
    hostname: flags.string({char: 'n', description: 'hostname', default: 'localhost', env: 'RASA_HOST'}),
    port: flags.string({char: 'p', description: 'port', default: '80', env: 'RASA_PORT'}),
    protocol: flags.string({description: 'protocol', default: 'http', env: 'RASA_PROTO'}),
    username: flags.string({description: 'username', default: 'me', env: 'RASA_USER'}),
    password: flags.string({description: 'password', env: 'RASA_PASS'}),
    token: flags.string({description: 'token', env: 'RASA_TOKEN'}),
  }

  static args = [
    { name: "project", default: "default", description: "Project name" },
    { char: 'm', name: 'model', description: 'Model name', required: true }
  ]

  conn: Conn = { hostname: '', port: '', protocol: '' };

  async run() {
    const {args, flags} = this.parse(Modeldelete)
    this.conn = { hostname: flags.hostname, port: flags.port, protocol: flags.protocol, username: flags.username, password: flags.password, token: flags.token };
    if (flags.verbose) {
      printFlagsArgs(flags);
    }

    try {
      await login(this.conn);
      var resp = await modelDelete(this.conn, args.project, args.model);
      if (resp.status == 204) {
        console.log('Model activated');
      } else {
        console.log('Unexpected activation response:', resp.status, resp.statusText);
        process.exit(1);
      }
    } catch (error) {
      throw error;
    }
  }
}

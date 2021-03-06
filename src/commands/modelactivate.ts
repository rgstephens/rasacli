import {Command, flags} from '@oclif/command'
import { login, modelActivate, Conn, printFlagsArgs } from '../api'

export default class Modelactivate extends Command {
  static description = 'Activate a model'

  static flags = {
    help: flags.help({char: 'h'}),
    verbose: flags.boolean({char: 'v', description: 'verbose', default: false}),
    hostname: flags.string({char: 'n', description: 'hostname', default: 'localhost', env: 'RASA_HOST'}),
    port: flags.string({char: 'p', description: 'port', default: '80', env: 'RASA_PORT'}),
    protocol: flags.string({description: 'protocol', default: 'http', env: 'RASA_PROTO'}),
    username: flags.string({description: 'username', default: 'me', env: 'RASA_USER'}),
    password: flags.string({description: 'password', env: 'RASA_PASS'}),
    token: flags.string({description: 'token', env: 'RASA_TOKEN'}),
    model: flags.string({ char: 'm', description: 'model', required: true }),
    project: flags.string({ description: 'Project name', default: 'default' })
  }

  static args = []

  conn: Conn = { hostname: '', port: '', protocol: '' };

  async run() {
    const {args, flags} = this.parse(Modelactivate)
    this.conn = { hostname: flags.hostname, port: flags.port, protocol: flags.protocol, username: flags.username, password: flags.password, token: flags.token };
    if (flags.verbose) {
      printFlagsArgs(flags);
    }

    try {
      await login(this.conn);
      var resp = await modelActivate(this.conn, flags.project, flags.model);
      if (resp.status == 204) {
        console.log('Model activated');
      } else if (resp.status == 401) {
        console.log('Not logged in');
        process.exit(1);
      } else {
        console.log('Unexpected activation response:', resp.status, resp.statusText);
        process.exit(1);
      }
    } catch (error) {
      throw error;
    }
  }
}

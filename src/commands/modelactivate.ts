import {Command, flags} from '@oclif/command'
import { login, activateModel, Conn, printFlagsArgs } from '../api'

export default class Activate extends Command {
  static description = 'Activate a model'

  static flags = {
    modelname: flags.string({char: 'm', description: 'model name', required: true}),
    help: flags.help({char: 'h'}),
    verbose: flags.boolean({char: 'v', description: 'verbose', default: false}),
    hostname: flags.string({char: 'n', description: 'hostname', default: 'localhost', env: 'RASA_HOST'}),
    port: flags.string({char: 'p', description: 'port', default: '80', env: 'RASA_PORT'}),
    protocol: flags.string({description: 'protocol', default: 'http', env: 'RASA_PROTO'}),
    username: flags.string({description: 'username', default: 'me', env: 'RASA_USER'}),
    password: flags.string({description: 'password', env: 'RASA_PASS'}),
    token: flags.string({description: 'token', env: 'RASA_TOKEN'}),
  }

  static args = []

  conn: Conn = { hostname: '', port: '', protocol: '' };

  async run() {
    const {args, flags} = this.parse(Activate)
    this.conn = { hostname: flags.hostname, port: flags.port, protocol: flags.protocol, username: flags.username, password: flags.password, token: flags.token };
    if (flags.verbose) {
      printFlagsArgs(flags);
    }

    try {
      await login(this.conn);
      var resp = await activateModel(this.conn, flags.modelname);
      if (resp.status == 204) {
        console.log('Model activated');
      } else {
        console.log('Unexpected activation response:', resp.status, resp.statusText);
      }
    } catch (error) {
      throw error;
    }
  }
}

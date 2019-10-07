import {Command, flags} from '@oclif/command'
import { login, updConfig, printFlagsArgs, Conn } from '../api'

export default class Updconfig extends Command {
  static description = 'Update config'
  static strict = false

  static flags = {
    help: flags.help({char: 'h'}),
    verbose: flags.boolean({char: 'v', description: 'verbose', default: false}),
    hostname: flags.string({char: 'n', description: 'hostname', default: 'localhost', env: 'RASA_HOST'}),
    port: flags.string({char: 'p', description: 'port', default: '80', env: 'RASA_PORT'}),
    protocol: flags.string({description: 'protocol', default: 'http', env: 'RASA_PROTO'}),
    username: flags.string({description: 'username', default: 'me', env: 'RASA_USER'}),
    password: flags.string({description: 'password', env: 'RASA_PASS'}),
    token: flags.string({description: 'token', env: 'RASA_TOKEN'}),
    project: flags.string({ description: 'Project name', default: 'default' }),
  }

  static args = [{name: 'file', required: true, description: 'Domain yaml file'}];

  conn: Conn = { hostname: '', port: '', protocol: '' };
  
  async run() {
    const {args, flags} = this.parse(Updconfig)
    this.conn = { hostname: flags.hostname, port: flags.port, protocol: flags.protocol, username: flags.username, password: flags.password, token: flags.token };
    if (flags.verbose) {
      printFlagsArgs(flags);
    }

    try {
      await login(this.conn);
      const resp = await updConfig(this.conn, flags.project, args.file);
      console.log('Config updated from', args.file, 'status:', resp.status);
    } catch (error) {
      throw error;
    }
  }
}

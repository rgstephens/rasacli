import {Command, flags} from '@oclif/command'
import { login, updDomain, Conn } from '../api'

export default class Upddomain extends Command {
  static description = 'Update domain'

  static flags = {
    help: flags.help({char: 'h'}),
    hostname: flags.string({char: 'n', description: 'hostname', default: 'localhost', env: 'RASA_HOST'}),
    port: flags.string({char: 'p', description: 'port', default: '80', env: 'RASA_PORT'}),
    protocol: flags.string({description: 'protocol', default: 'http', env: 'RASA_PROTO'}),
    username: flags.string({description: 'username', default: 'me', env: 'RASA_USER'}),
    password: flags.string({description: 'password', env: 'RASA_PASS'}),
    token: flags.string({description: 'token', env: 'RASA_TOKEN'}),
  }

  static args = [{name: 'file', required: true, description: 'Domain yaml file'}]

  static strict = false

  conn: Conn = { hostname: '', port: '', protocol: '' };
  
  async run() {
    const {args, flags} = this.parse(Upddomain)
    this.conn = { hostname: flags.hostname, port: flags.port, protocol: flags.protocol, username: flags.username, password: flags.password, token: flags.token };

    try {
      await login(this.conn);
      const resp = await updDomain(this.conn, args.file);
      console.log('Domain updated from', args.file, 'status:', resp.status);
    } catch (error) {
      throw error;
    }
  }
}

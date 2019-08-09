import {Command, flags} from '@oclif/command'
import { login, getEntities, Conn } from '../api'

export default class Getentities extends Command {
  static description = 'Get entities'

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

  static args = [{name: 'project', default: 'default', description: 'Project name'}]

  conn: Conn = { hostname: '', port: '', protocol: '' };

  async run() {
    const {args, flags} = this.parse(Getentities)
    this.conn = { hostname: flags.hostname, port: flags.port, protocol: flags.protocol, username: flags.username, password: flags.password, token: flags.token };

    try {
      await login(this.conn);
      var docs = await getEntities(this.conn, args.project);
      console.log(docs);
    } catch (error) {
      throw error;
    }
  }
}

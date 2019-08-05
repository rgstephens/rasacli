import {Command, flags} from '@oclif/command'
import { login, getTraining, Conn } from '../api'

export default class Gettraining extends Command {
  static description = 'Get training data'

  static flags = {
    help: flags.help({char: 'h'}),
    verbose: flags.help({char: 'v', description: 'verbose'}),
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
    const {args, flags} = this.parse(Gettraining)
    this.conn = { hostname: flags.hostname, port: flags.port, protocol: flags.protocol, username: flags.username, password: flags.password, token: flags.token };

    try {
      await login(this.conn);
      var docs = await getTraining(this.conn, args.project);
      console.log(docs);
    } catch (error) {
      throw error;
    }
  }
}

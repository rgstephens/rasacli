import {Command, flags} from '@oclif/command'
import { getTraining, delTrainingAll, login, Conn } from '../api'

export default class Deltraining extends Command {
  conn: Conn = { hostname: '', port: '', protocol: '' };

  static description = 'Delete all training data'

  static flags = {
    help: flags.help({char: 'h'}),
    verbose: flags.boolean({char: 'v', description: 'verbose', default: false}),
    hostname: flags.string({char: 'n', description: 'hostname', default: 'localhost', env: 'RASA_HOST'}),
    port: flags.string({char: 'p', description: 'port', default: '80', env: 'RASA_PORT'}),
    protocol: flags.string({description: 'protocol', default: 'http', env: 'RASA_PROTO'}),
    username: flags.string({description: 'username', default: 'me', env: 'RASA_USER'}),
    password: flags.string({description: 'password', env: 'RASA_PASS'}),
    token: flags.string({description: 'token', env: 'RASA_TOKEN'}),
    project: flags.string({description: 'Project name', default: 'default'}),
  }

  static args = []

  async run() {
    const {args, flags} = this.parse(Deltraining)
    this.conn = { hostname: flags.hostname, port: flags.port, protocol: flags.protocol, username: flags.username, password: flags.password, token: flags.token };

    try {
      await login(this.conn);
      var docs = await getTraining(this.conn, flags.project);
      console.log("Deleting", docs.length, "training");
      //console.log(docs)
      const status: any = await delTrainingAll(this.conn, args.project, docs)
    } catch (error) {
      throw error;
    }
  }
}

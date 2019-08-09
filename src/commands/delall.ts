import {Command, flags} from '@oclif/command'
import { login, delDomain, getTraining, delTrainingAll, getStories, delStories, Conn } from '../api'

export default class Delall extends Command {
  static description = 'Update domain'

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
    const {args, flags} = this.parse(Delall)
    this.conn = { hostname: flags.hostname, port: flags.port, protocol: flags.protocol, username: flags.username, password: flags.password, token: flags.token };

    try {
      await login(this.conn);
      // Delete domain
      let resp = await delDomain(this.conn, false);
      console.log('Removed domain, status:', resp.status);
      // Delete templates
      resp = await delDomain(this.conn, true);
      console.log('Removed templates, status:', resp.status);
      // Delete NLU training data
      let docs = await getTraining(this.conn, args.project);
      console.log("Deleting", docs.length, "training");
      //console.log(docs)
      let status: any = await delTrainingAll(this.conn, args.project, docs)
      // Delete stories
      docs = await getStories(this.conn);
      console.log("Deleting", docs.length, "stories");
      status = await delStories(this.conn, docs)
    } catch (error) {
      throw error;
    }
  }
}

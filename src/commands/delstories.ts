import {Command, flags} from '@oclif/command'
import { getStories, delStory, login, Conn } from '../api'

export default class Delstories extends Command {
  conn: Conn = { hostname: '', port: '', protocol: '' };

  static description = 'Delete all stories'

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

  static args = []

  async delStories (conn: Conn, docs: [any]) {
    docs.forEach(async (doc) => {
      //console.log("Deleting id", doc.id)
      const status = await delStory(conn, doc.id);
    })
  }

  async run() {
    const {args, flags} = this.parse(Delstories)
    this.conn = { hostname: flags.hostname, port: flags.port, protocol: flags.protocol, username: flags.username, password: flags.password, token: flags.token };

    try {
      await login(this.conn);
      var docs = await getStories(this.conn);
      console.log("Deleting", docs.length, "stories");
      const status: any = await this.delStories(this.conn, docs)
    } catch (error) {
      throw error;
    }
  }
}

import {Command, flags} from '@oclif/command'
import { login, updStories, addStories, Conn, parseFilenames } from '../api'

export default class Updstories extends Command {
  static description = 'Update stories'

  static flags = {
    help: flags.help({char: 'h'}),
    verbose: flags.help({char: 'v'}),
    hostname: flags.string({char: 'n', description: 'hostname', default: 'localhost', env: 'RASA_HOST'}),
    port: flags.string({char: 'p', description: 'port', default: '80', env: 'RASA_PORT'}),
    protocol: flags.string({description: 'protocol', default: 'http', env: 'RASA_PROTO'}),
    username: flags.string({description: 'username', default: 'me', env: 'RASA_USER'}),
    password: flags.string({description: 'password', env: 'RASA_PASS'}),
    token: flags.string({description: 'token', env: 'RASA_TOKEN'}),
  }

  static args = [{name: 'file', required: true, description: 'Markdown story files (accepts multiple files)'}]

  static strict = false

  conn: Conn = { hostname: '', port: '', protocol: '' };

  async updStory(conn: Conn, fileList: string[]) {
    fileList.forEach(async (filename, i) => {
      if (i>0) {
        const docs = await addStories(conn, filename);
        console.log(docs.data.length, 'stories added from', filename);
      } else {
        const docs = await updStories(conn, filename);
        console.log(docs.data.length, 'stories replaced from', filename);
      }
    })
  }

  async run() {
    const {args, flags} = this.parse(Updstories)
    this.conn = { hostname: flags.hostname, port: flags.port, protocol: flags.protocol, username: flags.username, password: flags.password, token: flags.token };

    const fileList = parseFilenames(process.argv);
    //console.log('fileList:', fileList);

    try {
      await login(this.conn);
      var docCount = await this.updStory(this.conn, fileList);
    } catch (error) {
      throw error;
    }
  }
}

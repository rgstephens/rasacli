import {Command, flags} from '@oclif/command'
import { login, addStories, Conn } from '../api'

function parseFilenames(args: string[]) {
  let filenames: string[] = [];
  args.forEach((element, i) => {
    if (i > 2) {
      const fileList = element.split(',');
      fileList.forEach(name => {
        filenames.push(name);
      })
    }
  });
  return filenames;
}

export default class Addstories extends Command {
  static description = 'Add stories'

  static flags = {
    help: flags.help({char: 'h'}),
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

  async addStory (conn: Conn, fileList: string[]) {
    fileList.forEach(async (filename) => {
      const docs = await addStories(conn, filename);
      console.log(docs.data.length, ' stories added from', filename);
    })
  }
  
  async run() {
    const {args, flags} = this.parse(Addstories)
    this.conn = { hostname: flags.hostname, port: flags.port, protocol: flags.protocol, username: flags.username, password: flags.password, token: flags.token };

    try {
      await login(this.conn);
      const fileList = parseFilenames(process.argv);
      var docCount = await this.addStory(this.conn, fileList);
    } catch (error) {
      throw error;
    }
  }
}

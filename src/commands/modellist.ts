import {Command, flags} from '@oclif/command'
import { login, modelGetList, printFlagsArgs, Conn } from '../api'

interface modelType {
  hash: string;
  model: string;
  path: string;
  project: string;
  trained_at: Date;
  version: string;
  tags: [string];
  is_compatible: boolean;
}

export default class Modellist extends Command {
  static description = 'Activate a model'

  static flags = {
    help: flags.help({char: 'h'}),
    verbose: flags.boolean({char: 'v', description: 'verbose', default: false}),
    hostname: flags.string({char: 'n', description: 'hostname', default: 'localhost', env: 'RASA_HOST'}),
    port: flags.string({char: 'p', description: 'port', default: '80', env: 'RASA_PORT'}),
    protocol: flags.string({description: 'protocol', default: 'http', env: 'RASA_PROTO'}),
    username: flags.string({description: 'username', default: 'me', env: 'RASA_USER'}),
    password: flags.string({description: 'password', env: 'RASA_PASS'}),
    token: flags.string({description: 'token', env: 'RASA_TOKEN'}),
    project: flags.string({ description: 'Project name', default: 'default' })
  }

  static args = []

  conn: Conn = { hostname: '', port: '', protocol: '' };

  async run() {
    const {args, flags} = this.parse(Modellist)
    this.conn = { hostname: flags.hostname, port: flags.port, protocol: flags.protocol, username: flags.username, password: flags.password, token: flags.token };
    if (flags.verbose) {
      printFlagsArgs(flags);
    }

    try {
      await login(this.conn);
      var resp = await modelGetList(this.conn, flags.project);
      resp.forEach((m: modelType) => {
        if (flags.project != 'default') {
          console.log(m.model, m.tags[0] ? m.tags[0] : '');
        } else {
            console.log(m.model, m.project, m.tags[0] ? m.tags[0] : '');
        }
      });
    } catch (error) {
      throw error;
    }
  }
}

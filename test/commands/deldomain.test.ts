import {expect, test} from '@oclif/test'

describe('deldomain', () => {
  test
    .stdout()
    .command(['deldomain'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['deldomain', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})

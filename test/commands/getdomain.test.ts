import {expect, test} from '@oclif/test'

describe('getdomain', () => {
  test
    .stdout()
    .command(['getdomain'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['getdomain', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})

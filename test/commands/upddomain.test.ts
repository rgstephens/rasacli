import {expect, test} from '@oclif/test'

describe('upddomain', () => {
  test
    .stdout()
    .command(['upddomain'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['upddomain', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})

import {expect, test} from '@oclif/test'

describe('updconfig', () => {
  test
    .stdout()
    .command(['updconfig'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['updconfig', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})

import {expect, test} from '@oclif/test'

describe('getconfig', () => {
  test
    .stdout()
    .command(['getconfig'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['getconfig', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})

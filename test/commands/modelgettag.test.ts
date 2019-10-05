import {expect, test} from '@oclif/test'

describe('modelgettag', () => {
  test
    .stdout()
    .command(['modelgettag'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['modelgettag', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})

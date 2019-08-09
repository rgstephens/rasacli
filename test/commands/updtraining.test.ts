import {expect, test} from '@oclif/test'

describe('updtraining', () => {
  test
    .stdout()
    .command(['updtraining'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['updtraining', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})

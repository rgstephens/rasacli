import {expect, test} from '@oclif/test'

describe('addtraining', () => {
  test
    .stdout()
    .command(['addtraining'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['addtraining', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})

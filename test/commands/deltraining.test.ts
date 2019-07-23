import {expect, test} from '@oclif/test'

describe('deltraining', () => {
  test
    .stdout()
    .command(['deltraining'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['deltraining', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})

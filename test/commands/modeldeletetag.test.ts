import {expect, test} from '@oclif/test'

describe('modeldeletetag', () => {
  test
    .stdout()
    .command(['modeldeletetag'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['modeldeletetag', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})

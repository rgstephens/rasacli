import {expect, test} from '@oclif/test'

describe('deltemplates', () => {
  test
    .stdout()
    .command(['deltemplates'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['deltemplates', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})

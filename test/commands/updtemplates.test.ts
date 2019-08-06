import {expect, test} from '@oclif/test'

describe('updtemplates', () => {
  test
    .stdout()
    .command(['updtemplates'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['updtemplates', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})

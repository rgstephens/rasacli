import {expect, test} from '@oclif/test'

describe('modeldelete', () => {
  test
    .stdout()
    .command(['modeldelete'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['modeldelete', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})

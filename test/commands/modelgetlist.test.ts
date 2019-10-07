import {expect, test} from '@oclif/test'

describe('modelgetlist', () => {
  test
    .stdout()
    .command(['modelgetlist'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['modelgetlist', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})

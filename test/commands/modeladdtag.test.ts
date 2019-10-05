import {expect, test} from '@oclif/test'

describe('modeladdtag', () => {
  test
    .stdout()
    .command(['modeladdtag'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['modeladdtag', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})

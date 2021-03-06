/* global describe it expect */
const snapshots = require('./__snapshots__/test-flatFileListToDirectoryStructure.js.snap')
const registerSnapshots = require('./__helpers__/jasmine-snapshots')
const { utils } = require('isomorphic-git/internal-apis')
const { flatFileListToDirectoryStructure } = utils

describe('flatFileListToDirectoryStructure', () => {
  beforeAll(() => {
    registerSnapshots(snapshots)
  })

  it('simple', async () => {
    let inode = flatFileListToDirectoryStructure([{ path: 'hello/there.txt' }])
    expect(inode.fullpath).toBe('.')
    expect(inode.type).toBe('tree')
    expect(inode.children.length).toBe(1)
    let hello = inode.children[0]
    expect(hello.type).toBe('tree')
    expect(hello.fullpath).toBe('hello')
    expect(hello.basename).toBe('hello')
    expect(hello.parent).toBe(inode)
    expect(hello.children.length).toBe(1)
    let there = hello.children[0]
    expect(there.type).toBe('blob')
    expect(there.fullpath).toBe('hello/there.txt')
    expect(there.basename).toBe('there.txt')
  })

  it('advanced', async () => {
    let filelist = [
      '.babelrc',
      '.editorconfig',
      '.flowconfig',
      '.gitignore',
      '.travis.yml',
      'LICENSE.md',
      'README.md',
      'package-lock.json',
      'package.json',
      'shrinkwrap.yaml',
      'src/commands/checkout.js',
      'src/commands/config.js',
      'src/commands/fetch.js',
      'src/commands/init.js',
      'src/index.js',
      'src/models/GitBlob.js',
      'src/models/GitCommit.js',
      'src/models/GitConfig.js',
      'src/models/GitObject.js',
      'src/models/GitTree.js',
      'src/utils/exists.js',
      'src/utils/mkdirs.js',
      'src/utils/read.js',
      'src/utils/resolveRef.js',
      'src/utils/write.js',
      'test/_helpers.js',
      'test/snapshots/test-resolveRef.js.md',
      'test/snapshots/test-resolveRef.js.snap',
      'test/test-clone.js',
      'test/test-config.js',
      'test/test-init.js',
      'test/test-resolveRef.js'
    ]
    let files = filelist.map(f => ({ path: f, someMeta: f.length }))
    let inodes = flatFileListToDirectoryStructure(files)
    expect(inodes).toMatchSnapshot()
  })
})

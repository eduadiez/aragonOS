const { assertRevert } = require('./helpers/assertThrow')

contract('SafeMath64 lib test', accounts => {
  let safeMath64Mock

  before(async () => {
    safeMath64Mock = await artifacts.require('SafeMath64Mock').new()
  })

  // multiplication
  it('multiplies', async () => {
    const a = 1234
    const b = 32746
    assert.equal((await safeMath64Mock.mulExt(a, b)).toString(), a * b, "Values should match")
  })

  it('fails if multplication overflows', async () => {
    const a = new web3.BigNumber(2).pow(63)
    const b = 2
    return assertRevert(async () => {
      await safeMath64Mock.mulExt(a, b)
    })
  })

  // subtraction
  it('subtract', async () => {
    const a = 1234
    const b = 327
    assert.equal((await safeMath64Mock.subExt(a, b)).toString(), a - b, "Values should match")
  })

  it('fails if subtraction underflows', async () => {
    const a = 123
    const b = 124
    return assertRevert(async () => {
      await safeMath64Mock.subExt(a, b)
    })
  })

  // addition
  it('adds', async () => {
    const a = 1234
    const b = 327
    assert.equal((await safeMath64Mock.addExt(a, b)).toString(), a + b, "Values should match")
  })

  it('fails if addition overflows', async () => {
    const a = new web3.BigNumber(2).pow(63)
    const b = new web3.BigNumber(2).pow(63)
    return assertRevert(async () => {
      await safeMath64Mock.addExt(a, b)
    })
  })
})

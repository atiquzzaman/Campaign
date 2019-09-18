import * as utils from './utils'

describe('Format number', function() {
  it('checks billion', function() {
    const result = utils.formatNumber(1234567890)
    expect(result).toEqual('1.2b')
  })

  it('checks 5.2k', function() {
    const result = utils.formatNumber(5234567)
    expect(result).toEqual('5.2m')
  })

  it('checks 3k', function() {
    const result = utils.formatNumber(3000)
    expect(result).toEqual('3k')
  })

  it('checks 1.3k', function() {
    const result = utils.formatNumber(1300)
    expect(result).toEqual('1.3k')
  })

  it('checks 3k', function() {
    const result = utils.formatNumber(10000)
    expect(result).toEqual('10k')
  })

  it('checks 500k', function() {
    const result = utils.formatNumber(500000)
    expect(result).toEqual('500k')
  })

  it('checks hundred', function() {
    const result = utils.formatNumber(500)
    expect(result).toEqual('500')
  })
})
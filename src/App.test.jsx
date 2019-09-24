import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

global.console = {
  log: jest.fn(),
  error: jest.fn()
}

describe('Invokes AddCampaigns', () => {
  it('checks expected console logs', () => {
    const wrap = shallow(<App />)

    const dummyList = [
      {
        id: 1,
        name: 'Divavu',
        startDate: '9/19/2017',
        endDate: '3/9/2018',
        Budget: 88377
      }
    ]

    const returnVal = wrap.instance().processNewCampaigns(dummyList)

    expect(global.console.log).toHaveBeenCalledWith(
      '1 new campaign(s) has bee added.'
    )
    expect(global.console.log).toHaveBeenCalledWith('No error found.')
    expect(returnVal).toBe('Done! Please see above for details.')
    wrap.unmount()
  })

  it('checks output when input array is empty', () => {
    const wrap = shallow(<App />)
    const result = wrap.instance().processNewCampaigns([])
    expect(result.toString()).toBe('Error: Input array cannot be empty!')
    wrap.unmount()
  })

  it('checks output when no campaign added', () => {
    const wrap = shallow(<App />)

    const dummyList = [{}, {}]

    const returnVal = wrap.instance().processNewCampaigns(dummyList)

    expect(global.console.log).toHaveBeenCalledWith('No campaign was added.')
    expect(global.console.error).toHaveBeenCalledWith(
      'Failed to add the following data: [{"data":{},"error":"Invalid data format"},{"data":{},"error":"Invalid data format"}]'
    )
    expect(returnVal).toBe('Done! Please see above for details.')
    wrap.unmount()
  })
})

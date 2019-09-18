import React from 'react'
import { shallow } from 'enzyme'
import Status from './Status'

describe('Status tests', () => {
  it('checks status is active', () => {
    const wrap = shallow(<Status active={true} />)

    expect(wrap.text()).toEqual('Active')
    wrap.unmount()
  })

  it('checks status is inactive', () => {
    const wrap = shallow(<Status active={false} />)

    expect(wrap.text()).toEqual('Inactive')
    wrap.unmount()
  })
})

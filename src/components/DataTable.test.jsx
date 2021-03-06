import React from 'react'
import { mount } from 'enzyme'
import ReactTable from 'react-table'
import DataTable from './DataTable'

it('checks data table and filters', () => {
  const mockList = [
    {
      id: 1,
      name: 'Divavu',
      startDate: '19/09/2017',
      endDate: '09/03/2018',
      active: false,
      budget: '88.4K USD'
    },
    {
      id: 2,
      name: 'Campaign',
      startDate: '12/09/2017',
      endDate: '29/03/2018',
      active: true,
      budget: '88.4M USD'
    }
  ]
  const wrap = mount(<DataTable dataList={mockList} />)

  expect(wrap.find(ReactTable)).toBeDefined()

  wrap.find('#FilterByName').simulate('change', { target: { value: 'div' } })

  wrap
    .find('#StartDate')
    .hostNodes()
    .simulate('change', { target: { value: '01/01/2017' } })

  wrap
    .find('#EndDate')
    .hostNodes()
    .simulate('change', { target: { value: '12/12/2017' } })

  expect(wrap.find(ReactTable).props('data').data.length).toBe(1)
  wrap.unmount()
})

it('checks filters clear', () => {
  const mockList = [
    {
      id: 1,
      name: 'Divavu',
      startDate: '19/09/2017',
      endDate: '09/03/2018',
      active: false,
      budget: '88.4K USD'
    },
    {
      id: 2,
      name: 'Campaign',
      startDate: '12/09/2017',
      endDate: '29/03/2018',
      active: true,
      budget: '88.4M USD'
    }
  ]
  const wrap = mount(<DataTable dataList={mockList} />)

  expect(wrap.find(ReactTable)).toBeDefined()

  wrap.find('#FilterByName').simulate('change', { target: { value: 'div' } })
  wrap.find('#ClearName').simulate('click')
  expect(wrap.find('#FilterByName').text()).toBe('')

  wrap
    .find('#StartDate')
    .hostNodes()
    .simulate('change', { target: { value: '01/01/2017' } })
  wrap.find('#ClearStartDate').simulate('click')
  expect(
    wrap
      .find('#StartDate')
      .hostNodes()
      .text()
  ).toBe('')

  wrap
    .find('#EndDate')
    .hostNodes()
    .simulate('change', { target: { value: '12/12/2017' } })
  wrap.find('#ClearEndDate').simulate('click')
  expect(
    wrap
      .find('#EndDate')
      .hostNodes()
      .text()
  ).toBe('')
  wrap.unmount()
})

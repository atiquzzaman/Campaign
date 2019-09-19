import * as utils from './utils'

describe('Data processing tests', function() {
  it('checks processed data without error', function() {
    const campList = [
      {
        id: 1,
        name: 'Divavu',
        startDate: '9/19/2017',
        endDate: '3/9/2018',
        Budget: 88377
      }
    ]
    const result = utils.processList(campList)

    expect(result.goodList.length).toBe(1)
    expect(result.badList.length).toBe(0)

    expect(result.goodList[0].startDate).toBe('19/09/2017')
    expect(result.goodList[0].active).toBe(false)
    expect(result.goodList[0].budget).toBe('88.4K USD')
  })
  it('checks empty budget', function() {
    const campList = [
      { id: 1, name: 'Divavu', startDate: '9/19/2017', endDate: '3/9/2018' }
    ]
    const result = utils.processList(campList)
    expect(result.goodList[0].budget).toBe('')
  })
  it('checks empty budget', function() {
    const campList = [
      { id: 1, name: 'Divavu', startDate: '9/19/2017', endDate: '3/9/2018' }
    ]
    const result = utils.processList(campList)
    expect(result.goodList[0].budget).toBe('')
  })

  it('checks duplicate ID', function() {
    const campList = [
      {
        id: 1,
        name: 'Divavu',
        startDate: '9/19/2017',
        endDate: '3/9/2018',
        Budget: 88377
      },
      {
        id: 2,
        name: 'John Doe',
        startDate: '9/19/2017',
        endDate: '3/9/2017',
        Budget: 88377
      }
    ]
    const result = utils.processList(campList, [{ id: 1 }])

    expect(result.badList[0].error).toBe('Id already exists')
  })

  it('checks processed data with error', function() {
    const campList = [
      {
        id: 1,
        name: 'Divavu',
        startDate: '9/19/2017',
        endDate: '3/9/2018',
        Budget: 88377
      },
      {
        id: 2,
        name: 'John Doe',
        startDate: '9/19/2017',
        endDate: '3/9/2017',
        Budget: 88377
      }
    ]
    const result = utils.processList(campList)

    expect(result.goodList.length).toBe(1)
    expect(result.badList.length).toBe(1)

    expect(result.badList[0].data.startDate).toBe('9/19/2017')
    expect(result.badList[0].error).toBe('End Date is before Start Date')
  })

  it('checks invalid start date error', function() {
    const campList = [
      {
        id: 2,
        name: 'John Doe',
        startDate: '13/19/2017',
        endDate: '3/9/2018',
        Budget: 88377
      }
    ]
    const result = utils.processList(campList)

    expect(result.badList.length).toBe(1)

    expect(result.badList[0].data.startDate).toBe('13/19/2017')
    expect(result.badList[0].error).toBe('Invalid Start Date')
  })

  it('checks invalid end date error', function() {
    const campList = [
      {
        id: 2,
        name: 'John Doe',
        startDate: '12/19/2017',
        endDate: '13/9/2018',
        Budget: 88377
      }
    ]
    const result = utils.processList(campList)

    expect(result.badList.length).toBe(1)

    expect(result.badList[0].data.endDate).toBe('13/9/2018')
    expect(result.badList[0].error).toBe('Invalid End Date')
  })
})

describe('Filter tests', function() {
  it('checks no filtering', function() {
    const campList = [
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
    const result = utils.filterList(campList, {})

    expect(result.length).toBe(2)
  })
  it('checks filter by name', function() {
    const campList = [
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
    const result = utils.filterList(campList, { filterName: 'vav' })

    expect(result.length).toBe(1)
  })
  it('checks filter by startDate', function() {
    const campList = [
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
        startDate: '12/10/2017',
        endDate: '29/03/2018',
        active: true,
        budget: '88.4M USD'
      }
    ]
    const result = utils.filterList(campList, {
      filterStartDate: '19/09/2017',
      filterEndDate: '20/09/2017'
    })

    expect(result.length).toBe(1)
  })
  it('checks filter by endDate', function() {
    const campList = [
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
        startDate: '12/10/2017',
        endDate: '29/03/2018',
        active: true,
        budget: '88.4M USD'
      }
    ]
    const result = utils.filterList(campList, {
      filterStartDate: '01/02/2018',
      filterEndDate: '30/03/2018'
    })

    expect(result.length).toBe(2)
  })
  it('checks filter between startDate and endDate', function() {
    const campList = [
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
        startDate: '12/10/2017',
        endDate: '29/03/2018',
        active: true,
        budget: '88.4M USD'
      }
    ]
    const result = utils.filterList(campList, {
      filterStartDate: '01/09/2017',
      filterEndDate: '30/03/2018'
    })

    expect(result.length).toBe(2)
  })
  it('checks filter by name, startDate and endDate', function() {
    const campList = [
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
        startDate: '12/10/2017',
        endDate: '29/03/2018',
        active: true,
        budget: '88.4M USD'
      }
    ]
    const result = utils.filterList(campList, {
      filterName: 'cam',
      filterStartDate: '01/09/2017',
      filterEndDate: '30/03/2018'
    })

    expect(result.length).toBe(1)
  })
})

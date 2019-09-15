import * as utils from './utils'

describe('Date related tests', function () {
    it('it checks a valid date', function () {
        const date = utils.getInputDate('3/5/2018')
        expect(date.isValid()).toBe(true)
    })

    it('it checks a valid date with trailing 0', function () {
        const date = utils.getInputDate('03/05/2018')
        expect(date.isValid()).toBe(true)
    })

    it('it checks an invalid date empty string passed', function () {
        const date = utils.getInputDate('')
        expect(date.isValid()).toBe(false)
    })

    it('it check an invalid date', function () {
        const date = utils.getInputDate('13/5/2018')
        expect(date.isValid()).toBe(false)
    })

    it('it check an formatted date', function () {
        const result = utils.changeDateFormat('3/5/2018')
        expect(result).toBe('05/03/2018')
    })

    it('it check an another formatted date', function () {
        const result = utils.changeDateFormat('12/15/2018')
        expect(result).toBe('15/12/2018')
    })

    it('it check start date before end date', function () {
        const startDate = utils.getInputDate('11/15/2018')
        const endDate = utils.getInputDate('12/23/2018')
        const result = utils.isStartDateSameOrBeforeEndDate(startDate, endDate)
        expect(result).toBe(true)
    })

    it('it check start date after end date', function () {
        const startDate = utils.getInputDate('3/15/2018')
        const endDate = utils.getInputDate('2/23/2018')
        const result = utils.isStartDateSameOrBeforeEndDate(startDate, endDate)
        expect(result).toBe(false)
    })

    it('it check start date and end date are equal', function () {
        const startDate = utils.getInputDate('3/15/2018')
        const endDate = utils.getInputDate('3/15/2018')
        const result = utils.isStartDateSameOrBeforeEndDate(startDate, endDate)
        expect(result).toBe(true)
    })

    it('it check current date, start date and end date are equal', function () {
        const date = utils.getInputDate('9/14/2019')
        const startDate = utils.getInputDate('9/14/2019')
        const endDate = utils.getInputDate('9/14/2019')

        const result = utils.isDateBetween(date, startDate, endDate)
        expect(result).toBe(true)
    })

    it('it check current date between start date and end date', function () {
        const date = utils.getInputDate('10/14/2019')
        const startDate = utils.getInputDate('9/14/2019')
        const endDate = utils.getInputDate('11/14/2019')

        const result = utils.isDateBetween(date, startDate, endDate)
        expect(result).toBe(true)
    })
})
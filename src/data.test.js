import * as utils from './utils'


describe('Data processing tests', function () {
    it('it checks processed data without error', function () {
        const campList = [
            { "id": 1, "name": "Divavu", "startDate": "9/19/2017", "endDate": "3/9/2018", "Budget": 88377 }
        ]
        const result = utils.processList(campList)

        expect(result[0].length).toBe(1)
        expect(result[1].length).toBe(0)

        expect(result[0][0].startDate).toBe('19/09/2017')
        expect(result[0][0].active).toBe(false)
        expect(result[0][0].budget).toBe('88.4K USD')
    })

    it('it checks processed data with error', function () {
        const campList = [
            { "id": 1, "name": "Divavu", "startDate": "9/19/2017", "endDate": "3/9/2018", "Budget": 88377 },
            { "id": 2, "name": "John Doe", "startDate": "9/19/2017", "endDate": "3/9/2017", "Budget": 88377 }
        ]
        const result = utils.processList(campList)

        expect(result[0].length).toBe(1)
        expect(result[1].length).toBe(1)

        expect(result[1][0].data.startDate).toBe('9/19/2017')
        expect(result[1][0].error).toBe('End date is before Start Date')
    })

    it('it checks invalid start date error', function () {
        const campList = [
            { "id": 2, "name": "John Doe", "startDate": "13/19/2017", "endDate": "3/9/2018", "Budget": 88377 }
        ]
        const result = utils.processList(campList)

        expect(result[1].length).toBe(1)

        expect(result[1][0].data.startDate).toBe('13/19/2017')
        expect(result[1][0].error).toBe('Invalid start date')
    })
})
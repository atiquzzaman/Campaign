import numeral from 'numeral'
import moment from 'moment'

export const INPUT_DATE_FORMAT = 'M/D/YYYY'
export const OUTPUT_DATE_FORMAT = 'DD/MM/YYYY'

export const formatBudget = (amount) => {
    return numeral(amount).format('(0[.]0a)')
}

export const getDate = (date) => {
    return moment(date, INPUT_DATE_FORMAT)
}

export const changeDateFormat = (dateStr) => {
    return moment(dateStr, INPUT_DATE_FORMAT).format(OUTPUT_DATE_FORMAT)
}

export const isStartDateSameOrBeforeEndDate = (startDate, endDate) => {
    return !endDate.isBefore(startDate)
}

export const isDateBetween = (date, startDate, endDate) => {
    return date.isBetween(startDate, endDate, null, '[]');
}

export const processList = (campList) => {
    const aList = []
    const errorList = []
    const currentDate = getDate(new Date())

    for (const camp of campList) {
        const startDate = getDate(camp.startDate)
        const endDate = getDate(camp.endDate)

        if (!startDate.isValid()) {
            errorList.push({ data: camp, error: 'Invalid start date' })
        } else if (!endDate.isValid()) {
            errorList.push({ data: camp, error: 'Invalid end date' })
        } else if (!isStartDateSameOrBeforeEndDate(startDate, endDate)) {
            errorList.push({ data: camp, error: 'End date is before Start Date' })
        } else {
            aList.push({
                name: camp.name,
                startDate: changeDateFormat(camp.startDate),
                endDate: changeDateFormat(camp.endDate),
                active: isDateBetween(currentDate, startDate, endDate),
                budget: `${formatBudget(camp.Budget).toUpperCase()} USD`
            })
        }
    }
    return [aList, errorList]
}
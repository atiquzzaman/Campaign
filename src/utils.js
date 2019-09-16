import numeral from 'numeral'
import moment from 'moment'

export const INPUT_DATE_FORMAT = 'M/D/YYYY'
export const OUTPUT_DATE_FORMAT = 'DD/MM/YYYY'

export const formatNumber = (number) => {
    return numeral(number).format('(0[.]0a)')
}

export const getInputDate = (date) => {
    return moment(date, INPUT_DATE_FORMAT)
}

export const getOutputDate = (date) => {
    return moment(date, OUTPUT_DATE_FORMAT)
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
    const currentDate = getInputDate(new Date())

    for (const camp of campList) {
        const startDate = getInputDate(camp.startDate)
        const endDate = getInputDate(camp.endDate)

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
                budget: `${formatNumber(camp.Budget).toUpperCase()} USD`
            })
        }
    }
    return {
        goodList: aList,
        badList: errorList
    }
}

export const filterList = (campList, { filterName = '', filterStartDate = '', filterEndDate = '' }) => {
    const startDate = filterStartDate && getOutputDate(filterStartDate)
    const endDate = filterEndDate && getOutputDate(filterEndDate)
    const regexp = new RegExp(filterName, 'i')

    return campList.filter(camp => {
        const campStartDate = getOutputDate(camp.startDate)
        const campEndDate = getOutputDate(camp.endDate)

        const hasName = camp.name.match(regexp)
        let hasStartDate = true
        let hasEndDate = true

        if (startDate && endDate) {
            hasStartDate = isDateBetween(campStartDate, startDate, endDate)
            hasEndDate = isDateBetween(campEndDate, startDate, endDate)
        }

        return hasName && (hasStartDate || hasEndDate)
    })
}
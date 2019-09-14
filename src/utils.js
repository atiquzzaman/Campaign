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
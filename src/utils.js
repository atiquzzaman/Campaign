import numeral from 'numeral'
import moment from 'moment'

export const INPUT_DATE_FORMAT = 'M/D/YYYY'
export const OUTPUT_DATE_FORMAT = 'DD/MM/YYYY'

export const formatNumber = number => {
  return numeral(number).format('(0[.]0a)')
}

export const getInputDate = date => {
  return moment(date, INPUT_DATE_FORMAT)
}

export const getOutputDate = date => {
  return moment(date, OUTPUT_DATE_FORMAT)
}

export const changeDateFormat = dateStr => {
  return moment(dateStr, INPUT_DATE_FORMAT).format(OUTPUT_DATE_FORMAT)
}

export const isStartDateSameOrBeforeEndDate = (startDate, endDate) => {
  return !endDate.isBefore(startDate)
}

export const isDateBetween = (date, startDate, endDate) => {
  return date.isBetween(startDate, endDate, null, '[]')
}

export const getBudget = budget => {
  if (budget) {
    return `${formatNumber(budget).toUpperCase()} USD`
  } else {
    return ''
  }
}

export const processList = (newList, currentList = []) => {
  const aList = []
  const errorList = []
  const currentDate = getInputDate(new Date())

  const ids = currentList.map(a => a.id)

  for (const camp of newList) {
    if (
      (Object.entries(camp).length === 0 && camp.constructor === Object) ||
      !(camp.name && camp.startDate && camp.endDate && camp.Budget)
    ) {
      errorList.push({ data: camp, error: 'Invalid data format' })
      continue
    }
    const startDate = getInputDate(camp.startDate)
    const endDate = getInputDate(camp.endDate)

    if (ids.includes(camp.id)) {
      errorList.push({ data: camp, error: 'Id already exists' })
    } else if (!startDate.isValid()) {
      errorList.push({ data: camp, error: 'Invalid Start Date' })
    } else if (!endDate.isValid()) {
      errorList.push({ data: camp, error: 'Invalid End Date' })
    } else if (!isStartDateSameOrBeforeEndDate(startDate, endDate)) {
      errorList.push({ data: camp, error: 'End Date is before Start Date' })
    } else {
      aList.push({
        id: camp.id,
        name: camp.name,
        startDate: changeDateFormat(camp.startDate),
        endDate: changeDateFormat(camp.endDate),
        active: isDateBetween(currentDate, startDate, endDate),
        budget: getBudget(camp.Budget)
      })
    }
  }
  return {
    goodList: aList,
    badList: errorList
  }
}

export const filterList = (
  campList,
  { filterName = '', filterStartDate = '', filterEndDate = '' }
) => {
  const nameUpper = filterName.toUpperCase()
  const startDate = filterStartDate && getOutputDate(filterStartDate)
  const endDate = filterEndDate && getOutputDate(filterEndDate)

  return campList.filter(camp => {
    const campStartDate = getOutputDate(camp.startDate)
    const campEndDate = getOutputDate(camp.endDate)

    const hasName = camp.name.toUpperCase().includes(nameUpper)
    let hasStartDate = true
    let hasEndDate = true

    if (startDate && endDate) {
      hasStartDate = isDateBetween(campStartDate, startDate, endDate)
      hasEndDate = isDateBetween(campEndDate, startDate, endDate)
    }

    return hasName && (hasStartDate || hasEndDate)
  })
}

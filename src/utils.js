import numeral from 'numeral'

export const formatBudget = (amount) => {
    return numeral(amount).format('(0[.]0a)')
}
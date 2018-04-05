// import {
//     COMPANY_SELECTED,
//     APP_STATE,
//     TEATIME,
//     WOW,
//     KOLIBRI,
//     GANGVERK
// } from '../actions/types'

export const getCompanyData = (COMPANY) => {
    console.log('Company', COMPANY)
    return {
        type: COMPANY,
    }
}
import { 
    COMPANY_SELECTED,
} from './types'

export const companySelected = (company) => {
    return {
        type: COMPANY_SELECTED,
        payload: company
    }
}

export const updatePosition = (company, position) => {
    
    return {
        type: company,
        payload: position
    }
}
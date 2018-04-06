import { 
    COMPANY_SELECTED,
    START_ANIM
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

export const startHomeButtonAnim = () => {
    return{
        type: START_ANIM
    }
}
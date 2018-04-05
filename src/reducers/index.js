import { combineReducers } from 'redux';
import SelectionReducer from './SelectionReducer';
import DataReducer from './DataReducer';
// import EmployeeReducer from './EmployeeReducer'

export default combineReducers({
    selection: SelectionReducer,
    data: DataReducer,
    // employees: EmployeeReducer
});
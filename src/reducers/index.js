import { combineReducers } from 'redux';
import HomeReducer from './HomeReducer';
import DataReducer from './DataReducer';
// import EmployeeReducer from './EmployeeReducer'

export default combineReducers({
    home: HomeReducer,
    data: DataReducer,
    // employees: EmployeeReducer
});
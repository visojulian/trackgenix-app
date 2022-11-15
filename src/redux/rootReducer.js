import { combineReducers } from 'redux';
import projectsReducer from './projects/reducer';
import employeesReducer from './employees/reducer';

const rootReducer = combineReducers({
  projects: projectsReducer,
  employees: employeesReducer
});

export default rootReducer;

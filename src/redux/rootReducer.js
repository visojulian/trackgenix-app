import { combineReducers } from 'redux';
// import adminsReducer from '../redux/admins/reducer';
import superAdminsReducer from '../redux/superAdmins/reducer';
import employeesReducer from '../redux/employees/reducer';
import projectsReducer from '../redux/projects/reducer';
// import tasksReducer from '../redux/task/reducer';
// import timeSheetsReducer from './timeSheets/reducer';

const rootReducer = combineReducers({
  superAdmins: superAdminsReducer,
  employees: employeesReducer,
  projects: projectsReducer
  // admins: adminsReducer,
  // tasks: tasksReducer,
  // timeSheets: timeSheetsReducer
});

export default rootReducer;

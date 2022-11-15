import { combineReducers } from 'redux';
// import adminsReducer from '../redux/admins/reducer';
import employeesReducer from '../redux/employees/reducer';
import projectsReducer from '../redux/projects/reducer';
// import superAdminsReducer from '../redux/superAdmins/reducer';
// import tasksReducer from '../redux/task/reducer';
// import timeSheetsReducer from './timeSheets/reducer';

const rootReducer = combineReducers({
  // admins: adminsReducer
  employees: employeesReducer,
  projects: projectsReducer
  // superAdmins: superAdminsReducer,
  // tasks: tasksReducer,
  // timeSheets: timeSheetsReducer
});

export default rootReducer;
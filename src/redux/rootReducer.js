import { combineReducers } from 'redux';
import adminsReducer from '../redux/admins/reducer';
import employeesReducer from '../redux/employees/reducer';
import projectsReducer from '../redux/projects/reducer';
import superAdminsReducer from '../redux/superAdmins/reducer';
import tasksReducer from '../redux/task/reducer';
import timesheetsReducer from '../redux/timesheets/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  employees: employeesReducer,
  projects: projectsReducer,
  superAdmins: superAdminsReducer,
  tasks: tasksReducer,
  timesheets: timesheetsReducer
});

export default rootReducer;

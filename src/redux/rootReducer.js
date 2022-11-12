import { combineReducers } from 'redux';
import projectsReducer from './projects/reducer';

const rootReducer = combineReducers({
  projects: projectsReducer
});

export default rootReducer;

import configureAppStore from './src/store/configureStore.js';
import { bugAdded, bugAssignedToUser, selectBugsByUser } from './src/store/bugs.js';
import { projectAdded } from './src/store/projects.js';
import { teamMemberAdded } from './src/store/teamMembers.js';

const store = configureAppStore();

store.dispatch(projectAdded({ name: 'Project 1' }));

store.dispatch(teamMemberAdded({ name: 'User 1' })); 

store.dispatch(bugAdded({ description: 'Bug 1' }));

store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));

const userBugs = selectBugsByUser(1)(store.getState());
console.log('Bugs for User 1:', userBugs);

console.log('Full State:', store.getState());

store.dispatch({
  type: 'error',
  payload: { message: 'An error occurred.' }
});
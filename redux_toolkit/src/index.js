import configureAppStore from './src/configureStore.js';
import { projectAdded } from './src/projects.js';

const store = configureAppStore();

store.subscribe(() => {
  console.log('Store updated:', store.getState());
});

store.dispatch(projectAdded({ name: 'Project 1' }));
store.dispatch(projectAdded({ name: 'Project 2' }));
import { configureStore } from '@reduxjs/toolkit';
import bugsReducer from './bugs.js';
import projectsReducer from './projects.js';
import teamMembersReducer from './teamMembers.js';
import toast from './middleware/toast.js';

export default function configureAppStore() {
  return configureStore({
    reducer: {
      bugs: bugsReducer,
      projects: projectsReducer,
      teamMembers: teamMembersReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(toast)
  });
}
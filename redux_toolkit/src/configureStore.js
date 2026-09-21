import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projects';

export default function configureAppStore() {
  return configureStore({
    reducer: {
      projects: projectsReducer
    }
  });
}
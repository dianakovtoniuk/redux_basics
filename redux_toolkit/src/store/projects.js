import { createSlice } from '@reduxjs/toolkit';

let lastId = 0;

const projectsSlice = createSlice({
  name: 'projects',
  initialState: [],
  reducers: {

    projectAdded: (projects, action) => {
      projects.push({
        id: ++lastId,   
        name: action.payload.name
      });
    }
  }
});

export const { projectAdded } = projectsSlice.actions;

export default projectsSlice.reducer;
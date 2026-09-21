import { createSlice } from '@reduxjs/toolkit';

let lastId = 0;

const bugsSlice = createSlice({
  name: 'bugs',
  initialState: [],
  reducers: {
    bugAdded: (bugs, action) => {
      bugs.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
        userId: null
      });
    },

    bugAssignedToUser: (bugs, action) => {
      const { bugId, userId } = action.payload;

      const bug = bugs.find((b) => b.id === bugId);

      if (bug) {
        bug.userId = userId;
      }
    },

    bugResolved: (bugs, action) => {
      const bug = bugs.find((b) => b.id === action.payload);

      if (bug) {
        bug.resolved = true;
      }
    }
  }
});

export const {
  bugAdded,
  bugAssignedToUser,
  bugResolved
} = bugsSlice.actions;

export default bugsSlice.reducer;

export const selectBugsByUser = (userId) => (state) =>
  state.bugs.filter((bug) => bug.userId === userId);
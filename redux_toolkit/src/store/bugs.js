import { createSlice, createSelector } from '@reduxjs/toolkit';

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
    },

    bugsReceived: (bugs, action) => action.payload
  }
});

export const {
  bugAdded,
  bugAssignedToUser,
  bugResolved,
  bugsReceived
} = bugsSlice.actions;

export default bugsSlice.reducer;

export const loadBugs = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:5000/api/bugs');

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const bugs = await response.json();

    dispatch(bugsReceived(bugs));
  } catch (error) {
    console.error('Failed to load bugs:', error);
  }
};

export const selectBugsByUser = (userId) => (state) =>
  state.bugs.filter((bug) => bug.userId === userId);

export const getUnresolvedBugs = createSelector(
  (state) => state.bugs,
  (bugs) => bugs.filter((bug) => !bug.resolved)
);
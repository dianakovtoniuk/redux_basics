import { createSlice } from '@reduxjs/toolkit';

let lastId = 0;

const teamMembersSlice = createSlice({
  name: 'teamMembers',
  initialState: [],
  reducers: {

    teamMemberAdded: (teamMembers, action) => {
      teamMembers.push({
        id: ++lastId,
        name: action.payload.name
      });
    }
  }
});

export const { teamMemberAdded } = teamMembersSlice.actions;
export default teamMembersSlice.reducer;
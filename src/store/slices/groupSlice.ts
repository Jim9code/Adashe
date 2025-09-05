/**
 * Groups Redux Slice
 * Handles group management and operations
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Group } from '../../types';

interface GroupState {
  groups: Group[];
  currentGroup: Group | null;
  loading: boolean;
  error: string | null;
}

const initialState: GroupState = {
  groups: [],
  currentGroup: null,
  loading: false,
  error: null,
};

const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    fetchGroupsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchGroupsSuccess: (state, action: PayloadAction<Group[]>) => {
      state.loading = false;
      state.groups = action.payload;
      state.error = null;
    },
    fetchGroupsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createGroupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createGroupSuccess: (state, action: PayloadAction<Group>) => {
      state.loading = false;
      state.groups.push(action.payload);
      state.error = null;
    },
    createGroupFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    joinGroupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    joinGroupSuccess: (state, action: PayloadAction<Group>) => {
      state.loading = false;
      const groupIndex = state.groups.findIndex(group => group.id === action.payload.id);
      if (groupIndex !== -1) {
        state.groups[groupIndex] = action.payload;
      }
      state.error = null;
    },
    joinGroupFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentGroup: (state, action: PayloadAction<Group>) => {
      state.currentGroup = action.payload;
    },
    clearGroupError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchGroupsStart,
  fetchGroupsSuccess,
  fetchGroupsFailure,
  createGroupStart,
  createGroupSuccess,
  createGroupFailure,
  joinGroupStart,
  joinGroupSuccess,
  joinGroupFailure,
  setCurrentGroup,
  clearGroupError,
} = groupSlice.actions;

export default groupSlice.reducer;

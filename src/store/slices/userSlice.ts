/**
 * User Profile Redux Slice
 * Handles user profile and settings
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, BankDetails } from '../../types';

interface UserState {
  profile: Partial<User>;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: {
    id: undefined,
    name: '',
    email: '',
    phone: '',
    bankDetails: {
      accountNumber: '',
      bankName: '',
      accountName: '',
    },
    profileImage: undefined,
    bvn: undefined,
    isVerified: false,
  },
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action: PayloadAction<Partial<User>>) => {
      state.loading = false;
      state.profile = { ...state.profile, ...action.payload };
      state.error = null;
    },
    updateProfileFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateBankDetails: (state, action: PayloadAction<Partial<BankDetails>>) => {
      if (state.profile.bankDetails) {
        state.profile.bankDetails = { ...state.profile.bankDetails, ...action.payload };
      }
    },
    updateProfileImage: (state, action: PayloadAction<string>) => {
      state.profile.profileImage = action.payload;
    },
    clearUserError: (state) => {
      state.error = null;
    },
  },
});

export const {
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  updateBankDetails,
  updateProfileImage,
  clearUserError,
} = userSlice.actions;

export default userSlice.reducer;

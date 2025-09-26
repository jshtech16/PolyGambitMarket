import { createSlice } from "@reduxjs/toolkit";

type UserInfoType = {
  User: {
    userName: string;
    wallet: string;
  };
};

export const UserSlice = createSlice({
  name: "User",
  initialState: {
    userName: "",
    wallet: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload.userName;
      state.wallet = action.payload.wallet;
    },
  },
});

export const { setUser } = UserSlice.actions;

export const userName = (state: UserInfoType) => state.User.userName;
export const wallet = (state: UserInfoType) => state.User.wallet;

export default UserSlice.reducer;

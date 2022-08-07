import { createSlice } from "@reduxjs/toolkit";

interface State {
  backToPageUrl: string;
  isBackButton: boolean;
}
const initialState: State = {
  backToPageUrl: "/home-page",
  isBackButton: false,
};

const backButtonSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    show: (state, action) => {
      state.backToPageUrl = action.payload.backToPageUrl;
      state.isBackButton = true;
    },
    hide: (state) => {
      state.isBackButton = false;
      state.backToPageUrl = "/home-page";
    },
  },
});
export const { show,hide } = backButtonSlice.actions;
export default backButtonSlice.reducer;

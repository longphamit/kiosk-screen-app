import { createSlice } from "@reduxjs/toolkit";

interface State {
  selectedIcon: string;
}
const initialState: State = {
  selectedIcon: "HOME",
};

const barSlice = createSlice({
  name: "barview",
  initialState,
  reducers: {
    setSelectedIcon: (state, action) => {
      console.log(action.payload);
      state.selectedIcon = action.payload;
    },
  },
});
export const { setSelectedIcon } = barSlice.actions;
export default barSlice.reducer;

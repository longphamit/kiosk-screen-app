import { createSlice } from "@reduxjs/toolkit";
import { loginAction } from "../actions/login_action";

interface State {
  id: string;
  listAppCatePosition: any[];
  listEventPosition: any[];
}
const initialState: State = {
  id: "",
  listAppCatePosition: [],
  listEventPosition: [],
};

const homeViewSlice = createSlice({
  name: "homeview",
  initialState,
  reducers: {
    setReceiveNotifyChangeTemplate: (state, action) => {
      console.log(action)
      state.id = action.payload.Id;
      state.listAppCatePosition = action.payload.ListAppCatePosition;
      state.listEventPosition = action.payload.ListEventPosition;
    },
  },
});
export const { setReceiveNotifyChangeTemplate } = homeViewSlice.actions;
export default homeViewSlice.reducer;

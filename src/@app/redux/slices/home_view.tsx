import { createSlice } from "@reduxjs/toolkit";
import { loginAction } from "../actions/login_action";

interface State {
  id: string;
  templateId:string;
  listAppCatePosition: any[];
  listEventPosition: any[];
}
const initialState: State = {
  id: "",
  templateId:"",
  listAppCatePosition: [],
  listEventPosition: [],
};

const homeViewSlice = createSlice({
  name: "homeview",
  initialState,
  reducers: {
    setReceiveNotifyChangeTemplate:  (state, action) => {
      console.log(action)
      state.id = action.payload.Id;
      state.listAppCatePosition = action.payload.appCategories;
      state.listEventPosition = action.payload.events;
      state.templateId= action.payload.templateId
    },
  },
});
export const { setReceiveNotifyChangeTemplate } = homeViewSlice.actions;
export default homeViewSlice.reducer;

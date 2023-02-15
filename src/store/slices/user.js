import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  experience: [],
  education: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action) {
      state.user.push(action.payload);
    },
    addExperience(state, action) {
      state.experience.push(action.payload);
    },
    addEducation(state, action) {
      state.education.push(action.payload);
    },

    removeUser(state, action) {
      state.user;
    },
  },
});

export const { addUser, addExperience, addEducation } = userSlice.actions;
export default userSlice.reducer;

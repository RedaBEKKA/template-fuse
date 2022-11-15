/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit";
import { showMessage } from "app/store/fuse/messageSlice";

import jwtService from "app/services/jwtService";
import history from "@history";

import { setUserData } from "./userSlice";

export const submitRegister =
  ({ firstName, lastName, tel, password, email, speciality }) =>
  async (dispatch) => {
    return jwtService
      .createUser({
        firstName,
        lastName,
        tel,
        password,
        email,
        speciality,
      })
      .then((user) => {
        // dispatch(
        //   showMessage({
        //     message: "account confirmation is pending",
        //     variant: "info",
        //     autoHideDuration: null,
        //   })
        // );
        // history.location.state = {
        //   redirectUrl: "/login", // for example 'apps/academy'
        // };
        // dispatch(setUserData(user));
        return dispatch(registerSuccess());
      })
      .catch((errors) => {
        console.log("regiset errors", errors);
        dispatch(
          showMessage({
            message: errors[0]?.msg,
            variant: "error",
            // autoHideDuration: null,
          })
        );
        return dispatch(registerError(errors));
      });
  };

const initialState = {
  success: false,
  errors: [],
};

const registerSlice = createSlice({
  name: "auth/register",
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      state.success = true;
      state.errors = [];
    },
    registerError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
    },
  },
  extraReducers: {},
});

export const { registerSuccess, registerError } = registerSlice.actions;

export default registerSlice.reducer;

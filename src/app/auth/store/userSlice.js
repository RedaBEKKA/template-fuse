/* eslint-disable prettier/prettier */
/* eslint import/no-extraneous-dependencies: off */
import { createSlice } from "@reduxjs/toolkit";
import history from "@history";
import _ from "@lodash";
import {
  setInitialSettings,
  setDefaultSettings,
} from "app/store/fuse/settingsSlice";
import { showMessage } from "app/store/fuse/messageSlice";
import auth0Service from "app/services/auth0Service";
import firebaseService from "app/services/firebaseService";
import jwtService from "app/services/jwtService";

export const setUserData = (user) => async (dispatch, getState) => {
  /*
        You can redirect the logged-in user to a specific route depending on his role
         */

  // history.location.state = {
  //   redirectUrl: user.redirectUrl, // for example 'apps/academy'
  // };

  /*
    Set User Settings
     */
  dispatch(setDefaultSettings(user.data.settings));

  dispatch(setUser(user));
};

export const updateUserSettings = (settings) => async (dispatch, getState) => {
  const oldUser = getState().auth.user;
  const user = _.merge({}, oldUser, { data: { settings } });

  dispatch(updateUserData(user));

  return dispatch(setUserData(user));
};

export const updateUserShortcuts =
  (shortcuts) => async (dispatch, getState) => {
    const { user } = getState().auth;
    const newUser = {
      ...user,
      data: {
        ...user.data,
        shortcuts,
      },
    };

    dispatch(updateUserData(newUser));

    return dispatch(setUserData(newUser));
  };

export const logoutUser = () => async (dispatch, getState) => {
  const { user } = getState().auth;

  if (!user.role || user.role.length === 0) {
    // is guest
    return null;
  }

  history.push({
    pathname: "/",
  });

  switch (user.from) {
    case "firebase": {
      firebaseService.signOut();
      break;
    }
    case "auth0": {
      auth0Service.logout();
      break;
    }
    default: {
      jwtService.logout();
    }
  }

  dispatch(setInitialSettings());

  return dispatch(userLoggedOut());
};

export const updateUserData = (user) => async (dispatch, getState) => {
  console.log("update", user);
  // if (!user.role || user.role.length === 0) {
  //   // is guest
  //   return;
  // }

  jwtService
    .updateUserData(user)
    .then((res) => {
      console.log("res", res.data);
      dispatch(showMessage({ message: "User data saved with api" }));
      dispatch(setUserData(res.data.user));
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.message }));
    });
};

const initialState = {
  role: [], // guest
  data: {
    displayName: "John Doe",
    photoURL: "assets/images/avatars/Velazquez.jpg",
    email: "johndoe@withinpixels.com",
    shortcuts: ["calendar", "mail", "contacts", "todo"],
  },
};

const userSlice = createSlice({
  name: "auth/user",
  initialState,
  reducers: {
    setUser: (state, action) => action.payload,
    userLoggedOut: (state, action) => initialState,
  },
  extraReducers: {},
});

export const { setUser, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;

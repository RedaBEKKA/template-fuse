/* eslint-disable prettier/prettier */
import { lazy } from "react";

const ProfilePageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      auth: ["admin"], // ['admin']
      path: "/pages/profile",
      component: lazy(() => import("./ProfilePage")),
    },
  ],
};

export default ProfilePageConfig;

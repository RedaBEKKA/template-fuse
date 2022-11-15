/* eslint-disable prettier/prettier */
import { Redirect } from "react-router-dom";
import FuseUtils from "@fuse/utils";
import pagesConfigs from "app/main/pages/pagesConfigs";

import ExampleConfig from "app/main/example/ExampleConfig";
import CalendarConfig from "app/main/calendar/CalendarConfig";
import MesPatientsConfig from "app/main/MesPatients/MesPatientsConfig";
import CollaborateurConfig from "app/main/Collaborateur/CollaborateurConfig";
import FuseLoading from "@fuse/core/FuseLoading";
import Error404Page from "app/main/404/Error404Page";

import LoginConfig from "app/main/login/LoginConfig";
import LogoutConfig from "app/main/logout/LogoutConfig";
import RegisterConfig from "app/main/register/RegisterConfig";

const routeConfigs = [
  ...pagesConfigs,
  LoginConfig,
  RegisterConfig,
  LogoutConfig,
  ExampleConfig,
  CalendarConfig,
  MesPatientsConfig,
  CollaborateurConfig
];

const routes = [
  // if you want to make whole app auth protected by default change defaultAuth for example:
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
  // The individual route configs which has auth option won't be overridden.
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
  {
    exact: true,
    path: "/",
    component: () => <Redirect to="/example" />,
  },
  {
    exact: true,
    path: "/calendar",
    component: () => <Redirect to="/calendar" />,
  },
  {
    exact: true,
    path: "/mesPatients",
    component: () => <Redirect to="/mesPatients" />,
  },
  {
    exact: true,
    path: "/Collaborateur/chercher",
    component: () => <Redirect to="/Collaborateur/chercher" />,
  },
  {
    exact: true,
    path: "/Collaborateur/liste",
    component: () => <Redirect to="/Collaborateur/liste" />,
  },
  {
    exact: true,
    path: "/Collaborateur/document",
    component: () => <Redirect to="/Collaborateur/document" />,
  },
  {
    exact: true,
    path: "//Collaborateur/envoi",
    component: () => <Redirect to="/Collaborateur/envoi" />,
  },
  
  {
    path: "/loading",
    exact: true,
    component: () => <FuseLoading />,
  },
  {
    path: "/404",
    component: () => <Error404Page />,
  },
  {
    component: () => <Redirect to="/404" />,
  },
];

export default routes;

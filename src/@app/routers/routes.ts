import { ReactNode } from "react";
import AppListPage from "../../kiosks/pages/app_list";
import IframeInterface from "../../kiosks/pages/app_list/iframeInterface";
import iframeInterface from "../../kiosks/pages/app_list/iframeInterface";
import HomePage from "../../kiosks/pages/home";
import MapPage from "../../kiosks/pages/map";

import AuthenLayout from "../components/authen_layout";
import ClientLayout from "../components/client_layout";
import KioskBaseLayout from "../components/kiosk_base_layout";
import { ROLE_ADMIN, ROLE_LOCATION_OWNER } from "../constants/role";
import ConfirmAccountPage from "../pages/confirm_account/confirm_account";


import ForgotPassPage from "../pages/forgot_pass/forgot_pass";
import LoginPage from "../pages/login/login_page";
import RegistPage from "../pages/regist/regist_page";
import ResetPassPage from "../pages/reset_pass/reset_pass";
import UnAuthPage from "../pages/un_auth";


interface Route {
  component: React.FC;
  layout?: React.FC<{ children: ReactNode }>;
  path: string;
  isLayout: boolean;
  authen: boolean;
  breadcrumb: string;
  roles:[string];
}
const routes: Route[] = [
  {
    component: LoginPage,
    path: "/",
    isLayout: false,
    authen: false,
    breadcrumb: "",
    roles:[""]
  },
  {
    component: UnAuthPage,
    path: "/unauth",
    isLayout: false,
    authen: true,
    breadcrumb: "",
    roles:[""]
  },
  {
    component: HomePage,
    path: "/home-page",
    isLayout: true,
    layout:KioskBaseLayout,
    authen: false,
    breadcrumb: "",
    roles:[""]
  },
  {
    component: MapPage,
    path: "/map",
    isLayout: true,
    layout:KioskBaseLayout,
    authen: false,
    breadcrumb: "",
    roles:[""]
  },
  {
    component: AppListPage,
    path: "/app-list",
    isLayout: true,
    layout:KioskBaseLayout,
    authen: false,
    breadcrumb: "",
    roles:[""]
  },
  {
    component: IframeInterface,
    path: "/iframe-interface",
    isLayout: true,
    layout:KioskBaseLayout,
    authen: false,
    breadcrumb: "",
    roles:[""]
  },
];

export default routes;

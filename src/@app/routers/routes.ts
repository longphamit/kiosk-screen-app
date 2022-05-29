import { ReactNode } from "react";
import AuthenLayout from "../components/authen_layout";
import ClientLayout from "../components/client_layout";
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
    path: "/signin",
    isLayout: false,
    authen: false,
    breadcrumb: "",
    roles:[""]
  },
  {
    component: RegistPage,
    path: "/signup",
    isLayout: false,
    authen: false,
    breadcrumb: "",
    roles:[""]
  },
  {
    component: ConfirmAccountPage,
    path: "/confirm-account",
    isLayout: false,
    authen: false,
    breadcrumb: "",
    roles:[""]
  },
  {
    component: ResetPassPage,
    path: "/reset-pass",
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
    component: ForgotPassPage,
    path: "/forgot-pass",
    isLayout: false,
    authen: false,
    breadcrumb: "",
    roles:[""]
  },
];

export default routes;

import { ReactNode, useEffect } from "react";
import { Route, useNavigate, Navigate } from "react-router-dom";
import IdleDetect from "../components/kiosk_base_layout/idle_detec";
import { ACCESS_TOKEN, KIOSK_ID } from "../constants/key";
import {
  ROLE_ADMIN,
  ROLE_LOCATION_OWNER,
  ROLE_SERVICE_PROVIDER,
} from "../constants/role";
import LoginPage from "../pages/login/login_page";
import UnAuthPage from "../pages/un_auth";
import { localStorageGetReduxState } from "../services/localstorage_service";
interface Props {
  component: React.FC;
  layout?: React.FC<{ children: ReactNode }>;
  isLayout: boolean;
  authen: boolean;
  path: string;
  roles: string[]
}
const AppElement: React.FC<Props> = (props) => {
  const {
    component: Component,
    layout: Layout,
    isLayout = false,
    authen,
    path,
    roles
  } = props;
  const access_token = localStorage.getItem(ACCESS_TOKEN);
  sessionStorage.setItem("PATH", path);
  console.log(access_token)
  const kioskId = localStorage.getItem(KIOSK_ID);
  if (!access_token || !kioskId) {
    return <LoginPage />;
  }
  if (!access_token && authen) {
    if (path === "/home-page") {
      return <LoginPage />;
    }
    return <UnAuthPage />;
  }
  console.log(access_token && authen)
  if (access_token && authen) {
    console.log(path)
    // return <Navigate to="/admin-home"/>
    const role = localStorageGetReduxState().auth.role;
    console.log("role app-element: " + role);
    if (roles) {
      if (!roles.includes(role)) {
        return <UnAuthPage />;
      }
    }

  }
  return isLayout && Layout ? (
    <Layout>
      <IdleDetect />
      <Component />
    </Layout>
  ) : (
    <Component />
  );
};
export default AppElement;

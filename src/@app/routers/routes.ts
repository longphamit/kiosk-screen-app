import { ReactNode } from "react";
import { FoodAppsPage } from "../../kiosks/pages/app/food_apps";
import { TransportAppsPage } from "../../kiosks/pages/app/transport_apps";
import AppCatePage from "../../kiosks/pages/app_cate";
import AppListPage from "../../kiosks/pages/app_list";
import IframeInterface from "../../kiosks/pages/app_list/iframeInterface";
import { AllEventsPage } from "../../kiosks/pages/event";
import { SpecificEventPage } from "../../kiosks/pages/event/specific_event";
import HomePage from "../../kiosks/pages/home";
import KioskLocationInfoPage from "../../kiosks/pages/kiosk_location";
import MapPage from "../../kiosks/pages/map";
import { AllPOIsPage } from "../../kiosks/pages/POI";
import { SpecificPOIPage } from "../../kiosks/pages/POI/specific_poi";
import KioskBaseLayout from "../components/kiosk_base_layout";
import LoginPage from "../pages/login/login_page";
import UnAuthPage from "../pages/un_auth";


interface Route {
  component: React.FC;
  layout?: React.FC<{ children: ReactNode }>;
  path: string;
  isLayout: boolean;
  authen: boolean;
  breadcrumb: string;
  roles: string[];
}
const routes: Route[] = [
  {
    component: LoginPage,
    path: "/signin",
    isLayout: false,
    authen: false,
    breadcrumb: "",
    roles: [""]
  },
  {
    component: UnAuthPage,
    path: "/unauth",
    isLayout: false,
    authen: true,
    breadcrumb: "",
    roles: [""]
  },
  {
    component: HomePage,
    path: "/home-page",
    isLayout: true,
    layout: KioskBaseLayout,
    authen: false,
    breadcrumb: "",
    roles: [""]
  },
  {
    component: MapPage,
    path: "/map",
    isLayout: true,
    layout: KioskBaseLayout,
    authen: false,
    breadcrumb: "",
    roles: [""]
  },
  {
    component: AppListPage,
    path: "/app-list",
    isLayout: true,
    layout: KioskBaseLayout,
    authen: false,
    breadcrumb: "",
    roles: [""]
  },
  {
    component: AppCatePage,
    path: "/app-cate",
    isLayout: true,
    layout: KioskBaseLayout,
    authen: false,
    breadcrumb: "",
    roles: [""]
  },
  {
    component: KioskLocationInfoPage,
    path: "/infor",
    isLayout: true,
    layout: KioskBaseLayout,
    authen: false,
    breadcrumb: "",
    roles: [""]
  },
  {
    component: IframeInterface,
    path: "/iframe-interface",
    isLayout: true,
    layout: KioskBaseLayout,
    authen: false,
    breadcrumb: "",
    roles: [""]
  },
  {
    component: AllPOIsPage,
    path: "/poi",
    isLayout: true,
    layout: KioskBaseLayout,
    authen: false,
    breadcrumb: "",
    roles: [""]
  },
  {
    component: SpecificPOIPage,
    path: "/poi/:id",
    isLayout: true,
    layout: KioskBaseLayout,
    authen: false,
    breadcrumb: "",
    roles: [""]
  },
  {
    component: AllEventsPage,
    path: "/event",
    isLayout: true,
    layout: KioskBaseLayout,
    authen: false,
    breadcrumb: "",
    roles: [""]
  },
  {
    component: SpecificEventPage,
    path: "/event/:id",
    isLayout: true,
    layout: KioskBaseLayout,
    authen: false,
    breadcrumb: "",
    roles: [""]
  },
  {
    component: TransportAppsPage,
    path: "/transport",
    isLayout: true,
    layout: KioskBaseLayout,
    authen: false,
    breadcrumb: "",
    roles: [""]
  },
  {
    component: FoodAppsPage,
    path: "/food",
    isLayout: true,
    layout: KioskBaseLayout,
    authen: false,
    breadcrumb: "",
    roles: [""]
  },
];

export default routes;

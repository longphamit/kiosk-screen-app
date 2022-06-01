import { Layout, Menu, Breadcrumb, Row } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  HomeFilled,
  LogoutOutlined,
  KeyOutlined,
  FundOutlined,
  BlockOutlined,
  AuditOutlined,
  ClockCircleOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { Fragment, ReactNode, useEffect, useState } from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { USER_FRIST_NAME } from "../../constants/key";

import useSelector from "../../hooks/use_selector";
import { AppState } from "../../redux/stores";
import { ROLE_ADMIN, ROLE_LOCATION_OWNER } from "../../constants/role";
import {
  localStorageClearService,
  localStorageGetReduxState,
  localStorageGetUserIdService,
} from "../../services/localstorage_service";

import routes from "../../routers/routes";
import { useTranslation } from "react-i18next";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const KioskBaseLayout: React.FC<{ children: ReactNode }> = (props) => {
  const { children } = props;
  const { t } = useTranslation();
  const [time, setTime] = useState(new Date().toLocaleString());
  let navigate = useNavigate();
  const logout = () => {
    localStorageClearService();
    navigate("/signin");
    toast("Logout successfull");
  };
  const onNavigate = (url: string) => {
    navigate(url);
  };

  useEffect(() => {
    setInterval(() => setTime(new Date().toLocaleString()), 1000);
  });
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <h2
          style={{ fontWeight: "bold", color: "#fff" }}
          onClick={() => {
            onNavigate("/");
          }}
        >
          TIKA
        </h2>
      </Header>
      <Layout>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default KioskBaseLayout;

import { Layout, Menu, Breadcrumb, Row, Col } from "antd";
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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { localStorageClearService } from "../../services/localstorage_service";

import routes from "../../routers/routes";
import { useTranslation } from "react-i18next";
import TimeView from "./time";
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
        <div>
          <Row>
            <Col span={20}>
              <h2
                style={{ fontWeight: "bold", color: "#fff" }}
                onClick={() => {
                  onNavigate("/");
                }}
              >
                TIKA
              </h2>
            </Col>
            <Col span={4}>
              <TimeView />
            </Col>
          </Row>
        </div>
      </Header>
      <Layout>
        <Layout>
          <Content className="site-layout-background">{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default KioskBaseLayout;

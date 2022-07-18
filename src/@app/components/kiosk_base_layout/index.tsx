import { Layout, Menu, Breadcrumb, Row, Col, notification } from "antd";
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
  SmileOutlined,
} from "@ant-design/icons";
import { Fragment, ReactNode, useEffect, useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { localStorageClearService } from "../../services/localstorage_service";

import routes from "../../routers/routes";
import { useTranslation } from "react-i18next";
import TimeView from "./time";
import useDispatch from "../../hooks/use_dispatch";
import messaging, { getTokenCustom } from "../../../kiosks/configs/firebase";
import { onMessage } from "firebase/messaging";
import { setReceiveNotifyChangeTemplate } from "../../redux/slices/home_view";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const KioskBaseLayout: React.FC<{ children: ReactNode }> = (props) => {
  const { children } = props;
  let navigate = useNavigate();
  const [isTokenFound, setTokenFound] = useState(false);
  const logout = () => {
    localStorageClearService();
    navigate("/signin");
    toast("Logout successfull");
  };
  const onNavigate = (url: string) => {
    navigate(url);
  };

  useEffect(() => {
    
  });
  const dispatch = useDispatch();
  getTokenCustom(setTokenFound);
  onMessage(messaging, (payload) => {
    const data=JSON.parse(payload.data?.json?payload.data?.json:"");
    console.log(data);
    dispatch(setReceiveNotifyChangeTemplate(data))
    notification.open({
      message: payload.notification?.title,
      description: payload.notification?.body,
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
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

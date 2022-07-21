import { Layout, Menu, Breadcrumb, Row, Col, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { ReactNode, useEffect, useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { localStorageClearService } from "../../services/localstorage_service";
import TimeView from "./time";
import useDispatch from "../../hooks/use_dispatch";
import messaging, { getTokenCustom } from "../../../kiosks/configs/firebase";
import { onMessage } from "firebase/messaging";
import { setReceiveNotifyChangeTemplate } from "../../redux/slices/home_view";
import { getKioskTemplate } from "../../../kiosks/services/kiosk_service";
var CronJob = require("cron").CronJob;
const { Header, Content, Sider } = Layout;

const KioskBaseLayout: React.FC<{ children: ReactNode }> = (props) => {
  const { children } = props;
  let navigate = useNavigate();
  const [isTokenFound, setTokenFound] = useState(false);
  const [value, setValue] = useState("30 5 * * 1,6");
  const logout = () => {
    localStorageClearService();
    navigate("/signin");
    toast("Logout successfull");
  };
  const onNavigate = (url: string) => {
    navigate(url);
  };
  const doCronJob = () => {
    new CronJob(
      "* * 1 * * *",
      async function () {
        getKioskTemplate("095B3D09-0F5B-49C9-9EAA-5C5DB3DB841D").then((res) => {
          console.log(res.data.kioskScheduleTemplate.template);
          dispatch(
            setReceiveNotifyChangeTemplate(
              res.data.kioskScheduleTemplate.template
            )
          );
        });
      },
      null,
      true,
      "America/Los_Angeles"
    );
  };
  useEffect(() => {
    doCronJob();
  });
  const dispatch = useDispatch();
  getTokenCustom(setTokenFound);
  // onMessage(messaging, (payload) => {
  //   const data = JSON.parse(payload.data?.json ? payload.data?.json : "");
  //   console.log(data);
  //   dispatch(setReceiveNotifyChangeTemplate(data));
  //   notification.open({
  //     message: payload.notification?.title,
  //     description: payload.notification?.body,
  //     icon: <SmileOutlined style={{ color: "#108ee9" }} />,
  //   });
  // });
  return (
    <>
      <Layout>
        {/* <Header className="header">
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
               
              </Col>
            </Row>
          </div>
        </Header> */}
        <Layout>
          <Layout>
            <Content className="site-layout-background">
              <Row>
                <Col span={18}></Col>
                <Col span={6}><TimeView /></Col>
              </Row>
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};
export default KioskBaseLayout;

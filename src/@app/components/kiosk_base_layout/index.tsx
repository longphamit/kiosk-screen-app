import { Layout, Row, Col, Affix, Modal } from "antd";
import {
  HomeFilled,
  PoweroffOutlined,
  LeftCircleOutlined,
} from "@ant-design/icons";
import { ScrollTop } from "primereact/scrolltop";
import { ReactNode, useEffect, useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { localStorageClearService } from "../../services/localstorage_service";
import TimeView from "./time";
import useDispatch from "../../hooks/use_dispatch";
import { getTokenCustom } from "../../../kiosks/configs/firebase";
import { setReceiveNotifyChangeTemplate } from "../../redux/slices/home_view";
import { getKioskTemplateService } from "../../../kiosks/services/kiosk_service";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import ModalChangeCurrenKiosk from "./modalChangeCurrentKiosk";
import { PRIMARY_COLOR } from "../../constants/colors";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { HOST_SIGNALR } from "../../constants/host";
import Iframe from "react-iframe";
import { logoutRedux } from "../../redux/stores";
import useSelector from "../../hooks/use_selector";
import {
  FaArchway,
  FaHome,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";
import { MdFastfood, MdOutlineFlight } from "react-icons/md";
import { IoApps, IoReloadCircleSharp } from "react-icons/io5";
import WeatherView from "./weather";
import { setSelectedIcon } from "../../redux/slices/bar_slice";
var CronJob = require("cron").CronJob;
const { Content } = Layout;
const KioskBaseLayout: React.FC<{ children: ReactNode }> = (props) => {
  const { children } = props;
  const kioskId = localStorage.getItem("KIOSK_ID");
  let navigate = useNavigate();
  const { backToPageUrl, isBackButton } = useSelector(
    (state) => state.back_button
  );
  const [weather, setWeather] = useState();
  const [top, setTop] = useState(0);
  const [size, setSize] = useState<SizeType>("large");
  const [isTokenFound, setTokenFound] = useState(false);
  const [value, setValue] = useState("30 5 * * 1,6");
  const [modalGoogleVisible, setModalGoogleVisible] = useState(false);
  const { selectedIcon } = useSelector((state) => state.bar);
  const [isChangeCurrentKioskModal, setIsChangeCurrentKioskModal] =
    useState(false);
  const doCronJob = () => {
    new CronJob(
      "0 * * * *",
      async function () {
        console.log("hello");
        getKioskTemplateService(kioskId).then((res) => {
          console.log(res.data);
        });
      },
      null,
      true,
      "ASIA/HO_CHI_MINH"
    ).start();
  };

  const joinRoom = async () => {
    try {
      const KioskId = localStorage.getItem("KIOSK_ID");
      const RoomId = KioskId;
      const connection = new HubConnectionBuilder()
        .withUrl(HOST_SIGNALR)
        //.withUrl("https://localhost:5001/signalR")
        .configureLogging(LogLevel.Information)
        .build();
      connection.on(
        "KIOSK_CONNECTION_CHANNEL",
        (KioskId: any, message: any) => {
          console.log(message + " : " + KioskId);
          console.log(JSON.parse(message));
          dispatch(setReceiveNotifyChangeTemplate(JSON.parse(message)));
        }
      );
      connection.on(
        "KIOSK_MESSAGE_CONNECTED_CHANNEL",
        (KioskId: any, message: any) => {
          toast.success(message);
        }
      );
      connection.on("KIOSK_STATUS_CHANNEL", (KioskId: any, message: any) => {
        if (message === "CHANGE_STATUS_TO_DEACTIVATE") {
          try {
            localStorageClearService();
            logoutRedux();
            navigate("/signin");
            window.location.reload();
            toast.success("Your kiosk log out by change status in web !!");
          } catch (error) {
            console.log(error);
          }
        }
      });

      await connection.start();
      await connection.invoke("joinRoom", { KioskId, RoomId });
    } catch (e: any) {
      console.log(e);
    }
  };


  useEffect(() => {
    doCronJob();
    joinRoom();
  }, []);
  const dispatch = useDispatch();
  getTokenCustom(setTokenFound);

  const handleCancelModal = () => {
    setIsChangeCurrentKioskModal(false);
  };
  const iconHomeOnClick = () => {
    dispatch(setSelectedIcon("HOME"));
    navigate("/home-page");
  };
  const iconAppOnClick = () => {
    dispatch(setSelectedIcon("APP"));
    navigate("/app-cate");
  };
  const iconMapOnClick = () => {
    dispatch(setSelectedIcon("MAP"));
    navigate("/map");
  };
  const iconPOIOnClick = () => {
    dispatch(setSelectedIcon("POI"));
    navigate("/poi");
  };
  const iconEventOnClick = () => {
    dispatch(setSelectedIcon("EVENT"));
    navigate("/event");
  };
  const iconInforOnClick = () => {
    dispatch(setSelectedIcon("INFOR"));
    navigate("/infor");
  };
  const iconMoveOnClick = () => {
    dispatch(setSelectedIcon("MOVE"));
    navigate("/transport")
  };
  const iconFoodOnClick = () => {
    dispatch(setSelectedIcon("FOOD"));
    navigate("/food")
  };

  return (
    <>

      <ModalChangeCurrenKiosk
        isChangeCurrentKioskModal={isChangeCurrentKioskModal}
        handleCancelModal={handleCancelModal}
      />
      <Layout>
        <Layout>
          <Layout>
            <Content className="site-layout-background">
              <svg
                id="wave"
                className="wave-box"
                viewBox="0 0 1440 490"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="sw-gradient-0"
                    x1="0"
                    x2="0"
                    y1="1"
                    y2="0"
                  >
                    <stop
                      stopColor="rgba(47.954, 133.12, 208.924, 1)"
                      offset="0%"
                    ></stop>
                    <stop
                      stopColor="rgba(51.331, 248.79, 255, 1)"
                      offset="100%"
                    ></stop>
                  </linearGradient>
                </defs>
                <path
                  className="wave-path"
                  fill="url(#sw-gradient-0)"
                  d="M0,294L120,245C240,196,480,98,720,122.5C960,147,1200,294,1440,326.7C1680,359,1920,278,2160,277.7C2400,278,2640,359,2880,400.2C3120,441,3360,441,3600,408.3C3840,376,4080,310,4320,310.3C4560,310,4800,376,5040,392C5280,408,5520,376,5760,375.7C6000,376,6240,408,6480,367.5C6720,327,6960,212,7200,138.8C7440,65,7680,33,7920,49C8160,65,8400,131,8640,138.8C8880,147,9120,98,9360,106.2C9600,114,9840,180,10080,171.5C10320,163,10560,82,10800,40.8C11040,0,11280,0,11520,0C11760,0,12000,0,12240,40.8C12480,82,12720,163,12960,220.5C13200,278,13440,310,13680,310.3C13920,310,14160,278,14400,277.7C14640,278,14880,310,15120,343C15360,376,15600,408,15840,416.5C16080,425,16320,408,16560,392C16800,376,17040,359,17160,351.2L17280,343L17280,490L17160,490C17040,490,16800,490,16560,490C16320,490,16080,490,15840,490C15600,490,15360,490,15120,490C14880,490,14640,490,14400,490C14160,490,13920,490,13680,490C13440,490,13200,490,12960,490C12720,490,12480,490,12240,490C12000,490,11760,490,11520,490C11280,490,11040,490,10800,490C10560,490,10320,490,10080,490C9840,490,9600,490,9360,490C9120,490,8880,490,8640,490C8400,490,8160,490,7920,490C7680,490,7440,490,7200,490C6960,490,6720,490,6480,490C6240,490,6000,490,5760,490C5520,490,5280,490,5040,490C4800,490,4560,490,4320,490C4080,490,3840,490,3600,490C3360,490,3120,490,2880,490C2640,490,2400,490,2160,490C1920,490,1680,490,1440,490C1200,490,960,490,720,490C480,490,240,490,120,490L0,490Z"
                ></path>
                <defs>
                  <linearGradient
                    id="sw-gradient-1"
                    x1="0"
                    x2="0"
                    y1="1"
                    y2="0"
                  >
                    <stop
                      stopColor="rgba(60.71, 240.799, 240.188, 1)"
                      offset="0%"
                    ></stop>
                    <stop
                      stopColor="rgba(48.895, 148.436, 249.906, 1)"
                      offset="100%"
                    ></stop>
                  </linearGradient>
                </defs>
                <path
                  className="wave-path-sub"
                  fill="url(#sw-gradient-1)"
                  d="M0,245L120,204.2C240,163,480,82,720,106.2C960,131,1200,261,1440,334.8C1680,408,1920,425,2160,400.2C2400,376,2640,310,2880,302.2C3120,294,3360,343,3600,351.2C3840,359,4080,327,4320,302.2C4560,278,4800,261,5040,228.7C5280,196,5520,147,5760,106.2C6000,65,6240,33,6480,65.3C6720,98,6960,196,7200,269.5C7440,343,7680,392,7920,392C8160,392,8400,343,8640,294C8880,245,9120,196,9360,204.2C9600,212,9840,278,10080,261.3C10320,245,10560,147,10800,98C11040,49,11280,49,11520,106.2C11760,163,12000,278,12240,302.2C12480,327,12720,261,12960,212.3C13200,163,13440,131,13680,171.5C13920,212,14160,327,14400,367.5C14640,408,14880,376,15120,310.3C15360,245,15600,147,15840,155.2C16080,163,16320,278,16560,318.5C16800,359,17040,327,17160,310.3L17280,294L17280,490L17160,490C17040,490,16800,490,16560,490C16320,490,16080,490,15840,490C15600,490,15360,490,15120,490C14880,490,14640,490,14400,490C14160,490,13920,490,13680,490C13440,490,13200,490,12960,490C12720,490,12480,490,12240,490C12000,490,11760,490,11520,490C11280,490,11040,490,10800,490C10560,490,10320,490,10080,490C9840,490,9600,490,9360,490C9120,490,8880,490,8640,490C8400,490,8160,490,7920,490C7680,490,7440,490,7200,490C6960,490,6720,490,6480,490C6240,490,6000,490,5760,490C5520,490,5280,490,5040,490C4800,490,4560,490,4320,490C4080,490,3840,490,3600,490C3360,490,3120,490,2880,490C2640,490,2400,490,2160,490C1920,490,1680,490,1440,490C1200,490,960,490,720,490C480,490,240,490,120,490L0,490Z"
                ></path>
              </svg>

              <Row align="middle" justify="center">
                <Col span={14}></Col>
                <Col span={5}>
                  <TimeView />
                </Col>
                <Col span={3}>
                  <WeatherView />
                </Col>
                <Col span={2}>
                  <PoweroffOutlined
                    style={{ fontSize: 20, margin: 10, color: "#fff" }}
                    onClick={() => {
                      setIsChangeCurrentKioskModal(true);
                    }}
                  />
                </Col>
              </Row>
              <div style={{ marginBottom: 0 }}>{children}</div>

              <>
                <div style={{ zIndex: 1 }}>
                  <Affix
                    offsetBottom={top}
                    className="center"
                    style={{
                      textAlign: "center",
                      width: "60%",
                      position: "fixed",
                      bottom: 0,
                      left: "20%",
                    }}
                  >
                    <div
                      style={{
                        background: "#fff",
                        borderRadius: 20,
                        width: "100%",
                        fontWeight: "bold",
                        opacity: 0.8,
                      }}
                    >
                      <Row className="center" style={{ width: "100%" }}>
                        <Col
                          span={3}
                          onClick={() => {
                            iconHomeOnClick();
                          }}
                        >
                          <div style={{ textAlign: "center" }}>
                            <FaHome
                              style={{
                                fontSize: 40,
                                margin: 10,
                                color:
                                  selectedIcon === "HOME"
                                    ? "#059ef7"
                                    : "#000",
                              }}
                            />
                          </div>
                          <label htmlFor="" style={{ fontSize: 20 }}>
                            Home
                          </label>
                        </Col>

                        <Col
                          span={3}
                          onClick={() => {
                            iconMoveOnClick();
                          }}
                        >
                          <div style={{ textAlign: "center" }}>
                            <MdOutlineFlight
                              style={{
                                fontSize: 40,
                                margin: 10,
                                color:
                                  selectedIcon === "MOVE" ? "#059ef7" : "#000",
                              }}
                            />
                          </div>
                          <label htmlFor="" style={{ fontSize: 20 }}>
                            Transport
                          </label>
                        </Col>
                        <Col
                          span={3}
                          onClick={() => {
                            iconFoodOnClick();
                          }}
                        >
                          <div style={{ textAlign: "center" }}>
                            <MdFastfood
                              style={{
                                fontSize: 40,
                                margin: 10,
                                color:
                                  selectedIcon === "FOOD" ? "#059ef7" : "#000",
                              }}
                            />
                          </div>
                          <label htmlFor="" style={{ fontSize: 20 }}>
                            Food
                          </label>
                        </Col>

                        <Col span={3} onClick={() => iconPOIOnClick()}>
                          <div style={{ textAlign: "center" }}>
                            <FaArchway
                              style={{
                                fontSize: 40,
                                margin: 10,
                                color:
                                  selectedIcon === "POI" ? "#059ef7" : "#000",
                              }}
                            />
                          </div>
                          <label htmlFor="" style={{ fontSize: 20 }}>
                            POI
                          </label>
                        </Col>
                        <Col span={3} onClick={() => iconEventOnClick()}>
                          <div style={{ textAlign: "center" }}>
                            <FaStar
                              style={{
                                fontSize: 40,
                                margin: 10,
                                color:
                                  selectedIcon === "EVENT" ? "#059ef7" : "#000",
                              }}
                            />
                          </div>
                          <label htmlFor="" style={{ fontSize: 20 }}>
                            Event
                          </label>
                        </Col>
                        <Col span={3} onClick={() => iconMapOnClick()}>
                          <div
                            style={{
                              textAlign: "center",
                            }}
                          >
                            <FaMapMarkerAlt
                              style={{
                                fontSize: 40,
                                margin: 10,
                                color:
                                  selectedIcon === "MAP" ? "#059ef7" : "#000",
                              }}
                            />
                          </div>
                          <label htmlFor="" style={{ fontSize: 20 }}>
                            Map
                          </label>
                        </Col>
                        <Col
                          span={3}
                          onClick={() => {
                            iconAppOnClick();
                          }}
                        >
                          <div style={{ textAlign: "center" }}>
                            <IoApps
                              style={{
                                fontSize: 40,
                                margin: 10,
                                color:
                                  selectedIcon === "APP" ? "#059ef7" : "#000",
                              }}
                            />
                          </div>
                          <label htmlFor="" style={{ fontSize: 20 }}>
                            App
                          </label>
                        </Col>
                        <Col
                          span={3}
                          onClick={() => {
                            iconInforOnClick();
                          }}
                        >
                          <div style={{ textAlign: "center" }}>
                            <FaInfoCircle
                              style={{
                                fontSize: 40,
                                margin: 10,
                                color:
                                  selectedIcon === "INFOR" ? "#059ef7" : "#000",
                              }}
                            />
                          </div>
                          <label htmlFor="" style={{ fontSize: 20 }}>
                            Info
                          </label>
                        </Col>
                      </Row>
                    </div>
                  </Affix>
                  <Affix
                    offsetBottom={top}
                    style={{
                      textAlign: "right",
                      position: "fixed",
                      bottom: 0,
                      left: "80%",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          padding: 15,
                          margin: 50,
                          backgroundColor: "#fff",
                          borderRadius: 20,
                          opacity: 0.8,
                        }}
                      >
                        <IoReloadCircleSharp
                          onClick={() => {
                            window.location.reload();
                          }}
                          style={{
                            fontSize: 50,
                            color: "#3ac756",
                          }}
                        />
                      </div>
                    </div>
                  </Affix>
                  <ScrollTop
                    style={{ backgroundColor: PRIMARY_COLOR }}
                    icon="pi pi-arrow-up"
                  />
                </div>
              </>
            </Content>
          </Layout>
        </Layout>
      </Layout>
      <Modal
        visible={modalGoogleVisible}
        onCancel={() => {
          setModalGoogleVisible(false);
        }}
        footer={[]}
        width={1000}
      >
        <Iframe
          width="100%"
          height="600px"
          url="https://www.google.com/?igu=1"
        />
      </Modal>
    </>
  );
};
export default KioskBaseLayout;

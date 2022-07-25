import { Carousel, Col, Descriptions, Image, Row, Spin, Typography } from "antd";
import "./styles.css";
import { Card, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import useSelector from "../../../@app/hooks/use_selector";
import { PRIMARY_COLOR } from "../../../@app/constants/colors";
import { useEffect, useState } from "react";
import { getLocationByIdService } from "../../../@app/services/kiosk_location_service";
import { getKioskById } from "../../services/kiosk_service";
import { toast } from "react-toastify";
import { PhoneFilled, MailFilled, InfoCircleFilled, ArrowRightOutlined } from "@ant-design/icons";
import ModalLocationDescription from "./modalLocationDescrtiption";
const { Title } = Typography;
const { Meta } = Card;
const style = { background: "#0092ff", padding: "8px 0" };
const contentStyle = {
  height: "300px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  contentAlign: "center",
  background: "#364d79",
};
const HomePage = () => {
  const navigator = useNavigate();
  const [kioskLocation, setKioskLocation] = useState()
  const [isLocationDescriptionModalVisible, setLocationDescriptionModalVisible] = useState(false)
  const { id, listEventPosition, listAppCatePosition } = useSelector(
    (state) => state.home_view
  );
  console.log(listEventPosition);
  const getKioskLocation = async () => {
    const kioskId = localStorage.getItem("KIOSK_ID");
    const resKioskInfo = await getKioskById(kioskId);
    if (resKioskInfo.data.kioskLocationId) {
      const resKioksLocationInfo = await getLocationByIdService(
        resKioskInfo.data.kioskLocationId
      );
      console.log(resKioksLocationInfo.data)

      setKioskLocation(resKioksLocationInfo.data);
    } else {
      toast.error("can not get kiosk information");
    }
  };
  useEffect(() => {
    getKioskLocation()
  }, []);
  const onCancelModalLocation = () => {
    setLocationDescriptionModalVisible(false)
  }
  return (
    <>
      <div style={{ marginTop: 10, marginLeft: 50, marginRight: 50 }}>
        <Row>
          <Col span={16}>
            <Carousel style={{ margin: 10, textAlign: "center", alignItems: "center" }} autoplay autoplaySpeed={2000}>
              {
                kioskLocation ? kioskLocation.listImage?.map(image => {
                  return <div style={contentStyle}><Image style={{ textAlign: "center" }} key={image.id} src={image.link} /></div>
                }) : <Spin className="center" />
              }
            </Carousel>
          </Col>
          <Col span={8}>
            <div className="location-info">
              {
                kioskLocation ?
                  <>
                    <div style={{ textAlign: "center" }}>
                      <h2 style={{ fontWeight: "bold", fontSize: 30, color: PRIMARY_COLOR }}>{kioskLocation.name}</h2>
                    </div>
                    <div style={{ width: "100%" }}>
                      <Row span={24}>
                        <Col span={24}>
                          <div style={{ background: "#afeb9d", margin: 5, padding: 15, borderRadius: 10, color: "#fff", fontWeight: "bold", fontSize: 30 }}>
                            <Row>
                              <Col span={2}>
                                <PhoneFilled />
                              </Col>
                              <Col span={22} style={{ textAlign: "center" }}>
                                {kioskLocation.hotLine}
                              </Col>
                            </Row>
                          </div>
                        </Col>

                      </Row>
                      <Row span={24}>
                        <Col span={24}>
                          <div style={{ background: "#ff8442", margin: 5, padding: 15, borderRadius: 10, color: "#fff", fontWeight: "bold", fontSize: 30 }}>
                            <Row>
                              <Col span={2}>
                                <MailFilled />
                              </Col>
                              <Col span={22} style={{ textAlign: "center" }}>
                                {kioskLocation.ownerEmail}
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row><Row span={24}>
                        <Col span={24}>
                          <div onClick={() => { setLocationDescriptionModalVisible(true) }} style={{ background: "#59def0", margin: 5, padding: 15, borderRadius: 10, color: "#fff", fontWeight: "bold", fontSize: 30 }}>
                            <Row>
                              <Col span={2}>
                                <InfoCircleFilled />
                              </Col>
                              <Col span={20} style={{ textAlign: "center" }} >
                                Information
                              </Col>
                              <Col span={2}>
                                <ArrowRightOutlined />
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>

                    </div>

                  </> : <Row>
                    <Spin className="center" />
                  </Row>
              }

            </div>
          </Col>
        </Row>
      </div>
      {
        kioskLocation ? <ModalLocationDescription
          onCancelModalLocation={onCancelModalLocation}
          visible={isLocationDescriptionModalVisible}
          description={kioskLocation.description} /> : null
      }
      <div style={{ marginLeft: 40,marginRight:40,marginBottom:40 }}>
        {/* <>{id}</>
            {
                listAppCatePosition?.map(e => {
                    return (<div>
                        {e.appCategoryName}
                    </div>)
                })
            } */}
<Col span={24}>
          
          <div>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {/* {
                            listEventPosition?.map(e => {
                                return (<Col xl={6} xs={12}>
                                    <div className="event-box">
                                        <img
                                            className="event-image"
                                            alt="example"
                                            src={require('../../../assets/images/event-1.png')}
                                        />

                                    </div>
                                </Col>)
                            })
                        } */}
              <Col xl={6} xs={12}>
                <div className="event-box">
                  <img
                    className="event-image"
                    alt="example"
                    src={require("../../../assets/images/event-2.png")}
                  />
                </div>
              </Col>
              <Col xl={6} xs={12}>
                <div className="event-box">
                  <img
                    className="event-image"
                    alt="example"
                    src={require("../../../assets/images/event-3.png")}
                  />
                </div>
              </Col>
              <Col xl={6} xs={12}>
                <div className="event-box">
                  <img
                    className="event-image"
                    alt="example"
                    src={require("../../../assets/images/event-4.png")}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={24}>
          <Row span={24}>
            <div className="title-home-box">App Category</div>
          </Row>
          <div>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col xl={6} span={12}>
                <div
                  className="app-box"
                  onClick={() => {
                    navigator("/map");
                  }}
                >
                  <img
                    className="app-image"
                    alt="example"
                    src={require("../../../assets/images/map.png")}
                  />
                  <Meta
                    style={{ marginTop: 10, marginBottom: 10 }}
                    title="Europe Street beat"
                  />
                </div>
              </Col>
              <Col xl={6} span={12}>
                <div className="app-box">
                  <img
                    className="app-image"
                    alt="example"
                    src={require("../../../assets/images/hotel.png")}
                  />
                  <Meta
                    style={{ marginTop: 10, marginBottom: 10 }}
                    title="Europe Street beat"
                  />
                </div>
              </Col>
              <Col xl={6} span={12}>
                <div className="app-box">
                  <img
                    className="app-image"
                    alt="example"
                    src={require("../../../assets/images/fast-food.png")}
                  />
                  <Meta
                    style={{ marginTop: 10, marginBottom: 10 }}
                    title="Europe Street beat"
                  />
                </div>
              </Col>
              <Col xl={6} span={12}>
                <div className="app-box">
                  <img
                    className="app-image"
                    alt="example"
                    src={require("../../../assets/images/cinema.png")}
                  />
                  <Meta
                    style={{ marginTop: 10, marginBottom: 10 }}
                    title="Europe Street beat"
                  />
                </div>
              </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col xl={6} span={12}>
                <div className="app-box">
                  <img
                    className="app-image"
                    alt="example"
                    src={require("../../../assets/images/ship.png")}
                  />
                  <Meta
                    style={{ marginTop: 10, marginBottom: 10 }}
                    title="Europe Street beat"
                  />
                </div>
              </Col>
              <Col xl={6} span={12}>
                <div className="app-box">
                  <img
                    className="app-image"
                    alt="example"
                    src={require("../../../assets/images/Train.png")}
                  />
                  <Meta
                    style={{ marginTop: 10, marginBottom: 10 }}
                    title="Europe Street beat"
                  />
                </div>
              </Col>
              <Col xl={6} span={12}>
                <div className="app-box">
                  <img
                    className="app-image"
                    alt="example"
                    src={require("../../../assets/images/car.png")}
                  />
                  <Meta
                    style={{ marginTop: 10, marginBottom: 10 }}
                    title="Europe Street beat"
                  />
                </div>
              </Col>
              <Col xl={6} span={12}>
                <div className="app-box">
                  <img
                    className="app-image"
                    alt="example"
                    src={require("../../../assets/images/flight.png")}
                  />
                  <Meta
                    style={{ marginTop: 10, marginBottom: 10 }}
                    title="Europe Street beat"
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        
      </div>
    </>
  );
};
export default HomePage;

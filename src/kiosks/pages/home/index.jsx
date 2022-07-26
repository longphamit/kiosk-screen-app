import { Carousel, Col, Descriptions, Image, Row, Spin, Typography } from "antd";
import "./styles.css";
import { Card, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import useSelector from "../../../@app/hooks/use_selector";
import { PRIMARY_COLOR } from "../../../@app/constants/colors";
import { useEffect, useState } from "react";
import { getLocationByIdService } from "../../../@app/services/kiosk_location_service";
import { toast } from "react-toastify";
import { PhoneFilled, MailFilled, InfoCircleFilled, ArrowRightOutlined } from "@ant-design/icons";
import ModalLocationDescription from "./modalLocationDescrtiption";
import { getKioskInfoService } from "../../services/kiosk_service";
import { Carousel as PrimeFaceCarousel } from 'primereact/carousel';
const { Meta } = Card;
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
  const { listEventPosition, listAppCatePosition } = useSelector(
    (state) => state.home_view
  );
  const getKioskLocation = async () => {
    const kioskId = localStorage.getItem("KIOSK_ID");
    const resKioskInfo = await getKioskInfoService(kioskId);
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
                      </Row>
                      <Row span={24}>
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
                      <Row span={24}>
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
      <div style={{ marginLeft: 40, marginRight: 40, marginBottom: 40 }}>
        <Col span={24}>
          <div>

            {/* {
              listEventPosition?.map(row => {
                return <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col span={24}>
                    <PrimeFaceCarousel numVisible={4} value={row} itemTemplate={eventShow}></PrimeFaceCarousel>
                  </Col>
                </Row>
              })
            } */}
            {
              listEventPosition?.map(row => {
                return <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                 <Col span={24}>
                 <Carousel slidesToShow={row.length <= 4 ? row.length : 4} style={{ margin: 10, textAlign: "center", alignItems: "center" }} autoplay autoplaySpeed={2000}>
                    {
                      row.map(e => {
                        return <Col span={24}><div className="event-box">
                          <img
                            className="event-image"
                            alt="example"
                            src={e.EventThumbnail.Link}
                          />
                        </div></Col>
                      })
                    }
                  </Carousel></Col>
                </Row>
              })
            }
          </div>
        </Col>
        <Col span={24}>
          <Row span={24}>
            <div className="title-home-box">App Category</div>
          </Row>
          <div>
            {
              listAppCatePosition?.map(row => {
                return <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col span={24}>
                    <Carousel slidesToShow={row.length <= 4 ? row.length : 4} style={{ margin: 10, textAlign: "center", alignItems: "center" }} autoplay autoplaySpeed={2000}>
                      {
                        row.map(e => {
                          return (
                            <Col span={24}>
                              <div
                                className="app-box"
                                onClick={() => {
                                  navigator(`/app-list?id=${e.AppCategoryId}`);
                                }}
                              >
                                <img
                                  className="app-image"
                                  alt="example"
                                  src={e.AppCategoryLogo}
                                />
                                <Meta
                                  style={{ marginTop: 10, marginBottom: 10 }}
                                  title={e.AppCategoryName}
                                />
                              </div>

                            </Col>
                          )
                        })
                      }
                    </Carousel>
                  </Col>
                </Row>
              })
            }
          </div>
        </Col>

      </div>
    </>
  );
};
export default HomePage;

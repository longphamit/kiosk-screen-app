import * as React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, {
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from "@goongmaps/goong-map-react";
import { Avatar, Button, Card, Col, List, message, Row, Spin } from "antd";
import "./styles.css";
import VirtualList from "rc-virtual-list";
import { useGeolocated } from "react-geolocated";
import { useNavigate } from "react-router-dom";
import { getAllPOICategoriesService, getPOINearbyService } from "../../services/poi_service";
import { toast } from "react-toastify";
import POIMarker from "./poi_marker";
import { getEventNearbyService } from "../../services/event_service";
import { KIOSK_ID, PARTY_ID } from "../../../@app/constants/key";
import EventMarker from "./event_marker";
const { Meta } = Card;
const ContainerHeight = 400;
const scaleControlStyle = {
  left: 20,
  bottom: 100,
};
const navControlStyle = {
  right: 10,
  top: 10,
};

const MapPage = () => {
  const navigate = useNavigate();
  const [isPoiNearByLoading, setPoiNearByLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    longitude: 105.7982323,
    latitude: 21.0136133,
  });
  const [listEventNearby, setListEventNearby] = useState([]);
  const [isEventNearbyLoading, setEventNearbyLoading] = useState(false);
  const [listPoiCategories, setListPoiCategories] = useState(false)
  const [listPois, setListPois] = useState([]);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: 600,
    latitude: currentLocation.latitude,
    longitude: currentLocation.longitude,
    zoom: 13,
  });

  // const appendData = () => {
  //   fetch(
  //     "https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo"
  //   )
  //     .then((res) => res.json())
  //     .then((body) => {
  //       setData(data.concat(body.results));
  //       message.success(`${body.results.length} more items loaded!`);
  //     });
  // };
  const [data, setData] = useState([]);
  const onScroll = (e) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      //appendData();
    }
  };
  const setLocationViewPort = () => {
    console.log("set view port")
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        ...currentLocation,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setViewport({
        ...viewport,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  };
  const getListPoiCategories = async () => {
    try {
      const res = await getAllPOICategoriesService();
      setListPoiCategories(res.data.data)
    } catch (e) {
      console.error(e)
    }
  }
  const getListPoiNearby = async () => {
    try {
      setPoiNearByLoading(true);
      navigator.geolocation.getCurrentPosition(async (position) => {
        setCurrentLocation({
          ...currentLocation,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        console.log(
          position.coords.latitude)
        console.log(position.coords.longitude)
        const pois = await getPOINearbyService(
          localStorage.getItem(KIOSK_ID),
          position.coords.longitude,
          position.coords.latitude
        );
        setListPois(pois.data.data);

      });
    } catch (e) {
      toast.error(e.respone);
    } finally {
      setPoiNearByLoading(false);
    }
  };
  const getListEventNearby = async () => {
    try {
      setEventNearbyLoading(true);
      //setPoiNearByLoading(true);
      navigator.geolocation.getCurrentPosition(async (position) => {
        const events = await getEventNearbyService(
          position.coords.longitude,
          position.coords.latitude,
          localStorage.getItem(PARTY_ID)
        );
        setListEventNearby(events.data.data);
      });

    } catch (e) {
      console.error(e);
      toast.error(e.respone);
    } finally {
      setEventNearbyLoading(false);
    }
  };

  const reloadMap = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        ...currentLocation,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setViewport({
        ...viewport,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 13,
      });
    });
  };
  useEffect(() => {
    //appendData();
    setLocationViewPort();
    getListPoiCategories();
    getListPoiNearby();
    getListEventNearby();
  }, []);

  return (
    <>
      <Col xl={24} xs={24}>
        <Row>
          <Col xl={18} xs={24}>
            <div style={{ padding: 20 }}>
              <ReactMapGL
                {...viewport}
                className="map"
                onViewportChange={setViewport}
                goongApiAccessToken={"GlVNPt2Vav2Z75sQm6lJ7XymStHLVD8UcWwhbWMn"}
              >

                <NavigationControl style={navControlStyle} />
                <ScaleControl
                  maxWidth={100}
                  unit="metric"
                  style={scaleControlStyle}
                />
                {/* <Popup
                  latitude={currentLocation.latitude}
                  longitude={currentLocation.longitude}
                  closeButton={true}
                  closeOnClick={true}
                  onClose={() => { }}
                  anchor="top" >
                  <div>You are here</div>
                </Popup> */}
                <Marker
                  latitude={currentLocation.latitude}
                  longitude={currentLocation.longitude}
                  offsetLeft={-20}
                  offsetTop={-10}
                >
                  <Col>
                    <div>
                      <img
                        id="marker"
                        alt="example"
                        src={require("../../../assets/images/marker-1.png")}
                      />
                    </div>
                  </Col>
                </Marker>
                {listPois
                  ? listPois.map((item) => (
                    <POIMarker item={item} currentLocation={currentLocation} />
                  ))
                  : null}

                {listEventNearby ? listEventNearby.map((item) => (
                  <EventMarker item={item} currentLocation={currentLocation} />
                ))
                  : null}

              </ReactMapGL>
            </div>
            <Row span={24}>
              <Col span={24}>
                <div style={{ marginBottom: 10, textAlign: "center" }}>
                  <Button
                    className="success-button"
                    onClick={() => {
                      reloadMap();
                    }}
                  >
                    Reload Map
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>

          <Col xl={6}>
            <div className="poi-address-text">
              <Row>
                <Col span={2} style={{ textAlign: "center" }}>
                  <img
                    width="50%"
                    id="marker-poi-address-text"
                    alt="example"
                    src={require("../../../assets/images/marker-1.png")}
                  />
                </Col>
                <Col></Col>
              </Row>
            </div>
            <div style={{ padding: 20 }}>
              <h2>Near you</h2>
              <Row>
                <Col span={8}></Col>
                <Col span={8}>
                  {isPoiNearByLoading ? <Spin className="center" /> : null}
                  {isEventNearbyLoading ? <Spin className="center" /> : null}
                </Col>
                <Col span={8}></Col>
              </Row>
              <VirtualList
                data={listPois}
                height={ContainerHeight}
                itemHeight={47}
                itemKey="email"
                onScroll={onScroll}
              >
                {(item) => (
                  <List.Item key={item.email}>
                    <div className="poi-card-box">
                      <Row>
                        <Col xl={12}>
                          <img
                            height={100}
                            alt="example"
                            src={item.thumbnail.link}
                          />
                        </Col>
                        <Col xl={12}>
                          <div style={{ marginLeft: 10 }}>
                            <Meta
                              title={item.name}
                              description=""
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </List.Item>
                )}
              </VirtualList>
              <VirtualList
                data={listEventNearby}
                height={ContainerHeight}
                itemHeight={47}
                itemKey="eventNearby"
                onScroll={onScroll}
              >
                {(item) => (
                  <List.Item key={item.email}>
                    <div className="poi-card-box">
                      <Row>
                        <Col xl={12}>
                          <img
                            height={100}
                            alt="example"
                            src={item.thumbnail.link}
                          />
                        </Col>
                        <Col xl={12}>
                          <div style={{ marginLeft: 10 }}>
                            <Meta
                              title={item.name}
                              description=""
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </List.Item>
                )}
              </VirtualList>
            </div>
          </Col>
        </Row>
        <Row gutter={[16, 24]} style={{ margin: 10 }}>
          {
            listPoiCategories ? listPoiCategories.map((e) => {
              return (
                <>
                  <Col span={3}>
                    <div className="poi-category-card-box">
                      <Row>
                        <Col span={2}>
                          <img
                            width="200%"
                            alt="example"
                            src={e.logo}
                          />
                        </Col>
                        <Col span={22}>
                          <div style={{ textAlign: "center" }}>
                            <h2>{e.name}</h2>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </>
              )
            }) : null
          }

          {/* <Col span={3}>
            <div className="poi-category-card-box">
              <Row>
                <Col span={2}>
                  <img
                    width="200%"
                    alt="example"
                    src={require("../../../assets/images/coffee-1.png")}
                  />
                </Col>
                <Col span={22}>
                  <div style={{ textAlign: "center" }}>
                    <h2>Coffee</h2>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={3}>
            <div className="poi-category-card-box">
              <Row>
                <Col span={2}>
                  <img
                    width="200%"
                    alt="example"
                    src={require("../../../assets/images/shopping-1.png")}
                  />
                </Col>
                <Col span={22}>
                  <div style={{ textAlign: "center" }}>
                    <h2>Shopping</h2>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={3}>
            <div className="poi-category-card-box">
              <Row>
                <Col span={2}>
                  <img
                    width="200%"
                    alt="example"
                    src={require("../../../assets/images/fuel-1.png")}
                  />
                </Col>
                <Col span={22}>
                  <div style={{ textAlign: "center" }}>
                    <h2>Fuel</h2>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={3}>
            <div className="poi-category-card-box">
              <Row>
                <Col span={2}>
                  <img
                    width="200%"
                    alt="example"
                    src={require("../../../assets/images/hospital.png")}
                  />
                </Col>
                <Col span={22}>
                  <div style={{ textAlign: "center" }}>
                    <h2>Hospital</h2>
                  </div>
                </Col>
              </Row>
            </div>
          </Col> */}
        </Row>
      </Col>
    </>
  );
};
export default MapPage;

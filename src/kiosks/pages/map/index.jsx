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
import POIMarker from "./markers/poi_marker";
import { getEventNearbyService } from "../../services/event_service";
import { KIOSK_ID, PARTY_ID } from "../../../@app/constants/key";
import EventMarker from "./markers/event_marker";
import { getKioskNearbyService } from "../../services/kiosk_service";
import KioskMarker from "./markers/kiosk_marker";
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
  const [listPoiCategories, setListPoiCategories] = useState(false);
  const [listKioskNearby, setListKioskNearby] = useState([]);
  const [isKioskNearbyLoading, setKioskNearbyLoading] = useState(false);
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
  const initialDataNearby = async () => {
    getListPoiCategories();
    navigator.geolocation.getCurrentPosition(async (position) => {
      let long = position.coords.longitude;
      let lat = position.coords.latitude;
      setCurrentLocation({
        ...currentLocation,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
      getListPoiNearby(long, lat);
      getListEventNearby(long, lat);
      getKioskNearby(long, lat);
    });
  }
  const getKioskNearby = async (long, lat) => {
    try {
      setKioskNearbyLoading(true);

      const res = await getKioskNearbyService(long, lat);
      setListKioskNearby(res.data.data);

    } catch (e) {
      toast.error(e.respone);
    } finally {
      setKioskNearbyLoading(false);
    }
  }
  const getListPoiNearby = async (long, lat) => {
    try {
      setPoiNearByLoading(true);

      const pois = await getPOINearbyService(localStorage.getItem(KIOSK_ID), long, lat);
      setListPois(pois.data.data);

    } catch (e) {
      toast.error(e.respone);
    } finally {
      setPoiNearByLoading(false);
    }
  };
  const getListEventNearby = async (long, lat) => {
    try {
      setEventNearbyLoading(true);

      const events = await getEventNearbyService(long, lat, localStorage.getItem(PARTY_ID));
      setListEventNearby(events.data.data);

    } catch (e) {
      console.error(e);
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
    initialDataNearby();
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
                        src={require("../../../assets/images/person_marker.png")}
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
                {listKioskNearby ? listKioskNearby.map((item) => (
                  <KioskMarker item={item} currentLocation={currentLocation} />
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



                </Col>
                <Col span={8}></Col>
              </Row>
              {
                isPoiNearByLoading ?
                  <Spin className="center" /> :
                  listPois.length !== 0 ?
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
                    </VirtualList> : <p>Empty data</p>
              }
              {
                isEventNearbyLoading ?
                  <Spin className="center" /> :
                  listEventNearby.length !== 0 ?
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
                    </VirtualList> : <p>Empty data</p>
              }
              {
                isKioskNearbyLoading ?
                  <Spin className="center" /> :
                  listKioskNearby.length !== 0 ?
                    <VirtualList
                      data={listKioskNearby}
                      height={ContainerHeight}
                      itemHeight={47}
                      itemKey="eventNearby"
                      onScroll={onScroll}
                    >
                      {(item) => (
                        <List.Item key={item.email}>
                          <div className="poi-card-box">
                            <Row>

                              <div style={{ marginLeft: 10 }}>
                                <Meta
                                  title={item.name}
                                  description=""
                                />
                              </div>

                            </Row>
                          </div>
                        </List.Item>
                      )}
                    </VirtualList> : <p>Empty data</p>}
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
        </Row>
      </Col >
    </>
  );
};
export default MapPage;

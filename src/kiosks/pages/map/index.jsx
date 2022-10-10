import { useState, useEffect } from "react";
import ReactMapGL, {
  NavigationControl,
  ScaleControl,
} from "@goongmaps/goong-map-react";
import { Col, Drawer, Empty, Row, Skeleton, Space, Spin } from "antd";
import "./styles.css";
import { getAllPOICategoriesService, getPOINearbyByCategoryIdService, getPOINearbyService } from "../../services/poi_service";
import { toast } from "react-toastify";
import { getEventNearbyService } from "../../services/event_service";
import { GOONG_ACCESS_MAP_KEY, USER_ID } from "../../../@app/constants/key";
import { getKioskNearbyService } from "../../services/kiosk_service";
import { AimOutlined } from "@ant-design/icons";
import { ListLocationInformation } from "./components/location-infomation/list-location-infomation";
import { SpecificEventLocation } from "./components/location-infomation/specfic-event-location";
import { SpecificPOILocation } from "./components/location-infomation/specific-poi-location";
import LocationMarker from "./components/markers/location_marker";
import MyAddress from "./components/my-address-info";
import POICategoryComponent from "./components/poi_category";
import { SubLocationInfomation } from "./components/location-infomation/sub-location-infomation";
import { LoadingMapComponent } from "./components/loading/loading_map_card";
import { ImageEmptyCard } from "../../../@app/components/card/img_empty_card";
import { ImageStartSearchingCard } from "../../../@app/components/card/img_start_searching_card";
const scaleControlStyle = {
  left: '25%',
  bottom: 8,
};
const navControlStyle = {
  top: 10,
  left: 120
};

const MapPage = () => {
  const [isDataLoading, setDataLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState();
  const [listKioskNearby, setListKioskNearby] = useState([])
  const [listEventNearby, setListEventNearby] = useState([]);
  const [listPoiCategories, setListPoiCategories] = useState(false);
  const [listPois, setListPois] = useState([]);
  const [isMarkerLoading, setMarkerLoading] = useState(false);
  const [isPOICategoryLoading, setPOICategoryLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: '92vh',
    latitude: currentLocation?.latitude,
    longitude: currentLocation?.longitude,
    zoom: 14,
  });
  const [locations, setLocations] = useState([])
  const [isFirstLoading, setIsFirstLoading] = useState(true)
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
      setPOICategoryLoading(true);
      const res = await getAllPOICategoriesService();
      setListPoiCategories(res.data.data)
    } catch (e) {
      console.error(e)
    } finally {
      setPOICategoryLoading(false);
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
      try {
        setMarkerLoading(true);
        getListPoiNearby(long, lat);
        getListEventNearby(long, lat);
        getKioskNearby(long, lat);
      } catch (e) {
        console.error(e);
      } finally {
        setMarkerLoading(false);
      }
    });
  }
  const getKioskNearby = async (long, lat) => {
    try {
      const res = await getKioskNearbyService(long, lat);
      setListKioskNearby(res.data.data);

    } catch (e) {
      toast.error(e.respone);
    }
  }
  const getListPoiNearby = async (long, lat) => {
    try {
      const pois = await getPOINearbyService(long, lat);
      setListPois(pois.data.data);

    } catch (e) {
      toast.error(e.respone);
    }
  };
  const getListEventNearby = async (long, lat) => {
    try {
      const events = await getEventNearbyService(long, lat, localStorage.getItem(USER_ID));
      setListEventNearby(events.data.data);

    } catch (e) {
      console.error(e);
    }
  };

  const reloadMap = () => {
    setCurrentLocation(null);
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
        zoom: 14,

      });
    });
  };
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setLocationViewPort();
    initialDataNearby();
  }, []);
  const getPOIsByCategoryId = async (id) => {
    try {
      let res = await getPOINearbyByCategoryIdService(currentLocation.longitude, currentLocation.latitude, id);
      setLocations(res.data.data);
    } catch (e) {
      console.error(e);
      setLocations([])
      setIsFirstLoading(false)
    }
  }
  const filterData = async (name) => {
    console.log(name)
    setDataLoading(true);
    switch (name) {
      case 'Kiosk':
        setLocations(listKioskNearby);
        break;
      case 'Event':
        setLocations(listEventNearby);
        break;
      case 'Hotel':
        setLocations(listPois);
        break;
      default:
        // get by category id
        let categoryId = name;
        await getPOIsByCategoryId(categoryId);
        break;
    }
    setDataLoading(false);
    setIsFirstLoading(false)
  }
  const setCurrentItemDisplaying = (e) => {
    setCurrentItem(e);
    setModalVisible(true);
  }

  return (
    <>
      {
        currentLocation ?
          <div>
            {locations ? <Drawer
              width={720}
              onClose={() => { setLocations(null); setIsFirstLoading(false) }}
              visible={locations ? true : false}
              placement={"left"}
              getContainer={false}
              closable={false}
              bodyStyle={{ paddingBottom: 50 }}
            >
              <div className="search-and-view-area">
                <div>
                  {currentLocation ?
                    <Row>
                      <Col span={20}>
                        <MyAddress currentLocation={currentLocation} />
                      </Col>
                      <Col span={1} offset={2}>
                        <button
                          onClick={() => { setLocations(null) }}
                          style={{
                            padding: 10,
                            backgroundColor: "#EEEEEE",
                            borderRadius: 20,
                            fontWeight: "bold",
                            fontSize: 20,
                            color: "black",
                            textAlign: "center",
                            border: '1px solid white',
                            width: 50
                          }}
                        >  X
                        </button>
                      </Col>
                    </Row>
                    : null}
                </div>
                {isFirstLoading ?
                  <>
                    <ImageStartSearchingCard marginTop={50} />
                  </> :
                  isDataLoading ?
                    <Skeleton /> :
                    locations && locations.data ?
                      <div class="location-information">
                        {locations.data.length === 1 ? <>
                          {/* Specific location */}
                          {locations.type === 'poi' ?
                            <SpecificPOILocation poi={locations.data[0]} currentLocation={currentLocation} /> :
                            <SpecificEventLocation event={locations.data[0]} currentLocation={currentLocation} />
                          }
                        </> : null}
                      </div>
                      : locations.length !== 0 ?
                        <ListLocationInformation locations={locations} setCurrentItem={setCurrentItemDisplaying} /> :
                        <>
                          <ImageEmptyCard marginTop={50} />
                        </>
                }
              </div>
            </Drawer> : null
            }

            <Row span={24} className="map-parent">
              {isMarkerLoading ? <Skeleton /> :
                <Col span={24}>
                  <div>
                    <ReactMapGL
                      {...viewport}
                      onViewportChange={setViewport}
                      goongApiAccessToken={GOONG_ACCESS_MAP_KEY}
                    >
                      <Row>
                        {/* Search bar */}
                        <Col span={17} offset={5}>
                          {isPOICategoryLoading ? <Spin className="center" /> :
                            <POICategoryComponent listPoiCategories={listPoiCategories} eventOnClick={filterData} />
                          }
                        </Col>
                        {/* Map navigate bar */}
                        <Col span={1}>
                          <Space align="baseline" direction="vertical">
                            <NavigationControl style={navControlStyle} />
                            {/* Reload Map */}
                            <div className="reload-map">
                              <button class="reload-map-tooltip" type="button" onClick={() => { reloadMap() }} >
                                <AimOutlined />
                                <span class="reload-map-tooltiptext">My location</span>
                              </button>
                            </div>
                          </Space>
                        </Col>
                      </Row>
                      {/* Measure distance */}
                      <ScaleControl
                        maxWidth={70}
                        unit="metric"
                        style={scaleControlStyle}
                      />

                      {/* Markers declare */}
                      <LocationMarker
                        currentLocation={currentLocation}
                        events={listEventNearby}
                        kioks={listKioskNearby}
                        locations={listPois}
                        setItem={setLocations}
                      />

                      {/* Display my address */}

                    </ReactMapGL  >
                  </div>
                </Col>

              }
              <SubLocationInfomation
                currentItem={currentItem}
                currentLocation={currentLocation}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
              />
            </Row >
          </div> :
          <LoadingMapComponent />
      }
    </>
  );
};
export default MapPage;

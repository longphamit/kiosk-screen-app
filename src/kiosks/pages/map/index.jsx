import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup, ScaleControl } from '@goongmaps/goong-map-react';
import { Avatar, Button, Card, Col, List, message, Row } from 'antd';
import "./styles.css"
import VirtualList from 'rc-virtual-list';
import { useGeolocated } from "react-geolocated";
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;
const ContainerHeight = 400;
const scaleControlStyle = {
  left: 20,
  bottom: 100
};
const MapPage = () => {
  const navigate = useNavigate()
  const [currentLocation, setCurrentLocation] = useState({
    longitude: 105.7982323,
    latitude: 21.0136133
  });
  const [viewport, setViewport] = useState({
    width: '100%',
    height: 600,
    latitude: currentLocation.latitude,
    longitude: currentLocation.longitude,
    zoom: 13
  });

  const test = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });


  const appendData = () => {
    fetch('https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo')
      .then(res => res.json())
      .then(body => {
        setData(data.concat(body.results));
        console.log(body)
        message.success(`${body.results.length} more items loaded!`);
      });
  };
  const [data, setData] = useState([]);
  const onScroll = (e) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
      appendData();

    }
  };
  const setLocationViewPort = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude)
      console.log(position.coords.longitude)
      setCurrentLocation({ ...currentLocation, latitude: position.coords.latitude, longitude: position.coords.longitude })
      setViewport({ ...viewport, latitude: position.coords.latitude, longitude: position.coords.longitude })
    });
  }

  useEffect(() => {
    appendData();
    setLocationViewPort()
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
                <ScaleControl maxWidth={100} unit="metric" style={scaleControlStyle} />
                <Marker latitude={currentLocation.latitude} longitude={currentLocation.longitude} offsetLeft={-20} offsetTop={-10}>
                  <Col>
                    <div><img
                      id="marker"
                      alt="example"
                      src={require('../../../assets/images/pin-1.png')}
                    /></div>
                  </Col>

                </Marker>
              </ReactMapGL >
            </div>
          </Col>
          <Col xl={6}>
            <div className='poi-address-text'>
              <Row>
                <Col span={2} style={{ textAlign: "center" }}>
                  <img
                    width="50%"
                    id="marker-poi-address-text"
                    alt="example"
                    src={require('../../../assets/images/marker-1.png')}
                  />
                </Col>
                <Col>

                </Col>
              </Row>

            </div>
            <div style={{ padding: 20 }}>
              <h2>Near you</h2>
              <VirtualList
                data={data}
                height={ContainerHeight}
                itemHeight={47}
                itemKey="email"
                onScroll={onScroll}
              >
                {(item) => (
                  <List.Item key={item.email}>
                    <div className='poi-card-box'>
                      <Row>
                        <Col xl={6}>
                          <img
                            width="100%"
                            alt="example"
                            src={require('../../../assets/images/restaurant.png')}
                          />
                        </Col>
                        <Col xl={18}>
                          <div style={{ marginLeft: 10 }}>
                            <Meta title="Europe Street beat" description="www.instagram.com" />
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
          <Col span={3}>
            <div className='poi-category-card-box'>
              <Row>
                <Col span={2}>
                  <img
                    width="200%"
                    alt="example"
                    src={require('../../../assets/images/restaurant-1.png')}
                  />
                </Col>
                <Col span={22}>
                  <div style={{ textAlign: "center" }}>
                    <h2>Restaurant</h2>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={3}>
            <div className='poi-category-card-box'>
              <Row>
                <Col span={2}>
                  <img
                    width="200%"
                    alt="example"
                    src={require('../../../assets/images/coffee-1.png')}
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
            <div className='poi-category-card-box'>
              <Row>
                <Col span={2}>
                  <img
                    width="200%"
                    alt="example"
                    src={require('../../../assets/images/shopping-1.png')}
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
            <div className='poi-category-card-box'>
              <Row>
                <Col span={2}>
                  <img
                    width="200%"
                    alt="example"
                    src={require('../../../assets/images/fuel-1.png')}
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
            <div className='poi-category-card-box'>
              <Row>
                <Col span={2}>
                  <img
                    width="200%"
                    alt="example"
                    src={require('../../../assets/images/hospital.png')}
                  />
                </Col>
                <Col span={22}>
                  <div style={{ textAlign: "center" }}>
                    <h2>Hospital</h2>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

      </Col>
    </>

  );
}
export default MapPage
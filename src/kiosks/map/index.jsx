import * as React from 'react';
import { useState } from 'react';
import MapGL from '@goongmaps/goong-map-react';
import { Button, Col, Row } from 'antd';
import "./styles.css"
const MapPage = () => {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: 600,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  return (
    <>
      <Col xl={24} xs={24}>
        <Row>
          <Button>Home</Button>
        </Row>
        <Row>
          <Col xl={18} xs={24}>
            <div style={{padding:20}}>
            <MapGL
              {...viewport}
              className="map"
              
              onViewportChange={setViewport}
              goongApiAccessToken={"GlVNPt2Vav2Z75sQm6lJ7XymStHLVD8UcWwhbWMn"}
            />
            </div>
          </Col>
          <Col xl={6}>
            <div style={{padding:20}}>
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </div>
            <div style={{padding:20}}>
              <h2>Gần đây</h2>
            </div>
          </Col>
        </Row>
      </Col>
    </>

  );
}
export default MapPage
import * as React from 'react';
import { useState } from 'react';
import MapGL from '@goongmaps/goong-map-react';
import { Button, Col, Row } from 'antd';
import "./styles.css"
const MapPage = () => {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
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
          <Col xl={24} xs={24}>
            <div style={{margin:30}}>
            <MapGL
              {...viewport}
              className="map"
              //width
              //heigh
              onViewportChange={setViewport}
              goongApiAccessToken={"GlVNPt2Vav2Z75sQm6lJ7XymStHLVD8UcWwhbWMn"}
            />
            </div>
          </Col>
        </Row>
      </Col>
    </>

  );
}
export default MapPage
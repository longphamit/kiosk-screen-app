import * as React from 'react';
import { useState } from 'react';
import MapGL from '@goongmaps/goong-map-react';

export function Map() {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  return (
    <MapGL
      {...viewport}
      width="100vw"
      height="100vh"
  
      onViewportChange={setViewport}
      goongApiAccessToken={"GlVNPt2Vav2Z75sQm6lJ7XymStHLVD8UcWwhbWMn"}
    />
  );
}
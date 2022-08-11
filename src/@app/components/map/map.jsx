import { AimOutlined } from "@ant-design/icons";
import ReactMapGL, {
    NavigationControl,
    ScaleControl,
    Layer
} from "@goongmaps/goong-map-react";
import { Col, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { HereMarker } from "../../../kiosks/pages/map/components/markers/here_marker";
import { CURRENT_LOCATION_LATITUDE, CURRENT_LOCATION_LONGITUDE } from "../../constants/key";

const scaleControlStyle = {
    left: '25%',
    bottom: 8,
};
const navControlStyle = {
    top: 10,
    left: 120
};
const parkLayer = {
    id: 'landuse_park',
    type: 'fill',
    source: 'base',
    'source-layer': 'landuse',
    filter: ['==', 'class', 'park']
  };
  


export const CustomMap = ({ marker }) => {
    const [parkColor, setParkColor] = useState('#8fa');
    const [currentLocation, setCurrentLocation] = useState({
        longitude: 105.7982323,
        latitude: 21.0136133,
    });
    const [viewport, setViewport] = useState({
        width: "100%",
        height: '100%',
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        zoom: 13,
    });
    const setLocationViewPort = () => {
        console.log("set view port")
        navigator.geolocation.getCurrentPosition((position) => {
            setCurrentLocation({
                ...currentLocation,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });

            localStorage.setItem(CURRENT_LOCATION_LATITUDE, position.coords.latitude)
            localStorage.setItem(CURRENT_LOCATION_LONGITUDE, position.coords.longitude)
            setViewport({
                ...viewport,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        });
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
        setLocationViewPort();
    }, [])
    return <ReactMapGL
        {...viewport}
        className="map"
        onViewportChange={setViewport}
        goongApiAccessToken={"GlVNPt2Vav2Z75sQm6lJ7XymStHLVD8UcWwhbWMn"}
    >
        <Layer {...parkLayer} paint={{'fill-color': parkColor}} />
        {
            currentLocation ?
                <HereMarker currentLocation={currentLocation} /> : null
        }
        {marker}
        <Row>
            {/* Map navigate bar */}
            <Col offset={19} >
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
        
    </ReactMapGL>
}
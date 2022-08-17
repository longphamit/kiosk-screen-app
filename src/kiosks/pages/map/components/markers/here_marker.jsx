import { Marker } from "@goongmaps/goong-map-react"
import { Col } from "antd"

export const HereMarker = ({ currentLocation }) => {

    return <>
        <Marker
            latitude={currentLocation.latitude}
            longitude={currentLocation.longitude}
            offsetLeft={-40}
            offsetTop={-80}
        >
            <Col>
                <div>
                    <img
                        id="marker"
                        alt="example"
                        style={{width:100}}
                        src={require("../../../../../assets/images/marker-3.png")}
                    />
                    
                </div>
            </Col>
        </Marker>
    </>
}
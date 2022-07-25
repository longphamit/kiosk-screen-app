import { Marker } from "@goongmaps/goong-map-react"
import { Col } from "antd"

export const HereMarker = ({ currentLocation }) => {

    return <>
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
                        src={require("../../../../../assets/images/person_marker.png")}
                    />
                </div>
            </Col>
        </Marker>
    </>
}
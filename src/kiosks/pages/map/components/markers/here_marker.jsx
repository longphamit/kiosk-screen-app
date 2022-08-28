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
                        style={{ width: 50 }}
                        src={require("../../../../../assets/images/marker-3.png")}
                    />
                    <p style={{
                        fontWeight: "bold",
                        fontSize: 15,
                        marginLeft: 10
                    }}>
                        We're Here
                    </p>
                </div>
            </Col>
        </Marker>
    </>
}
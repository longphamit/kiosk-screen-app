import { Marker } from "@goongmaps/goong-map-react"
import { Col } from "antd"

export const CustomMarker = ({ item, imgSrc, type }) => {
    return (
        <Marker
            color="black"
            latitude={parseFloat(item.latitude)}
            longitude={parseFloat(item.longtitude)}
            offsetLeft={-40}
            offsetTop={-80}
        >
            <Col>
                <div>
                    <img
                        id="marker"
                        alt="example"
                        src={imgSrc}
                        style={{ width: type === 'event' ? 45 : 60 }}
                    />
                    <p style={{
                        fontWeight: "bold",
                        fontSize: 15
                    }}>
                        {item.name}
                    </p>
                </div>
            </Col>
        </Marker>
    )
}

export const CustomKioskMarker = ({ item, imgSrc }) => {
    return (
        <Marker
            color="black"
            latitude={parseFloat(item.latitude)}
            longitude={parseFloat(item.longtitude)}
            offsetLeft={-40}
            offsetTop={-80}
        >
            <Col>
                <div>
                    <img
                        id="marker"
                        alt="example"
                        src={imgSrc}
                        style={{ width: 50 }}
                    />
                    <label style={{ fontSize: 18, fontWeight: 'bold ' }}>Kiosk</label>
                </div>
            </Col>
        </Marker>
    )
}
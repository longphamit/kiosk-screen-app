import { Marker } from "@goongmaps/goong-map-react"
import { Col } from "antd"

export const CustomMarker = ({ item, imgSrc }) => {
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
                        style={{width:100}}
                    />
                    <p style={{
                        fontWeight:"bold",
                        fontSize:15
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
            offsetLeft={-20}
            offsetTop={-10}
        >
            <Col>
                <div>
                    <img
                        id="marker"
                        alt="example"
                        src={imgSrc}
                    />
                    <p>
                        Kiosk
                    </p>
                </div>
            </Col>
        </Marker>
    )
}
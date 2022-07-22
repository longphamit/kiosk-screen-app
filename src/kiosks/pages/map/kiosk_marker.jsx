import { Marker } from "@goongmaps/goong-map-react";
import { Badge, Col, Descriptions, Image, Modal, Row, Tag, TimePicker } from "antd";
import { useEffect, useState } from "react";
const KioskMarker = ({ item, currentLocation }) => {
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

    const onCancelDetailModal = () => {
        setIsDetailModalVisible(false)

    }
    useEffect(() => {
        console.log(item)
    }, []);
    return <div>
        <div onClick={() => { setIsDetailModalVisible(true) }}>
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
                            src={require("../../../assets/images/kiosk_marker.png")}
                        />
                        <p style={{ fontWeight: "bold" }}>
                            {item.name}
                        </p>
                    </div>
                </Col>
            </Marker>

        </div>
        <Modal key={item.id} width={1000} onCancel={onCancelDetailModal} visible={isDetailModalVisible} footer={[]} >

            <Descriptions title="Kiosk info" column={2} bordered>
                {/* <Descriptions.Item label="Address">{item.address}</Descriptions.Item>
                <Descriptions.Item label="Ward">{item.ward}</Descriptions.Item>
                <Descriptions.Item label="District">{item.district}</Descriptions.Item>
                <Descriptions.Item label="City">{item.city}</Descriptions.Item> */}
            </Descriptions>
        </Modal>
    </div>
}
export default KioskMarker;
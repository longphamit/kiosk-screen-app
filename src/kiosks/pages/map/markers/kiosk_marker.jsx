import { Marker } from "@goongmaps/goong-map-react";
import { Col, Descriptions, Modal, Spin, } from "antd";
import { useState } from "react";
import QRCode from "react-qr-code";
import { getDirectUrl } from "../../../../@app/utils/direct_url_util";
import { getAddressService } from "../../../services/map_service";
const KioskMarker = ({ item, currentLocation }) => {
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [address, setAddress] = useState();
    const onCancelDetailModal = () => {
        setIsDetailModalVisible(false)
    }
    const onOpenModal = async () => {
        setIsDetailModalVisible(true)
        if (!address) {
            try {
                setLoading(true)
                let res = await getAddressService(item.longtitude, item.latitude);
                console.log(res)
                setAddress(res.data.geoMetries[0].address);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false)
            }
        }
    }
    return <div>
        <div onClick={() => { onOpenModal() }}>
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
                            src={require("../../../../assets/images/kiosk_marker.png")}
                        />
                        <p style={{ fontWeight: "bold" }}>
                            Kiosk
                        </p>
                    </div>
                </Col>
            </Marker>

        </div>
        {isLoading ?
            <Spin /> :
            <Modal key={item.id} width={1000} onCancel={onCancelDetailModal} visible={isDetailModalVisible} footer={[]} >

                <Descriptions title="Kiosk info" column={2} bordered>

                    {address ?
                        <Descriptions.Item label="Address" > {address}</Descriptions.Item> : null
                    }
                </Descriptions>
                <Descriptions.Item label="Direction" span={2}>
                    <div className="center"  >
                        <QRCode className="qrCode" size={150} value={getDirectUrl(currentLocation.latitude, currentLocation.longitude, item.latitude, item.longtitude)} />
                    </div>
                </Descriptions.Item>
            </Modal>
        }
    </div >
}
export default KioskMarker;
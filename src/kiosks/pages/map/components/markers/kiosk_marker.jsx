import { Descriptions, Modal, Spin, } from "antd";
import { useState } from "react";
import QRCode from "react-qr-code";
import { getDirectUrl } from "../../../../../@app/utils/direct_url_util";
import { getAddressService } from "../../../../services/map_service";
import { CustomKioskMarker } from "./custom_marker";
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
    return <>
        <div >
            <CustomKioskMarker imgSrc={require("../../../../../assets/images/kiosk_marker.png")} item={item} />
        </div>
        {isLoading ?
            <Spin /> :
            <Modal
                key={item.id}
                width={1000}
                onCancel={onCancelDetailModal}
                visible={isDetailModalVisible}
                footer={null}
            >
                <Descriptions title="Kiosk info" column={2} bordered>

                    {address ?
                        <Descriptions.Item label="Address" > {address}</Descriptions.Item> : null
                    }

                    <Descriptions.Item label="Direction" span={2}>
                        <div className="center"  >
                            <QRCode className="qrCode" size={150} value={getDirectUrl(currentLocation.latitude, currentLocation.longitude, item.latitude, item.longtitude)} />
                        </div>
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
        }
    </>
}
export default KioskMarker;
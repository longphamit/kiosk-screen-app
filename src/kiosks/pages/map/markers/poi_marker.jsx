import { Marker } from "@goongmaps/goong-map-react";
import { Col, Descriptions, Image, Modal } from "antd";
import { useState } from "react";
import QRCode from "react-qr-code";
import { convertTime } from "../../../../@app/utils/date_util";
import { getDirectUrl } from "../../../../@app/utils/direct_url_util";

const POIMarker = ({ item, currentLocation }) => {
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

    const onCancelDetailModal = () => {
        setIsDetailModalVisible(false)
    }

    return <div>
        <div onClick={() => { setIsDetailModalVisible(true) }}>
            <Marker
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
                            src={require("../../../../assets/images/marker-2.png")}
                        />
                        <p style={{ fontWeight: "bold" }}>
                            {item.name}
                        </p>
                    </div>
                </Col>
            </Marker>

        </div>
        <Modal key={item.id} width={1000} onCancel={onCancelDetailModal} visible={isDetailModalVisible} footer={[]} >

            <Descriptions title="POI info" column={2} bordered>
                <Descriptions.Item label="Thumbnail"><Image style={{ margin: 20 }} width={100} src={item.thumbnail.link} /></Descriptions.Item>
                <Descriptions.Item label="Name">{item.name}</Descriptions.Item>
                <Descriptions.Item label="Open day">{
                    <div style={{ width: 200 }}>
                        {item.dayOfWeek.replaceAll("-", ", ")}
                    </div>
                }</Descriptions.Item>
                <Descriptions.Item label="Category">{item.poicategoryName}</Descriptions.Item>
                <Descriptions.Item label="Address">{item.address}</Descriptions.Item>
                <Descriptions.Item label="Ward">{item.ward}</Descriptions.Item>
                <Descriptions.Item label="District">{item.district}</Descriptions.Item>
                <Descriptions.Item label="City">{item.city}</Descriptions.Item>
                <Descriptions.Item label="Open time">{
                    <div className="openTimeLabel" >
                        {convertTime(item.openTime.hours,
                            item.openTime.minutes,
                            item.openTime.seconds).format("HH : mm")}</div>}
                </Descriptions.Item>
                <Descriptions.Item label="Close time" span={2}>{
                    <div className="closeTimeLabel">
                        {convertTime(item.closeTime.hours,
                            item.closeTime.minutes,
                            item.closeTime.seconds).format("HH : mm")}
                    </div>
                }
                </Descriptions.Item>

                <Descriptions.Item label="Image" span={2}>
                    {
                        item.listImage ?
                            <Image.PreviewGroup>
                                {
                                    item.listImage.map(image => {
                                        return <Image
                                            key={image.id}
                                            width={100}
                                            src={image.link}
                                        />
                                    })
                                }
                            </Image.PreviewGroup> : null
                    }
                </Descriptions.Item>
                <Descriptions.Item label="Direction" span={2}>
                    <div className="center"  >
                        <QRCode className="qrCode" size={200} value={getDirectUrl(currentLocation.latitude, currentLocation.longitude, item.latitude, item.longtitude)} />
                    </div>
                </Descriptions.Item>
                <Descriptions.Item label="Description" span={2}>
                    {item.description}
                </Descriptions.Item>
            </Descriptions>
        </Modal>
    </div>
}
export default POIMarker;
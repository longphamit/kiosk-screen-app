import { Marker } from "@goongmaps/goong-map-react";
import { Badge, Col, Descriptions, Image, Modal, Row, Tag, TimePicker } from "antd";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { STATUS_COMING_SOON, STATUS_ON_GOING } from "../../../@app/constants/event_constants";
import { getDirectUrl } from "../../../@app/utils/direct_url_util";
import moment from "moment";
const EventMarker = ({ item, currentLocation }) => {
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
                            src={require("../../../assets/images/marker-2.png")}
                        />
                        <p style={{ fontWeight: "bold" }}>
                            {item.name}
                        </p>
                    </div>
                </Col>
            </Marker>

        </div>
        <Modal key={item.id} width={1000} onCancel={onCancelDetailModal} visible={isDetailModalVisible} footer={[]} >

            <Descriptions title="Event info" column={2} bordered>
                <Descriptions.Item label="Thumbnail"><Image style={{ margin: 20 }} width={100} src={item.thumbnail.link} /></Descriptions.Item>
                <Descriptions.Item label="Name">{item.name}</Descriptions.Item>
                <Descriptions.Item label="Status">{item.status === STATUS_COMING_SOON ?
                    (<Tag color={"yellow"}>Up coming</Tag>)
                    : item.status === STATUS_ON_GOING ?
                        (<Tag color={"green"}>On going</Tag>)
                        :
                        (<Tag color={"grey"}>End</Tag>)}
                </Descriptions.Item>
                <Descriptions.Item label="Address">{item.address}</Descriptions.Item>
                <Descriptions.Item label="Ward">{item.ward}</Descriptions.Item>
                <Descriptions.Item label="District">{item.district}</Descriptions.Item>
                <Descriptions.Item label="City">{item.city}</Descriptions.Item>
                <Descriptions.Item label="Date Start">{moment(item.dateStart).format('DD/MM/YYYY HH:mm')}</Descriptions.Item>
                <Descriptions.Item label="Date End">{moment(item.dateEnd).format('DD/MM/YYYY HH:mm')}</Descriptions.Item>
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
                    {item.description === null || item.description.length === 0 ? <div style={{ fontStyle: 'italic' }}>No decription...</div> : item.description.length}
                </Descriptions.Item>
            </Descriptions>
        </Modal>
    </div>
}
export default EventMarker;
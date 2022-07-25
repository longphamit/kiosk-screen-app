import { Col, Image, Row, Tag } from 'antd'
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { getDirectUrl } from '../../../../../@app/utils/direct_url_util';
import "./../../styles.css";
import moment from "moment";
import { STATUS_COMING_SOON, STATUS_ON_GOING } from '../../../../../@app/constants/event_constants';
export const SpecificEventLocation = ({ event, currentLocation }) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        console.log(event)
    }, []);
    return <>
        <div className="specific-location">
            {/* thumbnail & images */}
            <Row id="preview-image">
                <Image
                    preview={{
                        visible: false,
                    }}
                    width={'100%'}
                    height={200}
                    src={event.thumbnail?.link}
                    onClick={() => setVisible(true)}
                />
                <div
                    style={{
                        display: 'none',
                    }}
                >
                    <Image.PreviewGroup
                        preview={{
                            visible,
                            onVisibleChange: (vis) => setVisible(vis),
                        }}
                    >

                        <Image src={event.thumbnail?.link} />
                        {event.listImage ?
                            <>
                                {event.listImage.map((e) => {
                                    return <Image src={e.link} />
                                })}
                            </> : null
                        }
                    </Image.PreviewGroup>
                </div>
            </Row>
            <Row>
                <Col>
                    <Row className="element-title">
                        <div>{event.name}</div>
                    </Row>
                    <Row className="element-other-info event-status" >
                        {event.status === STATUS_COMING_SOON ? (
                            <Tag color={"yellow"} >
                                <div style={{ marginTop: 5 }}>
                                    Up coming
                                </div>
                            </Tag>
                        ) : event.status === STATUS_ON_GOING ?
                            (
                                <Tag color={"green"}>On going</Tag>
                            ) :
                            (
                                <Tag color={"grey"}>End</Tag>
                            )
                        }
                    </Row>
                </Col>
                <Col>
                    <Row className="element-direction" justify="center">
                        <Row style={{ width: '100%', marginTop: 10 }}>
                            <QRCode className="qrCode" size={70} value={getDirectUrl(currentLocation.latitude, currentLocation.longitude, event.latitude, event.longtitude)} />
                        </Row>
                        <Row>
                            <p>Direction</p>
                        </Row>
                    </Row>
                </Col>
            </Row>



            <Row className="element-other-info" >
                <Col span={4}>
                    <img src={require('../../../../../assets/images/pin-blue.png')} />
                </Col>
                <Col span={20}>
                    {event.address + ' - ' + event.ward + ' ' + event.city}
                </Col>
            </Row>
            <Row className="element-other-info" >
                <Col span={4}>
                    <img src={require('../../../../../assets/images/clock-blue.png')} />
                </Col>
                <Col span={20}>
                    <Row>
                        <Col span={4}> From:</Col>
                        <Col span={20}> {moment(event.timeStart).format('HH:mm DD/MM/YYYY ')}</Col>
                    </Row>
                    <Row>
                        <Col span={4}>  To:</Col>
                        <Col span={20}> {moment(event.timeEnd).format('HH:mm DD/MM/YYYY ')}</Col>
                    </Row>
                </Col>
            </Row>
            <Row className="element-description" >
                <p>{event.description}</p>
            </Row>
        </div>
    </>
}
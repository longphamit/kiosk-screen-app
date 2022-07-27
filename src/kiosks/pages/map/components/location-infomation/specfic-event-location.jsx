import { Col, Row, Tag } from 'antd'
import QRCode from 'react-qr-code';
import { getDirectUrl } from '../../../../../@app/utils/direct_url_util';
import "./../../styles.css";
import moment from "moment";
import { Galleria } from 'primereact/galleria';
import { STATUS_COMING_SOON, STATUS_ON_GOING } from '../../../../../@app/constants/event_constants';
import { itemTemplate, prepareGallery, responsiveOptions, thumbnailTemplate } from './utils';
export const SpecificEventLocation = ({ event, currentLocation }) => {
    return <>
        <div className="specific-location">
            {/* thumbnail & images */}
            <Row id="preview-image">
                <Galleria value={prepareGallery(event)} responsiveOptions={responsiveOptions} numVisible={5} circular style={{ width: '100%' }}
                    showItemNavigators showItemNavigatorsOnHover item={itemTemplate} thumbnail={thumbnailTemplate} />
            </Row>
            <Row>
                <Col span={16}>
                    <Row className="element-title">
                        <div>{event.name}</div>
                    </Row>
                    <Row className="element-other-info event-status" >
                        {event.status === STATUS_COMING_SOON ? (
                            <Tag color={"yellow"} >
                                <div style={{ padding: 5, fontWeight: 'bold' }}>
                                    Up coming
                                </div>
                            </Tag>
                        ) : event.status === STATUS_ON_GOING ?
                            (
                                <Tag color={"green"}>
                                    <div style={{ padding: 5, fontWeight: 'bold' }}>
                                        On going
                                    </div>
                                </Tag>
                            ) :
                            (
                                <Tag color={"grey"}>
                                    <div style={{ marginTop: 5 }}>
                                        End
                                    </div>
                                </Tag>
                            )
                        }
                    </Row>
                </Col>
                <Col span={8}>
                    <div style={{ width: '100%' }}>
                        <Row className="element-direction" justify="center" style={{ float: 'right' }}>
                            <Row style={{ width: '100%', marginTop: 10 }}>
                                <QRCode className="qrCode" size={50} value={getDirectUrl(currentLocation.latitude, currentLocation.longitude, event.latitude, event.longtitude)} />
                            </Row>
                            <Row>
                                <p>Direction</p>
                            </Row>
                        </Row>
                    </div>
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
            {event.description ?
                <Row className="element-description-event" >
                    <div dangerouslySetInnerHTML={{ __html: event.description }} className="embeddedHTML" />
                </Row>
                : null}
        </div >
    </>
}
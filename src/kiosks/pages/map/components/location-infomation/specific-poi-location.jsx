import { Col, Image, Row } from 'antd'
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { convertTime } from '../../../../../@app/utils/date_util';
import { getDirectUrl } from '../../../../../@app/utils/direct_url_util';
import "./../../styles.css";

export const SpecificPOILocation = ({ poi, currentLocation }) => {
    const [visible, setVisible] = useState(false);
    const [openTime, setOpenTime] = useState();
    const [closeTime, setCloseTime] = useState();
    const [dayOfWeeks, setDayOfWeeks] = useState();
    useEffect(() => {
        setOpenTime(
            convertTime(poi.openTime.hours,
                poi.openTime.minutes,
                poi.openTime.seconds).format("HH:mm")
        )
        setCloseTime(
            convertTime(poi.closeTime.hours,
                poi.closeTime.minutes,
                poi.closeTime.seconds).format("HH:mm")
        )

        setDayOfWeeks(poi.dayOfWeek.split('-'))
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
                    src={poi.thumbnail?.link}
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
                        <Image src={poi.thumbnail?.link} />
                        {poi.listImage ?
                            <>
                                {poi.listImage.map((e) => {
                                    return <Image src={e.link} />
                                })}
                            </> : null
                        }
                    </Image.PreviewGroup>
                </div>
            </Row>
            <Row className="element-title">
                <div>{poi.name}</div>
                <div id='poi-category'>{poi.poicategoryName}</div>
            </Row>
            <Row className="element-description" >
                <p>{poi.description}</p>
            </Row>
            <Row className="element-direction" justify="center">

                <Row style={{ width: '100%', marginTop: 10 }}>
                    <QRCode className="qrCode" size={150} value={getDirectUrl(currentLocation.latitude, currentLocation.longitude, poi.latitude, poi.longtitude)} />
                </Row>
                <Row>
                    <p>Direction</p>
                </Row>

            </Row>
            <Row className="element-other-info" >
                <Col span={4}>
                    <img src={require('../../../../../assets/images/pin-blue.png')} />
                </Col>
                <Col span={20}>
                    {poi.address + ' - ' + poi.ward + ' ' + poi.city}
                </Col>
            </Row>
            <Row className="element-other-info" >
                <Col span={4}>
                    <img src={require('../../../../../assets/images/clock-blue.png')} />
                </Col>
                <Col span={20}>
                    {dayOfWeeks ? dayOfWeeks.map(day => (
                        <>
                            <Row>
                                <Col span={12}>
                                    {day}
                                </Col>
                                <Col span={12}>
                                    {openTime + ' - ' + closeTime}
                                </Col>
                            </Row>

                        </>
                    )) : null}
                </Col>
            </Row>
        </div>
    </>
}
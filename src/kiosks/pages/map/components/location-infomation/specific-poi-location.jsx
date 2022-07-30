import { Col, Row, Skeleton } from 'antd'
import { Galleria } from 'primereact/galleria';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { convertTime } from '../../../../../@app/utils/date_util';
import { getDirectUrl } from '../../../../../@app/utils/direct_url_util';
import "./../../styles.css";
import { itemTemplate, prepareGallery, responsiveOptions, thumbnailTemplate } from './utils';

export const SpecificPOILocation = ({ poi, currentLocation }) => {
    const [openTime, setOpenTime] = useState();
    const [closeTime, setCloseTime] = useState();
    const [dayOfWeeks, setDayOfWeeks] = useState();
    useEffect(() => {
        console.log(poi.description.charAt(0))
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
        {poi ?
            <div className="specific-location">
                {/* thumbnail & images */}
                <Row id="preview-image">
                    <Galleria value={prepareGallery(poi)} responsiveOptions={responsiveOptions} numVisible={5} circular style={{ width: '100%' }}
                        showItemNavigators showItemNavigatorsOnHover item={itemTemplate} thumbnail={thumbnailTemplate} />
                </Row>
                <Row id='basic-info-row'>
                    <Col span={16}>
                        <Row className="element-title">
                            <div>{poi.name}</div>
                            <div id='poi-category'>{poi.poicategoryName}</div>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <div style={{ width: '100%' }}>
                            <Row className="element-direction" justify="center" style={{ float: 'right' }}>
                                <Row style={{ width: '100%', marginTop: 10 }}>
                                    <QRCode className="qrCode" size={50} value={getDirectUrl(currentLocation.latitude, currentLocation.longitude, poi.latitude, poi.longtitude)} />
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
                {poi.description ?
                    <Row className="element-description-poi" >
                        {poi.description.charAt(0) === '<' ?

                            <div id="embbeded-description" dangerouslySetInnerHTML={{ __html: poi.description }} className="embeddedHTML" />
                            : <div><p>{poi.description}</p></div>
                        }
                    </Row>
                    : null}
            </div> : <Skeleton />
        }
    </>
}
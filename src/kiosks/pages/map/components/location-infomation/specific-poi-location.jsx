import { Col, Row, Skeleton } from 'antd'
import { Galleria } from 'primereact/galleria';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { convertTime } from '../../../../../@app/utils/date_util';
import { getDirectUrl } from '../../../../../@app/utils/direct_url_util';
import "./../../styles.css";
import { itemTemplate, prepareGallery, responsiveOptions, thumbnailTemplate } from './utils';
import Slider from "react-slick";
const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};
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
                    <Col span={24} >
                        <div >
                            {
                                <Slider
                                    {...sliderSettings}
                                    style={{ margin: 10, textAlign: "center", alignItems: "center" }}
                                    autoplay
                                    autoplaySpeed={2000}
                                >
                                    {
                                        poi?.listImage.map(e => {
                                            return (
                                                <div  >
                                                    <img className="center" style={{ width: "100%", height: 500 }} key={e.id} src={e.link} />
                                                </div>)
                                        })
                                    }
                                </Slider>
                            }
                        </div>
                    </Col>
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
                        <div id="embbeded-description" dangerouslySetInnerHTML={{ __html: poi.description }} className="embeddedHTML" />
                    </Row>
                    : null}
            </div> : <Skeleton />
        }
    </>
}
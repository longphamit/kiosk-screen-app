import { Col, Collapse, Divider, Row, Skeleton, Tag } from 'antd'
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { convertTime } from '../../../../../@app/utils/date_util';
import { getDirectUrl } from '../../../../../@app/utils/direct_url_util';
import "./../../styles.css";
import Slider from "react-slick";
import ScrollContainer from 'react-indiana-drag-scroll';
import { TagStyle } from './utils';
const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};
export const SpecificPOILocation = ({ poi, currentLocation }) => {
    const { Panel } = Collapse;
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
    const getDayOfWeeks = () => {
        if (dayOfWeeks.length === 7) {
            return 'Full week'
        }
        if (dayOfWeeks.length === 6) {

        }
    }
    return <>
        {poi ?
            <div className="specific-location">
                {/* thumbnail & images */}
                <ScrollContainer ignoreElements={".prevent-drag-scroll"} className="specific-poi-event-scroll" vertical={true} horizontal={false}>
                    <div>
                        <Row id="preview-image">
                            <Col span={24} >
                                <div className='prevent-drag-scroll'>
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
                                                            <img className="center" style={{ width: "100%", height: 400 }} key={e.id} src={e.link} />
                                                        </div>)
                                                })
                                            }
                                        </Slider>
                                    }
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className=" prevent-drag-scroll">
                        <Row id='basic-info-row'>
                            <Col span={16}>
                                <Row className="element-title">
                                    <div>{poi.name}</div>
                                    <div id='poi-category'>
                                        <Tag color={'blue'} style={TagStyle}>
                                            {poi.poicategoryName}
                                        </Tag>
                                    </div>
                                </Row>
                            </Col>
                            <Col span={8}>
                                <div style={{ width: '100%' }}>
                                    <Row className="element-direction" justify="center" style={{ float: 'right' }}>
                                        <Row style={{ width: '100%', marginTop: 10 }}>
                                            <QRCode className="qrCode" size={70} value={getDirectUrl(currentLocation.latitude, currentLocation.longitude, poi.latitude, poi.longtitude)} />
                                        </Row>
                                        <Row>
                                            <p>Direction</p>
                                        </Row>

                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className=" prevent-drag-scroll">
                        <Row className="element-other-info" >
                            <Col span={4}>
                                <img src={require('../../../../../assets/images/pin-blue.png')} />
                            </Col>
                            <Col span={20}>
                                {poi.address + ' - ' + poi.ward + ' ' + poi.city}
                            </Col>
                        </Row>
                    </div>

                    <div className=" prevent-drag-scroll">
                        <Row className="element-other-info" >
                            <Col span={4}>
                                <img src={require('../../../../../assets/images/clock-blue.png')} />
                            </Col>
                            <Col span={12} style={{ padding: 0, marginLeft: -15, marginTop: -5 }}>
                                <Collapse defaultActiveKey={[]} ghost expandIconPosition="right" style={{ marginRight: 60 }}>
                                    <Panel header={openTime + ' - ' + closeTime} key="1" style={{ fontSize: 22 }}>
                                        {dayOfWeeks ?
                                            dayOfWeeks.map((e => {
                                                return <Row style={{ marginRight: -170 }}>
                                                    <Col span={12}>{e}</Col>
                                                    <Col span={12}>{openTime + ' - ' + closeTime}</Col>
                                                </Row>
                                            }))
                                            : null}
                                    </Panel>
                                </Collapse>
                            </Col>
                        </Row>
                    </div>
                    <div className=" prevent-drag-scroll">
                        {poi.description ? <>
                            <Divider orientation="left" style={{ fontSize: 20 }}>Description</Divider>
                            <Row className="element-description-poi">
                                <div id="embbeded-description" dangerouslySetInnerHTML={{ __html: poi.description }} className="embeddedHTML" />
                            </Row></>
                            : null}
                    </div>

                </ScrollContainer>

            </div> : <Skeleton />
        }
    </>
}
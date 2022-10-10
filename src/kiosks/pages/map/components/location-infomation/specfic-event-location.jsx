import { Col, Divider, Row, Skeleton, Tag } from 'antd'
import QRCode from 'react-qr-code';
import { getDirectUrl } from '../../../../../@app/utils/direct_url_util';
import "./../../styles.css";
import moment from "moment";
import { STATUS_COMING_SOON, STATUS_ON_GOING } from '../../../../../@app/constants/event_constants';
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
export const SpecificEventLocation = ({ event, currentLocation }) => {
    return <>
        {event ?
            <div className="specific-location">
                <ScrollContainer ignoreElements={".prevent-drag-scroll"} vertical={false} horizontal={false}>
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
                                                event?.listImage.map(e => {
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
                    <div className='prevent-drag-scroll'>
                        <Row>
                            <Col span={16}>
                                <Row className="element-title">
                                    <div>{event.name}</div>
                                </Row>
                                <Row className="element-other-info event-status" >
                                    {event.status === STATUS_COMING_SOON ? (
                                        <Tag color={"yellow"} >
                                            <div style={TagStyle}>
                                                Up coming
                                            </div>
                                        </Tag>
                                    ) : event.status === STATUS_ON_GOING ?
                                        (
                                            <Tag color={"green"}>
                                                <div style={TagStyle}>
                                                    On going
                                                </div>
                                            </Tag>
                                        ) :
                                        (
                                            <Tag color={"grey"}>
                                                <div style={TagStyle}>
                                                    End
                                                </div>
                                            </Tag>
                                        )
                                    }
                                </Row>
                            </Col>
                            {currentLocation ?
                                <Col span={8}>
                                    <div style={{ width: '100%' }}>
                                        <Row className="element-direction" justify="center" style={{ float: 'right' }}>
                                            <Row style={{ width: '100%', marginTop: 10 }}>
                                                <QRCode className="qrCode" size={70} value={getDirectUrl(currentLocation.latitude, currentLocation.longitude, event.latitude, event.longtitude)} />
                                            </Row>
                                            <Row>
                                                <p>Direction</p>
                                            </Row>
                                        </Row>
                                    </div>
                                </Col>
                                : null
                            }
                        </Row>
                    </div>
                    <div className='prevent-drag-scroll'>
                        <Row className="element-other-info" >
                            <Col span={4}>
                                <img src={require('../../../../../assets/images/pin-blue.png')} />
                            </Col>
                            <Col span={20}>
                                {event.address + ' - ' + event.ward + ' ' + event.city}
                            </Col>
                        </Row>
                    </div>
                    <div className='prevent-drag-scroll'>
                        <Row className="element-other-info" >
                            <Col span={4}>
                                <img src={require('../../../../../assets/images/clock-blue.png')} />
                            </Col>
                            <Col span={20}>
                                <Row>
                                    <Col span={3} style={{ fontWeight: 'bold' }}> From:</Col>
                                    <Col span={20}>
                                        {moment(event.timeStart).format('HH:mm - DD/MM/YYYY')}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={3} style={{ fontWeight: 'bold' }}>  To:</Col>
                                    <Col span={20}>
                                        {moment(event.timeEnd).format('HH:mm - DD/MM/YYYY')}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <div className='prevent-drag-scroll'>
                        {
                            event.description ?
                                <>
                                    <Divider orientation="left" style={{ fontSize: 20 }}>
                                    </Divider>
                                    <Row className="element-description-event" >
                                        {event.description.charAt(0) === '<' ?
                                            <div dangerouslySetInnerHTML={{ __html: event.description }} className="embeddedHTML" />
                                            : <div><p>{event.description}</p></div>
                                        }
                                    </Row>
                                </>
                                : null
                        }</div>
                </ScrollContainer>
                {/* thumbnail & images */}
            </div > : <Skeleton />
        }
    </>
}
import { Col, Divider, Row, Tag } from "antd"
import { STATUS_COMING_SOON, STATUS_ON_GOING } from "../../constants/event_constants"
import "./styles.css"
import moment from "moment"
export const EventBannerCard = ({ event }) => {
    console.log(event)
    return <>
        <Row span={24}>
            <Col span={24} style={{
                backgroundColor: 'black',
                height: 600,
                backgroundImage: `url(${event.banner ? event.banner : 'https://img.timviec.com.vn/2021/07/banner-la-gi-5.jpg'})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>

            </Col>
            <Col span={24}>
                <Row span={24}>
                    <Col span={16}>
                        <div style={{ zIndex: 1, position: 'relative', width: '70%', color: "#000", marginTop: -200, marginLeft: 30, fontWeight: 'bold', fontSize: 16 }}>
                            <div className="banner-card-description">
                                <div dangerouslySetInnerHTML={{ __html: event.description }} />
                            </div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <Row justify="center" align="middle">
                            <div className="banner-card-baseinfo" style={{ marginTop: -250 }}>
                                <Row justify="center" align="middle" style={{ fontWeight: 'bold', fontSize: 22 }}>
                                    {event.name}
                                </Row>
                                <Row style={{ marginBottom: 5, fontSize: 20 }}>
                                    <Col span={4} style={{ fontSize: 20 }}>
                                        Start time
                                    </Col>
                                    <Col offset={1}>
                                        {moment(event.timeStart).format('HH:mm DD/MM/YYYY')}
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: 5 }}>
                                    <Col span={4} style={{ fontSize: 20 }}>
                                        End time
                                    </Col>
                                    <Col offset={1} style={{ fontSize: 20 }}>
                                        {moment(event.timeEnd).format('HH:mm DD/MM/YYYY')}
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: 5 }}>
                                    <Col span={4} style={{ fontSize: 20 }}>
                                        Status
                                    </Col>
                                    <Col offset={1} span={17}>
                                        {event.status === STATUS_COMING_SOON ? (
                                            <Tag color={"yellow"} >
                                                <div style={{ padding: 5, fontWeight: 'bold', fontSize: 20 }}>
                                                    Up coming
                                                </div>
                                            </Tag>
                                        ) : event.status === STATUS_ON_GOING ?
                                            (
                                                <Tag color={"green"}>
                                                    <div style={{ padding: 5, fontWeight: 'bold', fontSize: 20 }}>
                                                        On going
                                                    </div>
                                                </Tag>
                                            ) :
                                            (
                                                <Tag color={"grey"}>
                                                    <div style={{ padding: 5, fontWeight: 'bold', fontSize: 20 }}>
                                                        End
                                                    </div>
                                                </Tag>
                                            )
                                        }
                                    </Col>
                                </Row>
                                <Divider style={{ marginTop: 15, marginBottom: 15 }} />
                                <Row>
                                    <Col span={4} style={{ fontSize: 20 }}>
                                        Location
                                    </Col>
                                    <Col offset={1} span={17}>
                                        <p style={{ fontSize: 20 }}>
                                            {`${event.address} - ${event.ward} ${event.district} ${event.city} `}
                                        </p>
                                    </Col>
                                </Row>


                            </div>
                        </Row></Col>
                </Row>
            </Col>

        </Row>
    </>

}
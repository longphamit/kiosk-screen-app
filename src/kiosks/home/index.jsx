import { Col, Image, Row, Typography } from "antd"
import "./styles.css"
import { Card, Avatar } from 'antd';
import { useNavigate } from "react-router-dom";
const { Title } = Typography;
const { Meta } = Card;
const style = { background: '#0092ff', padding: '8px 0' };
const HomePage = () => {
    const navigator= useNavigate()
    return <>
        <div style={{ margin: 40 }}>
            <Col span={24}>
                <Row span={24}>
                    <Title level={2}>App Category</Title>
                </Row>

                <div >
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col xl={6} span={12}>
                            <div className="app-box" onClick={()=>{navigator("/map")}}><img
                                className="app-image"
                                alt="example"
                                src={require('../../assets/images/map.png')}
                            />
                                <Meta style={{ marginTop: 10, marginBottom: 10 }} title="Europe Street beat" />
                            </div>
                        </Col>
                        <Col xl={6} span={12}>
                            <div className="app-box"><img
                                className="app-image"
                                alt="example"
                                src={require('../../assets/images/hotel.png')}
                            />
                                <Meta style={{ marginTop: 10, marginBottom: 10 }} title="Europe Street beat" />
                            </div>
                        </Col>
                        <Col xl={6} span={12}>
                            <div className="app-box"><img
                                className="app-image"
                                alt="example"
                                src={require('../../assets/images/fast-food.png')}
                            />
                                <Meta style={{ marginTop: 10, marginBottom: 10 }} title="Europe Street beat" />
                            </div>
                        </Col>
                        <Col xl={6} span={12}>
                            <div className="app-box"><img
                                className="app-image"
                                alt="example"
                                src={require('../../assets/images/cinema.png')}
                            />
                                <Meta style={{ marginTop: 10, marginBottom: 10 }} title="Europe Street beat" />
                            </div>

                        </Col>
                    </Row>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col xl={6} span={12}>
                            <div className="app-box"><img
                                className="app-image"
                                alt="example"
                                src={require('../../assets/images/ship.png')}
                            />
                                <Meta style={{ marginTop: 10, marginBottom: 10 }} title="Europe Street beat" />
                            </div>
                        </Col>
                        <Col xl={6} span={12}>
                            <div className="app-box"><img
                                className="app-image"
                                alt="example"
                                src={require('../../assets/images/Train.png')}
                            />
                                <Meta style={{ marginTop: 10, marginBottom: 10 }} title="Europe Street beat" />
                            </div>
                        </Col>
                        <Col xl={6} span={12}>
                            <div className="app-box"><img
                                className="app-image"
                                alt="example"
                                src={require('../../assets/images/car.png')}
                            />
                                <Meta style={{ marginTop: 10, marginBottom: 10 }} title="Europe Street beat" />
                            </div>
                        </Col>
                        <Col xl={6} span={12}>
                            <div className="app-box"><img
                                className="app-image"
                                alt="example"
                                src={require('../../assets/images/flight.png')}
                            />
                                <Meta style={{ marginTop: 10, marginBottom: 10 }} title="Europe Street beat" />
                            </div>

                        </Col>
                    </Row>
                </div>
            </Col>
            <Col span={24}>
                <Row span={24}>
                    <Title level={2}>Events</Title>
                </Row>
                <div >
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col xl={6} xs={12}>
                            <div className="event-box">
                                <img
                                    className="event-image"
                                    alt="example"
                                    src={require('../../assets/images/event-1.png')}
                                />

                            </div>
                        </Col>
                        <Col xl={6} xs={12}>
                            <div className="event-box">
                                <img
                                    className="event-image"
                                    alt="example"
                                    src={require('../../assets/images/event-2.png')}
                                />

                            </div>
                        </Col>
                        <Col xl={6} xs={12}>
                            <div className="event-box">
                                <img
                                    className="event-image"
                                    alt="example"
                                    src={require('../../assets/images/event-3.png')}
                                />

                            </div>
                        </Col>
                        <Col xl={6} xs={12}>
                            <div className="event-box">
                                <img
                                    className="event-image"
                                    alt="example"
                                    src={require('../../assets/images/event-4.png')}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </Col>
        </div>
    </>
}
export default HomePage
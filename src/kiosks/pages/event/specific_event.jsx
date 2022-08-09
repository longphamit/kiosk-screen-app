import { Carousel, Col, Divider, Image, Row, Skeleton, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CustomMap } from "../../../@app/components/map/map";
import { getEventByIdService } from "../../services/event_service";
import moment from 'moment';
import { STATUS_COMING_SOON, STATUS_ON_GOING } from "../../../@app/constants/event_constants";
import EventMarker from "../map/components/markers/event_marker";
export const SpecificEventPage = ({ }) => {
    const { id } = useParams();
    const [event, setEvent] = useState();
    const getEventFunction = async () => {
        try {
            let res = await getEventByIdService(id);
            setEvent(res.data);
            console.log(res.data)
        } catch (e) {
            setEvent({})
            console.error(e)
        }
    }

    useEffect(() => {
        getEventFunction();
    }, [])

    const contentStyle = {
        height: "300px",
        color: "#fff",
        lineHeight: "160px",
        textAlign: "center",
        contentAlign: "center",
        background: "#364d79",
        width: '40%'
    };
    return <>
        {event ?
            <div style={{ height: "100vh" }}>
                <Row>
                    <Col span={24} style={{ backgroundColor: 'black' }}>
                        <img src={event.thumbnail.link} alt="" height={250} width={1920} style={{ opacity: 0.6 }} />
                    </Col>
                    <div style={{ zIndex: 1, position: 'relative', width: '40%', color: 'white', marginTop: -200, marginLeft: 30, fontWeight: 'bold', fontSize: 16 }}>
                        <div dangerouslySetInnerHTML={{ __html: event?.description }} />
                    </div>
                </Row>
                <Row style={{ marginTop: 20 }}>
                    <Col offset={1} span={11} style={{ background: 'yellow' }}>
                        <Carousel
                            style={{ margin: 10, textAlign: "center", alignItems: "center" }}
                            autoplay
                            autoplaySpeed={2000}
                        >
                            {event ? (
                                event.listImage?.map((image) => {
                                    return (
                                        <div style={contentStyle}>
                                            <Image
                                                style={{ textAlign: "center" }}
                                                key={image.id}
                                                src={image.link}
                                            />
                                        </div>
                                    );
                                })
                            ) : (
                                <Spin className="center" />
                            )}
                        </Carousel>
                    </Col>
                    <Col span={12}>
                        <Row justify="center" align="middle">
                            <div style={{ backgroundColor: 'white', width: '600px', padding: 30, borderRadius: 20, boxShadow: ' 2px 2px 4px #303134', marginTop: -100 }}>
                                <Row justify="center" align="middle" style={{ fontWeight: 'bold', fontSize: 18 }}>
                                    {event.name}
                                </Row>
                                <Row style={{ marginBottom: 5 }}>
                                    <Col span={4}>
                                        Start time
                                    </Col>
                                    <Col offset={1}>
                                        {moment(event.timeStart).format('HH:mm DD/MM/YYYY')}
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: 5 }}>
                                    <Col span={4}>
                                        End time
                                    </Col>
                                    <Col offset={1}>
                                        {moment(event.timeEnd).format('HH:mm DD/MM/YYYY')}
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: 5 }}>
                                    <Col span={4}>
                                        Status
                                    </Col>
                                    <Col offset={1} span={17}>
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
                                                    <div style={{ padding: 5, fontWeight: 'bold' }}>
                                                        End
                                                    </div>
                                                </Tag>
                                            )
                                        }
                                    </Col>
                                </Row>
                                <Divider style={{ marginTop: 15, marginBottom: 15 }} />
                                <Row>
                                    <Col span={4}>
                                        Location
                                    </Col>
                                    <Col offset={1} span={17}>
                                        <p>
                                            {`${event.address} - ${event.ward} ${event.district} ${event.city} `}
                                        </p>
                                    </Col>
                                </Row>


                            </div>
                        </Row>
                        <Row justify="center" align="middle" style={{ marginTop: 60 }}>
                            <div style={{ backgroundColor: 'black', width: '800px', height: '500px' }}>
                                <CustomMap marker={<EventMarker item={event} setItem={() => { }} />} />
                            </div>
                        </Row>
                    </Col>
                </Row>

            </div>
            : <Skeleton />}
    </>
}
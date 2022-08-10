import { Col, Divider, Row, Skeleton, Tag } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CustomMap } from "../../../@app/components/map/map";
import { getEventByIdService } from "../../services/event_service";
import moment from 'moment';
import { STATUS_COMING_SOON, STATUS_ON_GOING } from "../../../@app/constants/event_constants";
import EventMarker from "../map/components/markers/event_marker";
import { BannerCard } from "../../../@app/components/card/banner_card";
import { CarouselCard } from "../../../@app/components/card/carousel_card";

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

    return <>
        {event ?
            <div style={{ height:"100%" }}>
                <BannerCard item={event} />

                <Row style={{ marginTop: 50 }}>
                    <Col offset={1} span={11} >
                        <CarouselCard item={event} />
                    </Col>
                    <Col span={12}>
                        <Row justify="center" align="middle">
                            <div style={{ backgroundColor: 'white', width: '600px', padding: 30, borderRadius: 20, boxShadow: ' 2px 2px 4px #303134', marginTop: -250 }}>
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
                        <Row justify="center" align="middle" style={{ marginTop: 30,marginBottom:100 }}>
                            <div style={{ backgroundColor: 'black', width: '800px', height: '400px' }}>
                                <CustomMap marker={<EventMarker item={event} setItem={() => { }} />} />
                            </div>
                        </Row>
                    </Col>
                </Row>

            </div>
            : <Skeleton />}
    </>
}
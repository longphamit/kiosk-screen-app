import { Col, Row, Skeleton } from "antd"
import { useEffect, useState } from "react"
import ScrollContainer from "react-indiana-drag-scroll";
import { useNavigate } from "react-router-dom";
import { CustomCard } from "../../../@app/components/card/custom_card";
import { EmptyCard } from "../../../@app/components/card/empty_card";
import { CURRENT_LOCATION_LATITUDE, CURRENT_LOCATION_LONGITUDE, USER_ID } from "../../../@app/constants/key";
import useSelector from "../../../@app/hooks/use_selector";
import { getEventNearbyService } from "../../services/event_service";
import "./styles.css"
export const AllEventsPage = ({ }) => {
    const { listEventPosition, listAppCatePosition } = useSelector(
        (state) => state.home_view
    );
    const navigate = useNavigate()
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    return <>
        <div style={{ height: '100vh' }}>
            <Row>
                <div style={{marginLeft :50,marginRight:50}}>
                    {listEventPosition?.map((row) => {
                        return (
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col span={24}>
                                    <ScrollContainer
                                        className="drag-list-container"
                                        horizontal={true}
                                    >
                                        {row.map((e) => {
                                            return (
                                                <div
                                                    className="event-box"
                                                    onClick={() => {
                                                        navigate(`/event/${e.EventId}`)
                                                    }}

                                                >
                                                   
                                                    <div>
                                                        <div className="event-image" style={{
                                                            backgroundImage: `url(${e.EventThumbnail.Link})`,
                                                            backgroundPosition: 'center',
                                                            backgroundSize: 'cover',
                                                            backgroundRepeat: 'no-repeat',
                                                            height: 270,
                                                            width: 400,
                                                            zIndex: 10,
                                                            opacity: e.EventStatus === "end" ? 0.5 : 1,
                                                        }}>


                                                        </div>
                                                        
                                                    </div>
                                                    
                                                   <div>
                                                   <p style={{ marginTop: 20 }}>{e.EventName}</p>
                                                   </div>
                                                </div>
                                            );
                                        })}
                                    </ScrollContainer>
                                </Col>
                            </Row>
                        );
                    })}
                </div>
            </Row>
        </div>

    </>
}
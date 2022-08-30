import { Col, Row } from "antd"
import { useEffect, useState } from "react"
import ScrollContainer from "react-indiana-drag-scroll";
import { EventCard } from "../../../@app/components/card/event_card";
import { LoadingPageCard } from "../../../@app/components/card/loading_page_card";
import { CURRENT_LOCATION_LATITUDE, CURRENT_LOCATION_LONGITUDE, KIOSK_ID, USER_ID } from "../../../@app/constants/key";
import useSelector from "../../../@app/hooks/use_selector";
import { splitDataIntoRow } from "../../../@app/utils/layout_utils";
import { getEventNearbyService } from "../../services/event_service";
import { getKioskTemplateService } from "../../services/kiosk_service";
import "./styles.css"
export const AllEventsPage = ({ }) => {
    const { listEventPosition } = useSelector(
        (state) => state.home_view
    );

    const [data, setData] = useState();
    const getKioskTemplate = async () => {
        setTimeout((() => {
            getKioskTemplateService(localStorage.getItem(KIOSK_ID)).then(res => {
                console.log(res.data)
            })
        }), 3000)
        if (listEventPosition.length === 0) {
            await getAllEvent()
        } else { // try to get events nearby when no template
            setData(listEventPosition);
        }
    }

    const getAllEvent = async () => {
        try {
            let lat = localStorage.getItem(CURRENT_LOCATION_LATITUDE);
            let long = localStorage.getItem(CURRENT_LOCATION_LONGITUDE);
            let partyId = localStorage.getItem(USER_ID);
            let res = await getEventNearbyService(long, lat, partyId)
            let events = splitDataIntoRow(res.data.data, 5)
            setData(events);
        } catch (e) {
            console.error(e);
            setData([]);
        }
    }

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        getKioskTemplate()
    }, []);

    return <>
        <div style={{ height: '93vh' }}>
            {data ?
                <div style={{ width: '95%' }}>
                    {listEventPosition.length !== 0 ?
                        listEventPosition?.map((row, index) => {
                            return (
                                <div >
                                    <Col span={23} offset={1}>
                                        <ScrollContainer
                                            key={index}
                                            className="drag-list-container"
                                            horizontal={true}
                                        >
                                            {row.map((e) => {
                                                return (
                                                    <EventCard item={convertEventObj(e)} rowIdx={index} isPriority={true} />
                                                );
                                            })}
                                        </ScrollContainer>
                                    </Col>
                                </div>
                            );
                        }) :
                        data.map((row, index) => {
                            return (
                                <div>
                                    <Row>
                                        <Col span={23} offset={1}>
                                            <ScrollContainer
                                                key={index}
                                                className="drag-list-container"
                                                horizontal={true}
                                            >
                                                {row.map((e) => {
                                                    return (
                                                        <EventCard item={e} rowIdx={index} />
                                                    );
                                                })}
                                            </ScrollContainer>
                                        </Col>
                                    </Row>
                                </div>
                            );
                        })
                    }
                </div>
                : <LoadingPageCard />}
        </div>
    </>
}
const convertEventObj = (event) => {
    return {
        id: event.EventId,
        status: event.EventStatus,
        thumbnail: {
            link: event.EventThumbnail.Link
        },
        name: event.EventName
    }
}
import { Row, Skeleton } from "antd"
import { useEffect, useState } from "react"
import { CustomCard } from "../../../@app/components/card/custom_card";
import { EmptyCard } from "../../../@app/components/card/empty_card";
import { USER_ID } from "../../../@app/constants/key";
import { getEventNearbyService } from "../../services/event_service";

const long = '106.7644724';
const lat = '10.8578179'
export const AllEventsPage = ({ }) => {
    const [events, setEvent] = useState();
    const getEventsFunction = async () => {
        try {
            let res = await getEventNearbyService(long, lat, localStorage.getItem(USER_ID));
            setEvent(res.data.data);
        } catch (e) {
            setEvent([])
            console.error(e)
        }
    }
    useEffect(() => {
        getEventsFunction();
    }, []);
    return <>
        <div style={{ height: "100vh" }}>
            <Row>
                {events ?
                    events.length !== 0 ?
                        <>
                            {events.map((e) => {
                                return <CustomCard colSpan={7} imgSrc={e.thumbnail.link} title={e.name} link={`/event/${e.id}`} />
                            })}
                        </> : <>
                            <div style={{ width: '100%' }}>
                                <EmptyCard marginTop={250} />
                            </div>
                        </> :
                    <Skeleton />
                }

            </Row>
        </div>

    </>
}
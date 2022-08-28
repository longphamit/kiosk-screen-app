import { Col, Row } from "antd";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom"
import "./styles.css"

export const EventCard = ({ item, rowIdx, isPriority = false }) => {
    let navigate = useNavigate();
    return <>

        {item.status !== "deleted" ?
            <>
                <Col span={6}>
                    <div
                        className="event-box"
                        onClick={() => {
                            navigate(`/event/${item.id}`)
                        }}
                    >
                        {
                            item.status === "end" ?
                                <div className="status-event-tag">
                                    END
                                </div> : null
                        }
                        {
                            rowIdx == 0 && isPriority ? <div className="hight-priority-event-tag">
                                <FaStar />
                            </div> : null
                        }
                        <div>
                            <div className="event-image" style={{
                                backgroundImage: `url(${item.thumbnail.link})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                opacity: item.EventStatus === "end" ? 0.4 : 0.9,
                            }}>
                            </div>
                        </div>
                        <div>
                            <p style={{ marginTop: 20 }}>{item.name}</p>
                        </div>
                    </div>
                </Col>
                <Col span={1} />
            </>
            : null

        }

    </>
}
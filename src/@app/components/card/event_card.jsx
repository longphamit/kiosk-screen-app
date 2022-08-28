import { Col, Row } from "antd";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom"
import { CustomCard } from "./custom_card";
import "./styles.css"

export const EventCard = ({ item, rowIdx, isPriority = false }) => {
    let navigate = useNavigate();
    return <>

        {item.status !== "deleted" ?
            <>
                <Col span={1}></Col>
                <Col
                    span={6}
                    style={{ marginBottom: 20, marginTop: 20, border: '.5px solid #d8d9d7', background: 'white', borderRadius: 20, padding: 20 }}
                    onClick={() => { navigate(`/event/${item.id}`) }}
                >
                    {
                        rowIdx == 0 && isPriority ?
                            <div className="hight-priority-event-tag" style={{ position: "absolute", marginTop: "-35px", marginLeft: "-47px" }}>
                                <FaStar />
                            </div> : null
                    }
                    {
                        item.status === "end" ?
                            <div className="status-event-tag" style={{ position: "absolute", top: '40%', textAlign: 'center', fontWeight: 'bold' }}>
                                END
                            </div> : null
                    }

                    <Row align="middle" justify="center" >
                        <div>


                            <img
                                style={{
                                    position: 'relative',
                                    opacity: item.status === "end" ? 0.4 : 1,
                                }}
                                height={'160px'}
                                width={'100%'}
                                alt="example"
                                src={item.thumbnail.link}
                            />
                        </div>
                    </Row>
                    <Row align="middle" justify="center" >
                        <label style={{ fontWeight: 'bold', fontSize: 18, marginTop: 15 }}>
                            {item.name}
                        </label>
                    </Row>

                </Col>
                <Col span={1}></Col>
            </>

            // <>

            //     <Col span={6}>
            //         <div
            //             className="event-box"
            //             onClick={() => {
            //                 navigate(`/event/${item.id}`)
            //             }}
            //         >
            //             {/* {
            //                 item.status === "end" ?
            //                     <div className="status-event-tag">
            //                         END
            //                     </div> : null
            //             } */}
            //             {/* {
            //                 rowIdx == 0 && isPriority ?
            //                     <div className="hight-priority-event-tag">
            //                         <FaStar />
            //                     </div> : null
            //             } */}
            //             <div>
            //                 <div className="event-image" style={{
            //                     backgroundImage: `url(${item.thumbnail.link})`,
            //                     backgroundPosition: 'center',
            //                     backgroundSize: 'cover',
            //                     backgroundRepeat: 'no-repeat',
            //                    
            //                 }}>
            //                 </div>
            //             </div>
            //             <div>
            //                 <p style={{ marginTop: 20 }}>{item.name}</p>
            //             </div>
            //         </div>
            //     </Col>
            //     <Col span={1} />
            // </>
            : null

        }

    </>
}
import { Col, Empty, Row } from "antd";
import { useEffect, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { useParams } from "react-router-dom";
import { ApplicationCard } from "../../../@app/components/card/application_card";
import { LoadingPageCard } from "../../../@app/components/card/loading_page_card";
import { USER_ID } from "../../../@app/constants/key";
import { getListMyApplicationService } from "../../services/application_service";

export const AppByCategoryPage = () => {
    const { id } = useParams();
    const [apps, setApps] = useState();

    const getAppById = async () => {
        try {
            let res = await getListMyApplicationService(id, localStorage.getItem(USER_ID));
            setApps(res.data)
        } catch (e) {
            console.log(e);
            setApps([])
        }
    }

    useEffect(() => {
        getAppById()
    }, [])

    return <>
        <div style={{ height: '94vh' }}>
            {apps ?
                <div style={{ width: '95%' }}>
                    <Col>
                        {
                            apps.map((row, index) => {
                                return (
                                    <div>
                                        <Row>
                                            <Col span={23} offset={1}>
                                                <ScrollContainer
                                                    key={index}
                                                    className="drag-list-container"
                                                    horizontal={true}
                                                >
                                                    <div>
                                                        {/* <Row>
                                                            {
                                                                apps?.map(item => {
                                                                    return (
                                                                        <ApplicationCard app={item} />
                                                                    )
                                                                })
                                                            }
                                                            {
                                                                apps?.length == 0 ? <Empty className="center" /> : null
                                                            }

                                                        </Row> */}
                                                    </div>
                                                </ScrollContainer>
                                            </Col>
                                        </Row>
                                    </div>
                                );
                            })
                        }
                    </Col>
                </div>
                : <LoadingPageCard />
            }
        </div>
    </>
}
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { ApplicationCard } from "../../../@app/components/card/application_card";
import { LoadingPageCard } from "../../../@app/components/card/loading_page_card";
import { USER_ID } from "../../../@app/constants/key";
import { splitDataIntoRow } from "../../../@app/utils/layout_utils";
import { getListMyApplicationService } from "../../services/application_service";

const APP_CATE_ID = "ab39609e-1857-4f06-a33e-3583ecadf154";
export const FoodAppsPage = () => {
    const [apps, setApps] = useState();

    const getAppById = async () => {
        try {
            let res = await getListMyApplicationService(APP_CATE_ID, localStorage.getItem(USER_ID));
            setApps(splitDataIntoRow(res.data, 5))
        } catch (e) {
            console.error(e);
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
                                                    {row.map((e) => {
                                                        return (
                                                            <ApplicationCard app={e} />
                                                        );
                                                    })}
                                                </ScrollContainer>
                                            </Col>
                                        </Row>
                                    </div>
                                )
                            })
                        }
                    </Col>
                </div>
                : <LoadingPageCard />
            }
        </div >
    </>
}
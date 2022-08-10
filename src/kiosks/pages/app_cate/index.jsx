import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { useNavigate } from "react-router-dom";
import { KIOSK_ID } from "../../../@app/constants/key";
import useSelector from "../../../@app/hooks/use_selector";
import { localStorageGetReduxState } from "../../../@app/services/localstorage_service";
import { getKioskTemplateService } from "../../services/kiosk_service";
const { Meta } = Card;

const AppCatePage = () => {
    const { listEventPosition, listAppCatePosition } = useSelector(
        (state) => state.home_view
    );
    const navigator = useNavigate()
    const getKioskTemplate = async () => {
        setTimeout((() => {
            console.log("abc")
            getKioskTemplateService(localStorage.getItem(KIOSK_ID)).then(res => {
                console.log(res.data)
            })
        }), 3000)

    }
    useEffect(() => {
        console.log("abc")
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        getKioskTemplate()
    }, []);
    return <div>
        <div style={{ margin: 100, height:"100vh" }}>
            {listAppCatePosition?.map((row) => {
                return (
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={24}>
                            <ScrollContainer className="drag-list-container" horizontal>
                                {row.map((e) => {
                                    return (
                                        <div
                                            className="app-box"
                                            onClick={() => {
                                                navigator(`/app-list?id=${e.AppCategoryId}`);
                                            }}
                                        >
                                            <img
                                                className="app-image"
                                                alt="example"
                                                src={e.AppCategoryLogo}
                                            />
                                            <Meta
                                                style={{ marginTop: 10, marginBottom: 10 }}
                                                title={e.AppCategoryName}
                                            />
                                        </div>
                                    );
                                })}
                            </ScrollContainer>
                        </Col>
                    </Row>
                );
            })}
        </div>
    </div>
}
export default AppCatePage;
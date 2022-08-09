import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { useNavigate } from "react-router-dom";
import useSelector from "../../../@app/hooks/use_selector";
import { getKioskTemplateService } from "../../services/kiosk_service";
const { Meta } = Card;
const AppCatePage = () => {
    const { listEventPosition, listAppCatePosition } = useSelector(
        (state) => state.home_view
      );
    const navigator=useNavigate()
    const getKioskTemplate=async()=>{
        getKioskTemplateService(localStorage.getItem("KIOSK_ID")).then(res=>{
          console.log(res.data)
        })
      }
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        getKioskTemplate()
      }, []);
    return <div>
        <div style={{margin:200,marginBottom:300}}>
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
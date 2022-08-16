import { Card, Col, Divider, Empty, Row } from "antd";
import { useEffect, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { useNavigate } from "react-router-dom";
import { KIOSK_ID } from "../../../@app/constants/key";
import useSelector from "../../../@app/hooks/use_selector";
import { localStorageGetReduxState } from "../../../@app/services/localstorage_service";
import { getAllApplicationCategoryService } from "../../services/app_category_service";
import { getKioskTemplateService } from "../../services/kiosk_service";
import "./styles.css"
import Slider from "react-slick";
import { getListApplicationService } from "../../services/application_service";
import { ArrowUpOutlined } from "@ant-design/icons";
import { EmptyCard } from "../../../@app/components/card/empty_card";
const { Meta } = Card;

const AppCatePage = () => {
    const { listEventPosition, listAppCatePosition } = useSelector(
        (state) => state.home_view
    );
    const [listAppCate, setListAppCate] = useState()
    const [listApp, setListApp] = useState()
    const navigator = useNavigate()
    const getKioskTemplate = async () => {
        setTimeout((() => {
            getKioskTemplateService(localStorage.getItem(KIOSK_ID)).then(res => {
                console.log(res.data)
            })
        }), 3000)

    }
    const getApp = async (id) => {
        try {
            const res = await getListApplicationService(
                "",
                "",
                "",
                id,
                "",
                "",
                -1,
                1
            );
            setListApp(res.data.data)
        } catch (e) {
            setListApp([])
        }
    }
    const getAppCate = async () => {
        const res = await getAllApplicationCategoryService()
        console.log(res.data.data)
        setListAppCate(res.data.data)
    }
    useEffect(() => {
        getAppCate()
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        getKioskTemplate()
        getApp("")
    }, []);
    return <div>
        <div style={{ height: "100%" }}>
            {/* {listAppCatePosition?.map((row) => {
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
            })} */}
            <Row >
                <Col span={1} />
                <Col span={6} style={{ backgroundColor: "#ffff", borderRadius: 20, paddingLeft: 10, paddingRight: 10, paddingBottom: 5, paddingTop: 5 }}>
                    <div style={{ height: 650 }}>
                        <div
                            className="app-cate-box"
                            style={{ backgroundColor: "#26a3c9", paddingBottom: 20, marginBottom: 10 }}
                            onClick={() => {
                                getApp("")
                            }}
                        >
                            <div style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>ALL</div>
                        </div>
                        <Row>
                            <ArrowUpOutlined className="center" />
                        </Row>
                        {
                            listAppCate ? <ScrollContainer
                                className="drag-list-vertical-container"

                            >
                                {
                                    listAppCatePosition ? listAppCatePosition[0]?.map(e => {
                                        return (
                                            <div
                                                className="app-cate-box"
                                                onClick={() => {
                                                    getApp(e.AppCategoryId)
                                                }}
                                            >
                                                <img
                                                    className="app-cate-image"
                                                    alt="example"
                                                    src={e.AppCategoryLogo}
                                                />
                                                <Meta
                                                    style={{ marginTop: 10, marginBottom: 10 }}
                                                    title={e.AppCategoryName}
                                                />
                                                <Divider />
                                            </div>


                                        )
                                    }) : null
                                }
                            </ScrollContainer> : <Empty />
                        }
                    </div>
                </Col>
                <Col span={16} style={{ backgroundColor: "#ffff",marginBottom:20, marginLeft: 20, borderRadius: 20, paddingLeft: 10, paddingRight: 10, paddingBottom: 5, paddingTop: 5 }}>
                    <Row>
                        {
                            listApp?.map(items => {
                                return (
                                    <Col xl={8} xs={5}>
                                        <div
                                            className="app-box"
                                            onClick={() => {
                                                navigator({
                                                    pathname:
                                                        "/./iframe-interface?link=" +
                                                        items.link +
                                                        "&id=" +
                                                        items.id,
                                                });
                                            }}
                                        >
                                            <img
                                                style={{ height: 200 }}
                                                className="app-image"
                                                alt="example"
                                                src={items.logo}
                                            />
                                            <Meta
                                                style={{ marginTop: 10, marginBottom: 10 }}
                                                title={items.name}
                                            />
                                        </div>
                                    </Col>
                                )
                            })
                        }
                        {
                            listApp?.length == 0 ? <Empty className="center" /> : null
                        }


                    </Row>
                </Col>
                <Col span={1} />
            </Row>

        </div>
    </div>
}
export default AppCatePage;
import { Card, Col, Empty, Row } from "antd";
import { useEffect, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { useNavigate } from "react-router-dom";
import { KIOSK_ID, USER_ID } from "../../../@app/constants/key";
import useSelector from "../../../@app/hooks/use_selector";
import { getAllApplicationCategoryService } from "../../services/app_category_service";
import { getKioskTemplateService } from "../../services/kiosk_service";
import "./styles.css"
import { getListApplicationServiceByTemplateIdService, getListMyApplicationService } from "../../services/application_service";
import { ArrowUpOutlined } from "@ant-design/icons";
import { AppCategoryCard } from "../../../@app/components/card/app_category_card";
import loadingCategoryGif from './../../../assets/gif/loading_category.gif';
import loadingPageGif from './../../../assets/gif/loading_page.gif';
const { Meta } = Card;

const AppCatePage = () => {
    const { listEventPosition, listAppCatePosition, templateId } = useSelector(
        (state) => state.home_view
    );
    const [isLoading, setLoading] = useState(true);
    const [listAppCate, setListAppCate] = useState()
    const [listApp, setListApp] = useState()
    const navigator = useNavigate()
    const getListAppByTemplateId = async () => {
        if (templateId.length === 0) {
            getAllAppCate()
        } else {
            try {
                const res = await getListApplicationServiceByTemplateIdService(templateId);
                setListApp(res.data)
            } catch (e) {
                console.error(e);
                getAllAppCate()
            }
        }
    }
    const getKioskTemplate = async () => {
        if (templateId) {
            getListAppByTemplateId();
        }
        setTimeout((() => {
            getKioskTemplateService(localStorage.getItem(KIOSK_ID)).then(res => {
                if (!templateId) {
                    getListAppByTemplateId()
                }
            })
        }), 3000)
        setLoading(false);

    }
    const getApp = async (appCateId) => {
        try {
            console.log(appCateId)
            const res = await getListMyApplicationService(
                appCateId,
                localStorage.getItem(USER_ID)
            );
            setListApp(res.data)
        } catch (e) {
            setListApp([])
        }
    }
    const getAllAppCate = async () => {
        const res = await getAllApplicationCategoryService()
        setListAppCate(res.data.data)
    }
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        getKioskTemplate()

    }, []);
    return <div>
        {
            isLoading ?
                <>
                    <Row>
                        <img src={loadingPageGif} alt="" />
                    </Row>
                </> :
                <div style={{ height: "100%" }}>
                    <Row >
                        <Col span={1} />
                        <Col span={6} style={{ backgroundColor: "#ffff", borderRadius: 20, paddingLeft: 10, paddingRight: 10, paddingBottom: 5, paddingTop: 5 }}>
                            <div style={{ height: 650 }}>
                                <div
                                    className="app-cate-box"
                                    style={{ backgroundColor: "#26a3c9", paddingBottom: 20, marginBottom: 10 }}
                                    onClick={() => {
                                        getListAppByTemplateId()
                                    }}
                                >
                                    <div style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>ALL</div>
                                </div>
                                <Row>
                                    <ArrowUpOutlined className="center" />
                                </Row>

                                <ScrollContainer className="drag-list-vertical-container" >
                                    {
                                        !templateId || templateId.length === 0 ?
                                            <>
                                                {listAppCate ?
                                                    listAppCate.map((e => {
                                                        return (
                                                            <AppCategoryCard
                                                                cate={e}
                                                                onAppCateClick={getApp}
                                                            />
                                                        )
                                                    })) :
                                                    <div style={{ marginTop: 50 }}>
                                                        <Row align="middle" justify="center">
                                                            <img src={loadingCategoryGif} alt="" />
                                                        </Row>
                                                        <Row align="middle" justify="center" style={{ fontSize: 20, fontWeight: 'bold' }}>
                                                            Wait for few minutes, data is loading ...
                                                        </Row>
                                                    </div>
                                                }
                                            </> :
                                            <>
                                                {
                                                    listAppCatePosition ?
                                                        listAppCatePosition[0]?.map(e => {
                                                            return (
                                                                <AppCategoryCard
                                                                    cate={{
                                                                        id: e.AppCategoryId,
                                                                        logo: e.AppCategoryLogo,
                                                                        name: e.AppCategoryName
                                                                    }}
                                                                    onAppCateClick={getApp}
                                                                />
                                                            )
                                                        }) :
                                                        <></>
                                                }
                                            </>
                                    }
                                </ScrollContainer>
                            </div>
                        </Col>
                        <Col span={16} style={{ backgroundColor: "#ffff", marginBottom: 20, marginLeft: 20, borderRadius: 20, paddingLeft: 10, paddingRight: 10, paddingBottom: 5, paddingTop: 5 }}>
                            <ScrollContainer hideScrollbars={true} className="specific-poi-event-scroll" vertical={true}>
                                <div>
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
                                </div>
                            </ScrollContainer>
                        </Col>
                        <Col span={1} />
                    </Row>

                </div>
        }
    </div >
}
export default AppCatePage;
import { Col, Empty, Row } from "antd";
import { useEffect, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { KIOSK_ID, USER_ID } from "../../../@app/constants/key";
import useSelector from "../../../@app/hooks/use_selector";
import { getAllApplicationCategoryService } from "../../services/app_category_service";
import { getKioskTemplateService } from "../../services/kiosk_service";
import "./styles.css"
import { getListApplicationServiceByTemplateIdService, getListMyApplicationService, getMyInstalledApplicationsService } from "../../services/application_service";
import { ArrowUpOutlined } from "@ant-design/icons";
import { AppCategoryCard } from "../../../@app/components/card/app_category_card";
import loadingCategoryGif from './../../../assets/gif/loading_category.gif';
import { ApplicationCard } from "../../../@app/components/card/application_card";
import { splitDataIntoRow } from "../../../@app/utils/layout_utils";
import { LoadingPageCard } from "../../../@app/components/card/loading_page_card";

const AppCatePage = () => {
    const { listAppCatePosition, templateId } = useSelector(
        (state) => state.home_view
    );
    const [isLoading, setLoading] = useState(true);
    const [listAppCate, setListAppCate] = useState()
    const [listApp, setListApp] = useState()
    const getListAppByTemplateId = async () => {
        if (templateId.length === 0) {
            getAllAppCate()
        } else {
            try {
                const res = await getListApplicationServiceByTemplateIdService(templateId);
                setListApp(splitDataIntoRow(res.data, 3))
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
                if (!templateId || templateId.length === 0) {
                    getListAppByTemplateId()
                } else {
                    setListAppCate(res.data.appCategories)
                }
            }).catch(e => console.log(e))
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
            setListApp(splitDataIntoRow(res.data, 3))
        } catch (e) {
            setListApp([])
        }
    }
    const getAllAppCate = async () => {
        const res = await getAllApplicationCategoryService()
        setListAppCate(res.data.data)
        await getAllInstalledApplication()
    }

    const getAllInstalledApplication = async () => {
        let res = await getMyInstalledApplicationsService()
        let data = res.data.data.map((e) => {
            return {
                link: e.serviceApplicationLink,
                id: e.serviceApplicationId,
                logo: e.serviceApplicationLogo,
                name: e.serviceApplicationName
            }
        })
        let apps = splitDataIntoRow(data, 3)
        setListApp(apps);
    }

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        getKioskTemplate()

    }, []);
    return <div>

        <div style={{ height: "94vh" }}>
            {
                isLoading || !listApp ?
                    <>
                        <LoadingPageCard />
                    </> :
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
                        <Col span={16} style={{ backgroundColor: "#ffff", marginBottom: 10, marginLeft: 20, borderRadius: 20, paddingLeft: 10, paddingRight: 10, paddingBottom: 5, paddingTop: 5 }}>
                            <div style={{ width: '95%', height: 650 }}>
                                {
                                    listApp?.length === 0 ?
                                        <Empty className="center" /> :
                                        listApp.map((row, index) => {
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
                                                                        <ApplicationCard app={e} colSpan={10} />
                                                                    );
                                                                })}
                                                            </ScrollContainer>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            )
                                        })
                                }
                            </div>
                        </Col>
                        <Col span={1} />
                    </Row>
            }
        </div>
    </div >
}
export default AppCatePage;
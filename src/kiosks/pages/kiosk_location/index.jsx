import {
    Carousel,
    Col,
    Descriptions,
    Image,
    Modal,
    Rate,
    Row,
    Skeleton,
    Spin,
    Typography,
} from "antd";
import "./styles.css";
import { Card, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import useSelector from "../../../@app/hooks/use_selector";
import { PRIMARY_COLOR } from "../../../@app/constants/colors";
import { useEffect, useState } from "react";
import { getLocationByIdService } from "../../../@app/services/kiosk_location_service";
import { toast } from "react-toastify";
import { FaAngry, FaFrownOpen, FaGrinAlt, FaGrinBeam, FaGrinHearts, FaGrinStars } from 'react-icons/fa';
import {
    PhoneFilled,
    MailFilled,
    InfoCircleFilled,
    ArrowRightOutlined,
    Location,
    FrownOutlined,
    MehOutlined,
    SmileOutlined,
} from "@ant-design/icons";
import { getKioskInfoService, getKioskTemplate, getKioskTemplateService } from "../../services/kiosk_service";
import { Carousel as PrimeFaceCarousel } from "primereact/carousel";
import ScrollContainer from "react-indiana-drag-scroll";
import { SpecificEventLocation } from "../map/components/location-infomation/specfic-event-location";
import { getEventByIdService } from "../../services/event_service";
import { kioskRatingService } from "../../services/kiosk_rating_service";
import { KIOSK_ID } from "../../../@app/constants/key";
import ModalLocationDescription from "./modalLocationDescrtiption";
const { Meta } = Card;
const contentStyle = {
    height: "300px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    contentAlign: "center",
    background: "#364d79",
};
const KioskLocationInfoPage = () => {
    const navigator = useNavigate();
    const [kioskLocation, setKioskLocation] = useState();
    const [
        isLocationDescriptionModalVisible,
        setLocationDescriptionModalVisible,
    ] = useState(false);
    const [eventDetailsVisibile, setEventDetailsVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState();
    const [isLoadingRating, setIsLoadingRating] = useState(false);
    const [value, setValue] = useState(0);
    const [kioskId, setKioskId] = useState("");
    const { listEventPosition, listAppCatePosition } = useSelector(
        (state) => state.home_view
    );
    const desc = ["terrible", "bad", "normal", "good", "wonderful"];
    const getKioskLocation = async () => {
        const res = localStorage.getItem("KIOSK_ID");
        setKioskId(res);
        const resKioskInfo = await getKioskInfoService(res);

        if (resKioskInfo.data.kioskLocationId) {
            const resKioksLocationInfo = await getLocationByIdService(
                resKioskInfo.data.kioskLocationId,
                false
            );
            console.log(resKioksLocationInfo.data);
            setKioskLocation(resKioksLocationInfo.data);
        } else {
            toast.error("can not get kiosk information");
        }
    };
    const onChangeRating = async (values) => {
        Modal.confirm({
            title: "Are you sure to rating this kiosk?",
            okText: "Yes",
            cancelText: "No",
            onOk: async () => {
                setIsLoadingRating(true);
                try {
                    console.log(kioskLocation);
                    const ratingData = {
                        kioskId: kioskId,
                        rating: values,
                        content: "abcd",
                    };
                    await kioskRatingService(ratingData);
                    toast.success("Thank you for rating");
                } catch (error) {
                    console.log(error);
                    toast.error(error.respone.data.message);
                } finally {
                    setIsLoadingRating(false);
                    setValue(0);
                }
            },
            onCancel: () => {
                setValue(0);
            },
        });
    };
    const getKioskTemplate = async () => {
        getKioskTemplateService(localStorage.getItem(KIOSK_ID)).then(res => {
            console.log(res.data)
        })
    }
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        getKioskLocation();
        getKioskTemplate();
    }, []);
    const onOpenEventDetailsModal = async (position) => {
        let eventId = position.EventId;
        try {
            let res = await getEventByIdService(eventId);
            setSelectedEvent(res.data);
            setEventDetailsVisible(true);
        } catch (e) {
            setSelectedEvent({});
            console.error(e);
            toast.error("Cannot get the event infomation!");
        }
    };
    const onCancelModalLocation = () => {
        setLocationDescriptionModalVisible(false);
    };

    const customIcons = {
        1: <FaAngry size={60} style={{ marginLeft: 10 }} />,
        2: <FaFrownOpen size={60} style={{ marginLeft: 10 }} />,
        3: <FaGrinAlt size={60} style={{ marginLeft: 10 }} />,
        4: <FaGrinStars size={60} style={{ marginLeft: 10 }} />,
        5: <FaGrinHearts size={60} style={{ marginLeft: 10 }} />,
    };
    return (
        
        <div >
            <div style={{ marginTop: 10, marginLeft: 50, marginRight: 50, }}>
                <Row>
                    <Col span={24}>
                        <div className="location-info">
                            {kioskLocation ? (
                                <>
                                    <div style={{ textAlign: "center" }}>
                                        <h2
                                            style={{
                                                fontWeight: "bold",
                                                fontSize: 50,
                                                color: PRIMARY_COLOR,
                                            }}
                                        >
                                            {kioskLocation.name}
                                        </h2>
                                    </div>
                                    <div style={{ width: "100%" }}>
                                        <div >
                                            <Row span={24}>
                                                <Col span={6}></Col>
                                                <Col span={6}>
                                                    <div
                                                        style={{
                                                            background: "#afeb9d",
                                                            margin: 5,
                                                            marginBottom: 20,
                                                            padding: 15,
                                                            borderRadius: 10,
                                                            color: "#fff",
                                                            fontWeight: "bold",
                                                            fontSize: 30,
                                                        }}
                                                    >
                                                        <Row>
                                                            <Col span={2}>
                                                                <PhoneFilled />
                                                            </Col>
                                                            <Col span={22} style={{ textAlign: "center" }}>
                                                                {kioskLocation.hotLine}
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>
                                                <Col span={6}>
                                                    <div
                                                        style={{
                                                            background: "#ff8442",
                                                            margin: 5,
                                                            marginBottom: 20,
                                                            padding: 15,
                                                            borderRadius: 10,
                                                            color: "#fff",
                                                            fontWeight: "bold",
                                                            fontSize: 30,
                                                        }}
                                                    >
                                                        <Row>
                                                            <Col span={2}>
                                                                <MailFilled />
                                                            </Col>
                                                            <Col span={22} style={{ textAlign: "center" }}>
                                                                {kioskLocation.ownerEmail}
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>

                                            </Row>
                                        </div>

                                    </div>
                                </>
                            ) : (
                                <Row>
                                    <Spin className="center" />
                                </Row>
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
            <div style={{ marginTop: 10, marginLeft: 50, marginRight: 50 }}>
                <Row>
                    <Col span={24} className="center">
                        <div className="location-info">
                            {
                                !kioskLocation ?
                                    <Skeleton /> : <div >
                                        {
                                            <div style={{fontSize:15}} className="div-description center" dangerouslySetInnerHTML={{ __html: kioskLocation?.description }} />
                                        }
                                    </div>
                            }

                        </div>
                    </Col>
                </Row>
            </div>
            <Col className="center">
                <div
                    style={{
                        background: "#f7a197",
                        margin: 5,
                        marginBottom: 20,
                        padding: 15,
                        borderRadius: 10,
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 30,
                    }}
                >
                    <Row style={{ textAlign: "center" }}>
                        <Col span={24} style={{ fontSize: 20, marginBottom: 10 }}>
                            Rating
                        </Col>
                    </Row>
                    <Row style={{ textAlign: "center" }}>
                        <Col span={24}>
                            <span>
                                {/* <Rate
                                    tooltips={desc}
                                    onChange={onChangeRating}
                                    value={value}
                                  /> */}
                                <Rate

                                    style={{ fontSize: 30 }}
                                    tooltips={desc}
                                    onChange={onChangeRating}
                                    value={value}
                                    character={({ index }) =>
                                        customIcons[index + 1]
                                    }
                                />
                                {value ? (
                                    <span className="ant-rate-text">
                                        {desc[value - 1]}
                                    </span>
                                ) : (
                                    ""
                                )}
                            </span>
                        </Col>
                    </Row>
                </div>
            </Col>


        </div>
    );
};
export default KioskLocationInfoPage;

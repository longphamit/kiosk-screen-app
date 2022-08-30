import {
    Col,
    Image,
    Modal,
    Rate,
    Row,
} from "antd";
import "./styles.css";
import Slider from "react-slick";
import { PRIMARY_COLOR } from "../../../@app/constants/colors";
import { useEffect, useRef, useState } from "react";
import { getLocationByIdService } from "../../../@app/services/kiosk_location_service";
import { toast } from "react-toastify";
import { FaAngry, FaFrownOpen, FaGrinAlt, FaGrinHearts, FaGrinStars } from 'react-icons/fa';
import {
    PhoneFilled,
    MailFilled,
} from "@ant-design/icons";
import { getKioskInfoService, getKioskTemplateService } from "../../services/kiosk_service";
import ScrollContainer from "react-indiana-drag-scroll";
import { kioskRatingService } from "../../services/kiosk_rating_service";
import { KIOSK_ID } from "../../../@app/constants/key";
import { useDraggable } from "react-use-draggable-scroll";
import { LoadingPageCard } from "../../../@app/components/card/loading_page_card";
const contentStyle = {
    height: "300px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    contentAlign: "center",
    background: "#364d79",
};
const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};
const KioskLocationInfoPage = () => {
    const ref = useRef();
    const { events } = useDraggable(ref);
    const [kioskLocation, setKioskLocation] = useState();
    const [isLoadingRating, setIsLoadingRating] = useState(false);
    const [value, setValue] = useState(0);
    const [kioskId, setKioskId] = useState("");
    const desc = ["Terrible", "Bad", "Normal", "Good", "Wonderful"];
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
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        getKioskLocation();
        getKioskTemplate();
    }, []);

    const formatPhoneNumber = (phone) => {
        return (phone.substring(0, 4) + " " + phone.substring(4, 7) + ' ' + phone.substring(7, 10));
    }
    const customIcons = {
        1: <FaAngry size={50} style={{ padding: 0 }} />,
        2: <FaFrownOpen size={50} style={{ padding: 0 }} />,
        3: <FaGrinAlt size={50} style={{ padding: 0 }} />,
        4: <FaGrinStars size={50} style={{ padding: 0 }} />,
        5: <FaGrinHearts size={50} style={{ padding: 0 }} />,
    };
    return (
        <>
            <div ref={ref} {...events}>
                <div style={{ height: "94vh" }}>
                    {kioskLocation ?
                        <div style={{ marginLeft: 50, marginRight: 50, }}>
                            <Row>
                                <Col span={15} style={{ margin: 10 }}>
                                    <div className="location-info">
                                        <div>
                                            <div style={{ textAlign: "center" }}>
                                                <h2
                                                    style={{
                                                        fontWeight: "bold",
                                                        fontSize: '3.2em',
                                                        fontFamily: '"Fern", serif',
                                                        color: PRIMARY_COLOR,
                                                    }}
                                                >
                                                    {kioskLocation.name}
                                                </h2>
                                            </div>
                                            <ScrollContainer className="drag-list-vertical-container-info" vertical={true}>
                                                <div style={{
                                                    width: "100%",
                                                    fontSize: 18,
                                                    padding: 20,
                                                }} className="div-description center" dangerouslySetInnerHTML={{ __html: kioskLocation?.description }} />
                                            </ScrollContainer>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={8} style={{ margin: 10 }}>
                                    <div className="location-info">
                                        <div style={{ width: "100%" }}>
                                            <div >
                                                <Row span={24}>
                                                    <Col span={24}>
                                                        <Slider
                                                            {...sliderSettings}
                                                            autoplay
                                                            autoplaySpeed={2000}
                                                            style={{ margin: 10, textAlign: "center", alignItems: "center" }}
                                                        >
                                                            {
                                                                kioskLocation.listImage?.map((image) => {
                                                                    return (
                                                                        <div style={contentStyle}>
                                                                            <Image
                                                                                style={{ textAlign: "center" }}
                                                                                key={image.id}
                                                                                src={image.link}
                                                                            />
                                                                        </div>
                                                                    );
                                                                })
                                                            }
                                                        </Slider>
                                                    </Col>
                                                    <Col span={24}></Col>
                                                    <Col span={24}>
                                                        <div
                                                            style={{
                                                                background: "#FFC300",
                                                                marginBottom: 10,
                                                                padding: 15,
                                                                borderRadius: 10,
                                                                color: "#fff",
                                                                fontWeight:     "bold",
                                                                fontSize: 30,
                                                            }}
                                                        >
                                                            <Row>
                                                                <Col span={3} offset={1}>
                                                                    <PhoneFilled /> <br/>
                                                                    <MailFilled />
                                                                </Col>
                                                                <Col span={20} >
                                                                    {formatPhoneNumber(kioskLocation.hotLine)}<br />
                                                                    {kioskLocation.ownerEmail}
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col span={2}>
                                                                </Col>
                                                                <Col span={22} >
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Col>
                                                    <Col span={24}>
                                                        <div
                                                            style={{
                                                                background: "#3AB4F2",
                                                                marginBottom: 20,
                                                                borderRadius: 10,
                                                                color: "#fff",
                                                                fontWeight: "bold",
                                                                fontSize: 30,
                                                            }}
                                                        >
                                                            <Row style={{ textAlign: "center" }}>
                                                                <Col span={24} style={{ fontSize: 20, marginBottom: 10, fontSize: 30 }}>
                                                                    Rating
                                                                </Col>
                                                            </Row>
                                                            <Row style={{ textAlign: "center" }}>
                                                                <Col span={24}>
                                                                    <span>
                                                                        <Rate
                                                                            style={{ fontSize: 30, color: '#FFC300' }}
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
                                                </Row>
                                            </div>

                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        :
                        <LoadingPageCard />
                    }
                </div>
            </div>
        </>
    );
};
export default KioskLocationInfoPage;

import {
  Col,
  Row,
} from "antd";
import "./styles.css";
import { Card, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { CURRENT_LOCATION_LATITUDE, CURRENT_LOCATION_LONGITUDE, KIOSK_ID, USER_ID } from "../../../@app/constants/key";
import { getHomeBannerService } from "../../services/home_service";
import { getKioskTemplateService } from "../../services/kiosk_service";
const { Meta } = Card;
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

const HomePage = () => {
  const [banners, setBanners] = useState()
  const getHomeBanner = async () => {
    const partyId=localStorage.getItem(USER_ID)
    const kioskId=localStorage.getItem(KIOSK_ID)
    const res = await getHomeBannerService(partyId,kioskId);
    console.log(res.data)
    setBanners(res.data)
  }
  const navigate=useNavigate()
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      localStorage.setItem(CURRENT_LOCATION_LATITUDE, position.coords.latitude)
      localStorage.setItem(CURRENT_LOCATION_LONGITUDE, position.coords.longitude)
      console.log(position)
    });
  }
  const getKioskTemplate=async()=>{
    getKioskTemplateService(localStorage.getItem(KIOSK_ID)).then(res=>{
      console.log(res.data)
    })
  }
  useEffect(() => {
    window.scrollTo({ top: 50, left: 0, behavior: 'smooth' });
    getHomeBanner();
    getKioskTemplate();
    getCurrentLocation();
  }, []);
  const onClickBanner = (banner) => {
    console.log(banner)
    let url=""
    if (banner.keyType === "app_image") {
      url=`/iframe-interface?id=${banner.keyId}`
    }
    if (banner.keyType === "event_image") {
      url=`/event/${banner.keyId}`
    }
    if (banner.keyType === "poi_image") {
      url=`/poi/${banner.keyId}`
    }
    navigate(url)
  }

  return (
    <>
      <div style={{marginLeft: 50, marginRight: 50, height: "100vh" }}>
        <Row>
          <Col span={24}>
            {banners?<Slider
            {...sliderSettings}
              style={{ margin: 10, textAlign: "center", alignItems: "center" }}
              autoplay
              autoplaySpeed={2000}
            >
              {banners?.map((image) => {
                return (
                  <div>
                    <Row>
                    <img className="center home-image-banner" src={image.link} style={{width:"100%",maxHeight:800}}/>
                    </Row>
                  </div>
                );
              }
              )}
            </Slider>:null}
          </Col>
        </Row>

      </div>
    </>
  );
};
export default HomePage;

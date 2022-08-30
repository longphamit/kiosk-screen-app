import {
  Col,
  Row,
} from "antd";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { CURRENT_LOCATION_LATITUDE, CURRENT_LOCATION_LONGITUDE, KIOSK_ID, USER_ID } from "../../../@app/constants/key";
import { getHomeBannerService } from "../../services/home_service";
import { getKioskTemplateService } from "../../services/kiosk_service";
import { LoadingPageCard } from "../../../@app/components/card/loading_page_card";

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
    const partyId = localStorage.getItem(USER_ID)
    const kioskId = localStorage.getItem(KIOSK_ID)
    try {
      const res = await getHomeBannerService(partyId, kioskId);
      setBanners(res.data)
    } catch (e) {
      setBanners([])
    }
  }
  const navigate = useNavigate()
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      localStorage.setItem(CURRENT_LOCATION_LATITUDE, position.coords.latitude)
      localStorage.setItem(CURRENT_LOCATION_LONGITUDE, position.coords.longitude)
      console.log(position)
    });
  }
  const getKioskTemplate = async () => {
    getKioskTemplateService(localStorage.getItem(KIOSK_ID)).then(res => {
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
    let url = ""
    if (banner.keyType === "app_image") {
      url = `/iframe-interface?id=${banner.keyId}`
    }
    if (banner.keyType === "event_image") {
      url = `/event/${banner.keyId}`
    }
    if (banner.keyType === "poi_image") {
      url = `/poi/${banner.keyId}`
    }
    navigate(url)
  }

  return (
    <>
      <div style={{ marginLeft: 50, marginRight: 50, height: "95vh" }}>
        <Row>
          <Col span={24}>
            {banners ?
              <Slider
                {...sliderSettings}
                style={{ margin: 10, textAlign: "center", alignItems: "center" }}
                autoplay
                autoplaySpeed={2000}
              >
                {banners?.map((image) => {
                  return (
                    <div  onClick={() => onClickBanner(image)}>
                      <Row >
                        <div style={{
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                          borderRadius: 30,
                          backgroundImage: `url(${image.link})`, width: "100%", height: 900
                        }}>
                        </div>
                      </Row>
                    </div>
                  );
                }
                )}
              </Slider> :
              <LoadingPageCard />}
          </Col>
        </Row>

      </div>
    </>
  );
};
export default HomePage;

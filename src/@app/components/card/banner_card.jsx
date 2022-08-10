import { Col, Row } from "antd"

export const BannerCard = ({ item }) => {
    return <>
        <Row>
            <Col span={24} style={{ backgroundColor: 'black' }}>
                <img src={item.banner ? item.banner : 'https://img.timviec.com.vn/2021/07/banner-la-gi-5.jpg'} alt="" height={500} width={1920} style={{ opacity: 0.6 }} />
            </Col>
            <div style={{ zIndex: 1, position: 'relative', width: '40%', color: 'white', marginTop: -200, marginLeft: 30, fontWeight: 'bold', fontSize: 16 }}>
                <div style={{color:"#ffff"}} dangerouslySetInnerHTML={{ __html: item?.description }} />
            </div>
        </Row>
    </>

}
import { Col, Row } from "antd"

export const BannerCard = ({ item }) => {
    console.log(item)
    return <>
        <Row>
            <Col span={24} style={{
                backgroundColor: 'black',
                height: 600,
                backgroundImage: `url(${item.banner ? item.banner : 'https://img.timviec.com.vn/2021/07/banner-la-gi-5.jpg'})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>

            </Col>
            <div style={{ zIndex: 1, position: 'relative', width: '40%', color: 'white', marginTop: -200, marginLeft: 30, fontWeight: 'bold', fontSize: 16 }}>
                <div style={{color:"#000",backgroundColor:"#fff",padding:20,borderRadius:20,opacity:0.8}}>
                <div  dangerouslySetInnerHTML={{ __html: item.description }} />
                </div>
                <Row>
                    <Col>
                        
                    </Col>
                </Row>
            </div>
        </Row>
    </>

}
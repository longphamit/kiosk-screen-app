import { Image, Row, Spin } from "antd";
import { Carousel } from 'primereact/carousel';
export const CarouselCard = ({ item, imageHeight }) => {
    const itemTemplate = (image) => {
        return (
            <div className="product-item">
                <div className="product-item-content">
                    <Row justify='center' align='middle'>
                        <Image
                            style={{ textAlign: "center",minHeight:500 }}
                            key={image.id}
                            src={image.link}
                            height={imageHeight}
                        />
                    </Row>
                </div>
            </div>
        );
    }
    return <>
        {
            item ?
                <div className="card">
                    <Carousel
                        value={item.listImage}
                        numVisible={1}
                        numScroll={1}
                        itemTemplate={itemTemplate}
                        autoplayInterval={2000}
                    />
                </div> :
                <Spin className="center" />
        }
    </>


} 
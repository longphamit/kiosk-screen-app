import { Row } from "antd"
import NotFoundImg from './../../../assets/images/notfound.jpg'
export const ImageEmptyCard = ({ marginTop }) => {
    return <>
        <Row justify='center' align='middle' style={{ marginTop: marginTop }}>
            <img src={NotFoundImg} style={{ height: 400 }} />
        </Row>
        <Row justify='center' align='middle'>
            <label style={{ fontSize: 26, fontWeight: 'bold' }}>
                No Items Found
            </label>

        </Row>
        <Row justify='center' align='middle'>

            <label style={{ fontSize: 20 }}>
                We can't find any item matching your search.
            </label>
        </Row>
    </>
}
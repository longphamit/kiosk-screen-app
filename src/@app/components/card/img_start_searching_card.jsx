import { Row } from "antd"
import NotFoundImg from './../../../assets/images/searching.webp'
export const ImageStartSearchingCard = ({ marginTop }) => {
    return <>
        <Row justify='center' align='middle' style={{ marginTop: marginTop }}>
            <img src={NotFoundImg} style={{ height: 400 }} />
        </Row>
        <Row justify='center' align='middle'>
            <label style={{ fontSize: 20, fontWeight: 'bold' }}>
                Let's find the interesting places and event around here!
            </label>
        </Row>
    </>
}
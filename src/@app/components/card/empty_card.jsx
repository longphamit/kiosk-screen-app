import { Col, Empty, Row } from "antd"

export const EmptyCard = ({ marginTop}) => {
    return <Row justify='center' align='center' style={{ marginTop: marginTop }}>
        <Col>
            <Empty />
        </Col>
    </Row>
}
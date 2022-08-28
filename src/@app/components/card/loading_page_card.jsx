import { Drawer, Row } from "antd"
import loadingPageGif from './../../../assets/gif/loading_page.gif';

export const LoadingPageCard = ({ }) => {
    return <>
        <Row align="middle" justify="center">
            <Drawer
                placement="right"
                visible={true}
                closable={false}
                width={'100%'}
            >
                <Row align="middle" justify="center">
                    <img src={loadingPageGif} /><br />
                </Row>
                <Row align="middle" justify="center">
                    <p style={{ fontSize: 30, fontWeight: 'bold' }}>
                        Wait for few minutes, data is loading ....
                    </p>
                </Row>
            </Drawer>
        </Row>
    </>
}
import { Drawer, Row } from "antd"
import loadingMap from './../../../../../assets/gif/map_loading.gif';

export const LoadingMapComponent = ({ }) => {
    return <Row align="middle" justify="center">
        <Drawer
            placement="right"
            visible={true}
            closable={false}
            width={'100%'}
        >
            <Row align="middle" justify="center">
                <img src={loadingMap} alt="loading ..." /><br />
            </Row>
            <Row align="middle" justify="center">
                <p style={{ fontSize: 30, fontWeight: 'bold' }}>
                    Map is loading ....
                </p>
            </Row>
        </Drawer>
    </Row>
}
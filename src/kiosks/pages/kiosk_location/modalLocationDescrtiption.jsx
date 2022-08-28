import { Col, Modal, Row, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getLocationByIdService } from "../../../@app/services/kiosk_location_service";
import { getKioskInfoService } from "../../services/kiosk_service";
const ModalLocationDescription = ({ visible, onCancelModalLocation }) => {
    const [kioskLocation, setKioskLocation] = useState();
    const [loadingKioskLocation, setLoadingKioskLocation] = useState(false)
    const getKioskLocation = async () => {
        setLoadingKioskLocation(true)
        try {
            const kioskId = localStorage.getItem("KIOSK_ID");
            const resKioskInfo = await getKioskInfoService(kioskId);
            if (resKioskInfo.data.kioskLocationId) {
                const resKioksLocationInfo = await getLocationByIdService(
                    resKioskInfo.data.kioskLocationId,
                    false
                );
                console.log(resKioksLocationInfo.data);
                setKioskLocation(resKioksLocationInfo.data);
            } else {
                toast.error("can not get kiosk information");
            }
        } catch (e) {
            console.log(e)
        } finally {
            setLoadingKioskLocation(false)
        }
    };
    useEffect(() => {
        getKioskLocation();
    }, []);
    return <>
        <Modal footer={[]} width={1030} visible={visible} onCancel={onCancelModalLocation}>
            {
                loadingKioskLocation ?
                    <div>
                        <Row>

                            <Col span={24}>
                                <Skeleton className="center" />
                            </Col>

                        </Row>
                    </div> : <div style={{ width: 1000, padding: 20 }}>
                        {
                            <div className="div-description" dangerouslySetInnerHTML={{ __html: kioskLocation?.description }} />
                        }
                    </div>
            }

        </Modal>
    </>
}
export default ModalLocationDescription;
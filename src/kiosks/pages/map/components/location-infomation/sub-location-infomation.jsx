import { useEffect } from "react";
import "./../../styles.css";
import { SpecificPOILocation } from "./specific-poi-location";
import { SpecificEventLocation } from "./specfic-event-location";
import { Modal } from "antd";
export const SubLocationInfomation = ({ currentItem, currentLocation, modalVisible, setModalVisible }) => {
    useEffect(() => {
    }, []);

    return <>
        {/* Kiosk kh hiển thị thêm  */}
        {currentItem ?
            currentItem.timeStart || currentItem.openTime ?
                <>
                    <Modal
                        title="Details"
                        mask={false}
                        visible={modalVisible}
                        footer={null}
                        onCancel={() => setModalVisible(false)}
                    >
                        <div style={{maxHeight:'80vh', overflowX: 'auto'}}>
                        {currentItem.timeStart ? < SpecificEventLocation event={currentItem} currentLocation={currentLocation} /> :
                            <SpecificPOILocation poi={currentItem} currentLocation={currentLocation} />
                        }
                        </div>
                    </Modal>
                </> : null
            : null
        }
    </>
}
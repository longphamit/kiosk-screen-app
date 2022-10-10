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
                        width={1000}
                        mask={false}
                        visible={modalVisible}
                        footer={null}
                        style={{ marginTop: -80 }}
                        onCancel={() => setModalVisible(false)}
                    >
                        <div className="sub-info-scroll-bar">
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
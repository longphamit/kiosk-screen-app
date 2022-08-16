import './../styles.css'
import { EventIcon } from './Icon/event_icon';
import { KioskIcon } from './Icon/kiosk_icon';
import ScrollContainer from "react-indiana-drag-scroll";

const POICategoryComponent = ({ listPoiCategories, eventOnClick }) => {
    const ExtraCategory = [
        {
            name: 'Kiosk',
            icon: <img style={{ width: 80, height: 80 }} src={require("../../../../assets/images/kiosk_marker.png")} />
        },
        {
            name: 'Event',
            icon: <img style={{ width: 80, height: 80 }} src={require("../../../../assets/images/event-marker.png")} />
        }
    ]
    return (
        <>
            <div style={{
                background: "#fff",
                marginTop: 10,
                padding: 8,
                borderRadius: 20,
                position: "absolute",
                width: 800,
                top: 0,
                right: 100,
                zIndex: 2
            }} >
                <ScrollContainer style={{ width: "100%" }} className="drag-list-container"
                    horizontal={true}>
                    {ExtraCategory.map((e) => {
                        return (<>
                            <div
                                className='poi-category-card-box'
                                style={{ textAlign: "center" }}
                                onClick={() => { eventOnClick(e.name) }}
                            >
                                {e.icon} {e.name}
                            </div>
                        </>);
                    })}

                    {listPoiCategories ?
                        listPoiCategories.map((e) => {
                            return (<>
                                <div
                                    className='poi-category-card-box'
                                    style={{ textAlign: "center" }}
                                    onClick={() => { eventOnClick(e.id) }}
                                >
                                    <img style={{ width: 80, height: 80 }} src={e.logo} alt="" className='poi-category-card-box-img' />
                                    {e.name}
                                </div>
                            </>);
                        }) : null}
                    {listPoiCategories ?
                        listPoiCategories.map((e) => {
                            return (<>
                                <div
                                    className='poi-category-card-box'
                                    style={{ textAlign: "center" }}
                                    onClick={() => { eventOnClick(e.id) }}
                                >
                                    <img style={{ width: 80, height: 80 }} src={e.logo} alt="" className='poi-category-card-box-img' />
                                    {e.name}
                                </div>
                            </>);
                        }) : null}
                    {listPoiCategories ?
                        listPoiCategories.map((e) => {
                            return (<>
                                <div
                                    className='poi-category-card-box'
                                    style={{ textAlign: "center" }}
                                    onClick={() => { eventOnClick(e.id) }}
                                >
                                    <img style={{ width: 80, height: 80 }} src={e.logo} alt="" className='poi-category-card-box-img' />
                                    {e.name}
                                </div>
                            </>);
                        }) : null}
                </ScrollContainer>
            </div>
        </>
    );
}
export default POICategoryComponent;
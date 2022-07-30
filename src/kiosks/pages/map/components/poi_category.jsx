import './../styles.css'
import { EventIcon } from './Icon/event_icon';
import { KioskIcon } from './Icon/kiosk_icon';

const POICategoryComponent = ({ listPoiCategories, eventOnClick }) => {
    const ExtraCategory = [
        {
            name: 'Kiosk',
            icon: <img width={20} src={require("../../../../assets/images/kiosk_marker.png")}/>
        },
        {
            name: 'Event',
            icon: <img width={20} src={require("../../../../assets/images/event-marker.png")}/>
        }
    ]
    return (
        <>
            <div style={{ zIndex: 1, marginTop: 10, padding: 8 }} >
                {ExtraCategory.map((e) => {
                    return (<>
                        <button
                            className='poi-category-card-box'
                            onClick={() => { eventOnClick(e.name) }}
                        >
                            {e.icon} {e.name}
                        </button>
                    </>);
                })}
                {listPoiCategories ?
                    listPoiCategories.map((e) => {
                        return (<>
                            <button
                                className='poi-category-card-box'
                                onClick={() => { eventOnClick(e.id) }}
                            >
                                <img src={e.logo} alt="" className='poi-category-card-box-img' />
                                {e.name}
                            </button>
                        </>);
                    }) : null}
            </div>
        </>
    );
}
export default POICategoryComponent;
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import './../styles.css'
import { EventIcon } from './Icon/event_icon';
import { KioskIcon } from './Icon/kiosk_icon';

const POICategoryComponent = ({ listPoiCategories, eventOnClick }) => {
    const ExtraCategory = [
        {
            name: 'Kiosk',
            icon: <KioskIcon />
        },
        {
            name: 'Event',
            icon: <EventIcon />
        }
    ]

    useEffect(() => {
        //getMyAddress();
    }, []);

    return (
        <>
            <div style={{ zIndex: 1, marginTop: 10, padding: 8 }} >
                {ExtraCategory.map((e) => {
                    return (<>
                        <button
                            style={{ backgroundColor: '#fff', borderRadius: 10, border: 'white', padding: '5px 10px', marginRight: 15, boxShadow: '3px 3px #ededed', display: 'inline', height: 45, width: 120 }}
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
                                style={{ backgroundColor: '#fff', borderRadius: 10, border: 'white', padding: '5px 10px', marginRight: 15, boxShadow: '3px 3px #ededed', display: 'inline', height: 45, width: 120 }}
                                onClick={() => { eventOnClick(e.id) }}
                            >
                                <img src={e.logo} alt="" width={30} height={20} />
                                {e.name}
                            </button>
                        </>);
                    }) : null}
            </div>
        </>
    );
}
export default POICategoryComponent;
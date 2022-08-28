import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { getAddressService } from '../../../services/map_service';
import './../styles.css'

const MyAddress = ({ currentLocation }) => {
    const [isMyAddressLoading, setMyAddressLoading] = useState(false);
    const [myAddress, setMyAddress] = useState();

    const getMyAddress = async () => {
        try {
            setMyAddressLoading(true);
            let res = await getAddressService(currentLocation.longitude, currentLocation.latitude);
            setMyAddress(res.data.geoMetries[0].address);
        } catch (e) {
            console.error(e);
        } finally {
            setMyAddressLoading(false);
        }
    }
    useEffect(() => {
        getMyAddress();
    }, []);

    return <>
        <div id="marker-my-address-text">
            {isMyAddressLoading ? <Spin /> :
                myAddress ? <>
                    <img
                        alt="example"
                        src={require("../../../../assets/images/marker-1.png")}
                    />
                    {'Here: ' + myAddress}
                </> : <></>
            }
        </div>
    </>
}
export default MyAddress;
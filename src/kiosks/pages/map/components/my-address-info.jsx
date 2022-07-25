import { Button, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAddressService } from '../../../services/map_service';
import './../styles.css'

const MyAddress = ({ currentLocation }) => {
    const [isMyAddressLoading, setMyAddressLoading] = useState(false);
    const [myAddress, setMyAddress] = useState();
    let navigate = useNavigate();

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
       // getMyAddress();
    }, []);

    return <>
        <div id="marker-my-address-text">
            {isMyAddressLoading ? <Spin /> :
                myAddress ? <>
                    <img
                        style={{ width: 20, heigh: 20, marginRight: 10 }}
                        alt="example"
                        src={require("../../../../assets/images/marker-1.png")}
                    />
                    {myAddress}

                </> : <></>
            }
        </div>
        <div id="marker-my-address-text1">
            <Button type="primary" style={{ marginLeft: '20%' }} onClick={() => navigate("/")}>
                Back to Home
            </Button>
        </div>
    </>
}
export default MyAddress;
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './@app/redux/stores';
import i18n from './@app/configs/locales/i8n';
import { I18nextProvider } from 'react-i18next';
import AppRouter from './@app/routers/app-routers';
import { ToastContainer } from 'react-toastify';
import messaging, { getTokenCustom } from './kiosks/configs/firebase';
import { onMessage } from 'firebase/messaging';
import { notification } from 'antd';
import { SmileOutlined } from "@ant-design/icons";
import useDispatch from './@app/hooks/use_dispatch';
import { setReceiveNotifyChangeTemplate } from './@app/redux/slices/home_view';
import { KIOSK_ID, PARTY_ID } from './@app/constants/key';
import { getKioskInfoService } from './kiosks/services/kiosk_service';
const KioskId = "E86AFE8D-85A6-4B67-A385-DC79B6929A8E";
function App() {
  const getPartyId = async (kioskId: string) => {
    try {
      let res = await getKioskInfoService(kioskId);
      localStorage.setItem(PARTY_ID, res.data.id);
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    //read kiosk id from file config
    localStorage.setItem(KIOSK_ID, KioskId);
    //set partyid that created kiosk
    getPartyId(KioskId);
  }, []);
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AppRouter />
        <ToastContainer position="top-right" autoClose={3000} />
      </I18nextProvider>
    </Provider>
  );
}

export default App;

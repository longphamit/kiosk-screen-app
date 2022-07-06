import React, { useState } from 'react';
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
function App() {
  const [isTokenFound, setTokenFound] = useState(false);
  getTokenCustom(setTokenFound);
  onMessage(messaging, (payload) => {
    console.log("foreground")
    console.log(payload.notification?.body)
    console.log(payload.notification?.title)
    notification.open({
      message: payload.notification?.title,
      description: payload.notification?.body,
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  });
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

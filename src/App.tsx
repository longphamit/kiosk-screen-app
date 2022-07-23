import React, { useEffect, useState } from "react";

import "./App.css";
import { Provider } from "react-redux";
import store from "./@app/redux/stores";
import i18n from "./@app/configs/locales/i8n";
import { I18nextProvider } from "react-i18next";
import AppRouter from "./@app/routers/app-routers";
import { ToastContainer } from "react-toastify";



import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";


function App() {
  const joinRoom = async (KioskId: any, RoomId: any) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:5001/signalR")
        .configureLogging(LogLevel.Information)
        .build();
      connection.on("KIOSK_CONNECTION_CHANNEL", (KioskId: any, message: any) => {
        console.log("message received ", message);
      });
      await connection.start();
      await connection.invoke("joinRoom", { KioskId, RoomId });
    } catch (e: any) {
      console.log(e);
    }
  };
   useEffect(() => {joinRoom('226A1B9B-E3C6-4885-9694-5792D1775E7C','226A1B9B-E3C6-4885-9694-5792D1775E7C')});
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

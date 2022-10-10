
import "./App.css";
import { Provider } from "react-redux";
import store from "./@app/redux/stores";
import i18n from "./@app/configs/locales/i8n";
import { I18nextProvider } from "react-i18next";
import AppRouter from "./@app/routers/app-routers";
import { ToastContainer } from "react-toastify";


function App() {
  
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

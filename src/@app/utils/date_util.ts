import moment from "moment";

export const convertDate = (stringToConvert:any) => {
    return moment(new Date(stringToConvert)).format("DD/MM/YYYY");
};

export const convertTime =(hour:any,minute:any,second:any) => {
  return moment(hour+":" +minute+":" +second,"HH:mm:ss")
};
  

export  const getDate = (dateOfBirth: any) => {
    return moment(dateOfBirth);
};

export   const splitTimeString = (time:any) => {
    const timeSplit = time.split(".");
    return timeSplit[0];
  };

export  const formatDatePicker = (str:any) => {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  };

export  const formatTimePicker = (str:any) => {
    var date = new Date(str);
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);
    var second = ("0" + date.getSeconds()).slice(-2);
    return [hours, minutes, second].join(":");
  };
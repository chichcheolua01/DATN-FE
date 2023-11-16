import dayjs from "dayjs";
import avatarDefault from "@/assets/images/defaultAvt.png";
import { useToast } from "vue-toastification";

export const convertDateType = (date: Date, format: string) => {
  if (date === undefined) {
    return undefined;
  }
  return dayjs(date).format(format);
};

export const getDifferenceObject = (oldObj: any, newObj: any) => {
  const keys = Object.keys(oldObj);
  const different: any = {};
  keys.forEach((el: string) => {
    if (oldObj[el] !== newObj[el]) different[el] = newObj[el];
  });
  const filteredObj = Object.entries(different).reduce(
    (acc: any, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );
  return filteredObj;
};

const convertError = (type: number) => {
  switch (type) {
    case 401:
      return "Vui lòng đăng nhập lại.";
    case 403:
      return "Không có quyền truy cập.";
    default:
      return "Lỗi hệ thống.";
  }
};

export const convertStatusServiceType = (type: boolean) => {
  switch (type) {
    case true:
      return "Hoạt động";
    case false:
      return "Không hoạt động";
    default:
      return type;
  }
};
export const convertDepositRoomType = (type: boolean) => {
  switch (type) {
    case true:
      return "Đã hoàn thành";
    case false:
      return "Chưa hoàn thành";
    default:
      return type;
  }
};

export const convertPaidStatus = (status: boolean) => {
  switch (status) {
    case true:
      return "Đã thanh toán";
    case false:
      return "Chưa thanh toán";
    default:
      return status;
  }
};

export const formatCurrency = (amount: number) => {
  const roundedAmount = amount.toFixed(0);
  const strAmount = roundedAmount.toString();
  const result = strAmount.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  return result + " VND";
};

export const formatMonthYear = (dateString: string) => {
  const dateObject = new Date(dateString);
  const formattedDate = `${(dateObject.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${dateObject.getFullYear()}`;
  return formattedDate;
};

export const formatDayMonthYear = (inputDateString: string) => {
  const inputDate = new Date(inputDateString);
  const day = String(inputDate.getDate()).padStart(2, "0");
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const year = String(inputDate.getFullYear()).slice(2, 4);
  return `${day}/${month}/20${year}`;
};

export const removeEmptyFields = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "string" && obj[key].trim() === "") {
      delete obj[key];
    } else if (typeof obj[key] === "object") {
      removeEmptyFields(obj[key]);
    }
  });

  return obj;
};

export const randomString = (length: number) => {
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getCurrentDateString = () => {
  const date = new Date();

  const day = date.toLocaleString("default", { weekday: "long" });
  const month = date.toLocaleString("default", { month: "long" });
  const dayOfMonth = date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const timezone = date.getTimezoneOffset() / 60;
  const timezoneName = timezone > 0 ? "GMT" + timezone : "GMT" + timezone;

  return `${day} ${month} ${dayOfMonth} ${year} ${hour}:${minutes}:${seconds} ${timezoneName} (Giờ Đông Dương)`;
}

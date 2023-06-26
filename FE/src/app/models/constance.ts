import { CarStatus } from "./enum";
import { CarFeatureElement, City, Color } from "./model";
import { CarAdminResponse, IdNameResponse } from "./response/model";
export const TEXT_SPACE_REGEX = "^[a-zA-Z\\s]*$"
export const NUMBER_REGEX = "^[0-9]*$"
export const SD_MODE = "SELF_DRIVING"
export const WD_MODE = "WITH_DRIVER"

//address api url
export const ADDRESS_API = "/";
export const GET_DISTRICTS_BY_CITY = `${ADDRESS_API}districts-by-city`;
export const GET_WARDS_BY_DISTRICT = `${ADDRESS_API}wards-by-district`;
export const SEARCH_ADDRESS = "/search-address";
export const GET_ALL_PROVINCE = "/api/provinces/findAll";
export const GET_ALL_DISTRICT_BY_PROVINCE = "/api/districts/findByProvinceId";
export const GET_ALL_WARD_BY_PROVINCE_DISTRICT = "/api/wards/getByProvinceAndDistrict";


//api urls
export const GET_ALL_BRAND = "/api/brands/getModels";
export const GET_MODEL_BY_BRAND = "/api/brands/getModels";
export const GET_ALL_FEATURE = "/api/features/findAll";

export const REGISTER_NEW_CAR = "/api/cars/registerNewCar";
export const GET_ALL_REGISTERED_CAR = "/api/cars/findRegisteredCar";

export const GET_ALL_SERVICE_TYPES = "/api/services/findAll";
export const GET_ALL_CAR_STATUSES = "/api/statuses/findAll";

export const GET_ALL_CAR = "/api/cars/findAll";
export const UPDATE_CAR_ADMIN = "/api/cars/updateCar";

export const GET_ALL_RENTAL_BY_OWNER = "/api/rentals/findByOwner";
export const GET_RENTAL_DETAILS = "/api/rentals/findById";
export const GET_ALL_RENTAL_BY_CAR_OWNER = "/api/rentals/findAllCalendarByCarOwner";

export const ACCEPT_RENTAL = "/api/rentals/acceptRental";
export const REJECT_RENTAL = "/api/rentals/rejectRental";
export const CONFIRM_DELIVERED_CAR_TO_RENTER = "/api/rentals/confirmDeliveredCarToRenter";
export const COMPLETE_RENTAL = "/api/rentals/completeRental";
export const SEARCH_CAR = "/api/cars/searchCar";

//price repeated calendar
export const GET_ALL_CALENDAR = "/api/rentals/findAllCalendar";
export const GET_CAR_CALENDAR = "/api/calendar/getCalendar";
export const GET_PRICE_BY_DATE = "/api/calendar/getPriceByDate";
export const SAVE_CUSTOM_PRICE = "/api/calendar/saveCustomPrice";
export const DELETE_CUSTOM_PRICE = "/api/calendar/deleteCustomPrice";

//busy repeated calendar
export const GET_ALL_BUSY_CALENDAR = "/api/calendar/getBusyCalendar";
export const SAVE_CUSTOM_BUSY = "/api/calendar/saveCustomBusy";
export const DELETE_CUSTOM_BUSY = "/api/calendar/deleteCustomBusy";

export const GET_ALL_STAT_BY_OWNER = "/api/statistics/getAll";
export const GET_CHART_DATA_OWNER = "/api/statistics/getChartData";
export const GET_ALL_STAT = "/api/statistics/getAllChartData";

//extra fees name
export const DELIVERY_TO_TENANT = "Giao xe tận nơi";
export const DISTANCE_LIMIT = "Giới hạn số KM";
export const MONEY_UNIT = "VND";
export const DISTANCE_UNIT = "KM";

export const URL_API = "http://localhost:8080"
export const CAR_IMG = `${URL_API}/uploads/car/`;
export const FEATURE_ICON = `${URL_API}/uploads/feature-icon/`;
export const OAUTH_CLIENT_ID = "157325840295-pmeacr9ak8e0beepamml4lsoqtkgajam.apps.googleusercontent.com"
export const FEATURE_DIRECT_LINK = `${URL_API}/uploads/feature-icon/`
export const CAR_FEATURES: CarFeatureElement[] = [
    {
        id: "map",
        iconUrl: 'https://n1-cstg.mioto.vn/v4/p/m/icons/features/map.png',
        title: "Bản đồ"
    },
    {
        id: "bluetooth",
        iconUrl: 'https://n1-cstg.mioto.vn/v4/p/m/icons/features/bluetooth.png',
        title: "Bluetooth"
    },
    {
        id: "camera360",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/360_camera.png",
        title: "Camera 360"
    },
    {
        id: "parking-camera",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/parking_camera.png",
        title: "Camera cập lề"
    },
    {
        id: "dash-camera",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/dash_camera.png",
        title: "Camera hành trình"
    },
    {
        id: "reverse-camera",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/reverse_camera.png",
        title: "Camera lùi"
    },
    {
        id: "tpms",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/tpms.png",
        title: "Cảm biến áp suất lốp"
    },
    {
        id: "impact-sensor",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/impact_sensor.png",
        title: "Cảm biến va chạm"
    },
    {
        id: "head-up",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/head_up.png",
        title: "Cảnh báo tốc độ"
    },
    {
        id: "sunroof",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/sunroof.png",
        title: "Cửa sổ trời"
    },
    {
        id: "gps",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/gps.png",
        title: "Định vị GPS"
    },
    {
        id: "babyseat",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/babyseat.png",
        title: "Ghế trẻ em"
    },
    {
        id: "usb",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/usb.png",
        title: "Khe cắm USB"
    },
    {
        id: "spare-tire",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/spare_tire.png",
        title: "Lốp dự phòng"
    },
    {
        id: "dvd",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/dvd.png",
        title: "Màn hình DVD"
    },
    {
        id: "bonnet",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/bonnet.png",
        title: "Nắp thùng xe bán tải"
    },
    {
        id: "etc",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/etc.png",
        title: "Thu phí không dừng"
    },
    {
        id: "airbags",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/airbags.png",
        title: "Túi khí an toàn"
    },
]

export const TRANSMISSIONS = [
    { value: "AUTOMATIC", name: "Tự động" },
    { value: "MANUAL", name: "Số sàn" }
];

export const COLORS: Color[] = [{ "value": "WHITE", "name": "Trắng" }, { "value": "BLACK", "name": "Đen" }, { "value": "NAVYBLUE", "name": "Xanh dương" }, { "value": "SILVER", "name": "Bạc" }, { "value": "GRAY", "name": "Xám" }, { "value": "RED", "name": "Đỏ" }, { "value": "GREEN", "name": "Xanh lá" }, { "value": "BROWN", "name": "Nâu" }, { "value": "YELLOW", "name": "Vàng" }, { "value": "TURQUOISE", "name": "Xanh ngọc" }];

import Cookies from "js-cookie";

export const BASE_URL = 'https://apis.ccbp.in';

export const getToken = () => {
    return Cookies.get('token');
}
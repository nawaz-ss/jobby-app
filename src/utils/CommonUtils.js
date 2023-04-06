import Cookies from "js-cookie";

export const BASE_URL = 'https://apis.ccbp.in';

export const getToken = () => {
    return Cookies.get('token');
}

export const EMPLOYMENT_TYPES = [
    {label: 'Full Time', value: 'FULLTIME'},
    {label: 'Part Time', value: 'PARTTIME'},
    {label: 'Freelance', value: 'FREELANCE'},
    {label: 'Internship', value: 'INTERNSHIP'},
];

export const SALARY_RANGES = [
    {label: '10 LPA and above', value: '1000000'},
    {label: '20 LPA and above', value: '2000000'},
    {label: '30 LPA and above', value: '3000000'},
    {label: '40 LPA and above', value: '4000000'},
]
import axios from 'axios';
import { atom, useRecoilState } from 'recoil';

// set django testserver address in development mode
const baseUrl = ((!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ?
    ("http://localhost:8000") : (""));

if (baseUrl !== "") {
    axios.defaults.baseURL = baseUrl;
}

const loginUrl = baseUrl + '/buying/auth/login/';

// send session cookies
axios.defaults.withCredentials = true;

type AuthInfo = {
    isAuthenticated: boolean,
    userName: string,
}

export const authState = atom<AuthInfo>({
    key: 'authState',
    default: {
        isAuthenticated: false,
        userName: "",
    }
})

export function queryCurrentUser(): Promise<AuthInfo> {
    // query current-user from back-end
    return axios.get('/buying/current-user/', { withCredentials: true })
        .then(response => {
            const userName = response.data.name;
            return {
                isAuthenticated: true,
                userName: userName,
            };
        });
}


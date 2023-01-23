import React, { createContext, FunctionComponent, useContext, useState } from 'react';
import axios from 'axios';

// set django testserver address in development mode
const baseUrl = ((!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ?
    ("http://localhost:8000") : (""));

if (baseUrl !== "") {
    axios.defaults.baseURL = baseUrl;
}

const loginUrl = baseUrl + '/buying/auth/login/';

// send session cookies
axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = "csrftoken"

type Auth = {
    isAuthenticated: boolean,
    userName: string,
    setUserName: (name: string) => void,
    userId: string,
    setUserId: (name: string) => void,
    loginUrl: string,
    logout: () => void
}

const authContext = createContext<Auth>({
    isAuthenticated: false, 
    userName: '',
    setUserName: (name: string) => {},
    userId: '',
    setUserId: (id: string) => {},
    loginUrl: loginUrl,
    logout: () => {}
});

// Provider component
// makes auth object available to any child component that calls useAuth().
export const ProvideAuth: FunctionComponent = (props) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{props.children}</authContext.Provider>;
}

export function useAuth() {
    return useContext(authContext);
}

function useProvideAuth(): Auth
{
    const [user, setUser] = useState<string>(() => {
        return localStorage.getItem('userName') || '';
    });

    const setUserName = (name: string) => {
        setUser(name)
        localStorage.setItem('userName', name);
    }

    const [id, setId] = useState<string>(() => {
        return localStorage.getItem('userId') || '';
    })

    const setUserId = (id: string) => {
        setId(id)
        localStorage.setItem('userId', id)
    }

    const logout = () => {
        axios.get(baseUrl + '/buying/auth/logout/')
            .then(response => {
                setUserName('')
                setUserId('')
            })
            .catch(error => {
                console.log('error on logout: '+ error)
            });
    }
    
    return {
        isAuthenticated: user !== '',
        userName: user,
        setUserName,
        userId: id,
        setUserId,
        loginUrl,
        logout
    }
}


export function queryCurrentUserNameAndId(): Promise<{name: string, id: string}> {
    // query current-user from back-end
    return axios.get('/buying/current-user/', { withCredentials: true })
        .then(response => {
            return {name: response.data.name, id: response.data.uuid};
        });
}

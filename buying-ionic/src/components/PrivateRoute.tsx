import React, {FunctionComponent } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useRecoilValue } from "recoil";
import { authState } from '../state/Auth';

const PrivateRoute: FunctionComponent<RouteProps> = (props) => {
    const auth = useRecoilValue(authState);
    const {children, component: Component, ...rest} = props;

    return(
        <Route {...rest} render={(renderProps) => 
            auth.isAuthenticated ? (
                Component ? (
                <Component {...renderProps} />
                ) : (
                children    
                )
            ) : (
            <Redirect to="/nologin"/>
        )}
        />
    );
}

export default PrivateRoute;
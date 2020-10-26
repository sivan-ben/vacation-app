import { Redirect, withRouter } from "react-router-dom";
import React from "react";
import { useSelector } from 'react-redux'


const PrivateRoute = (props: any) => {
    const tokenFromLocal = localStorage.getItem('token')
    const admin = useSelector((state: any) => state.isAdmin);
    const isCurrentPage = window.location.pathname === props.path;
    const notValidUser = !tokenFromLocal && props.private && isCurrentPage;
    const notValidAdmin = !admin && props.isAdmin && isCurrentPage;


    if (notValidUser || notValidAdmin) {
        return <Redirect to='/login' />;
    }

    return props.children;
}

export default withRouter(PrivateRoute);
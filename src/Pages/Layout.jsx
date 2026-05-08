import React from 'react';
import {Outlet} from "react-router"
import FCHeader from '../Componenets/FCHeader';
import FCFooter from '../Componenets/FCFooter';

const Layout = () => {
    return (
        <>
            <FCHeader></FCHeader>
            <Outlet></Outlet>
            <FCFooter></FCFooter>
        </>
    );
}

export default Layout;

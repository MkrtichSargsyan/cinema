import React from 'react';
import Header from "../../components/header";

const MainLayout = (props) => {
    return (
        <>
            <Header {...props}/>
            {props.children}
        </>
    );
};

export default MainLayout;
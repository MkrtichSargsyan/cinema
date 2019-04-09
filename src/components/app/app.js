import React from 'react';
import MainLayout from "../../layouts/main_layout/main_layout";
import {Switch, Route, Redirect} from 'react-router-dom';


import Catalog from '../catalog';
import FilmDetails from "../film_details/filmDetails";


const App = (props) => {
    const currentUser = props.user;
    return (
        <MainLayout user={props.user}>
            <Switch>
                <Route exact path={'/catalog'} render={props => <Catalog {...props} user={currentUser}/>}/>
                <Route exact path={'/catalog/:id'} component={FilmDetails}/>
                <Redirect from={'/'} to={'/catalog'}/>
            </Switch>
        </MainLayout>
    );
};


export default App;
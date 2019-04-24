import React from 'react';
import MainLayout from "../../layouts/main_layout/main_layout";
import {Switch, Route, Redirect} from 'react-router-dom';


import Catalog from '../catalog';
import FilmDetails from "../film_details/filmDetails";
import Hall from "../hall/hall";
import NotFound from "../notFound/notFound";
import CreateSeans from "../createSeans/createSeans";


const App = (props) => {
    const currentUser = props.user;
    return (
        <MainLayout user={props.user}>
            <Switch>
                <Route exact path={'/admin'} component={CreateSeans}/>
                <Route exact path={'/catalog'} render={props => <Catalog {...props} user={currentUser}/>}/>
                <Route exact path={'/catalog/:id'} render={props => <FilmDetails {...props} user={currentUser}/>}/>
                <Route exact path={'/catalog/:id/:hall'}
                       render={props => currentUser ? <Hall {...props} user={currentUser}/> :
                           <Redirect to={'/catalog'}/>}/>
                <Route path={'/not-found'} component={NotFound}/>
                <Redirect exact from={'/'} to={'/catalog'}/>
                <Redirect to={'/not-found'}/>
            </Switch>
        </MainLayout>
    );
};


export default App;
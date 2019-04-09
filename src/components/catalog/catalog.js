import React from 'react';
import './catalog.css';

import {connect} from "react-redux";
import {fetchFilms} from '../../actions/index';
import {selectFilm} from "../../actions/index";
// import {Link} from "react-router-dom";

const API_KEY = '8f41c127dae95fb58daf9550cee43f28';
const PAGE_NUMBER = 10;
const URL = `http://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${PAGE_NUMBER}`;
const IMAGES_URL = `http://image.tmdb.org/t/p/w500`;


class Catalog extends React.Component {


    async componentDidMount() {
        await this.props.fetchFilms(URL);
    }


    handleShowInfo = (film) => {
        this.props.history.push(`/catalog/${film.title.split(' ').join('_')}`);
        this.props.selectFilm(film);
    };

    renderFilms = () => {

        // return (
        //     this.props.films && this.props.films.map(film => {
        //             return (
        //                 <div key={film.id} className={'film_box'}>
        //                     <img src={`${IMAGES_URL}${film.poster_path}`} alt="img"/>
        //                     <div>{film.original_title.substring(0, 30)}</div>
        //                     <div className={'show_info'}>
        //                         <Link to={{
        //                             pathname: `/catalog/${film.title.split(' ').join('_')}`,
        //                             query: film
        //                         }}> Show info</Link>
        //                     </div>
        //                 </div>
        //             )
        //         }
        //     )
        // )
        return (this.props.films && this.props.films.map(film => {
                    return (
                        <div key={film.id} className={'film_box'}>
                            <img src={`${IMAGES_URL}${film.poster_path}`} alt="img"/>
                            <div>{film.original_title.substring(0, 30)}</div>

                            <div className={'show_info'}>
                                <div onClick={() => this.handleShowInfo(film)}>Show info</div>
                            </div>
                        </div>
                    )
                }
            )
        )
    };

    render = () => {
        return (
            <div style={{backgroundColor: '#1b1b1b'}}>
                <div className={'wrapper'}>
                    <div className={'catalog'}>
                        {this.renderFilms()}
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        films: state.films
    }
};

export default connect(mapStateToProps, {fetchFilms, selectFilm})(Catalog);
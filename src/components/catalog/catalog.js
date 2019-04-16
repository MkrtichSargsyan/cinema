import React from 'react';
import './catalog.css';

import {connect} from "react-redux";
import {fetchFilms} from '../../actions/index';

const API_KEY = '8f41c127dae95fb58daf9550cee43f28';
const PAGE_NUMBER = 1;
const URL = `http://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${PAGE_NUMBER}`;
const IMAGES_URL = `http://image.tmdb.org/t/p/w500`;


class Catalog extends React.Component {


    async componentDidMount() {
        await this.props.fetchFilms(URL);
    }

    selectFilm = async (film) => {

        this.props.history.push({
            pathname: `/catalog/${film.title.split(' ').join('_')}`,
            state: {id: film.id}
        });
    };

    renderFilms = () => {
        return (
            this.props.films.map(film => {
                    return (
                        <div key={film.id} className={'film_box'}>
                            <img src={`${IMAGES_URL}${film.poster_path}`} alt="img"/>
                            <div>{film.original_title.substring(0, 30)}</div>
                            <div className={'show_info'}>
                                <div className={'link'} onClick={() => this.selectFilm(film)}>
                                    Show info
                                </div>
                            </div>
                        </div>
                    )
                }
            )
        )
    };


    render = () => {
        const {error, loading, films} = this.props;

        return (
            <div style={{backgroundColor: '#1b1b1b',minHeight:'calc(100vh - 80px)'}}>
                <div className={'wrapper'}>
                    <div className={'catalog'}>
                        {error ? <div style={{color: 'white'}}>{error.toString()}</div> : null}
                        {loading ?
                            <span style={{color: 'white'}}>Loading...</span>
                            :
                            films ? this.renderFilms() : null}
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        films: state.filmReducer.films,
        loading: state.filmReducer.loading,
        error: state.filmReducer.error,
        selectedFilm: state.filmReducer.selectedFilm,
    }
};

export default connect(mapStateToProps, {fetchFilms})(Catalog);
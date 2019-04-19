import React from 'react';
import './catalog.css';

import {connect} from "react-redux";
import {fetchFilms} from '../../actions/index';
import {firedb} from "../../firebase";

const API_KEY = '8f41c127dae95fb58daf9550cee43f28';
const PAGE_NUMBER = 1;
const URL = `http://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${PAGE_NUMBER}`;
const IMAGES_URL = `http://image.tmdb.org/t/p/w500`;


class Catalog extends React.Component {


    state = {
        films: ''
    };


    setHalls = () => {
        firedb.ref('halls').once('value', function (snapshot) {
            if (snapshot.exists()) {
                console.log('exist');
            } else {
                firedb.ref('halls').set({
                    hall1: {
                        places: {
                            0: false,
                            1: false,
                            2: false,
                            3: false,
                            4: false,
                            5: false,
                            6: false,
                            7: false,
                            8: false,
                            9: false,
                        },
                        seanses: ' ',
                    },
                    hall2: {
                        places: {
                            0: false,
                            1: false,
                            2: false,
                            3: false,
                            4: false,
                        },
                        seanses: ' ',
                    },
                    hall3: {
                        places: {
                            0: false,
                            1: false,
                            2: false,
                            3: false,
                            4: false,
                            5: false,
                            6: false,
                            7: false,
                            8: false,
                            9: false,
                            10: false,
                            11: false,
                            12: false,
                            13: false,
                            14: false,
                        },
                        seanses: ' ',
                    },
                    hall4: {
                        places: {
                            0: false,
                            1: false,
                            2: false,
                            3: false,
                            4: false,
                            5: false,
                            6: false,
                            7: false,
                            8: false,
                            9: false,
                        },
                        seanses: ' ',
                    },

                });
            }
        });
    };


    async componentDidMount() {
        await this.props.fetchFilms(URL);
        const films = this.props.films;

        this.setHalls();

        let dbfilms = '';

        await firedb.ref('films').once('value', function (snapshot) {
            if (snapshot.exists()) {
                dbfilms = snapshot.val();
                console.log('exist');
            } else {
                firedb.ref('films').set(
                    {...films}
                );
            }
        });

        this.setState({
            films: dbfilms
        })

    }

    selectFilm = film => {

        this.props.history.push({
            pathname: `/catalog/${film.title.split(' ').join('_')}`,
            state: {id: film.id}
        });
    };

    renderFilms = () => {

        return (this.state.films.map(film => {
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

        const {error, loading} = this.props;

        return (
            <div style={{backgroundColor: '#1b1b1b', minHeight: 'calc(100vh - 80px)'}}>
                <div className={'wrapper'}>
                    <div className={'catalog'}>
                        {error ? <div style={{color: 'white'}}>{error.toString()}</div> : null}
                        {loading ?
                            <span style={{color: 'white'}}>Loading...</span>
                            :
                            this.state.films ? this.renderFilms() : <div style={{color: 'white'}}>Loading...</div>}
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
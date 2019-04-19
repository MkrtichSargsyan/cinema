import React from 'react';
import './filmDetails.css';
import {connect} from "react-redux";

import {selectFilm} from "../../actions";
import {openModal} from '../../actions';

const IMAGES_URL = `http://image.tmdb.org/t/p/w500`;


class FilmDetails extends React.Component {


    async componentDidMount() {
        await this.props.selectFilm(this.props.location.state.id);
    }

    reserveFilm = () => {

        const {selectedFilm} = this.props;

        let path = this.props.history.location.pathname;
        return this.props.user
            ?
            this.props.history.push({
                pathname: `${path}/hall`,
                state: {title: selectedFilm.original_title}
            })
            :
            this.props.openModal(true);

    };

    render() {
        const {selectedFilm, loading} = this.props;

        console.log(selectedFilm);

        return (
            <div style={{backgroundColor: '#1b1b1b', height: 'calc(100vh - 80px)'}}>
                <div className={'wrapper'}>
                    <div className={'film_detail'}>
                        {selectedFilm ?
                            <>
                                <div>
                                    <img src={`${IMAGES_URL}${selectedFilm.poster_path}`} alt="img"/>
                                </div>
                                <div className={'info'}>
                                    <div><span>original_title:</span>{selectedFilm.original_title}</div>
                                    <div><span>ID:</span> {selectedFilm.id}</div>
                                    <div><span>Adult:</span> {selectedFilm.adult.toString()}</div>
                                    <div><span>popularity:</span> {selectedFilm.popularity}</div>
                                    <div><span>release_date:</span> {selectedFilm.release_date}</div>
                                    <div><span>vote_average:</span> {selectedFilm.vote_average}</div>
                                    <div><span>vote_count:</span> {selectedFilm.vote_count}</div>
                                    <div><span>overview:</span> {selectedFilm.overview}</div>
                                    <button onClick={() => this.reserveFilm()}>reserve</button>
                                </div>
                            </>
                            : loading ? 'loading...' : null
                        }

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedFilm: state.filmReducer.selectedFilm,
        loading: state.filmReducer.loading,
    }
};

export default connect(mapStateToProps, {selectFilm, openModal})(FilmDetails);
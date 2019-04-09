import React from 'react';
import './filmDetails.css';
import {connect} from "react-redux";

const IMAGES_URL = `http://image.tmdb.org/t/p/w500`;


const FilmDetails = (props) => {
    const data = props.selectedFilm;
    return (
        data ?
            <div style={{backgroundColor: '#1b1b1b', minHeight: '700px'}}>
                <div className={'wrapper'}>
                    <div className={'film_detail'}>
                        <div>
                            <img src={`${IMAGES_URL}${data.poster_path}`} alt="img"/>
                        </div>
                        <div className={'info'}>
                            <div><span>original_title:</span>{data.original_title}</div>
                            <div><span>ID:</span> {data.id}</div>
                            <div><span>Adult:</span> {data.adult.toString()}</div>
                            <div><span>popularity:</span> {data.popularity}</div>
                            <div><span>release_date:</span> {data.release_date}</div>
                            <div><span>vote_average:</span> {data.vote_average}</div>
                            <div><span>vote_count:</span> {data.vote_count}</div>
                            <div><span>overview:</span> {data.overview}</div>
                            <button onClick={() => console.log('sdfsd')}>reserve</button>
                        </div>
                    </div>
                </div>
            </div> : ''
    );
};

const mapStateToProps = state => {
    return {
        selectedFilm: state.films
    }
};

export default connect(mapStateToProps)(FilmDetails);
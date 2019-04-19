import React, {Component} from 'react';
import './hall.css';
import {firedb} from "../../firebase";
import {connect} from "react-redux";
import {openModal} from "../../actions";
import Modal from "../modal/modal";
import HallModal from "./hall_modal/hallModal";


class Hall extends Component {


    state = {
        seans: '',
        filmTitle: '',
        places: '',
        hallNumber: '',
        chairs: '',
        reservedChairs: '',
        seansName: '',
        placeNumber: '',
        loading: false,
    };


    async componentDidMount() {
        const filmTitle = this.props.history.location.state.title;
        let places = 'no seans';
        let seans = this.state.seans;

        //get seans from fb
        await firedb.ref('seanses').once('value', function (snapshot) {
            if (snapshot.exists()) {
                const snapVal = snapshot.val();
                const seanses = Object.values(snapVal).map(seans => seans);
                seans = seanses.find(seans => seans.film === filmTitle);
            }
        });

        seans && await firedb.ref(`halls/${seans.hall}`).once('value', function (snapshot) {
            places = snapshot.val().places;
            const reservedPlaces = seans.reservedPlaces;

            places = places.map((item, i) => {
                return reservedPlaces.includes(i);
            });

        });


        let hallNumber = seans && seans.hall;
        let seansName = seans && seans.seansName;
        let chairs = typeof places !== 'string' && places.length;

        this.setState({
            filmTitle,
            places,
            hallNumber,
            chairs,
            seansName,
            seans,
        })
    }


    openModal = num => {
        this.setState({placeNumber: num});
        return this.props.openModal(true);
    };

    closeModal = () => {
        return this.props.openModal(false);
    };


    reserveChair = async i => {
        this.closeModal();

        this.setState({
            loading: true,
        });
        const seans = {...this.state.seans};
        seans.reservedPlaces = [...seans.reservedPlaces, i];

        await firedb.ref(`seanses/${this.state.seansName}`).set({
            ...seans
        });

        let places = this.state.places;
        seans && await firedb.ref(`halls/${seans.hall}`).once('value', function (snapshot) {
            places = snapshot.val().places;
            const reservedPlaces = seans.reservedPlaces;

            places = places.map((item, i) => {
                return reservedPlaces.includes(i);
            });

        });
        this.setState({
            places,
            seans,
            loading: false,
        });
    };

    renderRow = () => {
        const chairs = typeof this.state.places !== 'string' ? this.state.places.map((place, i) => {
                return (
                    <div
                        key={i}
                        className={place ? 'reservedChair chair' : 'chair'}
                        onClick={() => this.openModal(i)}
                    >
                        {this.state.loading && this.state.placeNumber === i ?
                            <div className={'loader'}/> :
                            <span style={{zIndex: '200'}}>{i + 1}</span>}
                    </div>
                )
            }) :
            <div style={{color: 'white'}}>{this.state.places}</div>;

        return (
            <div className={'row'}>
                {chairs}
            </div>
        )
    };

    render() {

        return (
            <div style={{backgroundColor: '#1b1b1b', height: 'calc(100vh - 80px)'}}>
                <div className={'wrapper'}>
                    <div className={'hall_wrapper'}>
                        <>
                            {this.props.showModal ?
                                <Modal clicked={this.closeModal}>
                                    <HallModal
                                        seansName={this.state.seansName}
                                        filmTitle={this.state.filmTitle}
                                        placeNumber={this.state.placeNumber}
                                        cancel={this.closeModal}
                                        submit={() => this.reserveChair(this.state.placeNumber)}
                                    />
                                </Modal> : null}

                            <div className={'hall'}>
                                <div className={'bg_image top'}/>
                                <div className={'bg_image left'}/>
                                <div className={'places'}>
                                    {this.renderRow()}
                                </div>
                            </div>
                            <div className={'hall_info'}>
                                <div>
                                    <span className={'margin20'}>Film Title </span> {this.state.filmTitle}
                                </div>
                                <div>
                                    <span className={'margin20'}>Hall number </span> {this.state.hallNumber}
                                </div>
                                <div>
                                    <span className={'margin20'}>Chairs </span> {this.state.chairs}
                                </div>
                                <div>
                                    <span className={'margin20'}>Seans name </span> {this.state.seansName}
                                </div>
                            </div>
                        </>

                    </div>

                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        showModal: state.modalReducer.showModal,
    }
};

export default connect(mapStateToProps, {openModal})(Hall);
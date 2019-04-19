import React, {Component} from 'react';
import './createSeans.css';
import {firedb} from "../../firebase";

class CreateSeans extends Component {


    state = {
        films: '',
        halls: '',
        seansData: {
            seansName: '',
            film: 'Shazam!',
            hall: 'hall1',
            start: '',
            end: '',
            reservedPlaces: '',
        }
    };

    componentDidMount() {
        firedb.ref('films').once('value')
            .then((snapshot) => {
                this.setState({
                    films: snapshot.val()
                })
            });
        firedb.ref('halls').once('value')
            .then((snapshot) => {
                this.setState({
                    halls: snapshot.val()
                })
            })
    }

    createSeans = (e) => {
        e.preventDefault();
        const hall = this.state.seansData.hall;
        const seansName = this.state.seansData.seansName;
        firedb.ref(`halls/${hall}/seanses/`).set({
            seansName
        });
        firedb.ref(`seanses/${this.state.seansData.seansName}`).set({
            ...this.state.seansData
        });
    };

    selectFilm = () => {
        return this.state.films && this.state.films.map(film => {
            return <option key={film.original_title}>{film.original_title}</option>
        })
    };

    selectHall = () => {
        return this.state.halls && Object.keys(this.state.halls).map(hall => {
            return <option key={hall} onChange={(e) => this.changeHall(e)}>{hall}</option>
        })
    };

    changeHall = (e) => {

        const dataToChange = {...this.state.seansData};
        dataToChange.hall = e.target.value;

        this.setState({
            seansData: dataToChange
        })
    };

    changeFilm = (e) => {
        const dataToChange = {...this.state.seansData};
        dataToChange.film = e.target.value;
        this.setState({
            seansData: dataToChange
        })
    };

    changeTimeStart = (e) => {
        const dataToChange = {...this.state.seansData};
        dataToChange.start = e.target.value;
        this.setState({
            seansData: dataToChange
        })
    };
    changeTimeEnd = (e) => {
        const dataToChange = {...this.state.seansData};
        dataToChange.end = e.target.value;
        this.setState({
            seansData: dataToChange
        })
    };

    changeSeansName = (e) => {
        const dataToChange = {...this.state.seansData};
        dataToChange.seansName = e.target.value;
        this.setState({
            seansData: dataToChange
        })
    };

    render() {
        console.log(this.state);
        return (
            <form onSubmit={this.createSeans}>
                <select value={this.state.seansData.hall} onChange={this.changeHall}>
                    {this.selectHall()}
                </select>
                <select value={this.state.seansData.film} onChange={this.changeFilm}>
                    {this.selectFilm()}
                </select>
                <input type="date" value={this.state.seansData.start} onChange={this.changeTimeStart}/>
                <input type="date" value={this.state.seansData.end} onChange={this.changeTimeEnd}/>
                <input type="text" value={this.state.seansData.seansName} onChange={this.changeSeansName}/>
                <button>Create Seans</button>
            </form>
        );
    }
}


export default CreateSeans;
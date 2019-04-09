import React, {Component} from 'react';
import './header.css';

import logo from '../../images/logo.svg';
import {Link} from "react-router-dom";
import Register from "../login_register/register";
import Modal from "../modal/modal";
import Login from "../login_register/login";
import {auth} from "../../firebase";

class Header extends Component {


    state = {
        showModal: false,
        modalContent: null,
    };

    openModal = () => {
        this.setState({
            showModal: true,
        })
    };

    closeModal = () => {
        this.setState({showModal: false})
    };


    login = () => {
        this.openModal();
        this.setState({
            modalContent: <Login canceled={this.closeModal} clicked={this.closeModal}/>
        })
    };

    registeration = () => {
        this.openModal();
        this.setState({
            modalContent: <Register canceled={this.closeModal} clicked={this.closeModal}/>
        })
    };


    render() {
        console.log(this.props.user);
        return (
            !this.props.user ?
                <>
                    {this.state.showModal ?
                        <Modal clicked={this.closeModal}>
                            {this.state.modalContent}
                        </Modal> : null}
                    <div style={{backgroundColor: '#123456'}}>
                        <div className={'wrapper'}>
                            <div className={'header'}>
                                <div style={{
                                    display: 'flex',
                                    flexGrow: '1',
                                    alignItems: 'center',
                                }}>
                                    <Link to={'/'}>
                                        <img src={logo} alt="img"/>
                                    </Link>
                                </div>
                                <div className={'header_items'}>
                                    <Link to={'#'} onClick={this.login}>Login</Link>
                                    <Link to={'#'} onClick={this.registeration}>Register</Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </>
                :
                <div style={{backgroundColor: '#123456'}}>
                    <div className={'wrapper'}>
                        <div className={'header'}>
                            <div style={{
                                display: 'flex',
                                flexGrow: '1',
                                alignItems: 'center',
                            }}>
                                <Link to={'/'}>
                                    <img src={logo} alt="img"/>
                                </Link>
                            </div>
                            <div className={'header_items'}>
                                <div className={'current_user'}>{this.props.user.email}</div>
                                <Link to={'#'} onClick={() => auth.signOut()}>Log out</Link>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Header;
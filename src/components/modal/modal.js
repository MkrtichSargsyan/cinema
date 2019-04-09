import React from 'react';
import './modal.css';
import {Backdrop} from "./backdrop";

const Modal = (props) => {
    return (
        <div>
            <Backdrop clicked={props.clicked}/>
            <div className={'Modal'}>
                {props.children}
            </div>
        </div>

    );
};

export default Modal;
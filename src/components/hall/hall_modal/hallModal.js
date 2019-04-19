import React from 'react';
import './hallModal.css'

const HallModal = ({seansName,filmTitle,placeNumber,cancel,submit}) => {
    return (
        <div className={'reserve_modal'}>
            <div className={'title'}>Reserve Place ?</div>
            <div>
                <span className={'margin20'}>Seans name</span><span>{seansName}</span>
            </div>
            <div>
                <span className={'margin20'}>Film title</span> <span>{filmTitle}</span>
            </div>
            <div>
                <span className={'margin20'}>Place number</span><span>{`N ${placeNumber+1}`}</span>
            </div>
            <div className={'buttons'}>
                <div className={'button submit'} onClick={submit}>Submit</div>
                <div className={'button cancel'} onClick={cancel}>Cancel</div>
            </div>
        </div>
    );
};

export default HallModal;
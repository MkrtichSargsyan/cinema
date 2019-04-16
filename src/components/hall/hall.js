import React, {Component} from 'react';
import './hall.css';

class Hall extends Component {


    renderRow = (num) => {
        return (
            <div className={'row'}>


                <div className={'chair'}>{num * 10 + 1}</div>
                <div className={'chair'}>{num * 10 + 2}</div>
                <div className={'chair'}>{num * 10 + 3}</div>
                <div className={'chair'}>{num * 10 + 4}</div>
                <div className={'chair'}>{num * 10 + 5}</div>
                <div className={'chair'}>{num * 10 + 6}</div>
                <div className={'chair'}>{num * 10 + 7}</div>
                <div className={'chair'}>{num * 10 + 8}</div>
                <div className={'chair'}>{num * 10 + 9}</div>
                <div className={'chair'}>{num * 10 + 10}</div>

            </div>
        )
    };

    render() {
        console.log(this.props);
        return (
            <div style={{backgroundColor: '#1b1b1b', height: 'calc(100vh - 80px)'}}>
                <div className={'wrapper'}>
                    <div className={'hall'}>
                        <div className={'bg_image'}/>
                        <div className={'places'}>
                            {this.renderRow(0)}
                            {this.renderRow(1)}
                            {this.renderRow(2)}
                            {this.renderRow(3)}
                            {this.renderRow(4)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Hall;
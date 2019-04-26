import React from 'react';
import './mainComponent.less';
import PureComponent from '../base/pureComponent/PureComponent.jsx';
import axios from 'axios';

export default class MainComponent extends PureComponent {
    constructor(props) {
        super(props);
        props.initConnection();
    }

    handleRequest = () => {
        axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
        // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.post('http://localhost:9000/greeting')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        return (
            <div className='page-wrapper'>
                <h1>HELLO WORLD</h1>
                <button onClick={this.handleRequest}>SEND REQUEST</button>
            </div>
        )
    }
}

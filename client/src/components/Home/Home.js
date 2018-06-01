import React, { Component } from 'react';
import axios from 'axios';
// import HomeContent from '../HomeContent/HomeContent';
// import Footer from '../Footer/Footer';

import './Home.css';

class Home extends Component {
    componentDidMount() {
        this.state = {
            postData: []
        };
    }
    
    render() {
        return(
            <div className="home">
                <h1>HOME</h1>
            </div>
        );
    }
}

export default Home;
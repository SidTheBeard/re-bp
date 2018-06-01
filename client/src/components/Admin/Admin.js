import React, { Component } from 'react';
import axios from 'axios';
// import HomeContent from '../HomeContent/HomeContent';
// import Footer from '../Footer/Footer';

import './Admin.css';

class Admin extends Component {
    componentDidMount() {
        this.state = {
            postData: []
        };
    }
    
    render() {
        let { formFunctions } = this.props;
        let username = "NOT LOGGED IN";
        let jwt = JSON.parse(formFunctions.getToken());
        if( jwt ) {
            username = jwt.username;
        } else {
            window.location = "/";
        }
        console.log("PROPS:", this.props);
        return(
            <div className="admin">
                {username}
            </div>
        );
    }
}

export default Admin;
import React, { Component } from 'react';
import axios from 'axios';
import Logo from '../Logo/Logo';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import LoadingIcon from 'mdi-react/LoadingIcon';
// import HomeContent from '../HomeContent/HomeContent';
// import Footer from '../Footer/Footer';

import './SignIn.css';

class SignIn extends Component {
    componentDidMount() {
        this.state = {
            postData: []
        };
    }

    validateForm(e) {
        let form = e.target.closest("form");
        let message = form.querySelector(".message");
        let submit = form.querySelector("button");
        let { formFunctions } = this.props;
        message.classList.remove("error", "success");
        let data = this.props.formFunctions.serializeObject(form);
        if( data.username.length > 5 && data.password.length > 0) {
            submit.classList.add("loading");
            console.log("FORM FILLED OUT, PROCEED!");
            axios.post("http://localhost:3001/api/auth/signin", {
                username: data.username,
                password: data.password
            })
            .then(function(res) {
                console.log("RES:", res);
                setTimeout( () => {
                    submit.classList.remove("loading");
                    console.log("RES:", res);
                    if( res.data.error ) {
                        message.classList.add("error");
                        message.innerText = res.data.error.message;
                    } else {
                        console.log("USER:", res.data);
                        formFunctions.setToken(res.data);
                        window.location = "/admin";
                    }
                }, 1500);
            })
            .catch(function(err) {
                console.log("FAILED:", err);
            });
        } else {
            message.classList.add("error");
            message.innerText = "Enter A Username/Password";
        }
    }
    
    render() {
        let { formFunctions } = this.props;
        console.log("WINDOW:", window);
        if( formFunctions.getToken() ) {
            window.location = "/admin";
        }
        return(
            <div className="sign-in">
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <form>
                    <Logo/>
                    <div className="message">
                        <p>FORM MESSAGE HERE</p>
                    </div>
                        <div>
                            <TextField
                                autoComplete="off"
                                hintText="Hint Text"
                                floatingLabelText="Username"
                                name="username"
                            /><br />
                            <TextField
                                hintText="Hint Text"
                                floatingLabelText="Password"
                                type="password"
                                name="password"
                            /><br />
                        </div>
                        <RaisedButton icon={<LoadingIcon className="mdi-rotate-45"/>} labelPosition="before" label="Login" onClick={this.validateForm.bind(this)}/>
                </form>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default SignIn;
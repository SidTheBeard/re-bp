import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from '../../components/Home/Home';
import Admin from '../../components/Admin/Admin';
import SignIn from '../../components/SignIn/SignIn';
import decode from 'jwt-decode';

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
    let toJSON = function( form ) {
        var obj = {};
        var elements = form.querySelectorAll( "input, select, textarea" );
        for( var i = 0; i < elements.length; ++i ) {
            var element = elements[i];
            var name = element.name;
            var value = element.value;

            if( name ) {
                obj[ name ] = value;
            }
        }

        return obj;
    };
    let toJSONString = function( form ) {
        var obj = {};
        var elements = form.querySelectorAll( "input, select, textarea" );
        for( var i = 0; i < elements.length; ++i ) {
            var element = elements[i];
            var name = element.name;
            var value = element.value;

            if( name ) {
                obj[ name ] = value;
            }
        }

        return JSON.stringify( obj );
    };
    let loggedIn = function(funcs) {
         // Checks if there is a saved token and it's still valid
        const token = funcs.getToken() // GEtting token from localstorage
        return !!token && !funcs.isTokenExpired(token) // handwaiving here
    };

    let isTokenExpired = function(token) {
        try {
            const decoded = decode(token);
            console.log("DECODED:", decoded);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    };

    let setToken = function(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', JSON.stringify(idToken));
    };

    let getToken = function() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    };

    let logout = function() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    };

    let getProfile = function(funcs) {
        // Using jwt-decode npm package to decode the token
        return decode(funcs.getToken());
    };


    let fetch = function(url, options, funcs) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (funcs.loggedIn(funcs)) {
            headers['Authorization'] = 'Bearer ' + funcs.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        });
    };
    let formFunctions = {
        serializeObject: toJSON,
        stringify: toJSONString,
        loggedIn: loggedIn,
        getToken: getToken,
        setToken: setToken,
        fetch: fetch,
        logout: logout,
        isTokenExpired: isTokenExpired,
        getProfile: getProfile
    };
const Main = props => (
    <main>
        <Switch>
            <Route exact path='/' render={(props) => <Home {...props} formFunctions={formFunctions} />}/>
            <Route exact path='/logout' render={props => {
                if( formFunctions.getToken() ) {
                    formFunctions.logout();
                }
                window.location = "/signin";
            }}/>
            <Route exact path='/signin' render={(props) => <SignIn {...props} formFunctions={formFunctions}/>}/>
            <Route exact path='/admin' render={(props) => <Admin {...props} formFunctions={formFunctions}/>}/>
        </Switch>
    </main>
);

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    };
}

export default withRouter(connect(mapStateToProps, null)(Main));
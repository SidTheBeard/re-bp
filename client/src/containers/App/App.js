import React, { Component } from 'react';
import axios from 'axios';
import Main from '../Main/Main';
import { Provider } from 'react-redux';
import { configureStore } from '../../store';
import { BrowserRouter as Router } from 'react-router-dom';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Router>
      <Main/>
    </Router>
  </Provider>
);

// class App extends Component {
//     componentDidMount() {
//         let data = axios.get("/api/users/")
//                    .then((res) => {
//                         console.log("DATA:", res.data);
//                         return res;
//                    })
//                    .catch((err) => {
//                         throw err;
//                    });
//     }

//     render() {
//         return (
//           <div className="App">
//                 <Main/>
//           </div>
//         );
//     }
// }

export default App;

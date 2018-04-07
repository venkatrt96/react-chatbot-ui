import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      log: [],
      speech: ''
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    if(event.key === 'Enter' && this.refs.me.value !== ''){
      const userQuery = event.target.value;

      this.setState({
        log: [
          ...this.state.log,
          userQuery
        ]
      });
      this.refs.me.value = '';

      axios({
        method: 'post',
        url: '/api',
        data: {user_query: userQuery}
      })
        .then((res) => { console.log(res.data); return res.data; })
        .then((data) => { 
          this.setState({
            speech: [
              ...this.state.speech,
              data.result.fulfillment.speech
            ]
          });
        })
        .catch(err => console.log(err));;

    }
  }

  render() {
    return (
      <div className="App">
        <div className="chatdata">
        {
          _.map((this.state.log), (value, index) => {
            return(
              <div key={`${index}_${value}`}>
                Me: {value}
                <br />
                <div key={`${index}_${value}_Bot`}>
                  Bot: {this.state.speech[index]}
                </div>
              </div>                              
            );
          })
        }
        </div>
        <input type="text" ref="me" onKeyPress={this.handleKeyPress} />
      </div>
    );
  }
}

export default App;

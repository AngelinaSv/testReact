import React, { Component } from 'react';

import Table from './components/Table/Table';

import {
  parseCSV
} from './lib/parse';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: null, 
      err: null 
    };
    this.parse = this.parse.bind(this);
  }

  parse(event) {
    console.log('event', event.target.files[0]);
    if(event.target.files[0].type !== 'text/csv') {
      return this.setState({
        isLoading: false,
        data: null,
        err: 'File format is not correct'
      });
    }

    return parseCSV(event.target.files[0])
      .then((result) => {
        this.setState({
          isLoading: true,
          data: result,
          err: null
        });
      })
  }

  render() {
    return (
      <div>
        <div className='header'></div>
        <div className='file-loader'>
          <label for='input'>Import users</label>
          <input type='file' id='input' onChange={ this.parse }></input>
        </div>
        <Table isLoading={ this.state.isLoading } data={ this.state.data } err={ this.state.err }/> 
      </div>
    )
  }
}

export default App;

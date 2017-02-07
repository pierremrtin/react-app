import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    quote: '',
    author:'',
    category:'',
    isLoading: true,
  }

  loadQuote = () => {
    const quoteApi = 'https://andruxnet-random-famous-quotes.p.mashape.com';
    const myHeaders = new Headers({
      "X-Mashape-Key": "0tuwlH1TMtmshfztmc8ficyUcwDlp1rqaxnjsnbWgprphKCPm6",
    });
    // call api, make sure to include api key in headers
    fetch(quoteApi, {
      headers: myHeaders
    }).then((response) => {
      // decode response to json
      response.json().then((data) => {
        // set state based on decoded data
        this.setState({
          isLoading: false,
          quote: data.quote,
          author: data.author,
          category: data.category
        });
      })
    })
  }

  onClickNewQuote = () => {
    this.setState ({
      isLoading: true,
    });
    this.loadQuote();
  }

  onClickTwit = () => {
    const tweet = encodeURIComponent(`${this.state.quote} - ${this.state.author}`);
    window.open(`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${tweet}`)
  }





  render() {
    console.log('re-rendering app...', this.state);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Cloud</h2>
        </div>
        {
          this.state.isLoading ? <p>loading...</p> :

        <p className="App-intro">
          {this.state.quote} - {this.state.author} #{this.state.category}
        </p>
        } 

        <button onClick={this.onClickNewQuote} >Get New Quote</button>
        <button onClick={this.onClickTwit} >Twit Quote</button>

      </div>

    );
  }
}

export default App;

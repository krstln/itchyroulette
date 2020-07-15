import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

function GameDetails(props) {
  console.log(props.value.user, "user")
  return (
    <div>
      <img src={props.value.cover}/>
      <div>{props.value.title}</div>
      <div>{props.value.short_text}</div>
      <div>By <a href={props.value.user.url}>{props.value.user.name}</a></div>
      <div><a href={props.value.url}>Store page</a> || Download</div>
    </div>
  )
}

class Roulette extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], currentGame: {}, rouletteText: "Roll", gameRendered: false};
  }

  componentDidMount() {
    axios.get('/blm-games.json')
      .then(response => response.data)
      .then(json => this.setState({data: json.games}));
  }

  generateIntFromRange = max => {
    return Math.floor(Math.random() * max);
  }
  
  renderRandomGame = () => {
    return (
      <GameDetails value={this.state.currentGame}/>
    )
  }

  handleClick = () => {
    const {data} = this.state;
    let num = this.generateIntFromRange(data.length);
    this.setState({currentGame: data[num], rouletteText: "Reroll", gameRendered: true});
    console.log(this.state.currentGame);
  }

  render() {    
    return (
      <div>
        <p onClick={() => this.handleClick()}>{this.state.rouletteText}</p>
        {!this.state.gameRendered ? "" : this.renderRandomGame()}
      </div>
    )
  }
}

class Page extends Component {
  render() {
    return (
      <Roulette/>
    )
  }
}


export default Page;

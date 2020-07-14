import React, { Component , Fragment } from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, data: []};
  }

  componentDidMount() {
    axios.get('/blm-games.json')
      .then(response => response.data)
      .then(json => this.setState({ loading: false, data: json.games}));
  }

  renderGameList = data => {
    return (
      <>
      {console.log(data)}
      {data.map((game,index) => (
        <div key={index}>
          <p>{game.title}</p>
        </div>
      ))}
      </>
    )
  }

  render() {
    const {loading, data} = this.state;
    
    return (
      <Fragment>
        {loading ? "Loading..." : this.renderGameList(data)}
      </Fragment>
    )
  }
}

export default App;

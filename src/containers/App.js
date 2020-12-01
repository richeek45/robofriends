import React,{Component, Fragment } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: ''
    }

  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      return response.json();
    }).then(users => {
      return this.setState({robots: users});
    })
    
  }

  onSearchChange = (event) => {
    this.setState({searchfield: event.target.value});
    
  }

  render() {
    const {robots, searchfield} = this.state;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase())
    })
    return (!robots.length) ?  (<h1>Loading</h1>) :  (
        <Fragment>
        <div className="tc">
          <h1>Robofriends</h1>
          <SearchBox onSearchChange={this.onSearchChange}/>
          <Scroll>
            <ErrorBoundary>
              <CardList robots={filteredRobots}/>
            </ErrorBoundary>
          </Scroll>
        </div>
        </Fragment>
      );

  }
  
}

export default App;
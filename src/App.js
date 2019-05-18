import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import dummyStore from './dummy-store';
import Main from './main';
import Folder from './folder';
import Note from './note';
import './App.css';

class App extends React.Component {
  state= {
    id:''
  }
  render(){
  return (
    <div className="App">
      <header className='header'>
        <Link to={'/'}>
          <h1>NOTEFUL</h1>
        </Link>
      </header>
      <Switch >
        <Route exact path ='/'>
          <Main store={dummyStore} />
        </Route>
        <Route path='/folder/:id'
          render={(props)=> <Folder store={dummyStore}{...props} />}
        />
        <Route path='/note/:id'
          render={(props) => <Note store={dummyStore}{...props}/>}
        />
      </Switch>      
    </div>
  )
  }
}

export default App;

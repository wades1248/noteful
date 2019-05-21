import React from 'react';
import {Route, Switch, Link,withRouter} from 'react-router-dom';

import Main from './main';
import Folder from './folder';
import Note from './note';
import Context from './Context';
import './App.css';

class App extends React.Component {
  state= {
    notes:[],
    folders: []

  }
  handleDeleteNote = noteId => {
    console.log(noteId)
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  }

  componentDidMount(){
    Promise.all([
      fetch(`http://penguin.linux.test:9090/notes`),
      fetch(`http://penguin.linux.test:9090/folders`)
    ])
    .then(([noteResponse, folderRespsponse]) => {
      if(!noteResponse.ok)
        return noteResponse.json().then(e => Promise.reject(e))
      if(!folderRespsponse.ok)
        return folderRespsponse.josn().then(e => Promise.reject(e))
      return Promise.all([
        noteResponse.json(),
        folderRespsponse.json()
      ])
    })
    .then(([notes,folders])=>{
      this.setState({
        notes, folders
      })
    })
    .catch(error=>{
      console.error({error})
    })
  }
  render(){
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      handleDeleteNote: this.handleDeleteNote,
    }
  return (
    <Context.Provider value={contextValue}>
    <div className="App">
      <header className='header'>
        <Link to={'/'}>
          <h1>NOTEFUL</h1>
        </Link>
      </header>
      <Switch >
        <Route exact path ='/'>
          <Main  />
        </Route>
        <Route path='/folder/:id'
          render={(props)=> <Folder {...props} />}
        />
        <Route path='/note/:id'
          render={(props) => <Note {...props}/>}
        />
      </Switch>    
    </div>
    </Context.Provider>
  )
  }
}

export default App;

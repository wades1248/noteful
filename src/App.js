import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import Main from './main';
import Folder from './folder';
import Note from './note';
import AddFolder from './AddFolder';
import AddNote from './AddNote';
import Context from './Context';
import ErrorBoundry from './ErrorBoundry';
import './App.css';

class App extends React.Component {
  state= {
    notes:[],
    folders: []

  }
  handleAddFolder = folder => {
    this.setState({
      folders: [
        ...this.state.folders,
        folder
      ]
    })
  }
  handleAddNote = note =>{
    this.setState({
      notes:[
        ...this.state.notes,
        note
      ]
    })
  }
  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    })
  }
  
  componentDidMount(){
    Promise.all([
      fetch(`http://localhost:8000/api/notes/`),
      fetch(`http://localhost:8000/api/folders/`)
    ])
    .then(([noteResponse, folderRespsponse]) => {
      if(!noteResponse.ok)
        return noteResponse.json().then(e => Promise.reject(e))
      if(!folderRespsponse.ok)
        return folderRespsponse.json().then(e => Promise.reject(e))
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
      handleAddFolder: this.handleAddFolder,
      handleAddNote: this.handleAddNote
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
        <ErrorBoundry>
          <Route path='/folder/:id'
          render={(props)=> <Folder {...props} />}
          />
          <Route path='/note/:id'            
            render={Note}
          />
          <Route path='/AddFolder'
            render={AddFolder}
          />
          <Route path='/AddNote'
            render={AddNote}
          />
        </ErrorBoundry>
      </Switch>    
    </div>
    </Context.Provider>
  )
  }
}

export default App;

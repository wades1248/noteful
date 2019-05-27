import React from 'react';
import {withRouter} from 'react-router-dom';
import NoteSideBar from './noteSideBar';
import Context from './Context';
import ErrorBoundry from './ErrorBoundry';

class Note extends React.Component{
    static defaultProps ={
        match:{
            params: []
        }
    };
    static contextType = Context

    onDelete = e => {
        e.preventDefault()
        const noteId = this.props.match.params.id
        
        fetch(`http://localhost:9090/notes/${noteId}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
          },
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            return res.json()
          })
          .then(() => {
            this.context.handleDeleteNote(noteId)
          })
          .catch(error => {
            console.error({ error })
          });
          this.props.history.push('/');
      }
    render(){
        const NoteID= this.props.match.params.id;
        const CurrentNote= this.context.notes.find(note => note.id===NoteID);
        return(
            <div className='main'>
            <ErrorBoundry>
              <NoteSideBar 
                id={NoteID} 
              />
            </ErrorBoundry>
            <div className="noteLi">
                <div
                id={NoteID}>
                    <h2>{CurrentNote.name}</h2>
                    <p>Modified: {CurrentNote.modified}</p>
                    <button onClick={this.onDelete}>Delete Note</button>
                </div>
            {CurrentNote.content}
            </div>
            </div>

            
        )
    }
}
export default withRouter( Note);
import React from 'react';
import {Link} from 'react-router-dom';
import NoteSideBar from './noteSideBar';

class Note extends React.Component{
    render(){
        const NoteID= this.props.match.params.id;
        const CurrentNote= this.props.store.notes.find(note => note.id===NoteID);
        return(
            <div>
            <NoteSideBar 
            store={this.props.store}
             id={NoteID} 
             />
            <div>
                <div className='noteLi'
                id={CurrentNote.id}>
                    <h2>{CurrentNote.name}</h2>
                    <p>Modified: {CurrentNote.modified}</p>
                    <button>Delete Note</button>
                </div>
            {CurrentNote.content}
            </div>
            </div>

            
        )
    }
}
export default Note;
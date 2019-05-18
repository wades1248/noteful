import React from 'react';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';

class NoteSideBar extends React.Component {
    render(){
        const NoteID= this.props.id
        const CurrentNote= this.props.store.notes.find(note => note.id===NoteID);
        const CurrentFolder= this.props.store.folders.find(folder => folder.id === CurrentNote.folderId)
        return(
            <div className='folder'>
                <button onClick={() => this.props.history.push('/')}>Go Back</button>
                <h2>{CurrentFolder.name}</h2>
            </div>
        )
    }
}
export default withRouter(NoteSideBar);
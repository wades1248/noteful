import React from 'react';
import {withRouter} from 'react-router-dom';
import Context from './Context';

class NoteSideBar extends React.Component {
    static contextType = Context;
    render(){
        const NoteID= this.props.id
        const CurrentNote= this.context.notes.find(note => note.id===NoteID);
        const CurrentFolder= this.context.folders.find(folder => folder.id === CurrentNote.folderId)
        return(
            <div className='folder'>
                <h2 className='backbutton' onClick={() => this.props.history.goBack()}>Go Back</h2>
                <h2>{CurrentFolder.name}</h2>
            </div>
        )
    }
}
export default withRouter(NoteSideBar);
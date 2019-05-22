import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from './Context';

class NoteSideBar extends React.Component {
    static contextType = Context;
    render(){
        const NoteID= this.props.id
        const CurrentNote= this.context.notes.find(note => note.id===NoteID);
        const CurrentFolder= this.context.folders.find(folder => folder.id === CurrentNote.folderId)
        return(
            <div className='Sidebar'>
                <h2 className='backbutton' onClick={() => this.props.history.goBack()}>Go Back</h2>
                <p className='folder'>Folder: {CurrentFolder.name}</p>
            </div>
        )
    }
}
export default withRouter(NoteSideBar);
NoteSideBar.propTypes ={
    id: PropTypes.string.isRequired
}
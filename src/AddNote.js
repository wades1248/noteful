import React from 'react';
import {withRouter} from 'react-router-dom';
import Context from './Context';

class AddNote extends React.Component{
    static contextType = Context;

    handleSubmit = event => {
        event.preventDefault()
        const newNote = {
            name: event.target['note-name'].value,
            content: event.target['note-content'].value,
            folderId: event.target['new-note-folder'].value,
            modified: new Date(),
        }
        fetch(`http://penguin.linux.test:9090/notes`, {
            method:'POST',
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(newNote),
        })
        .then(response =>{
            if(!response.ok){
                return response.json().then(event => Promise.reject(event));}
            return response.json()
        })
        .then(newNote => {
            this.context.handleAddNote(newNote)
            this.props.history.push(`/note/${newNote.id}`)
        })
        .catch(error =>{
            console.log(error.message)
        })
    }



    render(){
        const mapFolders= this.context.folders.map(folder=> {
            return(
            <option key={folder.id} value={folder.id}>{folder.name}</option>
        )});
        return(
            <div>
                <h2>New Note</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    <input type='text' name='note-name' />
                    <label>Content</label>
                    <input type='text' name='note-content' />
                    <label>Select Folder</label>
                    <select name="new-note-folder">
                        <option value={null}>...</option>
                        {mapFolders}
                    </select>
                    <button type='submit'>Make Note</button>
                </form>
            </div>
        )
    }
}
export default withRouter(AddNote);
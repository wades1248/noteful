import React from 'react';
import {withRouter} from 'react-router-dom';
import Context from './Context';

class AddNote extends React.Component{
    static contextType = Context;
    state = {
        nameError: "",
        contentError:"",
        folderError:"",
    }

    validateNote = event => {
        event.preventDefault();
        const newNote = {
            name: event.target['note-name'].value,
            content: event.target['note-content'].value,
            folder_id: event.target['new-note-folder'].value,
            modified: new Date(),
        }
        this.setState({
            nameError: "",
            contentError:"",
            folderError:"",
        });
        let nameFieldError = "";
        let contentFieldError = "";
        let folderFieldError = "";
        const testName= newNote.name.trim();
        const testContent= newNote.content.trim();
        const testFolder= newNote.folderId;
        if (testName.length === 0){
            nameFieldError = 'Please Enter a Note Name';
            this.setState({
                nameError: nameFieldError
            });
        } if (testContent.length === 0){
            contentFieldError = 'Content field cannot be blank';
            this.setState({
                contentError: contentFieldError
            });
        } if (testFolder === '...'){
            folderFieldError = 'Please Select a Folder';
            this.setState({
                folderError: folderFieldError
            });
        }else{
            this.handleSubmit(newNote);
        };
    
    }

    handleSubmit = (note) => {
        fetch(`http://localhost:8000/api/notes`, {
            method:'POST',
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(note),
        })
        .then(response =>{
            if(!response.ok){
                return response.json().then(event => Promise.reject(event));}
            return response.json()
        })
        .then(note => {
            this.context.handleAddNote(note)
            this.props.history.push(`/note/${note.id}`)
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
                <form onSubmit={this.validateNote}>
                    <label>Name</label>
                    <input type='text' name='note-name' />
                    <div className="error">{this.state.nameError}</div>
                    <label>Content</label>
                    <input type='text' name='note-content' />
                    <div className="error">{this.state.contentError}</div>
                    <label>Select Folder</label>
                    <select name="new-note-folder">
                        <option value={null}>...</option>
                        {mapFolders}
                    </select>
                    <div className="error">{this.state.folderError}</div>
                    <button type='submit'>Make Note</button>
                </form>
            </div>
        )
    }
}
export default withRouter(AddNote);
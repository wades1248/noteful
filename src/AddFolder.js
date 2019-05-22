import React from 'react';
import {withRouter} from 'react-router-dom';
import Context from './Context';

class AddFolder extends React.Component{
static contextType = Context;

handleSubmit = event => {
    event.preventDefault()
    const newFolder = {
        name: event.target['folder-name'].value
    }
    fetch(`http://penguin.linux.test:9090/folders`, {
        method:'POST',
        headers:{
            'content-type': 'application/json'
        },
        body:JSON.stringify(newFolder),
    })
    .then(response =>{
        if(!response.ok){
            return response.json().then(event => Promise.reject(event));}
        return response.json()
    })
    .then(newFolder => {
        this.context.handleAddFolder(newFolder)
        this.props.history.push(`/folder/${newFolder.id}`)
    })
    .catch(error =>{
        console.log(error.message)
    })
}

render() {
    return(
        <div>
            <h2>New Folder</h2>
            <form onSubmit={this.handleSubmit}>
                <label>Folder Name</label>
                <input type='text' name='folder-name' />
                <button type='submit'>Add folder</button>
            </form>
        </div>
    )
}
}

export default withRouter(AddFolder);
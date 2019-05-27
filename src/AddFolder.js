import React from 'react';
import {withRouter} from 'react-router-dom';
import Context from './Context';

class AddFolder extends React.Component{
static contextType = Context;

state= {
    folderError: ""
}

validateFolder = event => {
    event.preventDefault()
    const newFolder = {
        name: event.target['folder-name'].value
    }
    let folderHasError = "";
    const testFolder= newFolder.name.trim();
    console.log(`validate:${this.newFolder}`);
    if (testFolder.length === 0){
        folderHasError = 'Please Enter a Folder Name';
        this.setState({
            folderError: folderHasError
        });
    }else{
        this.handleSubmit(newFolder);
    };

}

handleSubmit = (folder) => {
    fetch(`http://localhost:9090/folders`, {
        method:'POST',
        headers:{
            'content-type': 'application/json'
        },
        body:JSON.stringify(folder),
    })
    .then(response =>{
        if(!response.ok){
            return response.json().then(event => Promise.reject(event));}
        return response.json()
    })
    .then(folder => {
        this.context.handleAddFolder(folder)
        this.props.history.push(`/folder/${folder.id}`)
    })
    .catch(error =>{
        console.log(error.message)
    })
}

render() {
    return(
        <div>
            <h2>New Folder</h2>
            <form onSubmit={this.validateFolder}>
                <label>Folder Name</label>
                <input type='text' name='folder-name' />
                <button type='submit'>Add folder</button>
            </form>
            <div className="error">{this.state.folderError}</div> 
        </div>
    )
}
}

export default withRouter(AddFolder);
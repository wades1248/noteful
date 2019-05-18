import React from 'react';
import {Link} from 'react-router-dom';
import MainSideBar from './mainSidebar';

class Folder extends React.Component {
    render(){
        const selectedFolderId= this.props.match.params.id
        
        const findNotes= this.props.store.notes.map(note =>{
            if(note.folderId === selectedFolderId){
                return(
                    <li className='noteLi'
                    id={note.id}>
                    <Link to={`/note/${note.id}`}>
                    <h2>{note.name}</h2>
                    </Link>
                    <p>Modified: {note.modified}</p>
                    <button>Delete Note</button>
                </li>
                )
            }
        })
    
        return (
            <div className='main'>
                
                <MainSideBar store={this.props.store} />
                <div>
                    <ul className='notelist'>
                        {findNotes}
                    </ul>
                    <button>ADD NOTE</button>
                </div>
            </div>
        )
    }
}
export default Folder;
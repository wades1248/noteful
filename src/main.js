import React from 'react';
import {Link} from 'react-router-dom';
import MainSideBar from './mainSidebar';

class Main extends React.Component{

    render(){
        const NoteList= this.props.store.notes.map(note => {
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
        })
        return(
            <div className='main'>
                <MainSideBar store={this.props.store} />
                <div>
                    <ul className='notelist'>
                    {NoteList}
                    </ul>
                    <button>ADD NOTE</button>
                </div>
                
            </div>
 
        )
    }
}
export default Main;
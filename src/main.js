import React from 'react';
import {Link} from 'react-router-dom';
import MainSideBar from './mainSidebar';
import Context from './Context';
import ErrorBoundry from './ErrorBoundry';

class Main extends React.Component{
    static contextType = Context;
    render(){
        const NoteList= this.context.notes.map(note => {
            return(
    
                <li className='noteLi'
                    id={note.id} key={note.id}>
                    <Link to={`/note/${note.id}`}>
                    <h2>{note.name}</h2>
                    </Link>
                    <p>Modified: {note.modified}</p>
                    <button onClick={ () => {this.context.handleDeleteNote(note.id)}}>Delete Note</button>
                </li>
            )
        })
        return(
 
                <div className='main'>
                    <ErrorBoundry>
                        <MainSideBar />
                    </ErrorBoundry>
                    <div>
                        <ul className='notelist'>
                            {NoteList}
                        </ul>
                        <Link to='/AddNote'>
                            <button className="addButton">ADD NOTE</button>
                        </Link>
                    </div>             
                </div> 

        )
    }
}
export default Main;
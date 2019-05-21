import React from 'react';
import {NavLink} from 'react-router-dom';
import Context from './Context';

class MainSideBar extends React.Component {
    static contextType= Context
    render(){
        const  folderList = this.context.folders.map(folder => {
            return(
            <li className='folder'
                id={folder.id}>
                <NavLink to={`/folder/${folder.id}`} >
                    {folder.name}
                </NavLink>
            </li>
            )
        })
        return(
            <div className='Sidebar'>
                <ul>
                    {folderList}
                </ul>
                <button>Add Folder</button>
            </div>
        )
    }
}

export default MainSideBar;
import React from 'react';
import {NavLink, Link} from 'react-router-dom';
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
                <Link to={'/AddFolder'}>
                    <button className='addButton'>Add Folder</button>
                </Link>
            </div>
        )
    }
}

export default MainSideBar;
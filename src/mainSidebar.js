import React from 'react';
import {NavLink} from 'react-router-dom';
import "./dummy-store";

class MainSideBar extends React.Component {

    render(){
        const  folderList = this.props.store.folders.map(folder => {
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
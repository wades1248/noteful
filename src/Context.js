import React from 'react';

export default React.createContext({ 
    notes: [],
    folders: [],
    handleDeleteNote: () => {},
    handleAddFolder: () => {},
    handleAddNote: () => {}
})
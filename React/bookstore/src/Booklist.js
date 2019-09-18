import React from 'react';
import Book from "./Book";

function Booklist() {
    return (
        <>
            <div className="container">
                <h2>Books:</h2>
                
                <div className='row'>
                    <div className='container col shadow p-3 mb-5 bg-white rounded'><Book /></div>
                    <div className='container col shadow p-3 mb-5 bg-white rounded'><Book /></div>
                    <div className='container col shadow p-3 mb-5 bg-white rounded'><Book /></div>
                    <div className='container col shadow p-3 mb-5 bg-white rounded'><Book /></div>
                    <div className='container col shadow p-3 mb-5 bg-white rounded'><Book /></div>
                </div>
            </div>
        </>
    )
}


export default Booklist;
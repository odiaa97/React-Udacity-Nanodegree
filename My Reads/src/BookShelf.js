import React from 'react'
import Book from './Book'

function BookShelf(props) {
    /* BookShelf Component is responsible for displaying each shelf with its books inside */
    return (
        <div className="bookshelf">
            <h1 className="bookshelf-title">{props.bookshelfTitle}</h1>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.bookshelfBooks.map((book) => {
                                return <li key={book.id}>
                                           <Book book={book} onShelfChanges={props.onShelfChanges}/>
                                       </li>
                        })
                      }
                </ol>
            </div>
        </div>
    )
}

export default BookShelf
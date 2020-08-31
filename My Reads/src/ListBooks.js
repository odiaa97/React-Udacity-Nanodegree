import React from 'react'
import {Link} from 'react-router-dom'
import BookShelf from './BookShelf'




function ListBooks(props){

   const { onShelfChanges } = props;
   const currentlyReading = props.books.filter((book) => book.shelf === 'currentlyReading')
   const wantToRead =props.books.filter((book) => book.shelf === 'wantToRead')
   const read =props.books.filter((book) => book.shelf === 'read')
  
    /* The ListBooks is responsible for displaying the book shelves */
   return(
    <div className="list-books">
        <div className="list-books-content">
         <div>
          <BookShelf 
              bookshelfTitle='Currently Reading'd
              bookshelfBooks={currentlyReading}
              onShelfChanges={onShelfChanges}
              
          />
          <BookShelf
              bookshelfTitle='Want to Read'
              bookshelfBooks={wantToRead}
              onShelfChanges={onShelfChanges}
          />
          <BookShelf 
              bookshelfTitle='Read' 
              bookshelfBooks={read}
              onShelfChanges={onShelfChanges}
          />
        </div>
      </div>
         <div className="open-search">
            <Link to="/search">Add a book</Link>
        </div>
    </div>
  )
}
export default ListBooks
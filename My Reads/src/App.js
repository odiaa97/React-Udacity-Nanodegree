import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import BooksSearch from './BooksSearch'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state={
    books: []
  }
  /* This is componentDidMount that being invoked each run, so I call getAll from BookAPI to load the books */
  componentDidMount() {
    BooksAPI
      .getAll()
      .then(books => {
        this.setState({books})
      })
  }

  /* 
    onShelfChanges a function that manages moving books between different shelves.
    Updating the BookApi to display the new changes => each book according to its shelf
  */
  onShelfChanges = (book, shelf) => {
    book.shelf = shelf
    this.setState(state => ({
      books: state
        .books
        .filter(b => b.id !== book.id)
        .concat([book])
    }))
    BooksAPI.update(book, shelf)
  }

  render() {
    return (
      /* BooksApp is the main app in the application
      It contains a div element that has 2 routes:
      1- the home page '/'
      2- the search page '/search' */
      <div className="app">
        <Route
          path="/"
          exact
          render={() => (
          <div>
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <ListBooks books={this.state.books} onShelfChanges={this.onShelfChanges}/>
          </div>
        )}/>

        <Route
          path="/search"
          render={() => (<BooksSearch
          onShelfChanges={this.onShelfChanges}
          books={this.state.books}/>)}/>
      </div>
    )
  }
}

export default BooksApp

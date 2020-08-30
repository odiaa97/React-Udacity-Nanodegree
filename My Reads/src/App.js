import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state={
    books: []
  }
  componentDidMount() {
    BooksAPI
      .getAll()
      .then(books => {
        this.setState({books})
      })
  }
  onShelfChange = (book, shelf) => {
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
      <div className="app">
        <Route
          path="/"
          exact
          render={() => (
          <div>
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <ListBooks books={this.state.books} onShelfChange={this.onShelfChange}/>
          </div>
        )}/>

        <Route
          path="/search"
          render={({history}) => (<SearchBooks
          onShelfChange={this.onShelfChange}
          history={history}
          books={this.state.books}/>)}/>
      </div>
    )
  }
}

export default BooksApp

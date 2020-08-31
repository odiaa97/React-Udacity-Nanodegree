import React from 'react'
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class BooksSearch extends React.Component {
    state = {
        searchResults: []
    }

    /* search function is a function that being invoked each time you changes the input search value to update the books you search for */
    search = (e) => {
        const query = e.target.value;
        if (!query) {
            BooksAPI.getAll().then(books => {this.setState({searchResults: books})})
            console.log(this.state.searchResults)
            return;
        }
        /* if there is no search input display nothing */
        BooksAPI.search(query, 20).then(searchResults => {
                if (!searchResults || searchResults.error) {
                    this.setState({searchResults: []});
                    return;
                }
                /* if there is input value return the matched book with the same name in the input */
                searchResults = searchResults.map((book) => {
                    const bookOnShelf = this.props.books
                        .find(b => b.id === book.id);
                    book.shelf = bookOnShelf
                        ? bookOnShelf.shelf
                        : "none";
                    return book;
                });

                this.setState({searchResults});
            });
    };
    /* Search Component is responsible for displaying an input field and a link to go back to the home page */
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={this.search}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {!this.state.searchResults ? <div>{this.props.books}</div>:
                            this.state
                            .searchResults
                            .map((book, index) => (
                                <li key={book.id + index}>
                                    <Book book={book} onShelfChanges={this.props.onShelfChanges}/>
                                </li>
                            ))}
                            
                    </ol>
                </div>
            </div>

        )
    }
}

export default BooksSearch
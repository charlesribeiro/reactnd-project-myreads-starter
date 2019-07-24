import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './components/Bookshelf';
import Search from './components/Search';
import Book from './components/Book';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */

    books:[],
    showSearchPage: false,
    name: "",
    booksFromSearchAPI:[]
  }

  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      console.log(books);
      // debugger;

      this.setState({books})

      // debugger;
    })
  }

  changeSearchStatus= (event, book)=>{
    const searchString = event.target.value;
    console.log(searchString);

    BooksAPI.search(searchString).then((booksFromSearchAPI)=>{
    
    console.log(booksFromSearchAPI);

    if(booksFromSearchAPI.error)
    {
      debugger;
      this.setState({booksFromSearchAPI:[]});
    }
    else
    {
      this.setState({booksFromSearchAPI});
    }

    
    });
  }

  changeBookShelf= (event, bookToUpdate) =>{

    // console.log("veio aqui...." , event.target.value, bookToUpdate.id);

    bookToUpdate.shelf = event.target.value;

    BooksAPI.update(bookToUpdate, event.target.value).then((booksFromAPI)=> {
      console.log(booksFromAPI);
      debugger;

      this.setState(state=>({

        // https://stackoverflow.com/questions/48208665/how-to-update-merge-array-values-in-react-redux-correctly

      }))
    
    })

  }

  render() {
    return (
      <div className="app">

        {this.state.showSearchPage ? (
          
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" onChange={this.changeSearchStatus} placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {/* <Bookshelf shelfTitle="Search results" changeBookShelf ={this.changeBookShelf} books={this.state.booksFromSearchAPI}></Bookshelf> */}
                {(this.state.booksFromSearchAPI !== undefined) ?this.state.booksFromSearchAPI.map(book =>
                    <li>
                        <Book 
                        authors={book.authors? book.authors[0]: "No author info"} 
                        width={128} 
                        height={192} 
                        changeBookShelf={this.changeBookShelf} 
                        book={book}>
                    
                        </Book>
                    </li>) :"aaarg"
                    
                }
              </ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <Bookshelf shelfTitle="Currently reading" changeBookShelf ={this.changeBookShelf} books={this.state.books.filter(t=>t.shelf ==="currentlyReading")}></Bookshelf>
            <Bookshelf shelfTitle="Want to read" changeBookShelf ={this.changeBookShelf} books={this.state.books.filter(t=>t.shelf ==="wantToRead")}></Bookshelf>
            <Bookshelf shelfTitle="Read" changeBookShelf ={this.changeBookShelf} books={this.state.books.filter(t=>t.shelf ==="read")}></Bookshelf>

            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp

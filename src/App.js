import React from 'react'
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './components/Bookshelf';
import Book from './components/Book';

class BooksApp extends React.Component {
  state = {
    books:[],
    booksFromSearchAPI:[],
    searchString:""
  }

  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      console.log(books);
      // debugger;

      this.setState({books})

      // debugger;
    })
  }

  changeSearchStatus= (event)=>{
    const searchString = event.target.value;

    this.setState({searchString});

    // console.log(searchString);

    BooksAPI.search(searchString).then((booksFromSearchAPI)=>{
    
    // console.log(booksFromSearchAPI);


    if(booksFromSearchAPI)
    {
      if(booksFromSearchAPI.error || this.state.searchString.length<1)
      {
        this.setState({booksFromSearchAPI:[]});
      }
      else
      {
        console.log(booksFromSearchAPI);

        booksFromSearchAPI.map(book=> {
          console.log(book);

          const bookFoundOnMainPage = this.state.books.filter(bookOnMainPage =>  bookOnMainPage.id === book.id)[0];

          console.log(bookFoundOnMainPage);

          // book.shelf = "read";
          book.shelf = bookFoundOnMainPage ? bookFoundOnMainPage.shelf: "none";

          this.setState(currentState => ({
            books: [currentState.books.filter(livro => livro.id !== book.id), book] //caso o livro já exista na tela principal ele é retirado e depois adicionado com o novo valor de shelf


         
          }, ()=> {console.log("ok");}))
        })
        debugger;
        this.setState({booksFromSearchAPI});
      }
    }

    else
    {
      this.setState({booksFromSearchAPI:[]});
    }
    
    });
  }

  changeBookShelf= (event, bookToUpdate) =>{

    bookToUpdate.shelf = event.target.value;

    BooksAPI.update(bookToUpdate, event.target.value).then((booksFromAPI)=> {
      console.log(booksFromAPI);

      this.setState(currentState => ({
        books: [currentState.books.filter(livro => livro.id !== bookToUpdate.id), bookToUpdate]
      }, ()=> {console.log("ok");}))
    })



  }

  render() {
    return (
      <div className="app">
        <Route  path="/search" render={()=> (
          <div className="search-books">
            <div className="search-books-bar">

              <Link to="/">Close</Link>
              <div className="search-books-input-wrapper">

                <input type="text" onChange={this.changeSearchStatus} placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {/* <Bookshelf shelfTitle="Search results" changeBookShelf ={this.changeBookShelf} books={this.state.booksFromSearchAPI}></Bookshelf> */}
                {(this.state.booksFromSearchAPI !== undefined) ? this.state.booksFromSearchAPI.map(book =>
                    <li>
                        <Book 
                        width={128} 
                        height={192} 
                        changeBookShelf={this.changeBookShelf} 
                        book={book}>
                        </Book>
                    </li>) :"No results yet"
                    
                }
              </ol>
            </div>
          </div>
        )}/>
        
        <Route exact path="/" render={()=> (

          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <Bookshelf shelfTitle="Currently reading" changeBookShelf ={this.changeBookShelf} books={this.state.books.filter(t=>t.shelf ==="currentlyReading")}></Bookshelf>
            <Bookshelf shelfTitle="Want to read" changeBookShelf ={this.changeBookShelf} books={this.state.books.filter(t=>t.shelf ==="wantToRead")}></Bookshelf>
            <Bookshelf shelfTitle="Read" changeBookShelf ={this.changeBookShelf} books={this.state.books.filter(t=>t.shelf ==="read")}></Bookshelf>

            <div className="open-search">
              <Link to = "/search">Add a book</Link>
            </div>
          
            
          </div>

        )}/>

        </div>
    )
  }
}

export default BooksApp

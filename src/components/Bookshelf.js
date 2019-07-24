import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './Book'


class Bookshelf extends Component
{
    static propTypes = {
        books: PropTypes.array.isRequired,
        shelfTitle: PropTypes.string.isRequired,
        changeBookShelf: PropTypes.func.isRequired,
    }

    componentDidMount()
    {
        console.log(this.props.books);
        //debugger;
    }

    

    render(){
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
                <div className="bookshelf-books">                

                <ol className="books-grid">

                    {this.props.books.map(book =>
                    <li>
                        <Book 
                        authors={book.authors? book.authors[0]: "No author info"} 
                        width={128} 
                        height={192} 
                        changeBookShelf={this.props.changeBookShelf} 
                        book={book}>
                    
                        </Book>
                    </li>)
                    
                    }
                </ol>
                </div>
            </div>

            
        );
    }
}

export default Bookshelf


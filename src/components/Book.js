import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Book extends Component{

    static propTypes = {
            authors: PropTypes.string.isRequired,
            width: PropTypes.number,
            height: PropTypes.number,
            changeBookShelf: PropTypes.func.isRequired,
            book: PropTypes.object.isRequired
    }

    render()
    {
      let authors = "No author information";
      if(this.props.authors)
      {
        authors = this.props.authors;
      }

      return(
          <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: this.props.width, height: this.props.height, 
                          backgroundImage: this.props.book.imageLinks? (this.props.book.imageLinks.smallThumbnail? "url("+ this.props.book.imageLinks.smallThumbnail+ ")":"error"):"error" }}></div>
                          <div className="book-shelf-changer">
                            <select value ={this.props.book.shelf} onChange={(e)=>this.props.changeBookShelf(e, this.props.book)}>
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{this.props.book.title}</div>
                        <div className="book-authors">{authors}</div>
              </div>
      );
    }

}



export default Book


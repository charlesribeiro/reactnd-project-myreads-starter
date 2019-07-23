import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Book extends Component{

    static propTypes = {
            title: PropTypes.string.isRequired,
            authors: PropTypes.string.isRequired,
            width: PropTypes.number,
            height: PropTypes.number,
            backgroundImage: PropTypes.string,
            changeBookShelf: PropTypes.func.isRequired,
            book: PropTypes.object.isRequired

    }

    changeShelfHandler(event)
    {
      console.log("foi", event.target.value);
    }

    render()
    {

        let authors = "No author information";
        if(this.props.authors)
        {
          authors = this.props.authors;
        }

        console.log(this.props.backgroundImage);
        return(
            <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: this.props.width, height: this.props.height, backgroundImage: this.props.backgroundImage? "url("+ this.props.backgroundImage+ ")":"error" }}></div>
                            <div className="book-shelf-changer">
                              <select value ={this.props.shelf} onChange={(e)=>this.props.changeBookShelf(e, this.props.book)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{this.props.title}</div>
                          <div className="book-authors">{authors}</div>
                </div>
        );
    }

}



export default Book

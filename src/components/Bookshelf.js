import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Bookshelf extends Component
{
    static propTypes = {
        books: PropTypes.array.isRequired
    }

    render(){
        return(
            "teste"
        );
    }
}

export default Bookshelf


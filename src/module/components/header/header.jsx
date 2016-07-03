// SCSS
require('./header.scss');

// Component
import React from 'react';
import Navigation from '../../components/navigation/navigation.jsx';

class Header extends React.Component {
    render() {
        return (
            <header>
                <Navigation />
                <h1>Header</h1>
            </header>
        )
    }
}

export default Header;
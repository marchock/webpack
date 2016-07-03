// SCSS
require('./home.scss');

// components
import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../../components/header/header.jsx';
import Footer from '../../components/footer/footer.jsx';


class Home extends React.Component {
    constructor(props) {
        super(props);
        //this.state = {count: props.initialCount};
        //this.tick = this.tick.bind(this);
    }

    render() {
        return ( // must me wrapped by a tag to work
            <div>
                <Header />
                <p>BODY NOT A COMPONENT</p>
                <Footer />
            </div>
        )
    }
}

ReactDOM.render(<Home/>, document.getElementById('home'));

import React from 'react';
import ReactDOM from 'react-dom';


// import Header from './Header';

function Footer() {
    return (
        <footer> 2023 John development. All rights reserved</footer>
    )
}

function MainContent() {
    return (
        <div>
            <h1>My awesome website in React</h1>
            <h3>Reasons I love React:</h3>
            <ul>
                <li>Was first released in 2013</li>
                <li>Was originally created by Jordan Walke</li>
                <li>Has well over 100K stars on Github</li>
                <li>Is maintained by Facebook</li>
                <li>Powers thousands of enterprise apps, includinf mobile apps</li>
            </ul>
        </div>
    )
}

function Page() {
    return (
        <div>

            <div className="container">
                <MainContent />
                <Footer />
            </div>
        </div>
    )
}

ReactDOM.render(<Page />, document.getElementById("root"))
import ReactImage from '../images/react.png';

function Header() {
    return (
        <header>
            <nav className="nav">
                <img src={ReactImage} className="nav-logo" alt="React Logo" />
                <ul className="nav-items">
                    <li>Pricing</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;

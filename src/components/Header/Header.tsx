import { Link } from "react-router-dom";
import "./header.css"

export const Header = () => {
    return (
        <header className="App-header">
            <nav>
                <Link to={""}>Podcaster</Link>
            </nav>
        </header>
    )
}
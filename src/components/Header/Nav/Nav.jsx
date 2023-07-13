import React from "react";
import { Link} from "react-router-dom";

const Nav = () => {

    return(
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Logo</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link to={"/"} className="nav-link" href="#">Home <span className="sr-only"></span> </Link>
                </li>
                <li className="nav-item active">
                    <Link to={"/past"} className="nav-link" href="#">Past Events <span className="sr-only"></span> </Link>
                </li>
                <li className="nav-item active">
                    <Link to={"/upcoming"} className="nav-link" href="#">Upcoming Events <span className="sr-only"></span> </Link>
                </li>
                <li className="nav-item active">
                    <Link to={"/contact"} className="nav-link" href="#">Contact <span className="sr-only"></span> </Link>
                </li>
                <li className="nav-item active">
                    <Link to={"/stats"} className="nav-link" href="#">Stats <span className="sr-only"></span> </Link>
                </li>
            </ul>
        </div>
</nav>

    </>
    )
}
export default Nav;
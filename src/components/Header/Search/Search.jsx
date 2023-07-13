import { useContext, useRef } from "react";
import StateContext from '../../../store/StateContext';

const Search =(props)=>{

    let {events} = useContext(StateContext);
    let inputTexto = useRef();


    return(
        <>
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand"></a>
                <form className="d-flex" role="search">
                    <input type="text" ref={inputTexto} className="form-control me-2" placeholder="Search" aria-label="Search"/>
                    <input onClick={() => props.filtrarEventos(inputTexto.current.value)} type="button" className="btn btn btn-primary" value="Buscar"/>
                </form>
            </div>
        </nav>
        </>
    )
}
export default Search;
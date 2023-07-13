import Nav from './Nav/Nav'
import Filters from './Filters/Filters'
import Search from './Search/Search'
import { useContext, useEffect, useState } from 'react'
import StateContext from "../../store/StateContext";

const Header = (props) =>{
    
    let {events, loadEvents,loadFilteredEvents, filteredEvents} = useContext(StateContext)
    let [eventosFiltrados, setEventosFiltrados] = useState([])
    let [categories, setCategories] =useState([]) 

    const obtenerChequeados=()=>{
        let checkeados = document.querySelectorAll("input[type=checkbox]:checked")
        checkeados = Array.from(checkeados)
        let chequeadosValues = checkeados.map((checkbox)=>checkbox.value)
        return chequeadosValues;
    }
    const filtrarEventos = (text) =>{
        let checkeados = obtenerChequeados()
        let eventosFiltradosporTexto = events.filter((evento) => evento.name.includes(text))
        if (text == "") {
            loadFilteredEvents(events);
        }else{
            loadFilteredEvents(eventosFiltradosporTexto)
            
            console.log(eventosFiltradosporTexto);
            console.log("Filtra");
        }
    }

    useEffect(()=>{
        setEventosFiltrados(filteredEvents);
        console.log(events);
    }, [filteredEvents])


    return(
        <>
        <Nav/>
        <Filters />
        <Search filtrarEventos ={filtrarEventos}/>
        </>
    )
}
export default Header
import {useState} from "react";
import StateContext from './StateContext';

const StateProvider = ({children}) => {
    
    let [events, setEvents] = useState([]);
    let [filteredEvents, setFilteredEvents] = useState([]);
    let [event, setEvent] = useState({
            id: "",
            name: "",
            date: "",
            description:"",
            image:"",
            place:"",
            price:"",
            capacity:"",
            assitence:"",
            estimate:""
    })

     //método para modificar u obtener

    const getEventsName = ()=>{
        return initialState.map(event=> event.name)
    }
    
    const addEvents = (event) =>{
        setEvent([...initialState, event]);
    }
    const loadEvents = (events) =>{
        setEvents(events);
        setFilteredEvents(events);
    }
    const loadFilteredEvents = (events) =>{
        setFilteredEvents(events);
    }
    
    const initialState = {
        events,
        filteredEvents,
        event,
        getEventsName,
        addEvents,
        loadEvents,
        loadFilteredEvents
    }
    //una vez que se definen los estados del contexto es posible agregar nuevos?
    //Si, es posible agregarle estado por medio de una función.
    

    return(
    <StateContext.Provider value={initialState}>
        {children}

    </StateContext.Provider>
    )
}
export default StateProvider;
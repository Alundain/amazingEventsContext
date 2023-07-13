import { useEffect, useState, useContext} from "react"
import StateContext from '../store/StateContext';
const Past = () =>{
    let[eventos, setEventos] = useState([]);
    let[eventosFiltrados, setEventosFiltrados] = useState([]);
    let {events,filteredEvents} = useContext(StateContext);


    useEffect(()=>{
        setEventos(events);
        console.log(events);
        const fechaActual = new Date();
        let eventosPasados = filteredEvents.filter((evento) =>{
            const fechaEvento = new Date(evento.date)
            return fechaEvento <  fechaActual
        })
        console.log(eventosPasados);
        //acá seteo lo de eventos filtrados y se los asigno a los eventos pasados
        setEventosFiltrados(eventosPasados)
    },[filteredEvents])
    
    return(
        <>
        <div className="center">
            <h1>Past Events</h1>
        </div>
        <div className="container">
            <div className="row">
            {
                eventosFiltrados.map((evento,index)=>{
                    return(
                        <div key={index} className="col-md-3" >
                        <div className="card dark-card" >
                            <img src={evento.image} className="card-img-top" alt="Imagen del card" />
                            <div className="card-body">
                                <h5 className="card-title">{evento.name} </h5>
                                <p className="card-text">Fecha: {evento.date} </p>
                                <p className="card-text">Price:${evento.price}</p>
                            </div>
                        </div>
                        </div>
                    )
                }
                )
            }
            </div>
        </div>
        </>
    )
}
export default Past
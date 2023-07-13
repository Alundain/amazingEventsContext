import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import StateContext from '../../store/StateContext';

const Cards = () =>{

let [eventos, setEventos] = useState([]);
let {events, filteredEvents} = useContext(StateContext);

useEffect(()=>{
    setEventos(filteredEvents)
    
},[filteredEvents])


    return(
    <>
    <div className="container">
        <div className="row">
            {
                eventos.map((evento,index)=>{
                    return( 
                        <div key={index} className="col-md-3">
                        <div className="card dark-card">
                            <img src={evento.image} className="card-img-top" alt="Imagen del card" />
                            <div className="card-body">
                                <h5 className="card-title">{evento.name} </h5>
                                <p className="card-text">{evento.description} </p>
                                <p className="card-text">Price:${evento.price}</p>
                                <Link to={"/details/" + evento._id} className="btn btn-primary">More info</Link>
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
export default Cards;
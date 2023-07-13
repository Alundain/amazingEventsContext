import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StateContext from '../store/StateContext';

const Details = () =>{


    let [evento, setEvento] = useState({})
    let params = useParams();
    let {events} = useContext(StateContext);
    console.log(params);
    
    useEffect(()=>{
        let evento = events.find((evento)=> evento._id == params.id );
        setEvento(evento);
    },[events])

    return(
        <>
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="card dark-card">
                        <img src={evento?.image} className="card-img-top" alt="Imagen del card" />
                        <div className="card-body">
                            <h5 className="card-title">{evento?.name} </h5>
                            <p className="card-text">{evento?.description} </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Details
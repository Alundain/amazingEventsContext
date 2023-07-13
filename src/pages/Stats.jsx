import { useEffect, useState, useContext} from "react";
import StateContext from '../store/StateContext';

const Stats = () => {

    let [eventos, setEventos] = useState([]);
    let [mayorAsistencia, setMayorAsistencia] = useState({});
    let [menorAsistencia, setMenorAsistencia] = useState({});
    let [mayorCapacidad, setMayorCapacidad] = useState({});
    let [estadisticasPasadas, setEstadisticasPasadas] = useState([]);
    let [estadisticasFuturas, setEstadisticasFuturas] = useState([]);
    let {events} = useContext(StateContext);

    const eventoMayor = (eventos) => {
        let mayor = null;
        eventos.forEach(evento => {
            if (mayor == null){
                mayor = evento;
            }
            if (((evento.assistance / evento.capacity) * 100) > ((mayor.assistance / mayor.capacity) * 100)) {
                mayor = evento;
            }
        });
        return mayor;
    }
    const eventoMenor = (eventos) => {
        let menor = null;
        eventos.forEach(evento => {
            if (menor == null){
                menor = evento;
            }
            if (((evento.assistance / evento.capacity) * 100) <= ((menor.assistance / menor.capacity) * 100)) {
                menor = evento;
            }
        });
        return menor;
    }

    const eventoMayorCapacidad = (eventos) => {
        let mayor = null;
        eventos.forEach(evento => {
            if (mayor == null){
                mayor = evento;
            }
            if (evento.capacity > mayor.capacity) {
                mayor = evento;
            }
        });
        return mayor;
    }
    const obtenerEstadisticasFuturas = (eventosFuturos) => {
        //recibira los eventos filtrados pasados
        let arrEstadisticas = [];
        let resultadosFuturos = {};
        for (var i = 0; i < eventosFuturos.length; i++) {
            var evento = eventosFuturos[i];
            var category = evento.category;
            var price = evento.price;
            var estimate = evento.estimate ? evento.estimate : evento.assistance;
            var capacity = evento.capacity;

            // Si la categoría no existe en los resultados, crearla
            if (!resultadosFuturos[category]) {
                resultadosFuturos[category] = {
                    ganancias: 0,
                    asistenciaTotal: 0,
                    capacidad: 0
                };
            }

            // Sumar las ganancias y la asistencia a la categoría correspondiente
            resultadosFuturos[category].ganancias += price;
            resultadosFuturos[category].asistenciaTotal += estimate;
            resultadosFuturos[category].capacidad += capacity;
        }
        for (var category in resultadosFuturos) {
            var asistenciaTotal = resultadosFuturos[category].asistenciaTotal;
            var capacidadTotal = resultadosFuturos[category].capacidad;
            var cantidadEventos = eventosFuturos.filter(function (evento) {
                return evento.category === category;
            }).length;
            resultadosFuturos[category].porcentajeAsistencia = ((asistenciaTotal / capacidadTotal) * 100).toFixed(2);
        }
        for (var categoria in resultadosFuturos) {
            if (resultadosFuturos.hasOwnProperty(categoria)) {
                var resultadoCategoria = resultadosFuturos[categoria];
                let objeto = {
                    name:  categoria,
                    ganancias: resultadoCategoria.ganancias,
                    porcentaje: resultadoCategoria.porcentajeAsistencia
                };

                arrEstadisticas.push(objeto);
            }
        }

        return arrEstadisticas;
    }

    const obtenerEstadisticasPasadas = (eventosPasados) => {
        //recibira los eventos filtrados pasados
        let arrEstadisticas = [];
        let resultadosPasados = {};
        for (var i = 0; i < eventosPasados.length; i++) {
            var evento = eventosPasados[i];
            var category = evento.category;
            var price = evento.price;
            var assistance = evento.assistance ? evento.assistance : evento.estimate;
            var capacity = evento.capacity;

            // Si la categoría no existe en los resultados, crearla
            if (!resultadosPasados[category]) {
                resultadosPasados[category] = {
                    ganancias: 0,
                    asistenciaTotal: 0,
                    capacidad: 0
                };
            }

            // Sumar las ganancias y la asistencia a la categoría correspondiente
            resultadosPasados[category].ganancias += price;
            resultadosPasados[category].asistenciaTotal += assistance;
            resultadosPasados[category].capacidad += capacity;
        }
        for (var category in resultadosPasados) {
            var asistenciaTotal = resultadosPasados[category].asistenciaTotal;
            var capacidadTotal = resultadosPasados[category].capacidad;
            var cantidadEventos = eventosPasados.filter(function (evento) {
                return evento.category === category;
            }).length;
            resultadosPasados[category].porcentajeAsistencia = ((asistenciaTotal / capacidadTotal) * 100).toFixed(2);
        }
        for (var categoria in resultadosPasados) {
            if (resultadosPasados.hasOwnProperty(categoria)) {
                var resultadoCategoria = resultadosPasados[categoria];
                let objeto = {
                    name:  categoria,
                    ganancias: resultadoCategoria.ganancias,
                    porcentaje: resultadoCategoria.porcentajeAsistencia
                };

                arrEstadisticas.push(objeto);
            }
        }

        return arrEstadisticas;
    }

    useEffect(()=>{
        setEventos(events)
        console.log(events);
        setMayorAsistencia(eventoMayor(events))
        setMenorAsistencia(eventoMenor(events))
        setMayorCapacidad(eventoMayorCapacidad(events))
        //otros procesos
        const fechaActual = new Date();
        let eventosPasados = events.filter((evento) => {
            const fechaEvento = new Date(evento.date);
            return fechaEvento < fechaActual;
        });
        console.log(eventosPasados);

        let estadisticasPasadas = obtenerEstadisticasPasadas(eventosPasados);
        setEstadisticasPasadas(estadisticasPasadas)
        console.log(estadisticasPasadas);

        let eventosFuturos = events.filter((evento) => {
            const fechaEvento = new Date(evento.date);
            return fechaEvento >= fechaActual;
        });
        console.log(eventosFuturos);

        let estadisticasFuturas = obtenerEstadisticasFuturas(eventosFuturos);
        console.log(estadisticasFuturas);
        setEstadisticasFuturas(estadisticasFuturas);
    },[events])

    return (
        <>
        <div className="center">
            <h1>Stats</h1>
        </div>
        <div className="container">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th className="table-dark" colSpan="3" >Events Statistics</th>
                    </tr>
                    <tr className="table-dark">
                        <th>Events with Highest Percentages of Attendance</th>
                        <th>Events with Lowest Percentages of Attendance</th>
                        <th>Events with Larger Capacity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{mayorAsistencia.name}</td>
                        <td>{menorAsistencia.name}</td>
                        <td>{mayorCapacidad.name}</td>
                    </tr>
                </tbody>
            </table>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th className="table-dark" colSpan="3" >Past Events stadistic by Category</th>
                    </tr>
                    <tr className="table-dark">
                        <th>Category</th>
                        <th>Revenues</th>
                        <th>Percentajes of Attendance</th>
                    </tr>
                </thead>
                <tbody>
                {
                estadisticasPasadas.map((estadisticasPasadas,index)=>{
                    return(
                        <tr key={index}>
                            <td>{estadisticasPasadas.name}</td>
                            <td>{estadisticasPasadas.ganancias}</td>
                            <td>{estadisticasPasadas.porcentaje}</td>
                        </tr>
                    )
                    })
                }
                </tbody>
            </table>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th className="table-dark" colSpan="3" >Upcoming Events stadistic by category</th>
                    </tr>
                    <tr className="table-dark">
                        <th>Category</th>
                        <th>Revenues</th>
                        <th>Percentajes of Attendance</th>
                    </tr>
                </thead>
                <tbody>
                
                {
                estadisticasFuturas.map((estadisticasFuturas,index)=>{
                    return(
                        <tr key={index}>
                            <td>{estadisticasFuturas.name}</td>
                            <td>{estadisticasFuturas.ganancias}</td>
                            <td>{estadisticasFuturas.porcentaje}</td>
                        </tr>
                    )
                    })
                }
                    <td></td>
                </tbody>
            </table>
        </div>
        </>
    );
    };
    export default Stats;
    
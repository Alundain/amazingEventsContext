import { useState, useEffect, useRef, useContext } from "react";
import StateContext from '../../../store/StateContext'
const Filters = () => {
  let[eventos, setEventos] = useState([])
  let[categories, setCategories] = useState([]);
  let [selectedCategories, setSelectedCategories] = useState([]);
  let {events} = useContext(StateContext)

  useEffect(()=>{

    if(events ){
      let categoriasMapeadas = events.map(evento => evento.category);
      let categoriesSet = new Set(categoriasMapeadas)
      let arrCategoriesSinRepetir = Array.from(categoriesSet)
      setCategories(arrCategoriesSinRepetir);
    }

  },[events])

    return (
    <>
    {
      categories.map((categoria, index)=>{
        return(
          <div key={index} className="form-check form-check-inline">
            <input value={categoria} className="form-check-input" type="checkbox"/>
            <label className="form-check-label" htmlFor="inlineCheckbox1">{categoria}</label>
        </div>
        )
      })
    }
    </>
    );
};
export default Filters;

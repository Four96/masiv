
import { useState, useEffect } from "react";
import { getComic } from "./api/comics";
import './App.css';


function App() {

  const [comic, setComic] = useState([]);
  const [errorState, setErrorState] = useState({ hasError: false })
  const [numeroComic, setNumeroComic] = useState(2623);
  const [estrellasHover, setEstrellasHover] = useState({uno: false, dos: false, tres: false, cuatro: false, cinco: false})
  const [estrellasClick, setEstrellasClick] = useState({uno: false, dos: false, tres: false, cuatro: false, cinco: false})
  const [puntuaciones, setPuntuaciones] = useState({});

  useEffect(() => {
    getComic(numeroComic).then((data) => setComic(data)).catch(handleError);
    if(puntuaciones[numeroComic])
      setEstrellasClick(puntuaciones[numeroComic])
    else if(estrellasClick.uno || estrellasClick.dos || estrellasClick.tres || estrellasClick.cuatro || estrellasClick.cinco)
      setEstrellasClick({uno: false, dos: false, tres: false, cuatro: false, cinco: false})
    
  }, [numeroComic, estrellasClick, puntuaciones])

  const handleError = (err) => {
    setErrorState({ hasError: true, message: err.message });
  };

  const cambiarComic = () => {
     setNumeroComic(Math.floor(Math.random() * (2624 - 1)) + 1);
  }
  
  const cambioEstadoEstrellasHover = (estrella, estado) =>{
    if(estrella === 1 && !estrellasClick.uno){
      if(estado)
        setEstrellasHover({uno: estado, dos: !estado, tres: !estado, cuatro: !estado, cinco: !estado})
      else
        setEstrellasHover({uno: estado, dos: estado, tres: estado, cuatro: estado, cinco: estado})
    }else if(estrella === 2 && !estrellasClick.dos){
      if(estado)
        setEstrellasHover({uno: estado, dos: estado, tres: !estado, cuatro: !estado, cinco: !estado})
      else
        setEstrellasHover({uno: estado, dos: estado, tres: estado, cuatro: estado, cinco: estado})
    }else if(estrella === 3 && !estrellasClick.tres){
      if(estado)
        setEstrellasHover({uno: estado, dos: estado, tres: estado, cuatro: !estado, cinco: !estado})
      else
        setEstrellasHover({uno: estado, dos: estado, tres: estado, cuatro: estado, cinco: estado})
    }else if(estrella === 4 && !estrellasClick.cuatro){
      if(estado)
        setEstrellasHover({uno: estado, dos: estado, tres: estado, cuatro: estado, cinco: !estado})
      else
        setEstrellasHover({uno: estado, dos: estado, tres: estado, cuatro: estado, cinco: estado})
    }else if(estrella === 5 && !estrellasClick.cinco){
      if(estado)
        setEstrellasHover({uno: estado, dos: estado, tres: estado, cuatro: estado, cinco: estado})
      else
        setEstrellasHover({uno: estado, dos: estado, tres: estado, cuatro: estado, cinco: estado})
    }
  }

  const cambiandoEstrellasClick = (estrella) =>{
    setEstrellasHover({uno: false, dos: false, tres: false, cuatro: false, cinco: false})
    if(estrella === 1){
      if(estrellasClick.dos || !estrellasClick.uno){
        setEstrellasClick({uno: true, dos: false, tres: false, cuatro: false, cinco: false})
        insertarPuntuacion({uno: true, dos: false, tres: false, cuatro: false, cinco: false})
      }else{
        setEstrellasClick({...estrellasClick, uno: false})
        insertarPuntuacion({...estrellasClick, uno: false})
      }
    }else if(estrella === 2){
      if(estrellasClick.tres || !estrellasClick.dos){
        setEstrellasClick({uno: true, dos: true, tres: false, cuatro: false, cinco: false})
        insertarPuntuacion({uno: true, dos: true, tres: false, cuatro: false, cinco: false})
      }else{
        setEstrellasClick({...estrellasClick, uno: false, dos: false})
        insertarPuntuacion({...estrellasClick, uno: false, dos: false})
      }
    }else if(estrella === 3){
      if(estrellasClick.cuatro || !estrellasClick.tres){
        setEstrellasClick({uno: true, dos: true, tres: true, cuatro: false, cinco: false})
        insertarPuntuacion({uno: true, dos: true, tres: true, cuatro: false, cinco: false})
      }else{
        setEstrellasClick({...estrellasClick, uno: false, dos: false, tres: false})
        insertarPuntuacion({...estrellasClick, uno: false, dos: false, tres: false})
      }
    }else if(estrella === 4){
      if(estrellasClick.cinco || !estrellasClick.cuatro){
        setEstrellasClick({uno: true, dos: true, tres: true, cuatro: true, cinco: false})
        insertarPuntuacion({uno: true, dos: true, tres: true, cuatro: true, cinco: false})
      }else{
        setEstrellasClick({...estrellasClick, uno: false, dos: false, tres: false, cuatro: false})
        insertarPuntuacion({...estrellasClick, uno: false, dos: false, tres: false, cuatro: false})
      }
    }else if(estrella === 5){
      if(!estrellasClick.cinco){
        setEstrellasClick({uno: true, dos: true, tres: true, cuatro: true, cinco: true})
        insertarPuntuacion({uno: true, dos: true, tres: true, cuatro: true, cinco: true})
      }else{
        setEstrellasClick({uno: false, dos: false, tres: false, cuatro: false, cinco: false})
        insertarPuntuacion({uno: false, dos: false, tres: false, cuatro: false, cinco: false})
      }
    } 
  }

  const insertarPuntuacion = (puntuacion) =>{
    setPuntuaciones({...puntuaciones, [comic.num]: puntuacion});
  }


  return (
    <div className = "paginaPrincipal">
      {errorState.hasError && <div>{errorState.message}</div>}
      <p id = "tituloComic" className="ComicFont">{comic.title}</p>
      <img src = {comic.img} alt = {comic.alt}  title = {comic.alt} id = "imagenComic"></img>
      <div id = "infoComic" className = "ComicFontBold anchoInfoComic">
          <div>
            <p>Number comic</p>
            <p>#{comic.num}</p>
          </div>
          <div>
            <p>Day</p>
            <p>{comic.day}</p>
          </div>
          <div>
            <p>Month</p>
            <p>{comic.month}</p>
          </div>
          <div>
            <p>Year</p>
            <p>{comic.year}</p>
          </div>
      </div>
      <button id = "buttonRandom" className = "ComicFontBold" onClick={() => cambiarComic()}>Press for random Comic</button>
      <div id = "lineaCalificacion">
        <img src = {estrellasHover.uno || estrellasClick.uno ? "img/estrellaLlena.png" : "img/estrellaVacia.png"} alt = "One star" title = "One star" 
          onMouseEnter = {() => cambioEstadoEstrellasHover(1, true)} onMouseLeave = {() => cambioEstadoEstrellasHover(1, false)} onClick = {() => cambiandoEstrellasClick(1)}/>
        <img src = {estrellasHover.dos || estrellasClick.dos ? "img/estrellaLlena.png" : "img/estrellaVacia.png"} alt = "Two stars" title = "Two stars" 
          onMouseEnter = {() => cambioEstadoEstrellasHover(2, true)} onMouseLeave = {() => cambioEstadoEstrellasHover(2, false)} onClick = {() => cambiandoEstrellasClick(2)}/>
        <img src = {estrellasHover.tres || estrellasClick.tres ? "img/estrellaLlena.png" : "img/estrellaVacia.png"} alt = "Three stars" title = "Three stars" 
          onMouseEnter = {() => cambioEstadoEstrellasHover(3, true)} onMouseLeave = {() => cambioEstadoEstrellasHover(3, false)} onClick = {() => cambiandoEstrellasClick(3)}/>
        <img src = {estrellasHover.cuatro || estrellasClick.cuatro ? "img/estrellaLlena.png" : "img/estrellaVacia.png"} alt = "Four stars"  title = "Four stars" 
          onMouseEnter = {() => cambioEstadoEstrellasHover(4, true)} onMouseLeave = {() => cambioEstadoEstrellasHover(4, false)} onClick = {() => cambiandoEstrellasClick(4)}/>
        <img src = {estrellasHover.cinco || estrellasClick.cinco ? "img/estrellaLlena.png" : "img/estrellaVacia.png"} alt = "Five start" title = "Five start" 
          onMouseEnter = {() => cambioEstadoEstrellasHover(5, true)} onMouseLeave = {() => cambioEstadoEstrellasHover(5, false)} onClick = {() => cambiandoEstrellasClick(5)}/>
    </div>

    </div>
  );
}

export default App;

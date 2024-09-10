import { useState } from 'react'

import './App.css'

function App() {  
  const [aleatorio, setAleatorio] = useState(Math.floor(Math.random() * 20) + 1);
  const [puntaje, setPuntaje] = useState(20);
  const [mayPuntaje, setMayPuntaje] = useState(0);
  const [auxiliar, setAuxiliar] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [revealAnswer, setRevealAnswer] = useState(false);
  const [adivinado, setAdivinado] = useState(false); // Nuevo estado para controlar el estado de adivinación

  // Maneja el cambio en el campo de texto
  const handleInputChange = (event) => {
    setAuxiliar(event.target.value);
  };

  // Maneja el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const guessedNumber = parseInt(auxiliar, 10); // Convierte el valor del input a número

    if (isNaN(guessedNumber)) {
      setMensaje("Por favor, ingresa un número válido");
      return;
    }
    
    if (guessedNumber === aleatorio) {
      setMensaje("Adivinaste, ¡Felicitaciones!");
      setRevealAnswer(true);
      setAdivinado(true); // Marca como adivinado
      if (puntaje > mayPuntaje) {
        setMayPuntaje(puntaje);
      }
    } else if (guessedNumber < aleatorio) {
      setMensaje("El número es más alto");
      setPuntaje(puntaje - 1);
    } else {
      setMensaje("El número es más bajo");
      setPuntaje(puntaje - 1);
    }
  };

  // Maneja el reinicio del juego
  const handleClick = () => {
    setAleatorio(Math.floor(Math.random() * 20) + 1);
    setPuntaje(20);
    setMensaje("");
    setAuxiliar('');
    setRevealAnswer(false);
    setAdivinado(false); // Restablece el estado de adivinación
  };

  return (
    <>
      <h1>Adivina el número</h1>
      <h2>Tu puntaje actual es: {puntaje}</h2>
      <div className="card">
        {revealAnswer && (
          <div>
            <p>El número era: {aleatorio}</p>
          </div>
        )}
        <h2>{mensaje}</h2>
        <form onSubmit={handleSubmit}>
          <label> Elige un número</label>
          <input 
            type="text" 
            name="numero" 
            value={auxiliar} 
            onChange={handleInputChange} 
            disabled={adivinado} // Deshabilita el campo si ya adivinó
          />
          <input 
            type="submit" 
            value="Enviar" 
            disabled={adivinado} // Deshabilita el botón si ya adivinó
          />
        </form>
        <button onClick={handleClick}>Reintentar</button>
        <div>
          <p>Máximo puntaje: {mayPuntaje}</p>
        </div>
      </div>
    </>
  );
}

export default App;

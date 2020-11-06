import React, { useState } from 'react';
import './RegisterForm.css';
import { serverRequest } from '../../hooks/urlBack';
import { setJWT } from '../../util/LocalStorage.utils';
// import TerminosYCondiciones from '../pages/TerminosYCondiciones';


export const RegisterForm = () => {
    // Contiene los valores del formulario:
    const [newUser, setNewUser] = useState({});

    // Maneja el estado del formulario:
    const handleInputs = (event) => {
        // Recojo el name y el valor del input:
        const { value, name } = event.target;
        setNewUser(prevValue => ({
            ...prevValue,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        // Prevengo que ser recargue la página:
        e.preventDefault();
        // Hago una petición post al servidor:
        serverRequest('register', 'POST', newUser)
            .then(response => {
                //guardar el token en el localStorage en un campo llamado token:
                setJWT(response.token);
            })
            .catch(console.log)
        // Reseteo los campos del formulario:
        e.target.reset();
    }

    return (
        <div className="RegisterForm-wrap">
            <h1>¡Personaliza tu experiencia!</h1>
            <p className="registerForm-p">Disfruta de una experiencia sin interrupciones en todos los dispositivos y recomendaciones personalizadas basadas en tu escucha. (Solo toma 30 segundos)</p>
            <form onSubmit={handleSubmit}>
                <input name="nombre" type="text" placeholder="Nombre completo*" onChange={handleInputs} required /> {/*value={nombre}*/}
                <input name="username" type="text" placeholder="Nombre de usuario*" onChange={handleInputs} required /> {/*value={nombre}*/}
                <input name="email" type="email" placeholder="Correo electrónico*" onChange={handleInputs} required /> {/*value={email}*/}
                <input name="password" type="password" placeholder="Contraseña*" onChange={handleInputs} required /> {/*value={password}*/}
                <input name="fechaNacimiento" type="date" placeholder="Año de nacimiento (AAAA)*" onChange={handleInputs} required /> {/*value={fechaNacimiento}*/}
                <div>
                    <input type="radio" name="genero" value="hombre" onChange={handleInputs} required />
                    <label htmlFor="hombre">Hombre</label>
                    <input type="radio" name="genero" value="mujer" onChange={handleInputs} required />
                    <label htmlFor="mujer">Mujer</label>
                    <input type="radio" name="genero" value="otro" onChange={handleInputs} required />
                    <label htmlFor="otro">Otro</label>
                </div>
                <br />
                <div className="RegisterForm-dflex">
                    <div className="a-login">
                        <span>¿Ya eres miembro?</span>
                        <a href="www.google.es">Inicia sesión</a>
                    </div>
                    <div>
                        <button>Regístrate</button>
                    </div>
                </div>
                <span className="RegisterForm-terminos">Al registrar, aceptas nuestros <a href="www.google.es">Términos de Servicio y Política de Privacidad</a></span>
            </form>

        </div>
    )
}
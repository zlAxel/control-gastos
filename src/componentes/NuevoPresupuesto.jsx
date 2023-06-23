import { useState } from "react";
import { Mensaje } from "./Mensaje";

export const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto }) => {

    const [mensaje, setMensaje] = useState('')

    const handlePresupuesto = (e) => {
        e.preventDefault()

        if( ! presupuesto || presupuesto < 0 ){
            setMensaje('No es un presupuesto válido')

            return
        }else{
            setMensaje('')

            setIsValidPresupuesto(true)
        }
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form onSubmit={ handlePresupuesto } className="formulario">
                <div className="campo">
                    <label htmlFor="nuevo-presupuesto">
                        Definir presupuesto
                    </label>
                    <input type="number" value={ presupuesto } onChange={ e => setPresupuesto(Number(e.target.value)) } className="nuevo-presupuesto" placeholder="Añade tu presupuesto" />
                </div>

                <input type="submit" value="Establecer" />

                { mensaje && 
                    <Mensaje tipo="error">
                        { mensaje }
                    </Mensaje>
                }
            </form>
        </div>
    )
}

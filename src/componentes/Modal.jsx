import { useState, useEffect } from "react";
import { Mensaje } from "./Mensaje";
import CerrarBtn from "../assets/img/cerrar.svg";
import { formatearCantidad } from "../assets/js/helpers";
import { generarID } from '../assets/js/helpers';

export const Modal = ({ modal, setModal, agregarGasto, editarGasto, disponible, gasto, setGasto }) => {

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState(0)
    const [categoria, setCategoria] = useState('')

    const [animar, setAnimar] = useState(false)
    const [mensaje, setMensaje] = useState('')

    useEffect(() => {
        if (Object.keys(gasto).length > 0) {
            setNombre(gasto.nombre)
            setCantidad(gasto.cantidad)
            setCategoria(gasto.categoria)
        }
    }, [gasto])
    

    const hideModal = () => {
        setAnimar(false)

        setTimeout(() => {
            setModal(false)
            setGasto({})
        }, 400);

        clearForm()
    }

    if(modal){
        setTimeout(() => {
            setAnimar(true)
        }, 300);
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if( [ nombre, cantidad, categoria ].includes('') ){
            setMensaje('Debes rellenar el formulario')

            setTimeout(() => {
                setMensaje('')
            }, 5000);
            return
        }

        if( cantidad > disponible ){
            setMensaje(`La cantidad escrita supera tu presupuesto (${ formatearCantidad(disponible)})`)

            return
        }

        const objetoGasto = { nombre, cantidad, categoria }

        if( gasto.id ){
            objetoGasto.id = gasto.id

            editarGasto(objetoGasto)
            setGasto({})
        }else{
            objetoGasto.id = generarID()
			objetoGasto.fecha = Date.now()

            agregarGasto(objetoGasto)
        }


        clearForm()
        hideModal()
    }

    const clearForm = () => {
        setNombre('')
        setCantidad(0)
        setCategoria('')
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img src={ CerrarBtn } onClick={ hideModal } alt="Cerrar modal" />
            </div>
            <form onSubmit={ handleSubmit } className={ `formulario ${ animar ? 'animar' : 'cerrar' }` } >
                <legend>{ gasto.id ? 'Editar gasto' : 'Nuevo gasto' }</legend>

                <div className="campo">
                    <label htmlFor="nombre">
                        Nombre del gasto
                    </label>
                    <input type="text" id="nombre" value={ nombre } onChange={ e => setNombre( e.target.value ) } placeholder="Añade el nombre del gasto" />
                </div>
                <div className="campo">
                    <label htmlFor="cantidad">
                        Cantidad
                    </label>
                    <input type="number" id="cantidad" value={ cantidad } onChange={ e => setCantidad( Number(e.target.value) ) } placeholder="Añade la cantidad del gasto, Ej: 30" />
                </div>
                <div className="campo">
                    <label htmlFor="categoria">
                        Categoría
                    </label>
                    <select id="categoria" value={ categoria } onChange={ e => setCategoria(e.target.value) }>
                        <option value="">Seleccione una opción</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="saludo">Saludo</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input type="submit" value={ gasto.id ? "Editar gasto" : "Agregar gasto" } />

                { mensaje &&
                    <Mensaje tipo="error">
                        { mensaje }
                    </Mensaje>
                }
            </form>
        </div>
    )
}

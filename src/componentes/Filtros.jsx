import { useState, useEffect } from "react";

export const Filtros = ({ filtro, setFiltro }) => {

    const removerFiltro = () => {
        setFiltro('')
    }

    return (
        <div className="filtros sombra contenedor">
            <form>
                <div className="campo">
                    <label htmlFor="">
                        Filtrar gastos
                    </label>
                    <select value={ filtro } onChange={ e => setFiltro( e.target.value ) }>
                        <option value="">Seleccione una opción</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="saludo">Saludo</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                    { filtro &&
                        <span style={ { textDecoration: 'underline', cursor: 'pointer', 'userSelect': 'none' } } onClick={ () => removerFiltro() }>Remover filtro</span>
                    }
                </div>
            </form>
        </div>
    )
}

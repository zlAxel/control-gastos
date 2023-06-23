import { formatearCantidad, formatearFecha } from "../assets/js/helpers"

import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import { iconos } from "../assets/img/iconos"

export const Gasto = ({ gasto, setGasto, eliminarGasto }) => {

    const { categoria, nombre, cantidad, fecha, id } = gasto

    const leadingActions = gasto => (
        <LeadingActions>
            <SwipeAction onClick={ () => {
                setGasto(gasto)
            } }>
                Editar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = id => (
        <TrailingActions>
            <SwipeAction onClick={ () => eliminarGasto(id) } destructive={ true }>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem leadingActions={ leadingActions(gasto) } trailingActions={ trailingActions(id) }>
                <div className="gasto sombra">
                    <div className="contenido-gasto">
                        <img src={ iconos[categoria] } alt={ `Icono ${ categoria }` } />
                        <div className="descripcion-gasto">
                            <p className="categoria">
                                { categoria }
                            </p>
                            <p className="nombre-gasto" style={{ cursor: "initial" }}>
                                { nombre }
                            </p>
                            <p className="fecha-gasto">
                                <span>
                                    Agregado el {''}
                                    { formatearFecha(fecha) }
                                </span>
                            </p>
                        </div>
                    </div>
                    <p className="cantidad-gasto">
                        { formatearCantidad(cantidad) }
                    </p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

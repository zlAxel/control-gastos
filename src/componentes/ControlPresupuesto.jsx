import { useEffect, useState } from "react";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import { AnimatedProgressProvider } from "../assets/js/AnimatedProgressProvider";
import { easeQuadInOut } from "d3-ease";

import { formatearCantidad } from "../assets/js/helpers"
import "react-circular-progressbar/dist/styles.css";

export const ControlPresupuesto = ({ gastos, setPresupuesto, presupuesto, disponible, setDisponible, setGastos, setIsValidPresupuesto }) => {

    const [porcentaje, setPorcentaje] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0 )
        const totalDisponible = presupuesto - totalGastado
        const nuevoPorcentaje = ( ( (presupuesto - totalDisponible) / presupuesto ) * 100 ).toFixed(2)

        setDisponible(totalDisponible)
        setGastado(totalGastado)

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 500);
	}, [gastos])

    const getColor = value => {
        return value >= 80 ? "#db2777" : "#3B82F6";
    };

    const resetearApp = () => {
        if( confirm('¿Deseas reiniciar el presupuesto y los gastos?') ){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                 <AnimatedProgressProvider
                    valueStart={0}
                    valueEnd={porcentaje}
                    duration={1.4}
                    easingFunction={easeQuadInOut}
                  >
                    {value => {
                        const roundedValue = value.toFixed(2);
                        const color = getColor(roundedValue);
                        return (
                            <CircularProgressbar
                                value={value}
                                text={`${roundedValue}% Gastado`}
                                /* This is important to include, because if you're fully managing the
                                animation yourself, you'll want to disable the CSS animation. */
                                styles={buildStyles({ 
                                    trailColor: '#F5F5F5',
                                    pathTransitionDuration: '1',
                                    pathTransition: "none",
                                    pathColor: color,
                                    textColor: color,
                                 })}
                            />
                        );
                    }}
                </AnimatedProgressProvider>
            </div>
            <div className="contenido-presupuesto">
                <button className="reset-app" onClick={ () => resetearApp() }>
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto: </span> { formatearCantidad(presupuesto) }
                </p>
                <p>
                    <span>Disponible: </span> { formatearCantidad(disponible) }
                </p>
                <p>
                    <span>Gastado: </span> { formatearCantidad(gastado) }
                </p>
            </div>
        </div>
    )
}

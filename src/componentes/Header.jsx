import { ControlPresupuesto } from "./ControlPresupuesto"
import { NuevoPresupuesto } from "./NuevoPresupuesto"

export const Header = ({ gastos, presupuesto, setPresupuesto, isValidPresupuesto, setIsValidPresupuesto, disponible, setDisponible, setGastos }) => {
    return (
        <header>
            {/* <h1>Planificador de Gastos</h1> */}
            <h1>Sistema de gestión digital</h1>

            { isValidPresupuesto ? (
                <ControlPresupuesto gastos={ gastos } setPresupuesto={ setPresupuesto } presupuesto={ presupuesto } disponible={ disponible } setDisponible={ setDisponible } setGastos={ setGastos } setIsValidPresupuesto={ setIsValidPresupuesto } />
            ) : (
                <NuevoPresupuesto presupuesto={ presupuesto } setPresupuesto={ setPresupuesto } setIsValidPresupuesto={ setIsValidPresupuesto } />
            ) }
        </header>
    )
}

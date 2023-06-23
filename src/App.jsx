import { useState, useEffect } from 'react'

import { Header } from './componentes/Header'
import { ListadoGastos } from './componentes/ListadoGastos';
import { Filtros } from './componentes/Filtros';
import { Modal } from './componentes/Modal';

import ImagenNuevoGasto from "./assets/img/nuevo-gasto.svg";

function App() {

	const [presupuesto, setPresupuesto] = useState(
		Number(localStorage.getItem('presupuesto')) ?? 0
	)
	const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
	const [modal, setModal] = useState(false)
	const [gasto, setGasto] = useState({})
	const [gastos, setGastos] = useState(
		JSON.parse(localStorage.getItem('gastos')) ?? []
	)
	const [disponible, setDisponible] = useState(0)
	const [filtro, setFiltro] = useState('')
	const [gastosFiltrados, setGastosFiltrados] = useState([])

	useEffect(() => {
		localStorage.setItem('presupuesto', presupuesto ?? 0)

		setDisponible(presupuesto)
	}, [presupuesto])
	useEffect(() => {
		localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
	}, [gastos])
	useEffect(() => {
		if( Object.keys(gasto).length > 0 ){
			setModal(true)
		}
	}, [gasto])
	useEffect(() => {
		if( filtro ){
			const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro )
			setGastosFiltrados( gastosFiltrados )
		}
	}, [filtro])
	
	useEffect(() => {
		const presupuestoLS = Number(localStorage.getItem('presupuesto'))
		const gastosLS = JSON.parse(localStorage.getItem('gastos'))
		if (presupuestoLS > 0) {
			setIsValidPresupuesto(true)
		}
		if(Object.keys(gastosLS).length > 0){
			setGastos(gastosLS)
		}
	}, [])
	
	
	const agregarGasto = (gasto) => {
		if (Object.keys(gasto).length > 0) {
			setGastos( [ ...gastos, gasto ] )
		}
	}
	const editarGasto = (gasto) => {
		if (Object.keys(gasto).length > 0) {
			const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState )
			setGastos(gastosActualizados)
		}
	}
	const eliminarGasto = (id) => {
		const gastosActualizados = gastos.filter( gasto => gasto.id !== id )
		setGastos(gastosActualizados)
	}

	const handleNuevoGasto = () => {
		setModal(true)
	}

	return (
		<div className={ modal ? 'fijar' : '' }>
			<Header gastos={ gastos } presupuesto={ presupuesto } setPresupuesto={ setPresupuesto } isValidPresupuesto={ isValidPresupuesto } 
					 setIsValidPresupuesto={ setIsValidPresupuesto } disponible={ disponible } setDisponible={ setDisponible } setGastos={ setGastos } />

			{ isValidPresupuesto && 
				<>
					<main>
						<Filtros filtro={ filtro } setFiltro={ setFiltro } />
						<ListadoGastos gastos={ gastos } setGasto={ setGasto } eliminarGasto={ eliminarGasto } filtro={ filtro } gastosFiltrados={ gastosFiltrados } />
					</main>
					<div className="nuevo-gasto">
						{ disponible <= 0 ?
							<p className='cantidad-gasto'>El presupuesto ha llegado a su límite</p>
							:
							<img src={ ImagenNuevoGasto } onClick={ handleNuevoGasto } alt="Icono nuevo gasto" />
						}
					</div>
				</>
			}

			{ modal &&
				<Modal modal={ modal } setModal={ setModal } agregarGasto={ agregarGasto } editarGasto={ editarGasto } disponible={ disponible } gasto={ gasto } setGasto={ setGasto } />
			}
		</div>
	)
}

export default App

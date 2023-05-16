import { useState } from "react"
import Input from "./components/Input"
import Results from "./components/Results"
import useFetch from "./useFetch"

const urlApi="https://www.dolarsi.com/api/api.php?type=valoresprincipales"

interface Cotizacion{
  casa: {nombre: string; compra: string; venta: string}
}


const App = ( ) => {
  const fetchState = useFetch<Cotizacion[]>(urlApi)
  const cotizaciones = fetchState.data?.filter((cotizacion:Cotizacion) => ["Dolar Oficial", "Dolar Bolsa", "Dolar Blue"].includes(cotizacion.casa.nombre)).map((cotizacion:Cotizacion) => ({nombre: cotizacion.casa.nombre, compra: Number(cotizacion.casa.compra.split(",")[0]), venta: Number(cotizacion.casa.venta.split(",")[0]),})) // filter the money that we want and create another array
  
  const [amount, setAmount] = useState(0)   // state of the input value
  const handleChange=(value:number)=>{      // change value of input onChange
    setAmount(value)
  }

  if(fetchState.state == 'loading' || fetchState.state == 'idle') return ( <div>Cargando...</div>)  // if loading 
  if(fetchState.state == 'error' || !fetchState.data) return ( <div>Error...</div>)                 // if error

  return (
    <>
    <main className="main">
      <section className="section"> 
       <Input amount={amount} handleChange={handleChange} />
        <Results cotizaciones={cotizaciones} amount={amount}/>
      </section>
    </main>
    
      
    </>
  )
}

export default App

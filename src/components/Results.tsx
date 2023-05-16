
const Results = ({amount, cotizaciones}:any) => {
  return (
    <div className="results">
          <ul className="results-list">
            {cotizaciones.map(({nombre, venta}:any)=>{
              const total = amount ? Number(amount / venta) : venta;
              return (
                <li className="result-item" key={nombre}>
                <span>{nombre}</span>
                <p className="result-money">
                  {amount ? <span> 
                        {Number(total).toLocaleString("es-AR", {
                          style: "currency",
                          currency: "ARS",
                        })
                      }
                        </span>:null
                        }
                  <span> {Number(venta).toLocaleString("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    })}</span>
                </p>            
              </li>
            )})}
          </ul>
        </div>
  )
}

export default Results
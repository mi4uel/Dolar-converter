const Input = ({amount, handleChange}: {amount: number; handleChange: (amount: number) => void}) => {
  return (
    <div className="flex flex-col space-y-2">
        <label htmlFor="money" className="label">Monto en ARS</label>
        <input type="number"
          name="money" 
          id="money" 
          placeholder="150.00"
          className="input"
          value={amount}
          onChange={(e)=>{handleChange(Number(e.target.value))}}
          />
    </div>
  )
}

export default Input
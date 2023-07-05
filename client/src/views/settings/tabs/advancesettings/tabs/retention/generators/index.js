export const generateOptions=(retentionData,optionsList,sender)=>
{
    const data = [...retentionData];
    data.sort((a, b) => a?.upperLimit - b?.upperLimit)
    const value = data.slice(-1)
    const startFrom=value[0]?.upperLimit+1
    return (
      <>
      <option>Select</option>
      {sender==="from"?
      <option>{optionsList.slice(startFrom)[0]}</option>:
      optionsList.slice(startFrom).map((value)=>
      (
       <option>{value}</option> 
      )
     
    
      )}
       {sender==="from"&&startFrom===1000&&<option>999</option>}
      {startFrom<100000&&sender==="to" &&<option value={100000}>999+</option>}
      </>
    )
}

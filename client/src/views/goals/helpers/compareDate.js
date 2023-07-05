export const isDayPassed=(passedDate)=>
{ 
    let value = new Date(passedDate);
    value.setDate(value.getDate()+1)
    

    try{
        if(value)
        {
            if(value<new Date())
            {                    
                return true;
            }
            else{
                return false;
            }
        }
        

    }
    catch
    {
        return false;
    }
}

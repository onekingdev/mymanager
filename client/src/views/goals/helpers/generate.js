export const generateDate = (date,repetition,frequency) => {
  const d = new Date(date)
  if (frequency==="Every week")
  {
    const weekDay= new Date(date).getDay();
    const adder= 7-weekDay;
    const days=((parseInt(repetition)-1)*7)+adder;
    d.setDate(d.getDate()+parseInt(days,10))
    return (
      <span>
        {d.getUTCMonth() + 1}/{d.getDate()}/{d.getUTCFullYear()}
      </span>
    );
  }
  if (frequency==="Every day")
  {
    d.setDate(d.getDate()+parseInt(repetition,10))
    return (
      <span>
        {d.getUTCMonth() + 1}/{d.getDate()}/{d.getUTCFullYear()}
      </span>
    );
  }
  };
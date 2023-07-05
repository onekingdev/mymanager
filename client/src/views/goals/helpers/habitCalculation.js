export const currentStatusCalculator = (task) => {
    try {
        if (task.frequency === "Every day") {
            return task?.actionPlans?.length + "/" + task?.repetition
        }
        if (task.frequency === "Every week") {
            let countHold = 0;
            let finalCount = 0;
            const startDate = new Date(task.startDate)
            const data = task.actionPlans;
            const dayOfWeek = startDate.getDay();
            const totalDays = (7 - dayOfWeek) + ((task.repetition - 1) * 7)
            for (let i = 0; i < totalDays; i++) {
                let dayOfWeek
                const matchedData = data.find(x => {
                    const dt = new Date(x.date);
                    const d = new Date(task.startDate);
                    d.setDate(d.getDate() + i)
                    dayOfWeek = d.getDay();
                    if (`${d.getDate()}/${d.getMonth()}/${d.getFullYear()}` === `${dt.getDate()}/${dt.getMonth()}/${dt.getFullYear()}`) {
                        return x
                    }
                })
                if (matchedData) {
                    countHold = countHold + 1;
                    if (countHold === parseInt(task?.daysFrequency)) {
                        finalCount = finalCount + 1;
                    }
                }
                if (dayOfWeek === 6) {
                    countHold = 0;
                }
            }
            return (finalCount + "/" + task?.repetition)
        }
    }
    catch {
        return ("-")
    }
}
export const generateSeries = (task, option) => {
    if (task.frequency === "Every day") {
        const number = parseInt(task?.actionPlans?.length) / parseInt(task?.repetition) * 100
        const shortNumber = parseInt(number, 10)
        const arr = [shortNumber]
        return (
            option ? arr : shortNumber
        )
    }
    if (task.frequency === "Every week") {
        try {
            const recievedData = currentStatusCalculator(task);
            const number = parseInt(recievedData.split("/")[0]) / parseInt(recievedData.split("/")[1]) * 100
            const shortNumber = parseInt(number, 10)
            const arr = [shortNumber]
            return (
                option ? arr : shortNumber
            )

        }
        catch {
            return option ? [0] : 0
        }
    }

}
export const isHabitComplete = (task) => {
    try {
        if (task.type === "habit") {

            const reciever = currentStatusCalculator(task)
            const upperLimit = reciever.split("/")[1]
            const lowerLimit = reciever.split("/")[0]
            if (lowerLimit >= upperLimit) {
                return true
            }



        }
    }
    catch{

    }
}
export const calculateDaysLeftForGoals = (task) => {
    const endDate = new Date(task.endDate);
    const today = new Date();
    const time_diff = endDate.getTime() - today.getTime();
    const Difference_In_Days = time_diff / (1000 * 3600 * 24);
    return parseInt(Difference_In_Days, 10) + 1

}
export const goalProgress = (item) => {
    if (item.length > 0) {
        let count = 0
        for (let i = 0; i < item.length; i++) {
            const report = item[i].status;
            if (report === "Completed") {
                count = count + 1
            }
        }
        return (count)
    }
    else {
        return ("-")
    }
}
export const calculateScore = (item) => {
    if (item.length > 0) {
        let count = 0
        for (let i = 0; i < item.length; i++) {
            const report = item[i].status;
            if (report === "Completed") {
                count = count + 1
            }
        }
        return (count + "/" + item.length)
    }
    else {
        return (0)
    }
}
export const calculatePerGoal = (item, cat) => {
    try {
        if (item.length > 0) {
            let count = 0
            for (let i = 0; i < item.length; i++) {
                const report = item[i].status;
                if (report === "Completed") {
                    count = count + 1
                }
            }
            const per = (parseInt(count) / parseInt(item.length)) * 100
            const fPer = parseInt(per, 10)
            if (cat === "chart") {
                return ([fPer])
            }
            else {
                return (fPer)
            }
        }
        else {
            return (0)
        }
    }
    catch
    {
        if (cat === "chart") {
            return ([0])
        }
        else {
            return (0)
        }
    }

}

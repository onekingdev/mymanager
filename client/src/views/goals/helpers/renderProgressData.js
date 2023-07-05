export const renderStatus = (row, currentStatusCalculator) => {
    if (row.type === "habit") {
        try {
            const receiver = currentStatusCalculator(row);
            const upperValue = receiver.split("/")[1];
            const lowerValue = receiver.split("/")[0];
            if (parseInt(lowerValue) >= parseInt(upperValue)) {
                return ("Completed")
            }
            return (lowerValue + "/" + upperValue)

        }
        catch {
            return ("Current:" + row.actionPlans.length)
        }
    }
    if (row.type === "target") {
        try {

            if (row.progressType === "CurrentProgress") {
                if (parseInt(row.measureTo) > parseInt(row.measureFrom)) {
                    if (parseInt(row.measureTo) <= parseInt(row.currentProgress)) {
                        return ("Completed")
                    }
                    else {
                        if(row.measureLabel==="$")
                        {
                            return ("Target:" + row.measureLabel + " " + row.measureTo)
                        }
                        else
                        {
                            return ("Target:" + row.measureTo + " " + row.measureLabel)
                        }
                     
                    }
                }
                if (parseInt(row.measureTo) < parseInt(row.measureFrom)) {
                    if (parseInt(row.measureTo) >= parseInt(row.currentProgress)) {
                        return ("Completed")
                    }
                    else {
                        if(row.measureLabel==="$")
                        {
                            return ("Target:" + row.measureLabel + " " + row.measureTo)
                        }
                        else
                        {
                            return ("Target:" + row.measureTo + " " + row.measureLabel)
                        }
                    }
                }
            }
            else {
                const status = percentageOfSubgoals(row.status)
                return status === 100 ? "Completed" : row.status
            }
        }
        catch
        {
            return row.status
        }
    }
}
export const renderProgress = (row, currentStatusCalculator) => {
    try {
        if (row.type === "habit") {
            const result = currentStatusCalculator(row);
            const upperValue = parseInt(result.split("/")[1]);
            const lowerValue = parseInt(result.split("/")[0]);
            const per = parseInt((lowerValue / upperValue) * 100,10);
            if (per === 0) {
                return (0)
            }
            if (per > 100) {
                return (100)
            }
            else {
                return (per)
            }
        }
        if (row.type === "target") {
            if (row.progressType === "CurrentProgress") {
                const lowervalue = parseInt(row.currentProgress);
                const uppervalue = parseInt(row.measureTo);
                const per = parseInt((lowervalue / uppervalue) * 100,10);
                return (per)
            }
        }
    }
    catch (error) {

        return (0)
    }
}
// under goals list
export const generateProgressOfCurrentProgress = (row, Check) => {

    try {
        const upperLimit = parseInt(row.measureTo)
        const lowerLimit = parseInt(row.measureFrom)
        if (lowerLimit > upperLimit) {
            if (Check === "check") {
                return true
            }

            if ((lowerLimit - upperLimit) - ((parseInt(row.currentProgress) - upperLimit)) > 0) {
                return (lowerLimit - upperLimit) - (parseInt(row.currentProgress) - upperLimit)
            }
            else {
                return 0
            }
        }
        if (lowerLimit <= upperLimit) {
            if (Check === "check") {
                return false
            }
            if (parseInt(row?.currentProgress) - lowerLimit > 0) {
                return (parseInt(row?.currentProgress) - lowerLimit)
            }
            else {
                return 0
            }
        }
    }
    catch
    {
        return 0
    }
}
// under goals list
export const generateMaxValueOfCurrentProgress = (row) => {
    try {
        const upperLimit = parseInt(row.measureTo)
        const lowerLimit = parseInt(row.measureFrom)
        if (lowerLimit > upperLimit) {
            return lowerLimit - upperLimit
        }
        if (lowerLimit <= upperLimit) {
            return upperLimit - lowerLimit
        }
    }
    catch
    {
        return 100
    }
}
export const generatePercentageForCurrentProgress = (row) => {
    try {

        const upperValue = parseInt(generateMaxValueOfCurrentProgress(row));
        const lowerValue = parseInt(generateProgressOfCurrentProgress(row));
        const per = parseInt((lowerValue / upperValue) * 100,10)
        return per > 100 ? 100 : per

    }
    catch {
        return 0
    }
}
export const generatePerForManualGoal = (row, isChart) => {
    const upperLimit = parseInt(row.measureTo)
    const lowerLimit = parseInt(row.measureFrom)
    const current = parseInt(row.currentProgress)
    if (lowerLimit < upperLimit) {
        const baseValue = upperLimit - lowerLimit;
        const measureValue = current - lowerLimit;
        if (measureValue < 0) {
            return 0
        }
        else {
            const per = (measureValue * 100) / baseValue;
            if (per > 100) {
                if (isChart === "chart") {
                    return [100]
                }
                else {
                    return 100
                }
            }
            else {
                if (isChart === "chart") {
                    return [parseInt(per, 10)]
                }
                else {
                    return parseInt(per, 10)
                }
            }
        }
    }
    else {
        const baseValue = lowerLimit - upperLimit;
        const measureValue = lowerLimit - current;
        if (measureValue < 0) {
            return 0
        }
        else {
            const per = (measureValue * 100) / baseValue
            if (per > 100) {
                if (isChart === "chart") {
                    return [100]
                }
                else {
                    return 100
                }
            }
            else {
                if (isChart === "chart") {
                    return [parseInt(per, 10)]
                }
                else {
                    return parseInt(per, 10)
                }
            }
        }
    }
}
export const completedSubGoals = (status) => {
    try {
        if (status === "Completed") {
            return 100;
        }
        if (status && status != "Completed") {
            const splitted = status.split('/')
            return parseInt(splitted[0]);
        }
    }
    catch
    {
        return null;
    }
}
export const totalSubGoals = (status) => {
    try {

        if (status === "Completed") {
            return 100;
        }
        if (status && status != "Completed") {
            const splitted = status.split('/')
            if (splitted[1] === "0") {
                return 100
            }
            else {
                return parseInt(splitted[1]);
            }
        }
    }
    catch
    {
        return null;
    }
}
export const percentageOfSubgoals = (status) => {
    try {
        return parseInt((completedSubGoals(status) / totalSubGoals(status)) * 100, 10)
    }
    catch {
        return 0
    }
}
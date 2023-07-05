export const calculateStreak = (task, type) => {
    try {
        const record = task?.actionPlans;
        const createdAt = new Date(task?.startDate);
        const dayLapsed = new Date().getDate() - createdAt.getDate();
        let count = 0;
        const recordLength = record.length;
        const bestStreak = () => {
            let finalValue = 0;
            let tempValue = 0;
            if (recordLength > 0) {
                for (let i = 0; i < dayLapsed + 1; i++) {
                    const checker = new Date(createdAt);
                    checker.setDate(checker.getDate() + i)
                    const match = record.find(x => {
                        const day = new Date(x.date)
                        if (checker.getDate() + checker.getMonth() + checker.getFullYear() === day.getDate() + day.getMonth() + day.getFullYear()) {
                            return x
                        }
                    })
                    if (match) {
                        tempValue = tempValue + 1;
                        if (tempValue > finalValue) {
                            finalValue = tempValue;
                        }
                    }
                    else {
                        tempValue = 0
                    }
                }
                count = finalValue;
            }
        }
        const currentStreak = () => {
            if (recordLength > 0) {
                for (let j = 0; j < recordLength; j++) {
                    const checkDate = new Date();
                    checkDate.setDate(checkDate.getDate() - j)
                    const match = record.find(x => {
                        const d = new Date(x.date);
                        if (checkDate.getDate() + checkDate.getMonth() + checkDate.getFullYear() === d.getDate() + d.getMonth() + d.getFullYear()) {
                            count = count + 1
                            return x
                        }
                    })
                    if (!match) {
                        break;
                    }
                }
            }
        }
        type === "current" && currentStreak();
        type === "best" && bestStreak();
        return (
            count
        )
    }
    catch {
        return "-"
    }

}
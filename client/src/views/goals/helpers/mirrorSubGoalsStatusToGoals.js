export const isGoalCompleted = (subGoalsList) => {
    let completed = 0;
    const length = subGoalsList.length;
    subGoalsList.length && subGoalsList.map((item) => {
        if (item.status === "Completed") {
            completed = completed + 1;
        }
    }
    )
    return (completed+"/"+length)
}
export const calculateProgress = (goals) => {
  const validGoals = goals.filter((goal) => goal.goalValue > 0);
  const totalProgress = validGoals.reduce((acc, goal) => {
    const progressToAdd =
      goal.progress > goal.goalValue ? goal.goalValue : goal.progress;
    return acc + progressToAdd;
  }, 0);

  const totalGoal = validGoals.reduce((acc, goal) => acc + goal.goalValue, 0);
  return {
    totalGoal,
    totalProgress,
    progressPercentage: totalGoal > 0 ? (totalProgress / totalGoal) * 100 : 0,
  };
};

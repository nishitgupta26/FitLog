import { create } from "zustand";
import { persist } from "zustand/middleware";

const useGoalStore = create(
  persist(
    (set, get) => {
      // function to filter out invalid goals
      const filterInvalidGoals = (goals) => {
        return goals.filter(
          (goal) => !(goal.progress === 0 && goal.goalValue === 0)
        );
      };

      return {
        goals: [],
        // Add new goal or update progress of existing goal
        addOrUpdateGoal: (newExercise, mode) =>
          set((state) => {
            const existingGoalIndex = state.goals.findIndex(
              (goal) =>
                goal.exercise.toLowerCase() ===
                newExercise.exercise.toLowerCase()
            );

            let updatedGoals;

            if (existingGoalIndex !== -1) {
              // Update existing goal
              updatedGoals = [...state.goals];
              if (mode === "progress") {
                // Update progress
                const existingGoal = updatedGoals[existingGoalIndex];
                updatedGoals[existingGoalIndex] = {
                  ...existingGoal,
                  progress: newExercise.value,
                  comments: newExercise.comments,
                  lastUpdated: new Date().toISOString(),
                };
              } else {
                // Update goal value
                updatedGoals[existingGoalIndex] = {
                  ...updatedGoals[existingGoalIndex],
                  goalValue: newExercise.value,
                  type: newExercise.type,
                  comments: newExercise.comments,
                  lastUpdated: new Date().toISOString(),
                };
              }
            } else {
              // Add new goal
              const newGoal = {
                ...newExercise,
                id: Date.now(),
                progress: mode === "progress" ? newExercise.value : 0,
                goalValue: mode === "progress" ? 0 : newExercise.value,
                createdAt: new Date().toISOString(),
                lastUpdated: new Date().toISOString(),
              };
              updatedGoals = [...state.goals, newGoal];
            }

            // Filter out invalid goals before returning
            return { goals: filterInvalidGoals(updatedGoals) };
          }),

        deleteGoal: (goalId, mode) =>
          set((state) => {
            const updatedGoals = state.goals.map((goal) => {
              if (goal.id === goalId) {
                if (mode === "progress") {
                  return { ...goal, progress: 0 };
                } else {
                  return { ...goal, goalValue: 0 };
                }
              }
              return goal;
            });
            return { goals: filterInvalidGoals(updatedGoals) };
          }),

        clearGoals: () => set({ goals: [] }),

        resetAllGoalValues: () =>
          set((state) => ({
            goals: filterInvalidGoals(
              state.goals.map((goal) => ({
                ...goal,
                goalValue: 0,
                lastUpdated: new Date().toISOString(),
              }))
            ),
          })),
      };
    },
    {
      name: "fitness-goals",
      getStorage: () => localStorage,
    }
  )
);

export default useGoalStore;

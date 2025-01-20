import {create} from 'zustand';
import { persist } from 'zustand/middleware';

const useGoalStore = create(
  persist(
    (set, get) => ({
      goals: [],
      // Add new goal or update progress of existing goal
      addOrUpdateGoal: (newExercise, mode) => set((state) => {
        const existingGoalIndex = state.goals.findIndex(
          goal => goal.exercise.toLowerCase() === newExercise.exercise.toLowerCase()
        );

        if (existingGoalIndex !== -1) {
          // Update existing goal
          if (mode === 'progress') {
            // Update progress
            const updatedGoals = [...state.goals];
            const existingGoal = updatedGoals[existingGoalIndex];
            updatedGoals[existingGoalIndex] = {
              ...existingGoal,
              progress: existingGoal.progress + newExercise.value,
              lastUpdated: new Date().toISOString()
            };
            return { goals: updatedGoals };
          } else {
            // Update goal value
            const updatedGoals = [...state.goals];
            updatedGoals[existingGoalIndex] = {
              ...updatedGoals[existingGoalIndex],
              goalValue: newExercise.value,
              type: newExercise.type,
              comments: newExercise.comments,
              lastUpdated: new Date().toISOString()
            };
            return { goals: updatedGoals };
          }
        } else {
          // Add new goal
          const newGoal = {
            ...newExercise,
            id: Date.now(),
            progress: mode === 'progress' ? newExercise.value : 0,
            goalValue: mode === 'progress' ? 0 : newExercise.value,
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
          };
          return { goals: [...state.goals, newGoal] };
        }
      }),
      deleteGoal: (goalId) => set((state) => ({
        goals: state.goals.filter(goal => goal.id !== goalId)
      })),
      clearGoals: () => set({ goals: [] })
    }),
    {
      name: 'fitness-goals',
      getStorage: () => localStorage,
    }
  )
);

export default useGoalStore;
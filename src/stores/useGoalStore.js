// stores/goalStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useGoalStore = create(
  persist(
    (set, get) => ({
      goals: [],
      
      // Add a new goal with exercises
      addGoal: (exercises) => set((state) => ({
        goals: [...state.goals, {
          id: Date.now(),
          createdAt: new Date().toISOString(),
          exercises: exercises.map(exercise => ({
            ...exercise,
            progress: 0,
            completed: false,
            lastUpdated: new Date().toISOString()
          }))
        }]
      })),

      // Update exercise progress within a goal
      updateExerciseProgress: (goalId, exerciseId, progress) => set((state) => ({
        goals: state.goals.map(goal => {
          if (goal.id === goalId) {
            return {
              ...goal,
              exercises: goal.exercises.map(exercise => {
                if (exercise.id === exerciseId) {
                  const completed = progress >= exercise.value;
                  return {
                    ...exercise,
                    progress,
                    completed,
                    lastUpdated: new Date().toISOString()
                  };
                }
                return exercise;
              })
            };
          }
          return goal;
        })
      })),

      // Delete a goal
      deleteGoal: (goalId) => set((state) => ({
        goals: state.goals.filter(goal => goal.id !== goalId)
      })),

      // Get active goal (most recent)
      getActiveGoal: () => {
        const goals = get().goals;
        return goals.length > 0 ? goals[goals.length - 1] : null;
      },

      // Clear all goals
      clearGoals: () => set({ goals: [] })
    }),
    {
      name: 'fitlog-goals',
      // Only store necessary data
      partialize: (state) => ({
        goals: state.goals.map(goal => ({
          id: goal.id,
          createdAt: goal.createdAt,
          exercises: goal.exercises
        }))
      })
    }
  )
);

export default useGoalStore;
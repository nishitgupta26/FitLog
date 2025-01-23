import { create } from "zustand";
import { exerciseData } from "../dataFiles/exerciseData";

const useExerciseGuideStore = create((set) => ({
  exercises: exerciseData,

  // Directly extract exercise names from the exercises
  exerciseNames: exerciseData.map((exercise) => exercise.name),

  searchTerm: "",
  selectedCategory: "all",

  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  addExercise: (exercise) =>
    set((state) => {
      const newExercise = { ...exercise, id: Date.now() };
      return {
        exercises: [...state.exercises, newExercise],
        exerciseNames: [...state.exerciseNames, newExercise.name],
      };
    }),

  updateExercise: (id, updates) =>
    set((state) => {
      const updatedExercises = state.exercises.map((ex) =>
        ex.id === id ? { ...ex, ...updates } : ex
      );
      return {
        exercises: updatedExercises,
        exerciseNames: updatedExercises.map((ex) => ex.name),
      };
    }),

  deleteExercise: (id) =>
    set((state) => {
      const remainingExercises = state.exercises.filter((ex) => ex.id !== id);
      return {
        exercises: remainingExercises,
        exerciseNames: remainingExercises.map((ex) => ex.name),
      };
    }),
}));

export default useExerciseGuideStore;

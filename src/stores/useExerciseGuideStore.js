import { create } from "zustand";
import axios from "axios";

const useExerciseGuideStore = create((set, get) => ({
  exercises: [],
  exerciseNames: [],
  searchTerm: "",
  selectedCategory: "all",

  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  fetchExercises: async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/exercises");
      const exercises = response.data;
      set({
        exercises: exercises,
        exerciseNames: exercises.map((exercise) => exercise.name),
      });
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  },

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

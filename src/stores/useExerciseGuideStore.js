// exerciseGuideStore.js
import { create } from "zustand";
import { exerciseData } from "../dataFiles/exerciseData"; // Import exerciseData

const useExerciseGuideStore = create((set) => ({
  exercises: exerciseData, // Use exerciseData here
  searchTerm: "",
  selectedCategory: "all",
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  addExercise: (exercise) =>
    set((state) => ({
      exercises: [...state.exercises, { ...exercise, id: Date.now() }],
    })),
  updateExercise: (id, updates) =>
    set((state) => ({
      exercises: state.exercises.map((ex) =>
        ex.id === id ? { ...ex, ...updates } : ex
      ),
    })),
  deleteExercise: (id) =>
    set((state) => ({
      exercises: state.exercises.filter((ex) => ex.id !== id),
    })),
}));

export default useExerciseGuideStore;

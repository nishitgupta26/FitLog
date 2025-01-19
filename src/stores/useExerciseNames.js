// useExerciseNames.js
import { create } from "zustand";

const useExerciseNames = create((set) => ({
  exerciseNames: [],
  fetchExerciseNames: () => {
    const storedExerciseNames = JSON.parse(localStorage.getItem("exerciseNames")) || [];
    set({ exerciseNames: storedExerciseNames });
  },
}));

export default useExerciseNames;

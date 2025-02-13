import { create } from "zustand";

const useGoalUpdateStore = create((set) => ({
  goalsUpdated: false,
  toggleGoalsUpdated: () =>
    set((state) => ({ goalsUpdated: !state.goalsUpdated })),
}));

export default useGoalUpdateStore;

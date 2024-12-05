import { create } from 'zustand';
import { AccidentData } from '../types';

interface AccidentStore {
  accidents: AccidentData[];
  addAccident: (accident: AccidentData) => void;
  updateAccident: (id: string, accident: AccidentData) => void;
  removeAccident: (id: string) => void;
}

export const useAccidentStore = create<AccidentStore>((set) => ({
  accidents: [],
  addAccident: (accident) =>
    set((state) => ({ accidents: [...state.accidents, accident] })),
  updateAccident: (id, accident) =>
    set((state) => ({
      accidents: state.accidents.map((a) => (a.id === id ? accident : a)),
    })),
  removeAccident: (id) =>
    set((state) => ({
      accidents: state.accidents.filter((a) => a.id !== id),
    })),
}));
import { create } from "zustand";
import { SubjectStatsDTO } from "@/services/subject.service";

interface SubjectState {
  subjects: SubjectStatsDTO[];
  setSubjects: (subjects: SubjectStatsDTO[]) => void;
}

export const useSubjectStore = create<SubjectState>((set) => ({
  subjects: [],
  setSubjects: (subjects) => set({ subjects }),
}));

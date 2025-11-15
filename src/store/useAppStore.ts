import { create } from 'zustand';

export interface Subject {
  id: string;
  name: string;
  folders: string[];
  color: string;
}

export interface File {
  id: string;
  name: string;
  subject: string;
  folder: string;
  uploadDate: string;
  size: string;
  summaryCount: number;
  quizCount: number;
}

export interface Summary {
  id: string;
  fileId: string;
  fileName: string;
  content: string;
  keyConcepts: string[];
  createdAt: string;
  isImportant: boolean;
}

export interface Quiz {
  id: string;
  fileId: string;
  fileName: string;
  subject: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: QuizQuestion[];
  createdAt: string;
  score?: number;
  completed: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  userAnswer?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  theme: 'light' | 'dark';
  notifications: boolean;
}

export interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface AppState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  mockUsers: MockUser[];
  subjects: Subject[];
  files: File[];
  summaries: Summary[];
  quizzes: Quiz[];
  addSubject: (subject: Subject) => void;
  updateSubject: (id: string, data: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;
  addFile: (file: File) => void;
  deleteFile: (id: string) => void;
  addSummary: (summary: Summary) => void;
  toggleImportant: (id: string) => void;
  addQuiz: (quiz: Quiz) => void;
  updateQuizScore: (id: string, score: number) => void;
  updateUser: (data: Partial<User>) => void;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

const mockUsers: MockUser[] = [
  { id: 'user1', name: 'Nguyen Cong Quy', email: 'quy@student.edu', password: 'password123' },
  { id: 'user2', name: 'Student Example', email: 'student@example.edu', password: 'abc123456' },
];

const mockSubjects: Subject[] = [
  { id: 'subj1', name: 'Mathematics', folders: ['Calculus', 'Algebra', 'Statistics'], color: '#3B82F6' },
  { id: 'subj2', name: 'Physics', folders: ['Mechanics', 'Electromagnetism', 'Thermodynamics'], color: '#10B981' },
  { id: 'subj3', name: 'Computer Science', folders: ['Data Structures', 'AI Basics', 'Algorithms'], color: '#8B5CF6' },
];

const mockFiles: File[] = [
  { id: 'file1', name: 'Limits and Continuity.pdf', subject: 'Mathematics', folder: 'Calculus', uploadDate: '2025-01-10', size: '2.4 MB', summaryCount: 1, quizCount: 2 },
  { id: 'file2', name: 'Vector Mechanics.docx', subject: 'Physics', folder: 'Mechanics', uploadDate: '2025-01-12', size: '1.8 MB', summaryCount: 1, quizCount: 1 },
  { id: 'file3', name: 'Linear Algebra Basics.pdf', subject: 'Mathematics', folder: 'Algebra', uploadDate: '2025-01-08', size: '3.1 MB', summaryCount: 2, quizCount: 1 },
  { id: 'file4', name: 'Binary Trees.pdf', subject: 'Computer Science', folder: 'Data Structures', uploadDate: '2025-01-15', size: '1.5 MB', summaryCount: 1, quizCount: 3 },
  { id: 'file5', name: 'Maxwell Equations.pdf', subject: 'Physics', folder: 'Electromagnetism', uploadDate: '2025-01-14', size: '2.0 MB', summaryCount: 1, quizCount: 2 },
];

const mockSummaries: Summary[] = [
  {
    id: 'sum1',
    fileId: 'file1',
    fileName: 'Limits and Continuity.pdf',
    content: 'This document covers the fundamental concepts of limits and continuity in calculus. The epsilon-delta definition provides a rigorous foundation for understanding limits. A function f(x) is continuous at point a if the limit of f(x) as x approaches a equals f(a). Key theorems include the Intermediate Value Theorem and properties of continuous functions on closed intervals.',
    keyConcepts: ['Epsilon-Delta Definition', 'Continuity', 'Limit Laws', 'Intermediate Value Theorem', 'One-sided Limits'],
    createdAt: '2025-01-10',
    isImportant: true,
  },
  {
    id: 'sum2',
    fileId: 'file2',
    fileName: 'Vector Mechanics.docx',
    content: 'Vector mechanics introduces the study of motion using vector quantities. Displacement, velocity, and acceleration are vector quantities with both magnitude and direction. Newton\'s laws form the foundation: F = ma relates force, mass, and acceleration. The chapter covers projectile motion, circular motion, and relative velocity concepts.',
    keyConcepts: ['Vector Quantities', 'Newton\'s Laws', 'Projectile Motion', 'Circular Motion', 'Relative Velocity'],
    createdAt: '2025-01-12',
    isImportant: false,
  },
  {
    id: 'sum3',
    fileId: 'file4',
    fileName: 'Binary Trees.pdf',
    content: 'Binary trees are hierarchical data structures where each node has at most two children. Tree traversal methods include in-order, pre-order, and post-order. Binary Search Trees (BST) maintain sorted order with left children smaller and right children larger. Time complexity for search, insert, and delete operations is O(log n) for balanced trees.',
    keyConcepts: ['Tree Traversal', 'Binary Search Trees', 'Time Complexity', 'Balanced Trees', 'Node Structure'],
    createdAt: '2025-01-15',
    isImportant: true,
  },
];

const mockQuizzes: Quiz[] = [
  {
    id: 'quiz1',
    fileId: 'file1',
    fileName: 'Limits and Continuity.pdf',
    subject: 'Mathematics',
    difficulty: 'Medium',
    createdAt: '2025-01-11',
    completed: true,
    score: 85,
    questions: [
      {
        id: 'q1',
        question: 'What is the epsilon-delta definition of a limit?',
        options: [
          'For every ε > 0, there exists δ > 0 such that |f(x) - L| < ε whenever 0 < |x - a| < δ',
          'The function approaches a finite value as x increases',
          'The derivative exists at every point',
          'The function is continuous everywhere'
        ],
        correctAnswer: 0,
        userAnswer: 0,
      },
      {
        id: 'q2',
        question: 'Which condition is necessary for a function to be continuous at x = a?',
        options: [
          'The function must be differentiable at a',
          'lim(x→a) f(x) = f(a)',
          'The function must be linear',
          'The derivative must be zero'
        ],
        correctAnswer: 1,
        userAnswer: 1,
      },
    ],
  },
  {
    id: 'quiz2',
    fileId: 'file4',
    fileName: 'Binary Trees.pdf',
    subject: 'Computer Science',
    difficulty: 'Hard',
    createdAt: '2025-01-16',
    completed: false,
    questions: [
      {
        id: 'q3',
        question: 'What is the time complexity of searching in a balanced Binary Search Tree?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 1,
      },
      {
        id: 'q4',
        question: 'In in-order traversal of a BST, nodes are visited in which order?',
        options: [
          'Root → Left → Right',
          'Left → Root → Right',
          'Left → Right → Root',
          'Right → Root → Left'
        ],
        correctAnswer: 1,
      },
    ],
  },
];

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  mockUsers: mockUsers,
  subjects: mockSubjects,
  files: mockFiles,
  summaries: mockSummaries,
  quizzes: mockQuizzes,
  
  addSubject: (subject) => set((state) => ({ subjects: [...state.subjects, subject] })),
  
  updateSubject: (id, data) => set((state) => ({
    subjects: state.subjects.map((s) => (s.id === id ? { ...s, ...data } : s)),
  })),
  
  deleteSubject: (id) => set((state) => ({
    subjects: state.subjects.filter((s) => s.id !== id),
    files: state.files.filter((f) => f.subject !== state.subjects.find((s) => s.id === id)?.name),
  })),
  
  addFile: (file) => set((state) => ({ files: [...state.files, file] })),
  
  deleteFile: (id) => set((state) => ({
    files: state.files.filter((f) => f.id !== id),
    summaries: state.summaries.filter((s) => s.fileId !== id),
    quizzes: state.quizzes.filter((q) => q.fileId !== id),
  })),
  
  addSummary: (summary) => set((state) => ({ summaries: [...state.summaries, summary] })),
  
  toggleImportant: (id) => set((state) => ({
    summaries: state.summaries.map((s) => (s.id === id ? { ...s, isImportant: !s.isImportant } : s)),
  })),
  
  addQuiz: (quiz) => set((state) => ({ quizzes: [...state.quizzes, quiz] })),
  
  updateQuizScore: (id, score) => set((state) => ({
    quizzes: state.quizzes.map((q) => (q.id === id ? { ...q, score, completed: true } : q)),
  })),
  
  updateUser: (data) => set((state) => ({ 
    user: state.user ? { ...state.user, ...data } : null 
  })),

  login: async (email, password) => {
    // Simulate API call with axios placeholder
    // await axios.post('/api/login', { email, password });
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUsers = get().mockUsers;
        const foundUser = mockUsers.find(
          (u) => u.email === email && u.password === password
        );

        if (foundUser) {
          const user: User = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            theme: 'light',
            notifications: true,
          };
          
          set({ 
            user, 
            token: `mock-token-${foundUser.id}`,
            isAuthenticated: true 
          });
          
          resolve({ success: true, message: 'Login successful!' });
        } else {
          resolve({ success: false, message: 'Invalid email or password' });
        }
      }, 800);
    });
  },

  register: async (name, email, password) => {
    // Simulate API call with axios placeholder
    // await axios.post('/api/register', { name, email, password });
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUsers = get().mockUsers;
        const existingUser = mockUsers.find((u) => u.email === email);

        if (existingUser) {
          resolve({ success: false, message: 'Email already registered' });
          return;
        }

        const newMockUser: MockUser = {
          id: `user${Date.now()}`,
          name,
          email,
          password,
        };

        const newUser: User = {
          id: newMockUser.id,
          name: newMockUser.name,
          email: newMockUser.email,
          theme: 'light',
          notifications: true,
        };

        set((state) => ({
          mockUsers: [...state.mockUsers, newMockUser],
          user: newUser,
          token: `mock-token-${newMockUser.id}`,
          isAuthenticated: true,
        }));

        resolve({ success: true, message: 'Registration successful!' });
      }, 800);
    });
  },

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

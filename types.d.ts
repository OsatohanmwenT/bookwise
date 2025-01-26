interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  isLoanedBook?: boolean;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
  createdAt: Date | null;
}

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}

interface BookParams {
  title: string;
  author: string;
  description: string;
  summary: string;
  coverColor: string;
  coverUrl: string;
  rating: number;
  totalCopies: number;
  videoUrl: string;
  genre: string;
}

interface BorrowBookParams {
  bookId: string;
  userId: string;
}

interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
  status: string | null;
  role: string | null;
  createdAt: Date | null;
}

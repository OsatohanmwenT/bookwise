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

type ROLE = "ADMIN" | "USER";

interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
  status: string | null;
  role: ROLE | null;
  createdAt: Date | null;
  borrowedBookCount?: number;
}

type STATUS = "RETURNED" | "BORROWED" | "LATE RETURN";

interface BorrowRecord {
  id: string;
  fullName: string;
  bookId: string;
  coverColor: string;
  coverUrl: string;
  title: string;
  email: string;
  borrowDate: Date | null;
  returnDate: string | null;
  dueDate: string;
  status: STATUS | null;
}

interface BorrowListItem {
  id: string;
  fullName: string | null;
  bookId: string;
  coverColor: string;
  coverUrl: string;
  title: string | null;
  author: string | null;
  genre: string | null;
  borrowDate: Date | null;
}

interface BorrowProfileList extends BorrowListItem {
  dueDate: Date;
}

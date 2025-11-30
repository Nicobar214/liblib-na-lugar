import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  doc, 
  getDocs, 
  query, 
  where,
  serverTimestamp 
} from 'firebase/firestore';
import { BookOpen, LogOut, Plus, Users, Mail, Phone, MapPin, Clock } from 'lucide-react';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDarSsyEwrmjowIpxaZQ20cIOJcIng-bX0",
  authDomain: "react-demo-12a46.firebaseapp.com",
  projectId: "react-demo-12a46",
  storageBucket: "react-demo-12a46.firebasestorage.app",
  messagingSenderId: "560758654467",
  appId: "1:560758654467:web:2cdfcc0b421790ad49f036"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  
  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50`}>
      {message}
    </div>
  );
};

// Landing Page Component
const LandingPage = ({ onNavigateToLogin }) => {
  return (
    <div style={{ fontFamily: 'Montserrat, sans-serif' }} className="overflow-y-scroll h-screen">
      {/* Hero Section */}
      <div id="home" className="min-h-screen relative" style={{ backgroundColor: '#fff1cf' }}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-20">
            <div className="flex items-center">
              <img src="bookhive logo.png" alt="BookHive Logo" className="h-12 mr-3" />
              <span className="text-2xl font-bold" style={{ color: '#3C2F2F' }}>BookHive</span>
            </div>
            <nav className="flex space-x-8">
              <a href="#home" className="text-lg font-medium hover:opacity-75" style={{ color: '#3C2F2F' }}>Home</a>
              <a href="#about" className="text-lg font-medium hover:opacity-75" style={{ color: '#3C2F2F' }}>About</a>
              <a href="#contact" className="text-lg font-medium hover:opacity-75" style={{ color: '#3C2F2F' }}>Contact</a>
            </nav>
          </div>

          <div className="flex items-center justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center justify-start mb-4">
                <h1 className="text-6xl font-bold" style={{ color: '#3C2F2F' }}>BookHive</h1>
                <img src="/cute bee.png" alt="Bee" className="h-20 ml-2" />
              </div>
              <h2 className="text-3xl italic mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#5A4B4B' }}>
                "Your Hive of Knowledge and Discovery"
              </h2>
              <p className="text-lg mb-4 leading-relaxed" style={{ color: '#3C2F2F' }}>
                BookHive is your digital hive of knowledge — a smart and organized space where every book finds its perfect place.
              </p>
              <button 
                onClick={() => onNavigateToLogin()}
                className="px-8 py-4 rounded-full text-lg font-bold flex items-center hover:opacity-90 transition"
                style={{ backgroundColor: '#E2B270', color: '#3C2F2F' }}
              >
                Get Started
                <img src="/arrow.png" alt="Arrow" className="h-6 ml-3" />
              </button>
            </div>
            <div className="relative w-1/2 h-96">
              <img src="/books2.jpg" alt="Books" className="absolute inset-0 w-full h-full object-cover rounded-l-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Login Component
const Login = ({ onSwitchToSignup, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setToast({ message: 'Please fill in all fields', type: 'error' });
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setToast({ message: 'Login successful!', type: 'success' });
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-y-scroll" style={{ background: 'linear-gradient(135deg, #F4E6C2 0%, #F8F4E3 100%)' }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        <h1 className="text-3xl font-bold mb-8 text-center" style={{ color: '#3C2F2F' }}>BookHive Login</h1>
        <div className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border-2 rounded-lg" style={{ borderColor: '#E2B270' }} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border-2 rounded-lg" style={{ borderColor: '#E2B270' }} />
          <button onClick={handleLogin} className="w-full py-3 rounded-lg font-bold" style={{ backgroundColor: '#E2B270', color: '#3C2F2F' }}>Login</button>
        </div>
        <button onClick={onBack} className="mt-4 text-sm w-full text-center">Back to Home</button>
        <button onClick={onSwitchToSignup} className="mt-2 text-sm w-full text-center font-bold">Sign Up Instead</button>
      </div>
    </div>
  );
};

// Signup Component
const Signup = ({ onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState(null);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setToast({ message: 'All fields required', type: 'error' });
      return;
    }
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(db, 'librarians'), { uid: cred.user.uid, name, email });
      setToast({ message: 'Account created!', type: 'success' });
      setTimeout(onSwitchToLogin, 1500);
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-y-scroll" style={{ background: 'linear-gradient(135deg, #F4E6C2 0%, #F8F4E3 100%)' }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        <h1 className="text-3xl font-bold mb-8 text-center" style={{ color: '#3C2F2F' }}>BookHive Signup</h1>
        <div className="space-y-4">
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 border-2 rounded-lg" style={{ borderColor: '#E2B270' }} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border-2 rounded-lg" style={{ borderColor: '#E2B270' }} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border-2 rounded-lg" style={{ borderColor: '#E2B270' }} />
          <button onClick={handleSignup} className="w-full py-3 rounded-lg font-bold" style={{ backgroundColor: '#E2B270', color: '#3C2F2F' }}>Sign Up</button>
        </div>
        <button onClick={onSwitchToLogin} className="mt-4 text-sm w-full text-center font-bold">Login Instead</button>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('books');
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingBook, setEditingBook] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  
  const [newBook, setNewBook] = useState({
    title: '',
    bookCode: '',
    author: '',
    category: '',
    copies: 1 
  });
  
  const [borrowForm, setBorrowForm] = useState({
    studentName: '',
    studentNumber: '',
    bookTitle: '',
    bookCode: '',
    borrowDate: '',
    returnDate: '',
    borrowQuantity: 1
  });

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const booksSnapshot = await getDocs(collection(db, 'books'));
      const booksData = booksSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBooks(booksData);
    } catch (error) {
      setToast({ message: 'Error fetching books', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fetchBorrowedBooks = async () => {
    setLoading(true);
    try {
      const borrowedSnapshot = await getDocs(collection(db, 'borrowedBooks'));
      const borrowedData = borrowedSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBorrowedBooks(borrowedData);
    } catch (error) {
      setToast({ message: 'Error fetching borrowed books', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchBorrowedBooks();
  }, []);

  // Handler for tab switching to ensure scroll reset
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo(0, 0); // Reset scroll position to top
  };

  const handleAddBook = async () => {
    if (!newBook.title || !newBook.bookCode || !newBook.author || !newBook.category || !newBook.copies) {
      setToast({ message: 'Please fill in all fields', type: 'error' });
      return;
    }
    
    // Check for duplicate book code
    const existingBook = books.find(book => book.bookCode.toLowerCase() === newBook.bookCode.toLowerCase());
    if (existingBook) {
      setToast({ message: 'Book code already exists!', type: 'error' });
      return;
    }
    
    try {
      const numCopies = parseInt(newBook.copies);
      await addDoc(collection(db, 'books'), {
        ...newBook,
        copies: numCopies,
        status: numCopies > 0 ? 'Available' : 'Unavailable', // Changed here
        dateAdded: serverTimestamp()
      });
      
      setToast({ message: 'Book added successfully!', type: 'success' });
      setNewBook({ title: '', bookCode: '', author: '', category: '', copies: 1 });
      fetchBooks();
    } catch (error) {
      setToast({ message: 'Error adding book', type: 'error' });
    }
  };

  const handleEditBook = async () => {
    if (!editingBook.title || !editingBook.bookCode || !editingBook.author || !editingBook.category || !editingBook.copies) {
      setToast({ message: 'Please fill in all fields', type: 'error' });
      return;
    }
    
    try {
      const numCopies = parseInt(editingBook.copies);
      await updateDoc(doc(db, 'books', editingBook.id), {
        title: editingBook.title,
        bookCode: editingBook.bookCode,
        author: editingBook.author,
        category: editingBook.category,
        copies: numCopies,
        status: numCopies > 0 ? 'Available' : 'Unavailable' // Changed here
      });
      
      setToast({ message: 'Book updated successfully!', type: 'success' });
      setEditingBook(null);
      fetchBooks();
    } catch (error) {
      setToast({ message: 'Error updating book', type: 'error' });
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await deleteDoc(doc(db, 'books', bookId));
      
      setToast({ message: 'Book deleted successfully!', type: 'success' });
      setShowDeleteConfirm(null);
      fetchBooks();
    } catch (error) {
      setToast({ message: 'Error deleting book', type: 'error' });
    }
  };

  const handleBorrowBook = async () => {
    const { studentName, studentNumber, bookTitle, bookCode, borrowDate, returnDate, borrowQuantity } = borrowForm;
    
    if (!studentName || !studentNumber || !bookTitle || !bookCode || !borrowDate || !returnDate || !borrowQuantity) {
      setToast({ message: 'Please fill in all fields', type: 'error' });
      return;
    }
    
    if (new Date(returnDate) <= new Date(borrowDate)) {
      setToast({ message: 'Return date must be after borrow date', type: 'error' });
      return;
    }
    
    // Check book availability and stock
    const bookToCheck = books.find(book => book.bookCode === bookCode);
    if (!bookToCheck) {
      setToast({ message: 'Book not found in inventory', type: 'error' });
      return;
    }
    
    const requestedQty = parseInt(borrowQuantity);
    if (bookToCheck.copies < requestedQty) {
      setToast({ message: `Not enough copies! Only ${bookToCheck.copies} available.`, type: 'error' });
      return;
    }
    
    try {
      // 1. Add record to borrowedBooks (store how many were borrowed)
      await addDoc(collection(db, 'borrowedBooks'), {
        ...borrowForm,
        borrowQuantity: requestedQty,
        borrowedAt: serverTimestamp()
      });
      
      // 2. Update the Book Inventory (Decrement copies)
      const newCopyCount = bookToCheck.copies - requestedQty;
      await updateDoc(doc(db, 'books', bookToCheck.id), {
        copies: newCopyCount,
        status: newCopyCount > 0 ? 'Available' : 'Unavailable' // Changed here
      });
      
      setToast({ message: 'Book borrowed successfully! Inventory updated.', type: 'success' });
      setBorrowForm({
        studentName: '',
        studentNumber: '',
        bookTitle: '',
        bookCode: '',
        borrowDate: '',
        returnDate: '',
        borrowQuantity: 1
      });
      fetchBooks();
      fetchBorrowedBooks();
    } catch (error) {
      console.error(error);
      setToast({ message: 'Error borrowing book', type: 'error' });
    }
  };

  const handleReturnBook = async (borrowedBookId, bookCode, quantityBorrowed) => {
    try {
      // 1. Find the book in inventory to add stock back
      const bookQuery = query(collection(db, 'books'), where('bookCode', '==', bookCode));
      const bookSnapshot = await getDocs(bookQuery);
      
      if (!bookSnapshot.empty) {
        const bookDoc = bookSnapshot.docs[0];
        const currentData = bookDoc.data();
        
        // Increment copies by the amount that was originally borrowed
        const qtyToReturn = quantityBorrowed ? parseInt(quantityBorrowed) : 1;
        const newCopyCount = (currentData.copies || 0) + qtyToReturn;

        await updateDoc(doc(db, 'books', bookDoc.id), {
          copies: newCopyCount,
          status: 'Available' // Since we returned, it's definitely available now
        });
      }
      
      // 2. Mark as returned in borrowedBooks
      await updateDoc(doc(db, 'borrowedBooks', borrowedBookId), {
        returned: true,
        returnedAt: serverTimestamp()
      });
      
      setToast({ message: 'Book returned successfully! Stock updated.', type: 'success' });
      fetchBooks();
      fetchBorrowedBooks();
    } catch (error) {
      console.error(error);
      setToast({ message: 'Error returning book', type: 'error' });
    }
  };

  // Filter and search functions
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.bookCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || book.category === filterCategory;
    
    // Updated logic: "Unavailable" filter now matches both "Unavailable" and "Out of Stock"
    let matchesStatus = filterStatus === 'all' || book.status === filterStatus;
    if (filterStatus === 'Unavailable') {
      matchesStatus = book.status === 'Unavailable' || book.status === 'Out of Stock';
    }

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const activeBorrowedBooks = borrowedBooks.filter(b => !b.returned);
  const returnedBooks = borrowedBooks.filter(b => b.returned);
  
  const isOverdue = (returnDate) => {
    return new Date(returnDate) < new Date();
  };
  
  const overdueBorrowedBooks = activeBorrowedBooks.filter(b => isOverdue(b.returnDate));
  
  const stats = {
    totalBooks: books.reduce((acc, curr) => acc + (parseInt(curr.copies) || 0), 0),
    uniqueTitles: books.length,
    availableBooks: books.filter(b => b.status === 'Available').length,
    borrowedBooks: activeBorrowedBooks.length,
    overdueBooks: overdueBorrowedBooks.length
  };
  
  const categories = [...new Set(books.map(book => book.category))];
  
  const availableBooks = books.filter(b => b.copies > 0);

  return (
    // FIX: Added 'overflow-y-scroll' to force scrollbar presence and prevent layout shifts
    <div className="min-h-screen overflow-y-scroll" style={{ backgroundColor: '#F8F4E3', fontFamily: 'Montserrat, sans-serif' }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      {/* Header */}
      <div className="shadow-md" style={{ backgroundColor: '#3C2F2F' }}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="bookhive logo.png" alt="BookHive Logo" className="h-10 mr-3" />
            <h1 className="text-2xl font-bold" style={{ color: '#E2B270' }}>BookHive Dashboard</h1>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center px-4 py-2 rounded-lg hover:opacity-90 transition"
            style={{ backgroundColor: '#E2B270', color: '#3C2F2F' }}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total Copies', value: stats.totalBooks, icon: <BookOpen className="w-8 h-8" />, color: '#E2B270' },
            { title: 'Unique Titles', value: stats.uniqueTitles, icon: <BookOpen className="w-8 h-8" />, color: '#4CAF50' },
            { title: 'Active Borrows', value: stats.borrowedBooks, icon: <Users className="w-8 h-8" />, color: '#2196F3' },
            { title: 'Overdue', value: stats.overdueBooks, icon: <Clock className="w-8 h-8" />, color: '#F44336' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between">
              <div>
                <p className="text-sm mb-1" style={{ color: '#5A4B4B' }}>{stat.title}</p>
                <p className="text-3xl font-bold" style={{ color: '#3C2F2F' }}>{stat.value}</p>
              </div>
              <div style={{ color: stat.color }}>{stat.icon}</div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="flex border-b">
            {[
              { id: 'books', label: 'Book Inventory' },
              { id: 'add', label: 'Add New Book' },
              { id: 'borrow', label: 'Borrow Book' },
              { id: 'borrowed', label: 'Borrowed Books' },
              { id: 'overdue', label: 'Overdue Books' },
              { id: 'history', label: 'Return History' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)} // Used handleTabChange instead of setActiveTab directly
                className={`px-6 py-4 font-semibold transition ${
                  activeTab === tab.id ? 'border-b-4' : 'hover:opacity-75'
                }`}
                style={{
                  color: activeTab === tab.id ? '#3C2F2F' : '#5A4B4B',
                  borderColor: activeTab === tab.id ? '#E2B270' : 'transparent'
                }}
              >
                {tab.label}
                {tab.id === 'overdue' && stats.overdueBooks > 0 && (
                  <span className="ml-2 px-2 py-1 text-xs rounded-full bg-red-500 text-white">
                    {stats.overdueBooks}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Book Inventory Tab */}
            {activeTab === 'books' && (
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#3C2F2F' }}>Book Inventory</h2>
                
                {/* Search and Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <input
                    type="text"
                    placeholder="Search by title, author, or book code..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-3 border-2 rounded-lg focus:outline-none"
                    style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                  />
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-3 border-2 rounded-lg focus:outline-none"
                    style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                  >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 border-2 rounded-lg focus:outline-none"
                    style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                  >
                    <option value="all">All Status</option>
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option> {/* Changed option value and label */}
                  </select>
                </div>

                {loading ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-t-transparent" style={{ borderColor: '#E2B270', borderTopColor: 'transparent' }}></div>
                    <p className="mt-4" style={{ color: '#5A4B4B' }}>Loading books...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr style={{ backgroundColor: '#E2B270' }}>
                          <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Code</th>
                          <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Title</th>
                          <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Author</th>
                          <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Category</th>
                          <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Copies</th>
                          <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Status</th>
                          <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBooks.map((book, idx) => (
                          <tr key={book.id} className={idx % 2 === 0 ? 'bg-white' : ''} style={{ backgroundColor: idx % 2 !== 0 ? '#FFFBF0' : 'white' }}>
                            <td className="px-4 py-3" style={{ color: '#3C2F2F' }}>{book.bookCode}</td>
                            <td className="px-4 py-3" style={{ color: '#3C2F2F' }}>{book.title}</td>
                            <td className="px-4 py-3" style={{ color: '#5A4B4B' }}>{book.author}</td>
                            <td className="px-4 py-3" style={{ color: '#5A4B4B' }}>{book.category}</td>
                            <td className="px-4 py-3 font-bold" style={{ color: '#3C2F2F' }}>{book.copies}</td>
                            <td className="px-4 py-3">
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                book.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {/* Display 'Unavailable' even if the database still says 'Out of Stock' */}
                                {book.status === 'Out of Stock' ? 'Unavailable' : book.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => setEditingBook(book)}
                                className="px-3 py-1 rounded mr-2 text-white hover:opacity-90"
                                style={{ backgroundColor: '#2196F3' }}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(book.id)}
                                className="px-3 py-1 rounded text-white hover:opacity-90"
                                style={{ backgroundColor: '#F44336' }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredBooks.length === 0 && (
                      <p className="text-center py-8" style={{ color: '#5A4B4B' }}>No books found</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Add Book Tab */}
            {activeTab === 'add' && (
              <div className="max-w-6xl mx-auto">
                {/* Removed the inner 'bg-white shadow-xl' card wrapper to fix the layout jump */}
                <div>
                  <div className="flex items-center mb-8 pb-4 border-b border-gray-100">
                    <div className="p-3 rounded-full mr-4" style={{ backgroundColor: '#FFFBF0' }}>
                      <Plus className="w-8 h-8" style={{ color: '#E2B270' }} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold" style={{ color: '#3C2F2F' }}>Add New Book</h2>
                      <p className="text-sm" style={{ color: '#5A4B4B' }}>Enter the details below to register a new book in the system.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {/* Left Column: General Information */}
                    <div className="space-y-6">
                      <div className="flex items-center mb-4">
                        <BookOpen className="w-5 h-5 mr-2" style={{ color: '#E2B270' }} />
                        <h3 className="font-bold text-lg" style={{ color: '#3C2F2F' }}>General Information</h3>
                      </div>
                      
                      <div className="bg-gray-50 p-6 rounded-xl space-y-4 border border-gray-100">
                        <div>
                          <label className="block text-sm font-bold mb-2" style={{ color: '#5A4B4B' }}>Book Title *</label>
                          <input
                            type="text"
                            value={newBook.title}
                            onChange={(e) => setNewBook({...newBook, title: e.target.value})}
                            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none bg-white transition focus:border-yellow-400"
                            style={{ borderColor: '#E2B270' }}
                            placeholder="e.g., The Great Gatsby"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2" style={{ color: '#5A4B4B' }}>Author *</label>
                          <input
                            type="text"
                            value={newBook.author}
                            onChange={(e) => setNewBook({...newBook, author: e.target.value})}
                            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none bg-white transition focus:border-yellow-400"
                            style={{ borderColor: '#E2B270' }}
                            placeholder="e.g., F. Scott Fitzgerald"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2" style={{ color: '#5A4B4B' }}>Category *</label>
                          <input
                            type="text"
                            value={newBook.category}
                            onChange={(e) => setNewBook({...newBook, category: e.target.value})}
                            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none bg-white transition focus:border-yellow-400"
                            style={{ borderColor: '#E2B270' }}
                            placeholder="e.g., Classic Literature"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Inventory Details */}
                    <div className="space-y-6">
                      <div className="flex items-center mb-4">
                        <MapPin className="w-5 h-5 mr-2" style={{ color: '#E2B270' }} />
                        <h3 className="font-bold text-lg" style={{ color: '#3C2F2F' }}>Inventory Control</h3>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-xl space-y-4 border border-gray-100">
                        <div>
                          <label className="block text-sm font-bold mb-2" style={{ color: '#5A4B4B' }}>Book Code / ISBN *</label>
                          <input
                            type="text"
                            value={newBook.bookCode}
                            onChange={(e) => setNewBook({...newBook, bookCode: e.target.value})}
                            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none bg-white transition focus:border-yellow-400"
                            style={{ borderColor: '#E2B270' }}
                            placeholder="e.g., BK-2023-001"
                          />
                          <p className="text-xs mt-1 text-gray-500">Must be unique for each book title.</p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-bold mb-2" style={{ color: '#5A4B4B' }}>Initial Stock (Copies) *</label>
                          <div className="flex items-center">
                            <input
                              type="number"
                              min="1"
                              value={newBook.copies}
                              onChange={(e) => setNewBook({...newBook, copies: e.target.value})}
                              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none bg-white transition focus:border-yellow-400"
                              style={{ borderColor: '#E2B270' }}
                              placeholder="1"
                            />
                            <span className="ml-3 text-sm font-medium" style={{ color: '#5A4B4B' }}>copies</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                        <h4 className="font-bold text-sm mb-2" style={{ color: '#3C2F2F' }}>Did you know?</h4>
                        <p className="text-xs" style={{ color: '#5A4B4B' }}>
                          Adding a book automatically sets its status to 'Available'. You can track its borrowing history immediately after addition.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end pt-6 border-t border-gray-100">
                    <button
                      onClick={handleAddBook}
                      className="px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:-translate-y-1 transition transform flex items-center shadow-md"
                      style={{ backgroundColor: '#E2B270', color: '#3C2F2F' }}
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add Book to Inventory
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Borrow Book Tab */}
            {activeTab === 'borrow' && (
              <div className="max-w-6xl mx-auto">
                {/* Removed the inner 'bg-white shadow-xl' card wrapper to fix the layout jump */}
                <div>
                  <div className="flex items-center mb-8 pb-4 border-b border-gray-100">
                    <div className="p-3 rounded-full mr-4" style={{ backgroundColor: '#FFFBF0' }}>
                      <BookOpen className="w-8 h-8" style={{ color: '#E2B270' }} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold" style={{ color: '#3C2F2F' }}>Borrowing Transaction</h2>
                      <p className="text-sm" style={{ color: '#5A4B4B' }}>Fill in the details below to check out a book.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {/* Left Column: Student Details */}
                    <div className="space-y-6">
                      <div className="flex items-center mb-4">
                        <Users className="w-5 h-5 mr-2" style={{ color: '#E2B270' }} />
                        <h3 className="font-bold text-lg" style={{ color: '#3C2F2F' }}>Student Information</h3>
                      </div>
                      
                      <div className="bg-gray-50 p-6 rounded-xl space-y-4 border border-gray-100">
                        <div>
                          <label className="block text-sm font-bold mb-2" style={{ color: '#5A4B4B' }}>Student Name *</label>
                          <input
                            type="text"
                            value={borrowForm.studentName}
                            onChange={(e) => setBorrowForm({...borrowForm, studentName: e.target.value})}
                            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none bg-white transition focus:border-yellow-400"
                            style={{ borderColor: '#E2B270' }}
                            placeholder="Enter full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2" style={{ color: '#5A4B4B' }}>Student ID Number *</label>
                          <input
                            type="text"
                            value={borrowForm.studentNumber}
                            onChange={(e) => setBorrowForm({...borrowForm, studentNumber: e.target.value})}
                            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none bg-white transition focus:border-yellow-400"
                            style={{ borderColor: '#E2B270' }}
                            placeholder="e.g., 2023-0001"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Book Details */}
                    <div className="space-y-6">
                      <div className="flex items-center mb-4">
                        <BookOpen className="w-5 h-5 mr-2" style={{ color: '#E2B270' }} />
                        <h3 className="font-bold text-lg" style={{ color: '#3C2F2F' }}>Book Details</h3>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-xl space-y-4 border border-gray-100">
                        <div>
                          <label className="block text-sm font-bold mb-2" style={{ color: '#5A4B4B' }}>Select Book *</label>
                          <select
                            value={borrowForm.bookCode}
                            onChange={(e) => {
                              const selectedBook = availableBooks.find(b => b.bookCode === e.target.value);
                              setBorrowForm({
                                ...borrowForm,
                                bookCode: e.target.value,
                                bookTitle: selectedBook ? selectedBook.title : ''
                              });
                            }}
                            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none bg-white transition focus:border-yellow-400"
                            style={{ borderColor: '#E2B270' }}
                          >
                            <option value="">-- Select an available book --</option>
                            {availableBooks.map(book => (
                              <option key={book.id} value={book.bookCode}>
                                {book.bookCode} - {book.title} ({book.copies} copies)
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-bold mb-2" style={{ color: '#5A4B4B' }}>Quantity *</label>
                          <div className="flex items-center">
                            <input
                              type="number"
                              min="1"
                              value={borrowForm.borrowQuantity}
                              onChange={(e) => setBorrowForm({...borrowForm, borrowQuantity: e.target.value})}
                              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none bg-white transition focus:border-yellow-400"
                              style={{ borderColor: '#E2B270' }}
                            />
                            <span className="ml-3 text-sm font-medium" style={{ color: '#5A4B4B' }}>copies</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section: Timeline */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="flex items-center mb-6">
                      <Clock className="w-5 h-5 mr-2" style={{ color: '#E2B270' }} />
                      <h3 className="font-bold text-lg" style={{ color: '#3C2F2F' }}>Duration</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-yellow-50 p-6 rounded-xl border border-yellow-100">
                      <div>
                        <label className="block text-sm font-bold mb-2" style={{ color: '#5A4B4B' }}>Borrow Date *</label>
                        <input
                          type="date"
                          value={borrowForm.borrowDate}
                          onChange={(e) => setBorrowForm({...borrowForm, borrowDate: e.target.value})}
                          className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none bg-white"
                          style={{ borderColor: '#E2B270' }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2" style={{ color: '#5A4B4B' }}>Return Date *</label>
                        <input
                          type="date"
                          value={borrowForm.returnDate}
                          onChange={(e) => setBorrowForm({...borrowForm, returnDate: e.target.value})}
                          className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none bg-white"
                          style={{ borderColor: '#E2B270' }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={handleBorrowBook}
                      className="px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:-translate-y-1 transition transform flex items-center"
                      style={{ backgroundColor: '#E2B270', color: '#3C2F2F' }}
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Process Borrowing
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Borrowed Books Tab */}
            {activeTab === 'borrowed' && (
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#3C2F2F' }}>Currently Borrowed Books</h2>
                {loading ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-t-transparent" style={{ borderColor: '#E2B270', borderTopColor: 'transparent' }}></div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr style={{ backgroundColor: '#E2B270' }}>
                          <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Student</th>
                          <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Book</th>
                          <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Qty</th>
                          <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Due Date</th>
                          <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeBorrowedBooks.map((record, idx) => (
                          <tr key={record.id} className={idx % 2 === 0 ? 'bg-white' : ''} style={{ backgroundColor: idx % 2 !== 0 ? '#FFFBF0' : 'white' }}>
                            <td className="px-4 py-3" style={{ color: '#3C2F2F' }}>{record.studentName}</td>
                            <td className="px-4 py-3" style={{ color: '#3C2F2F' }}>{record.bookTitle}</td>
                            <td className="px-4 py-3 font-bold" style={{ color: '#3C2F2F' }}>{record.borrowQuantity || 1}</td>
                            <td className="px-4 py-3">
                              <span className={isOverdue(record.returnDate) ? 'text-red-600 font-bold' : ''} style={{ color: isOverdue(record.returnDate) ? '#F44336' : '#5A4B4B' }}>
                                {record.returnDate}
                                {isOverdue(record.returnDate) && ' (OVERDUE)'}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => handleReturnBook(record.id, record.bookCode, record.borrowQuantity)}
                                className="px-4 py-2 rounded text-white hover:opacity-90"
                                style={{ backgroundColor: '#4CAF50' }}
                              >
                                Mark as Returned
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {activeBorrowedBooks.length === 0 && (
                      <p className="text-center py-8" style={{ color: '#5A4B4B' }}>No books currently borrowed</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Overdue Books Tab */}
            {activeTab === 'overdue' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-red-600">Overdue Books</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-red-100">
                        <th className="px-4 py-3 text-left text-red-900">Student Name</th>
                        <th className="px-4 py-3 text-left text-red-900">Book</th>
                        <th className="px-4 py-3 text-left text-red-900">Due Date</th>
                        <th className="px-4 py-3 text-left text-red-900">Days Overdue</th>
                        <th className="px-4 py-3 text-left text-red-900">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {overdueBorrowedBooks.map((record, idx) => {
                        const daysOverdue = Math.floor((new Date() - new Date(record.returnDate)) / (1000 * 60 * 60 * 24));
                        return (
                          <tr key={record.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-red-50'}>
                            <td className="px-4 py-3 font-semibold" style={{ color: '#3C2F2F' }}>{record.studentName}</td>
                            <td className="px-4 py-3" style={{ color: '#3C2F2F' }}>{record.bookTitle}</td>
                            <td className="px-4 py-3 text-red-600 font-bold">{record.returnDate}</td>
                            <td className="px-4 py-3 text-red-600 font-bold">{daysOverdue} days</td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => handleReturnBook(record.id, record.bookCode, record.borrowQuantity)}
                                className="px-4 py-2 rounded text-white hover:opacity-90"
                                style={{ backgroundColor: '#4CAF50' }}
                              >
                                Mark as Returned
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Return History Tab */}
            {activeTab === 'history' && (
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#3C2F2F' }}>Return History</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ backgroundColor: '#E2B270' }}>
                        <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Student Name</th>
                        <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Book</th>
                        <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Qty</th>
                        <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Returned</th>
                      </tr>
                    </thead>
                    <tbody>
                      {returnedBooks.map((record, idx) => (
                        <tr key={record.id} className={idx % 2 === 0 ? 'bg-white' : ''} style={{ backgroundColor: idx % 2 !== 0 ? '#FFFBF0' : 'white' }}>
                          <td className="px-4 py-3" style={{ color: '#3C2F2F' }}>{record.studentName}</td>
                          <td className="px-4 py-3" style={{ color: '#3C2F2F' }}>{record.bookTitle}</td>
                          <td className="px-4 py-3 font-bold" style={{ color: '#5A4B4B' }}>{record.borrowQuantity || 1}</td>
                          <td className="px-4 py-3">
                            <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                              {record.returnDate}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Book Modal */}
      {editingBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-6" style={{ color: '#3C2F2F' }}>Edit Book</h3>
            <div className="space-y-4">
              <div>
                <label className="block font-bold mb-2" style={{ color: '#3C2F2F' }}>Book Code</label>
                <input
                  type="text"
                  value={editingBook.bookCode}
                  onChange={(e) => setEditingBook({...editingBook, bookCode: e.target.value})}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none"
                  style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                />
              </div>
              <div>
                <label className="block font-bold mb-2" style={{ color: '#3C2F2F' }}>Title</label>
                <input
                  type="text"
                  value={editingBook.title}
                  onChange={(e) => setEditingBook({...editingBook, title: e.target.value})}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none"
                  style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                />
              </div>
              <div>
                <label className="block font-bold mb-2" style={{ color: '#3C2F2F' }}>Author</label>
                <input
                  type="text"
                  value={editingBook.author}
                  onChange={(e) => setEditingBook({...editingBook, author: e.target.value})}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none"
                  style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                />
              </div>
              <div>
                <label className="block font-bold mb-2" style={{ color: '#3C2F2F' }}>Category</label>
                <input
                  type="text"
                  value={editingBook.category}
                  onChange={(e) => setEditingBook({...editingBook, category: e.target.value})}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none"
                  style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                />
              </div>
              <div>
                <label className="block font-bold mb-2" style={{ color: '#3C2F2F' }}>Copies</label>
                <input
                  type="number"
                  min="0"
                  value={editingBook.copies}
                  onChange={(e) => setEditingBook({...editingBook, copies: e.target.value})}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none"
                  style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleEditBook}
                  className="flex-1 py-3 rounded-lg font-bold hover:opacity-90"
                  style={{ backgroundColor: '#E2B270', color: '#3C2F2F' }}
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingBook(null)}
                  className="flex-1 py-3 rounded-lg font-bold hover:opacity-90"
                  style={{ backgroundColor: '#5A4B4B', color: 'white' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#3C2F2F' }}>Confirm Delete</h3>
            <p className="mb-6" style={{ color: '#5A4B4B' }}>
              Are you sure you want to delete this book? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDeleteBook(showDeleteConfirm)}
                className="flex-1 py-3 rounded-lg font-bold hover:opacity-90 text-white"
                style={{ backgroundColor: '#F44336' }}
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 py-3 rounded-lg font-bold hover:opacity-90"
                style={{ backgroundColor: '#5A4B4B', color: 'white' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('landing');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        setCurrentView('dashboard');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentView('landing');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F8F4E3' }}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-t-transparent mb-4" style={{ borderColor: '#E2B270', borderTopColor: 'transparent' }}></div>
          <p className="text-xl" style={{ color: '#3C2F2F' }}>Loading BookHive...</p>
        </div>
      </div>
    );
  }

  if (currentView === 'landing' && !user) return <LandingPage onNavigateToLogin={() => setCurrentView('login')} />;
  if (currentView === 'login' && !user) return <Login onSwitchToSignup={() => setCurrentView('signup')} onBack={() => setCurrentView('landing')} />;
  if (currentView === 'signup' && !user) return <Signup onSwitchToLogin={() => setCurrentView('login')} />;
  if (user) return <Dashboard user={user} onLogout={handleLogout} />;
  return <LandingPage onNavigateToLogin={() => setCurrentView('login')} />;
};

export default App;
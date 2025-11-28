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
    <div style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Hero Section */}
      <div id="home" className="min-h-screen relative" style={{ backgroundColor: '#fff1cf' }}>
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
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

          {/* Hero Content */}
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
              <p className="text-lg mb-4 leading-relaxed" style={{ color: '#3C2F2F' }}>
                Built for simplicity and precision, it empowers librarians to manage collections, track borrowings, and maintain records with ease.
              </p>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: '#3C2F2F' }}>
                With its sleek interface and intuitive tools, BookHive transforms library management into a seamless experience.
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

      {/* About Section */}
      <div id="about" className="min-h-screen py-20 bg-cover bg-center" style={{ backgroundImage: 'url(/About-bg.png)' }}>
        <div className="container mx-auto px-4 text-center">
          <div className="mb-16 relative">
            <img src="/book-vid.gif" alt="Book animation" className="h-48 absolute left-0 top-0" />
            <h2 className="text-5xl font-bold mb-4" style={{ color: '#3C2F2F' }}>About BookHive</h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: '#5A4B4B' }}>
              The BookHive Library Inventory System is a database-driven application built to assist librarians in organizing and maintaining book collections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { title: 'CRUD Operations', desc: 'Add, view, edit, or delete book records.' },
              { title: 'Book Details', desc: 'Store important information like Book ID, Title, Author, Category, Publisher, Year, and Availability Status.' },
              { title: 'Borrowing Management', desc: 'Record and monitor who borrowed books, along with Date Borrowed and Due Date.' },
              { title: 'Return Updates', desc: 'Easily update book availability once returned.' }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-xl shadow-lg hover:transform hover:scale-105 transition"
                style={{ backgroundColor: '#E2B270' }}
              >
                <h3 className="text-xl font-bold mb-3" style={{ color: '#3C2F2F' }}>{feature.title}</h3>
                <p style={{ color: '#5A4B4B' }}>{feature.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-lg max-w-4xl mx-auto" style={{ color: '#5A4B4B' }}>
            BookHive simplifies library management by reducing manual record-keeping, improving accuracy, and ensuring a well-maintained inventory for every librarian.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="min-h-screen py-20" style={{ background: 'linear-gradient(135deg, #F4E6C2 0%, #F8F4E3 100%)' }}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl italic mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#3C2F2F' }}>
              Get in Touch
            </h2>
            <p className="text-lg" style={{ color: '#5A4B4B' }}>
              We'd love to hear from you! Whether you have questions about BookHive or need support, our team is here to help.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <label className="block font-bold mb-2" style={{ color: '#3C2F2F' }}>Your Name *</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
                  style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block font-bold mb-2" style={{ color: '#3C2F2F' }}>Your Email *</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
                  style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <label className="block font-bold mb-2" style={{ color: '#3C2F2F' }}>Subject *</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
                  style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                  placeholder="What is this about?"
                />
              </div>
              <div>
                <label className="block font-bold mb-2" style={{ color: '#3C2F2F' }}>Your Message *</label>
                <textarea 
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none resize-none"
                  style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                  placeholder="Tell us more..."
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 rounded-lg font-bold text-lg hover:opacity-90 transition"
                style={{ backgroundColor: '#E2B270', color: '#3C2F2F' }}
              >
                Send Message
              </button>
            </div>

            <div className="space-y-8">
              {[
                { icon: <Mail className="w-6 h-6" />, title: 'Email Us', content: 'bookhive@gmail.com' },
                { icon: <Phone className="w-6 h-6" />, title: 'Call Us', content: '09123456781' },
                { icon: <MapPin className="w-6 h-6" />, title: 'Visit Us', content: 'West Visayas State University' },
                { icon: <Clock className="w-6 h-6" />, title: 'Business Hours', content: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM' }
              ].map((info, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg flex-shrink-0" style={{ backgroundColor: '#E2B270', color: '#3C2F2F' }}>
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1" style={{ color: '#3C2F2F' }}>{info.title}</h3>
                    <p style={{ color: '#5A4B4B', whiteSpace: 'pre-line' }}>{info.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12" style={{ backgroundColor: '#3C2F2F', color: '#F8F4E3' }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <img src="bookhive logo.png" alt="BookHive Logo" className="h-10 mr-3" />
                <span className="text-xl font-bold" style={{ color: '#E2B270' }}>BookHive</span>
              </div>
              <p className="mb-4">Your Hive of Knowledge and Discovery. Managing libraries made simple and efficient.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4" style={{ color: '#E2B270' }}>Quick Links</h3>
              <div className="space-y-2">
                <a href="#home" className="block hover:opacity-75">Home</a>
                <a href="#about" className="block hover:opacity-75">About Us</a>
                <a href="#contact" className="block hover:opacity-75">Contact</a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4" style={{ color: '#E2B270' }}>Contact Info</h3>
              <p>📧 bookhive@gmail.com</p>
              <p>📞 09123456781</p>
              <p>📍 West Visayas State University</p>
            </div>
          </div>
          <div className="border-t pt-6 text-center" style={{ borderColor: '#5A4B4B', color: '#A89898' }}>
            <p>© 2025 BookHive. All rights reserved. | Designed with passion for libraries.</p>
          </div>
        </div>
      </footer>
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
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #F4E6C2 0%, #F8F4E3 100%)' }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        <div className="flex items-center justify-center mb-8">
          <img src="bookhive logo.png" alt="BookHive Logo" className="h-12 mr-3" />
          <h1 className="text-3xl font-bold" style={{ color: '#3C2F2F' }}>BookHive</h1>
        </div>
        
        <h2 className="text-2xl font-semibold mb-6 text-center" style={{ color: '#3C2F2F' }}>Librarian Login</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: '#3C2F2F' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none"
              style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: '#3C2F2F' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none"
              style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
              required
            />
          </div>
          
          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-lg font-bold text-lg hover:opacity-90 transition"
            style={{ backgroundColor: '#E2B270', color: '#3C2F2F' }}
          >
            Login
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <p style={{ color: '#5A4B4B' }}>
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignup}
              className="font-bold hover:opacity-75"
              style={{ color: '#E2B270' }}
            >
              Sign Up
            </button>
          </p>
          <button
            onClick={onBack}
            className="mt-4 text-sm hover:opacity-75"
            style={{ color: '#5A4B4B' }}
          >
            ← Back to Home
          </button>
        </div>
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
      setToast({ message: 'Please fill in all fields', type: 'error' });
      return;
    }
    if (password.length < 6) {
      setToast({ message: 'Password must be at least 6 characters', type: 'error' });
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await addDoc(collection(db, 'librarians'), {
        uid: userCredential.user.uid,
        name,
        email,
        createdAt: serverTimestamp()
      });
      
      setToast({ message: 'Account created successfully!', type: 'success' });
      setTimeout(onSwitchToLogin, 1500);
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #F4E6C2 0%, #F8F4E3 100%)' }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        <div className="flex items-center justify-center mb-8">
          <img src="bookhive logo.png" alt="BookHive Logo" className="h-12 mr-3" />
          <h1 className="text-3xl font-bold" style={{ color: '#3C2F2F' }}>BookHive</h1>
        </div>
        
        <h2 className="text-2xl font-semibold mb-6 text-center" style={{ color: '#3C2F2F' }}>Librarian Signup</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: '#3C2F2F' }}>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none"
              style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: '#3C2F2F' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none"
              style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: '#3C2F2F' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSignup()}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none"
              style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
            />
          </div>
          
          <button
            onClick={handleSignup}
            className="w-full py-3 rounded-lg font-bold text-lg hover:opacity-90 transition"
            style={{ backgroundColor: '#E2B270', color: '#3C2F2F' }}
          >
            Sign Up
          </button>
        </div>
        
        <p className="mt-6 text-center" style={{ color: '#5A4B4B' }}>
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="font-bold hover:opacity-75"
            style={{ color: '#E2B270' }}
          >
            Login
          </button>
        </p>
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
    category: ''
  });
  
  const [borrowForm, setBorrowForm] = useState({
    studentName: '',
    studentNumber: '',
    bookTitle: '',
    bookCode: '',
    borrowDate: '',
    returnDate: ''
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

  const handleAddBook = async () => {
    if (!newBook.title || !newBook.bookCode || !newBook.author || !newBook.category) {
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
      await addDoc(collection(db, 'books'), {
        ...newBook,
        status: 'Available',
        dateAdded: serverTimestamp()
      });
      
      setToast({ message: 'Book added successfully!', type: 'success' });
      setNewBook({ title: '', bookCode: '', author: '', category: '' });
      fetchBooks();
    } catch (error) {
      setToast({ message: 'Error adding book', type: 'error' });
    }
  };

  const handleEditBook = async () => {
    if (!editingBook.title || !editingBook.bookCode || !editingBook.author || !editingBook.category) {
      setToast({ message: 'Please fill in all fields', type: 'error' });
      return;
    }
    
    try {
      await updateDoc(doc(db, 'books', editingBook.id), {
        title: editingBook.title,
        bookCode: editingBook.bookCode,
        author: editingBook.author,
        category: editingBook.category
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
    const { studentName, studentNumber, bookTitle, bookCode, borrowDate, returnDate } = borrowForm;
    
    if (!studentName || !studentNumber || !bookTitle || !bookCode || !borrowDate || !returnDate) {
      setToast({ message: 'Please fill in all fields', type: 'error' });
      return;
    }
    
    // Validate dates
    if (new Date(returnDate) <= new Date(borrowDate)) {
      setToast({ message: 'Return date must be after borrow date', type: 'error' });
      return;
    }
    
    // Check if book is available
    const bookToCheck = books.find(book => book.bookCode === bookCode);
    if (!bookToCheck) {
      setToast({ message: 'Book not found in inventory', type: 'error' });
      return;
    }
    if (bookToCheck.status === 'Borrowed') {
      setToast({ message: 'This book is already borrowed', type: 'error' });
      return;
    }
    
    try {
      await addDoc(collection(db, 'borrowedBooks'), {
        ...borrowForm,
        borrowedAt: serverTimestamp()
      });
      
      const bookQuery = query(collection(db, 'books'), where('bookCode', '==', bookCode));
      const bookSnapshot = await getDocs(bookQuery);
      
      if (!bookSnapshot.empty) {
        const bookDoc = bookSnapshot.docs[0];
        await updateDoc(doc(db, 'books', bookDoc.id), {
          status: 'Borrowed'
        });
      }
      
      setToast({ message: 'Book borrowed successfully!', type: 'success' });
      setBorrowForm({
        studentName: '',
        studentNumber: '',
        bookTitle: '',
        bookCode: '',
        borrowDate: '',
        returnDate: ''
      });
      fetchBooks();
      fetchBorrowedBooks();
    } catch (error) {
      setToast({ message: 'Error borrowing book', type: 'error' });
    }
  };

  const handleReturnBook = async (borrowedBookId, bookCode) => {
    try {
      const bookQuery = query(collection(db, 'books'), where('bookCode', '==', bookCode));
      const bookSnapshot = await getDocs(bookQuery);
      
      if (!bookSnapshot.empty) {
        const bookDoc = bookSnapshot.docs[0];
        await updateDoc(doc(db, 'books', bookDoc.id), {
          status: 'Available'
        });
      }
      
      await updateDoc(doc(db, 'borrowedBooks', borrowedBookId), {
        returned: true,
        returnedAt: serverTimestamp()
      });
      
      setToast({ message: 'Book returned successfully!', type: 'success' });
      fetchBooks();
      fetchBorrowedBooks();
    } catch (error) {
      setToast({ message: 'Error returning book', type: 'error' });
    }
  };

  // Filter and search functions
  // Filter and search functions
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.bookCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || book.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || book.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const activeBorrowedBooks = borrowedBooks.filter(b => !b.returned);
  const returnedBooks = borrowedBooks.filter(b => b.returned);
  
  // Check for overdue books
  const isOverdue = (returnDate) => {
    return new Date(returnDate) < new Date();
  };
  
  const overdueBorrowedBooks = activeBorrowedBooks.filter(b => isOverdue(b.returnDate));
  
  // Statistics
  const stats = {
    totalBooks: books.length,
    availableBooks: books.filter(b => b.status === 'Available').length,
    borrowedBooks: books.filter(b => b.status === 'Borrowed').length,
    overdueBooks: overdueBorrowedBooks.length
  };
  
  // Get unique categories
  const categories = [...new Set(books.map(book => book.category))];

  // Auto-complete for book selection
  const availableBooks = books.filter(b => b.status === 'Available');

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F4E3', fontFamily: 'Montserrat, sans-serif' }}>
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
            { title: 'Total Books', value: stats.totalBooks, icon: <BookOpen className="w-8 h-8" />, color: '#E2B270' },
            { title: 'Available', value: stats.availableBooks, icon: <BookOpen className="w-8 h-8" />, color: '#4CAF50' },
            { title: 'Borrowed', value: stats.borrowedBooks, icon: <Users className="w-8 h-8" />, color: '#2196F3' },
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
                onClick={() => setActiveTab(tab.id)}
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
                    <option value="Borrowed">Borrowed</option>
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
                          <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Book Code</th>
                          <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Title</th>
                          <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Author</th>
                          <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Category</th>
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
                            <td className="px-4 py-3">
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                book.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {book.status}
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
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#3C2F2F' }}>Add New Book</h2>
                <div className="max-w-2xl space-y-4">
                  <div>
                    <label className="block font-bold mb-2" style={{ color: '#3C2F2F' }}>Book Code *</label>
                    <input
                      type="text"
                      value={newBook.bookCode}
                      onChange={(e) => setNewBook({...newBook, bookCode: e.target.value})}
                      className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none"
                      style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                      placeholder="e.g., BK001"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-2" style={{ color: '#3C2F2F' }}>Title *</label>
                    <input
                      type="text"
                      value={newBook.title}
                      onChange={(e) => setNewBook({...newBook, title: e.target.value})}
                      className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none"
                      style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                      placeholder="Enter book title"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-2" style={{ color: '#3C2F2F' }}>Author *</label>
                    <input
                      type="text"
                      value={newBook.author}
                      onChange={(e) => setNewBook({...newBook, author: e.target.value})}
                      className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none"
                      style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                      placeholder="Enter author name"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-2" style={{ color: '#3C2F2F' }}>Category *</label>
                    <input
                      type="text"
                      value={newBook.category}
                      onChange={(e) => setNewBook({...newBook, category: e.target.value})}
                      className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none"
                      style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                      placeholder="e.g., Fiction, Science, History"
                    />
                  </div>
                  <button
                    onClick={handleAddBook}
                    className="w-full py-3 rounded-lg font-bold text-lg hover:opacity-90 transition flex items-center justify-center"
                    style={{ backgroundColor: '#E2B270', color: '#3C2F2F' }}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Book to Inventory
                  </button>
                </div>
              </div>
            )}

            {/* Borrow Book Tab */}
            {activeTab === 'borrow' && (
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#3C2F2F' }}>Borrow Book</h2>
                <div className="max-w-2xl space-y-4">
                  <div>
                    <label className="block font-bold mb-2" style={{ color: '#3C2F2F' }}>Student Name *</label>
                    <input
                      type="text"
                      value={borrowForm.studentName}
                      onChange={(e) => setBorrowForm({...borrowForm, studentName: e.target.value})}
                      className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none"
                      style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                      placeholder="Enter student name"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-2" style={{ color: '#3C2F2F' }}>Student Number *</label>
                    <input
                      type="text"
                      value={borrowForm.studentNumber}
                      onChange={(e) => setBorrowForm({...borrowForm, studentNumber: e.target.value})}
                      className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none"
                      style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                      placeholder="Enter student ID number"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-2" style={{ color: '#3C2F2F' }}>Select Book *</label>
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
                      className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none"
                      style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                    >
                      <option value="">-- Select an available book --</option>
                      {availableBooks.map(book => (
                        <option key={book.id} value={book.bookCode}>
                          {book.bookCode} - {book.title} by {book.author}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold mb-2" style={{ color: '#3C2F2F' }}>Borrow Date *</label>
                      <input
                        type="date"
                        value={borrowForm.borrowDate}
                        onChange={(e) => setBorrowForm({...borrowForm, borrowDate: e.target.value})}
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none"
                        style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-2" style={{ color: '#3C2F2F' }}>Return Date *</label>
                      <input
                        type="date"
                        value={borrowForm.returnDate}
                        onChange={(e) => setBorrowForm({...borrowForm, returnDate: e.target.value})}
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none"
                        style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleBorrowBook}
                    className="w-full py-3 rounded-lg font-bold text-lg hover:opacity-90 transition"
                    style={{ backgroundColor: '#E2B270', color: '#3C2F2F' }}
                  >
                    Process Borrowing
                  </button>
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
                          <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Student Name</th>
                          <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Student Number</th>
                          <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Book</th>
                          <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Book Code</th>
                          <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Borrow Date</th>
                          <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Return Date</th>
                          <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeBorrowedBooks.map((record, idx) => (
                          <tr key={record.id} className={idx % 2 === 0 ? 'bg-white' : ''} style={{ backgroundColor: idx % 2 !== 0 ? '#FFFBF0' : 'white' }}>
                            <td className="px-4 py-3" style={{ color: '#3C2F2F' }}>{record.studentName}</td>
                            <td className="px-4 py-3" style={{ color: '#5A4B4B' }}>{record.studentNumber}</td>
                            <td className="px-4 py-3" style={{ color: '#3C2F2F' }}>{record.bookTitle}</td>
                            <td className="px-4 py-3" style={{ color: '#5A4B4B' }}>{record.bookCode}</td>
                            <td className="px-4 py-3" style={{ color: '#5A4B4B' }}>{record.borrowDate}</td>
                            <td className="px-4 py-3">
                              <span className={isOverdue(record.returnDate) ? 'text-red-600 font-bold' : ''} style={{ color: isOverdue(record.returnDate) ? '#F44336' : '#5A4B4B' }}>
                                {record.returnDate}
                                {isOverdue(record.returnDate) && ' (OVERDUE)'}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => handleReturnBook(record.id, record.bookCode)}
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
                        <th className="px-4 py-3 text-left text-red-900">Student Number</th>
                        <th className="px-4 py-3 text-left text-red-900">Book</th>
                        <th className="px-4 py-3 text-left text-red-900">Book Code</th>
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
                            <td className="px-4 py-3" style={{ color: '#5A4B4B' }}>{record.studentNumber}</td>
                            <td className="px-4 py-3" style={{ color: '#3C2F2F' }}>{record.bookTitle}</td>
                            <td className="px-4 py-3" style={{ color: '#5A4B4B' }}>{record.bookCode}</td>
                            <td className="px-4 py-3 text-red-600 font-bold">{record.returnDate}</td>
                            <td className="px-4 py-3 text-red-600 font-bold">{daysOverdue} days</td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => handleReturnBook(record.id, record.bookCode)}
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
                  {overdueBorrowedBooks.length === 0 && (
                    <p className="text-center py-8" style={{ color: '#5A4B4B' }}>No overdue books - Great job!</p>
                  )}
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
                        <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Student Number</th>
                        <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Book</th>
                        <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Book Code</th>
                        <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Borrowed</th>
                        <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>Returned</th>
                      </tr>
                    </thead>
                    <tbody>
                      {returnedBooks.map((record, idx) => (
                        <tr key={record.id} className={idx % 2 === 0 ? 'bg-white' : ''} style={{ backgroundColor: idx % 2 !== 0 ? '#FFFBF0' : 'white' }}>
                          <td className="px-4 py-3" style={{ color: '#3C2F2F' }}>{record.studentName}</td>
                          <td className="px-4 py-3" style={{ color: '#5A4B4B' }}>{record.studentNumber}</td>
                          <td className="px-4 py-3" style={{ color: '#3C2F2F' }}>{record.bookTitle}</td>
                          <td className="px-4 py-3" style={{ color: '#5A4B4B' }}>{record.bookCode}</td>
                          <td className="px-4 py-3" style={{ color: '#5A4B4B' }}>{record.borrowDate}</td>
                          <td className="px-4 py-3">
                            <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                              {record.returnDate}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {returnedBooks.length === 0 && (
                    <p className="text-center py-8" style={{ color: '#5A4B4B' }}>No return history yet</p>
                  )}
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
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'login', 'signup', 'dashboard'

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

  if (currentView === 'landing' && !user) {
    return <LandingPage onNavigateToLogin={() => setCurrentView('login')} />;
  }

  if (currentView === 'login' && !user) {
    return (
      <Login 
        onSwitchToSignup={() => setCurrentView('signup')}
        onBack={() => setCurrentView('landing')}
      />
    );
  }

  if (currentView === 'signup' && !user) {
    return <Signup onSwitchToLogin={() => setCurrentView('login')} />;
  }

  if (user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  return <LandingPage onNavigateToLogin={() => setCurrentView('login')} />;
};

export default App;
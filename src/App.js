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
import { BookOpen, LogOut, Plus, Users, Mail, Phone, MapPin, Clock, User, Hash, Tag, Calendar, CheckCircle, AlertCircle, Send } from 'lucide-react';

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
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [contactToast, setContactToast] = useState(null);
  const [contactLoading, setContactLoading] = useState(false);

  const handleContactSubmit = async () => {
    const { name, email, subject, message } = contactForm;
    
    if (!name || !email || !subject || !message) {
      setContactToast({ message: 'Please fill in all fields', type: 'error' });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setContactToast({ message: 'Please enter a valid email', type: 'error' });
      return;
    }

    setContactLoading(true);
    try {
      await addDoc(collection(db, 'contactMessages'), {
        name,
        email,
        subject,
        message,
        submittedAt: serverTimestamp()
      });

      setContactToast({ message: 'Message sent successfully! We will get back to you soon.', type: 'success' });
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      setContactToast({ message: `Error: ${error.message}`, type: 'error' });
    } finally {
      setContactLoading(false);
    }
  };

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
              {contactToast && <Toast message={contactToast.message} type={contactToast.type} onClose={() => setContactToast(null)} />}
              <div>
                <label className="block font-bold mb-2" style={{ color: '#3C2F2F' }}>Your Name *</label>
                <input 
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
                  style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block font-bold mb-2" style={{ color: '#3C2F2F' }}>Your Email *</label>
                <input 
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
                  style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <label className="block font-bold mb-2" style={{ color: '#3C2F2F' }}>Subject *</label>
                <input 
                  type="text"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
                  style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                  placeholder="What is this about?"
                />
              </div>
              <div>
                <label className="block font-bold mb-2" style={{ color: '#3C2F2F' }}>Your Message *</label>
                <textarea 
                  rows="5"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none resize-none"
                  style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                  placeholder="Tell us more..."
                />
              </div>
              <button 
                onClick={handleContactSubmit}
                disabled={contactLoading}
                className="w-full py-4 rounded-lg font-bold text-lg hover:opacity-90 transition disabled:opacity-50"
                style={{ backgroundColor: '#E2B270', color: '#3C2F2F' }}
              >
                {contactLoading ? 'Sending...' : 'Send Message'}
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
  const [bookSearch, setBookSearch] = useState('');
  const [bookCategoryFilter, setBookCategoryFilter] = useState('all');
  const [editingBook, setEditingBook] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [selectedReturned, setSelectedReturned] = useState([]);
  const [selectedStudentToContact, setSelectedStudentToContact] = useState(null);
  const [contactMessage, setContactMessage] = useState('');
  
  const [newBook, setNewBook] = useState({
    title: '',
    bookCode: '',
    author: '',
    category: ''
  });
  
  const [borrowForm, setBorrowForm] = useState({
    studentName: '',
    studentNumber: '',
    studentEmail: '',
    studentContact: '',
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
    const { studentName, studentNumber, studentEmail, studentContact, bookTitle, bookCode, borrowDate, returnDate } = borrowForm;
    
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
        studentEmail: '',
        studentContact: '',
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

  // Send reminder via email or SMS (opens mail client or sms app)
  const handleSendReminder = (record) => {
    // Prefer email if available
    const subject = encodeURIComponent(`Library Reminder: Return ${record.bookTitle}`);
    const bodyText = `Hello ${record.studentName},%0D%0A%0D%0AThis is a friendly reminder to return the book \"${record.bookTitle}\" (Code: ${record.bookCode}) by ${record.returnDate}.%0D%0A%0D%0AThank you.%0D%0A- BookHive`;

    if (record.studentEmail) {
      const mailto = `mailto:${record.studentEmail}?subject=${subject}&body=${bodyText}`;
      window.open(mailto, '_blank');
      setToast({ message: `Opened email to ${record.studentEmail}`, type: 'success' });
      return;
    }

    // Fallback to SMS if contact number is present
    if (record.studentContact) {
      // Use sms: URL scheme; body param differs across platforms but this is a common approach
      const smsBody = encodeURIComponent(`Please return ${record.bookTitle} (Code: ${record.bookCode}) by ${record.returnDate}.`);
      const smsLink = `sms:${record.studentContact}?body=${smsBody}`;
      window.open(smsLink, '_blank');
      setToast({ message: `Opened SMS to ${record.studentContact}`, type: 'success' });
      return;
    }

    setToast({ message: 'No contact email or phone available for this borrower', type: 'error' });
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

  const toggleSelectReturned = (id) => {
    setSelectedReturned(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleSelectAllReturned = () => {
    if (selectedReturned.length === returnedBooks.length) {
      setSelectedReturned([]);
    } else {
      setSelectedReturned(returnedBooks.map(r => r.id));
    }
  };

  const handleDeleteSelectedReturned = async () => {
    if (selectedReturned.length === 0) {
      setToast({ message: 'No records selected', type: 'error' });
      return;
    }

    if (!window.confirm(`Delete ${selectedReturned.length} selected record(s)? This cannot be undone.`)) return;

    setLoading(true);
    try {
      await Promise.all(selectedReturned.map(id => deleteDoc(doc(db, 'borrowedBooks', id))));
      setToast({ message: `${selectedReturned.length} record(s) deleted`, type: 'success' });
      setSelectedReturned([]);
      fetchBorrowedBooks();
      fetchBooks();
    } catch (error) {
      setToast({ message: 'Error deleting records', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSendContactEmail = (student) => {
    if (!contactMessage.trim()) {
      setToast({ message: 'Please type a message', type: 'error' });
      return;
    }

    if (!student.studentEmail) {
      setToast({ message: 'Student email not available', type: 'error' });
      return;
    }

    const subject = encodeURIComponent(`Library Notice: Overdue Book - ${student.bookTitle}`);
    const body = encodeURIComponent(`Dear ${student.studentName},\n\n${contactMessage}\n\nPlease return the book as soon as possible.\n\nThank you.\n- BookHive Library`);
    const mailto = `mailto:${student.studentEmail}?subject=${subject}&body=${body}`;
    window.open(mailto, '_blank');
    setToast({ message: `Email opened for ${student.studentEmail}`, type: 'success' });
    setSelectedStudentToContact(null);
    setContactMessage('');
  };
  
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

  // Add Book validation helpers
  const isDuplicateCode = (code) => {
    if (!code) return false;
    return books.some(b => b.bookCode && b.bookCode.toLowerCase() === code.toLowerCase());
  };

  const isAddDisabled = !newBook.title.trim() || !newBook.bookCode.trim() || !newBook.author.trim() || !newBook.category.trim() || isDuplicateCode(newBook.bookCode);

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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8 border-l-4" style={{ borderColor: '#E2B270' }}>
                    <div className="space-y-4">
                      <div>
                        <label className="block font-bold mb-2" style={{ color: '#3C2F2F' }}>Book Code *</label>
                        <input
                          type="text"
                          value={newBook.bookCode}
                          onChange={(e) => setNewBook({...newBook, bookCode: e.target.value})}
                          className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none"
                          style={{ borderColor: isDuplicateCode(newBook.bookCode) ? '#F44336' : '#E2B270', backgroundColor: '#FFFBF0' }}
                          placeholder="e.g., BK001"
                        />
                        {isDuplicateCode(newBook.bookCode) && (
                          <p className="text-sm mt-2" style={{ color: '#F44336' }}>This book code already exists.</p>
                        )}
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

                      <div className="grid grid-cols-2 gap-4">
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
                      </div>

                      <div className="flex items-center gap-4 mt-4">
                        <button
                          onClick={handleAddBook}
                          disabled={isAddDisabled}
                          className={`py-3 rounded-lg font-bold text-lg flex items-center justify-center gap-2 px-6 ${isAddDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                          style={{ backgroundColor: '#E2B270', color: '#3C2F2F' }}
                        >
                          <Plus className="w-5 h-5" />
                          Add Book
                        </button>

                        <button
                          type="button"
                          onClick={() => setNewBook({ title: '', bookCode: '', author: '', category: '' })}
                          className="py-3 rounded-lg font-semibold px-6"
                          style={{ border: '1px solid #E2B270', color: '#3C2F2F', backgroundColor: 'white' }}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4" style={{ borderColor: '#E2B270' }}>
                      <h4 className="text-lg font-bold mb-3" style={{ color: '#3C2F2F' }}>Preview</h4>
                      <div className="p-4 rounded-lg" style={{ backgroundColor: '#FFFBF0' }}>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-20 bg-gray-200 rounded-md flex items-center justify-center" style={{ color: '#A89898' }}>
                            <BookOpen className="w-8 h-8" />
                          </div>
                          <div>
                            <p className="font-bold text-md" style={{ color: '#3C2F2F' }}>{newBook.title || 'Book Title'}</p>
                            <p className="text-sm" style={{ color: '#5A4B4B' }}>{newBook.author || 'Author'}</p>
                            <p className="text-xs mt-2" style={{ color: '#A89898' }}>Category: {newBook.category || '-'}</p>
                            <p className="text-xs" style={{ color: '#A89898' }}>Code: {newBook.bookCode || '-'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-gray-600">
                        <p>Tips:</p>
                        <ul className="list-disc ml-5 mt-2" style={{ color: '#5A4B4B' }}>
                          <li>Use a clear, unique book code (e.g., BK001)</li>
                          <li>Keep categories consistent for easier filtering</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Borrow Book Tab */}
            {activeTab === 'borrow' && (
              <div>
                <h2 className="text-3xl font-bold mb-8" style={{ color: '#3C2F2F' }}>Borrow a Book</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Form Section */}
                  <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4" style={{ borderColor: '#E2B270' }}>
                      <div className="space-y-6">
                        <div>
                          <label className="block font-bold mb-3 flex items-center gap-2" style={{ color: '#3C2F2F' }}>
                            <User className="w-5 h-5" style={{ color: '#E2B270' }} />
                            Student Name *
                          </label>
                          <input
                            type="text"
                            value={borrowForm.studentName}
                            onChange={(e) => setBorrowForm({...borrowForm, studentName: e.target.value})}
                            className="w-full px-5 py-3 border-2 rounded-xl focus:outline-none transition"
                            style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                            placeholder="Enter student name"
                          />
                        </div>
                        <div>
                          <label className="block font-bold mb-3 flex items-center gap-2" style={{ color: '#3C2F2F' }}>
                            <Hash className="w-5 h-5" style={{ color: '#E2B270' }} />
                            Student Number *
                          </label>
                          <input
                            type="text"
                            value={borrowForm.studentNumber}
                            onChange={(e) => setBorrowForm({...borrowForm, studentNumber: e.target.value})}
                            className="w-full px-5 py-3 border-2 rounded-xl focus:outline-none transition"
                            style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                            placeholder="Enter student ID number"
                          />
                        </div>
                        <div>
                          <label className="block font-bold mb-3 flex items-center gap-2" style={{ color: '#3C2F2F' }}>
                            <Mail className="w-5 h-5" style={{ color: '#E2B270' }} />
                            Student Email
                          </label>
                          <input
                            type="email"
                            value={borrowForm.studentEmail}
                            onChange={(e) => setBorrowForm({...borrowForm, studentEmail: e.target.value})}
                            className="w-full px-5 py-3 border-2 rounded-xl focus:outline-none transition"
                            style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                            placeholder="student@example.com (optional but recommended)"
                          />
                        </div>
                        <div>
                          <label className="block font-bold mb-3 flex items-center gap-2" style={{ color: '#3C2F2F' }}>
                            <Phone className="w-5 h-5" style={{ color: '#E2B270' }} />
                            Contact Number
                          </label>
                          <input
                            type="text"
                            value={borrowForm.studentContact}
                            onChange={(e) => setBorrowForm({...borrowForm, studentContact: e.target.value})}
                            className="w-full px-5 py-3 border-2 rounded-xl focus:outline-none transition"
                            style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                            placeholder="e.g., +1234567890 (optional)"
                          />
                        </div>
                        <div>
                          <label className="block font-bold mb-3 flex items-center gap-2" style={{ color: '#3C2F2F' }}>
                            <BookOpen className="w-5 h-5" style={{ color: '#E2B270' }} />
                            Select Book *
                          </label>

                          <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-3">
                              <select
                                value={bookCategoryFilter}
                                onChange={(e) => setBookCategoryFilter(e.target.value)}
                                className="px-3 py-2 rounded-lg border-2 focus:outline-none"
                                style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                              >
                                <option value="all">All Categories</option>
                                {categories.map(cat => (
                                  <option key={cat} value={cat}>{cat}</option>
                                ))}
                              </select>

                              <input
                                type="text"
                                value={bookSearch}
                                onChange={(e) => setBookSearch(e.target.value)}
                                placeholder="Search books by code, title or author..."
                                className="px-3 py-2 rounded-lg border-2 focus:outline-none"
                                style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                              />
                            </div>

                            {bookSearch.trim() !== '' && (
                              <div className="bg-white rounded-lg border p-2 max-h-44 overflow-y-auto">
                                {availableBooks
                                  .filter(b => (bookCategoryFilter === 'all' || b.category === bookCategoryFilter))
                                  .filter(b => (
                                    b.bookCode.toLowerCase().includes(bookSearch.toLowerCase()) ||
                                    b.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
                                    (b.author || '').toLowerCase().includes(bookSearch.toLowerCase())
                                  ))
                                  .map(book => (
                                    <button
                                      key={book.id}
                                      type="button"
                                      onClick={() => {
                                        setBorrowForm({ ...borrowForm, bookCode: book.bookCode, bookTitle: book.title });
                                        setBookSearch(`${book.bookCode} - ${book.title}`);
                                      }}
                                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 transition flex justify-between items-center"
                                    >
                                      <span className="text-sm text-gray-800">{book.bookCode} - {book.title}</span>
                                      <span className="text-xs text-gray-500">{book.author}</span>
                                    </button>
                                  ))}

                                {availableBooks.filter(b => (bookCategoryFilter === 'all' || b.category === bookCategoryFilter) && (
                                  b.bookCode.toLowerCase().includes(bookSearch.toLowerCase()) ||
                                  b.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
                                  (b.author || '').toLowerCase().includes(bookSearch.toLowerCase())
                                )).length === 0 && (
                                  <div className="p-3 text-sm text-gray-500">No books found</div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block font-bold mb-3 flex items-center gap-2" style={{ color: '#3C2F2F' }}>
                              <Calendar className="w-5 h-5" style={{ color: '#E2B270' }} />
                              Borrow Date *
                            </label>
                            <input
                              type="date"
                              value={borrowForm.borrowDate}
                              onChange={(e) => setBorrowForm({...borrowForm, borrowDate: e.target.value})}
                              className="w-full px-5 py-3 border-2 rounded-xl focus:outline-none transition"
                              style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                            />
                          </div>
                          <div>
                            <label className="block font-bold mb-3 flex items-center gap-2" style={{ color: '#3C2F2F' }}>
                              <Calendar className="w-5 h-5" style={{ color: '#E2B270' }} />
                              Return Date *
                            </label>
                            <input
                              type="date"
                              value={borrowForm.returnDate}
                              onChange={(e) => setBorrowForm({...borrowForm, returnDate: e.target.value})}
                              className="w-full px-5 py-3 border-2 rounded-xl focus:outline-none transition"
                              style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info Card */}
                  <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-t-4" style={{ borderColor: '#E2B270' }}>
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#3C2F2F' }}>
                        <BookOpen className="w-6 h-6" style={{ color: '#E2B270' }} />
                        Borrowing Info
                      </h3>
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg" style={{ backgroundColor: '#FFFBF0' }}>
                          <p className="text-xs uppercase font-bold" style={{ color: '#5A4B4B' }}>Selected Book</p>
                          <p className="font-bold text-lg mt-1" style={{ color: '#E2B270' }}>{borrowForm.bookTitle || 'None selected'}</p>
                          <p className="text-sm mt-1" style={{ color: '#5A4B4B' }}>Code: {borrowForm.bookCode || '-'}</p>
                        </div>
                        <div className="p-4 rounded-lg" style={{ backgroundColor: '#FFFBF0' }}>
                          <p className="text-xs uppercase font-bold" style={{ color: '#5A4B4B' }}>Duration</p>
                          <p className="font-bold text-lg mt-1" style={{ color: '#E2B270' }}>
                            {borrowForm.borrowDate && borrowForm.returnDate 
                              ? Math.max(0, Math.ceil((new Date(borrowForm.returnDate) - new Date(borrowForm.borrowDate)) / (1000 * 60 * 60 * 24)))
                              : '0'} days
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleBorrowBook}
                  className="w-full mt-8 py-4 rounded-xl font-bold text-lg text-white hover:shadow-lg transition transform hover:scale-105 flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#E2B270' }}
                >
                  <CheckCircle className="w-5 h-5" />
                  Process Borrowing
                </button>
              </div>
            )}

            {/* Borrowed Books Tab */}
            {activeTab === 'borrowed' && (
              <div>
                <h2 className="text-3xl font-bold mb-8" style={{ color: '#3C2F2F' }}>Currently Borrowed Books</h2>
                {loading ? (
                  <div className="text-center py-16">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-t-transparent" style={{ borderColor: '#E2B270', borderTopColor: 'transparent' }}></div>
                    <p className="mt-4" style={{ color: '#5A4B4B' }}>Loading borrowed books...</p>
                  </div>
                ) : activeBorrowedBooks.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                    <BookOpen className="w-16 h-16 mx-auto mb-4" style={{ color: '#E2B270' }} />
                    <p className="text-2xl font-bold" style={{ color: '#5A4B4B' }}>No books currently borrowed</p>
                    <p className="mt-2" style={{ color: '#A89898' }}>All books are back in the library</p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {activeBorrowedBooks.map((record) => {
                      const daysLeft = Math.ceil((new Date(record.returnDate) - new Date()) / (1000 * 60 * 60 * 24));
                      const isOD = isOverdue(record.returnDate);
                        return (
                        <div key={record.id} className="bg-white rounded-2xl shadow-lg p-6 border-l-4 hover:shadow-xl transition relative pb-12" style={{ borderColor: isOD ? '#F44336' : '#E2B270' }}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <p className="text-sm uppercase font-bold" style={{ color: '#5A4B4B' }}>Student</p>
                              <p className="text-lg font-bold mt-1" style={{ color: '#3C2F2F' }}>{record.studentName}</p>
                              <p className="text-sm mt-1 flex items-center gap-1" style={{ color: '#A89898' }}>
                                <Hash className="w-4 h-4" />
                                {record.studentNumber}
                              </p>
                              {record.studentEmail && (
                                <p className="text-sm mt-1 flex items-center gap-1" style={{ color: '#A89898' }}>
                                  <Mail className="w-4 h-4" />
                                  {record.studentEmail}
                                </p>
                              )}
                              {record.studentContact && (
                                <p className="text-sm mt-1 flex items-center gap-1" style={{ color: '#A89898' }}>
                                  <Phone className="w-4 h-4" />
                                  {record.studentContact}
                                </p>
                              )}
                            </div>
                            <div>
                              <p className="text-sm uppercase font-bold" style={{ color: '#5A4B4B' }}>Book</p>
                              <p className="text-lg font-bold mt-1" style={{ color: '#3C2F2F' }}>{record.bookTitle}</p>
                              <p className="text-sm mt-1 flex items-center gap-1" style={{ color: '#A89898' }}>
                                <Tag className="w-4 h-4" />
                                {record.bookCode}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm uppercase font-bold" style={{ color: '#5A4B4B' }}>Borrowed Date</p>
                              <p className="text-lg font-bold mt-1 flex items-center gap-1" style={{ color: '#3C2F2F' }}>
                                <Calendar className="w-4 h-4" style={{ color: '#E2B270' }} />
                                {record.borrowDate}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm uppercase font-bold" style={{ color: '#5A4B4B' }}>Return Date</p>
                              <p className="text-lg font-bold mt-1 flex items-center gap-1" style={{ color: isOD ? '#F44336' : '#E2B270' }}>
                                <Calendar className="w-4 h-4" />
                                {record.returnDate}
                                {isOD && ' (OVERDUE)'}
                              </p>
                              {!isOD && <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#4CAF50' }}>
                                <Clock className="w-4 h-4" />
                                {daysLeft} days left
                              </p>}
                              {isOD && <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#F44336' }}>
                                <AlertCircle className="w-4 h-4" />
                                Overdue by {Math.abs(daysLeft)} days
                              </p>}
                            </div>
                          </div>
                          <div className="mt-6 pt-6 border-t" style={{ borderColor: '#F0E6D6' }}></div>

                          <div className="absolute bottom-4 right-4">
                            <button
                              onClick={() => handleReturnBook(record.id, record.bookCode)}
                              className="py-3 px-4 rounded-lg font-bold text-white hover:shadow-md transition flex items-center justify-center gap-2"
                              style={{ backgroundColor: '#4CAF50' }}
                            >
                              <CheckCircle className="w-5 h-5" />
                              Mark as Returned
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Overdue Books Tab */}
            {activeTab === 'overdue' && (
              <div>
                <h2 className="text-3xl font-bold mb-8" style={{ color: '#F44336' }}>Overdue Books</h2>
                {overdueBorrowedBooks.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-2xl shadow-lg border-l-4" style={{ borderColor: '#4CAF50' }}>
                    <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: '#4CAF50' }} />
                    <p className="text-2xl font-bold" style={{ color: '#4CAF50' }}>No Overdue Books!</p>
                    <p className="mt-2" style={{ color: '#5A4B4B' }}>Great job! All borrowed books are on track.</p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {overdueBorrowedBooks.map((record) => {
                      const daysOverdue = Math.floor((new Date() - new Date(record.returnDate)) / (1000 * 60 * 60 * 24));
                      const isVeryOverdue = daysOverdue > 14;
                      return (
                        <div key={record.id} className="bg-white rounded-2xl shadow-lg p-6 border-l-4 hover:shadow-xl transition" style={{ borderColor: isVeryOverdue ? '#F44336' : '#FF9800' }}>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <p className="text-sm uppercase font-bold" style={{ color: '#5A4B4B' }}>Student</p>
                              <p className="text-lg font-bold mt-1" style={{ color: '#3C2F2F' }}>{record.studentName}</p>
                              <p className="text-sm mt-1 flex items-center gap-1" style={{ color: '#A89898' }}>
                                <Hash className="w-4 h-4" />
                                {record.studentNumber}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm uppercase font-bold" style={{ color: '#5A4B4B' }}>Book</p>
                              <p className="text-lg font-bold mt-1" style={{ color: '#3C2F2F' }}>{record.bookTitle}</p>
                              <p className="text-sm mt-1 flex items-center gap-1" style={{ color: '#A89898' }}>
                                <Tag className="w-4 h-4" />
                                {record.bookCode}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm uppercase font-bold" style={{ color: '#5A4B4B' }}>Due Date</p>
                              <p className="text-lg font-bold mt-1 flex items-center gap-1" style={{ color: '#F44336' }}>
                                <Calendar className="w-4 h-4" />
                                {record.returnDate}
                              </p>
                              <p className="text-sm font-bold mt-2 flex items-center gap-1" style={{ color: isVeryOverdue ? '#F44336' : '#FF9800' }}>
                                <AlertCircle className="w-4 h-4" />
                                {daysOverdue} days overdue
                              </p>
                            </div>
                          </div>
                          <div className="mt-6 pt-6 border-t flex gap-3" style={{ borderColor: '#F0E6D6' }}>
                            <button
                              onClick={() => handleReturnBook(record.id, record.bookCode)}
                              className="flex-1 py-3 rounded-lg font-bold text-white hover:shadow-md transition flex items-center justify-center gap-2"
                              style={{ backgroundColor: '#4CAF50' }}
                            >
                              <CheckCircle className="w-5 h-5" />
                              Mark as Returned
                            </button>
                            <button
                              onClick={() => setSelectedStudentToContact(record)}
                              className="flex-1 py-3 rounded-lg font-bold transition hover:shadow-md flex items-center justify-center gap-2"
                              style={{ backgroundColor: '#FFEBEE', color: '#F44336', border: '2px solid #F44336' }}
                            >
                              <Mail className="w-5 h-5" />
                              Contact Student
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Return History Tab */}
            {activeTab === 'history' && (
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold mb-6" style={{ color: '#3C2F2F' }}>Return History</h2>
                  <div className="mb-4 flex items-center gap-3">
                    {selectedReturned.length > 0 && (
                      <button
                        onClick={handleDeleteSelectedReturned}
                        className="py-2 px-4 rounded-lg font-bold text-white hover:shadow-md transition"
                        style={{ backgroundColor: '#F44336' }}
                      >
                        Delete Selected ({selectedReturned.length})
                      </button>
                    )}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ backgroundColor: '#E2B270' }}>
                        <th className="px-4 py-3 text-left" style={{ color: '#3C2F2F' }}>
                          {selectedReturned.length > 0 ? (
                            <button
                              onClick={toggleSelectAllReturned}
                              className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full border hover:shadow-sm text-sm"
                              style={{ backgroundColor: '#FFFBF0', borderColor: '#E2B270', color: '#3C2F2F' }}
                            >
                              {selectedReturned.length === returnedBooks.length && returnedBooks.length > 0 ? (
                                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-green-500 text-white">
                                  <CheckCircle className="w-3 h-3" />
                                </span>
                              ) : (
                                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border" style={{ borderColor: '#D1D5DB' }} />
                              )}
                              <span className="text-sm">{selectedReturned.length === returnedBooks.length && returnedBooks.length > 0 ? 'Deselect All' : 'Select All'}</span>
                            </button>
                          ) : null}
                        </th>
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
                          <td className="px-4 py-3" style={{ color: '#3C2F2F' }}>
                            <button
                              onClick={() => toggleSelectReturned(record.id)}
                              className={`inline-flex items-center justify-center w-5 h-5 rounded-full transition ${selectedReturned.includes(record.id) ? 'bg-green-500 text-white' : 'border border-gray-300 text-gray-500'}`}
                            >
                              {selectedReturned.includes(record.id) ? <CheckCircle className="w-3 h-3" /> : null}
                            </button>
                          </td>
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

      {/* Contact Student Modal */}
      {selectedStudentToContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full">
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#3C2F2F' }}>Contact Student</h3>
            <p className="mb-4" style={{ color: '#5A4B4B' }}>
              <strong>{selectedStudentToContact.studentName}</strong> - Overdue Book: <strong>{selectedStudentToContact.bookTitle}</strong>
            </p>
            <p className="text-sm mb-4" style={{ color: '#A89898' }}>
              Email: {selectedStudentToContact.studentEmail || 'Not available'}
            </p>
            
            <div className="mb-6">
              <label className="block font-bold mb-2" style={{ color: '#3C2F2F' }}>Message *</label>
              <textarea
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                rows="6"
                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none resize-none"
                style={{ borderColor: '#E2B270', backgroundColor: '#FFFBF0' }}
                placeholder="Type your message here..."
              />
              <p className="text-sm mt-2" style={{ color: '#A89898' }}>Note: The system will add a greeting and closing. Keep the message professional and brief.</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleSendContactEmail(selectedStudentToContact)}
                className="flex-1 py-3 rounded-lg font-bold hover:opacity-90 text-white flex items-center justify-center gap-2 transition"
                style={{ backgroundColor: '#E2B270' }}
              >
                <Mail className="w-5 h-5" />
                Send Email
              </button>
              <button
                onClick={() => {
                  setSelectedStudentToContact(null);
                  setContactMessage('');
                }}
                className="flex-1 py-3 rounded-lg font-bold hover:opacity-90"
                style={{ backgroundColor: '#5A4B4B', color: 'white' }}
              >
                Cancel
              </button>
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
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';

import Layout from "./components/Layout";

import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import DonationsPage from './pages/DonationsPage';
import FAQsPage from './pages/FAQsPage';
import ForgotPassword from './pages/ForgotPassword';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import LibraryPage from './pages/LibraryPage';
import Subscriptions from './pages/SubscriptionPage';

import FlashcardHome from './pages/Flashcards/FlashcardHome';
import FlashcardCreate from './pages/Flashcards/FlashcardCreate';
import FlashcardExample from './pages/Flashcards/FlashcardExample';

import MatchHome from './pages/Match/MatchHome';
import MatchExample from './pages/Match/MatchExample';
import MatchCreate from './pages/Match/MatchCreate';

import TestList from './pages/Test/TestList';
import TestPage from './pages/Test/Test';
import CreateTest from './pages/Test/CreateTest';
import UpdateTest from './pages/Test/UpdateTest';

function App() {
    return (
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/landing" replace />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route element={<Layout />}>
              <Route path="/home" element={<HomePage />} />
              {/* Other routes */}
              <Route path="/test">
                <Route index element={<TestList />} />
                <Route path="run" element={<TestPage />} />
                <Route path="create" element={<CreateTest />} />
                <Route path="update/:testId" element={<UpdateTest />} /> {/* Add this route */}
              </Route>
            </Route>
            <Route path="*" element={<div>404: Not Found</div>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    );
  }
  
  export default App;
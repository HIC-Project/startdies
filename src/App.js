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
          {/* Redirect root to landing */}
          <Route path="/" element={<Navigate to="/landing" replace />} />
          <Route path="/landing" element={<LandingPage />} />
          
          {/* Main layout */}
          <Route element={<Layout />}>
            {/* Main pages */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/donations" element={<DonationsPage />} />
            <Route path="/faqs" element={<FAQsPage />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/library" element={<LibraryPage />} />

            {/* Flashcards */}
            <Route path="/flashcards">
              <Route index element={<FlashcardHome />} />
              <Route path="create" element={<FlashcardCreate />} />
              <Route path="example" element={<FlashcardExample />} />
            </Route>

            {/* Match */}
            <Route path="/match">
                <Route index element={<MatchHome />} />
                <Route path="/match/create" element={<MatchCreate />} />
                <Route path="/match/:id" element={<MatchExample />} />
            </Route>

            {/* Tests */}
            <Route path="/test">
              <Route index element={<TestList />} />
              <Route path="run" element={<TestPage />} />
              <Route path="create" element={<CreateTest />} />
              <Route path="update/:testId" element={<UpdateTest />} />
            </Route>
          </Route>

          {/* Auth pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* 404 fallback */}
          <Route path="*" element={<div style={{ textAlign: 'center', padding: '2rem' }}>404: Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth';

import Layout from "./components/Layout";

import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import AboutUsPage from './pages/AboutUsPage'
import ContactUsPage from './pages/ContactUsPage'
import DonationsPage from './pages/DonationsPage'
import FAQsPage from './pages/FAQsPage'
import ForgotPassword from './pages/ForgotPassword'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import LibraryPage from './pages/LibraryPage'
import Subscriptions from './pages/SubscriptionPage'

import FlashcardHome from './pages/Flashcards/FlashcardHome'
import FlashcardCreate from './pages/Flashcards/FlashcardCreate'
import FlashcardExample from './pages/Flashcards/FlashcardExample'

import MatchHome from './pages/Match/MatchHome'
import MatchExample from './pages/Match/MatchExample'
import MatchCreate from './pages/Match/MatchCreate'

import TestList from './pages/Test/TestList'
import TestPage from './pages/Test/Test'

function App()
{
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/landing" replace/>}/>
                    <Route path="/landing" element={<LandingPage/>}/>

                    <Route element={<Layout/>}>
                        <Route path="/home" element={<HomePage/>}/>
                        <Route path="/about-us" element={<AboutUsPage/>}/>
                        <Route path="/contact-us" element={<ContactUsPage/>}/>
                        <Route path="/donations" element={<DonationsPage/>}/>
                        <Route path="/subscription" element={<Subscriptions/>}/>
                        <Route path="/faqs" element={<FAQsPage/>}/>
                        <Route path="/forgot-password" element={<ForgotPassword/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/sign-up" element={<SignUpPage/>}/>
                        <Route path="/library" element={<LibraryPage/>}/>

                        <Route path="/flashcards">
                            <Route index element={<FlashcardHome/>}/>
                            <Route path="create" element={<FlashcardCreate/>}/>
                            <Route path="example" element={<FlashcardExample/>}/>
                        </Route>

                        <Route path="/match">
                            <Route path="/match" element={<MatchHome/>}/>
                            <Route path="/match/create" element={<MatchCreate/>}/>
                            <Route path="/match/:id" element={<MatchExample/>}/>
                        </Route>

                        <Route path="/test">
                            <Route index element={<TestList/>}/>
                            <Route path="run" element={<TestPage/>}/>
                        </Route>
                    </Route>

                    <Route path="*" element={<div>404: Not Found</div>}/>

                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App

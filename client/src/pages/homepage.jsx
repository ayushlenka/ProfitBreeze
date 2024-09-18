import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../components/dropdown';
import Sneaker from '../images/nobgnewsneak.png';
import Bullseye from '../images/testbullseye.png';
import SaveTime from '../images/testtimesave.png';
import Settings from '../images/test2settings.png'
import FAQ from '../components/faq';
import Chatbot from '../components/chatbot';

const Homepage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true); 
    const [menuOpen, setMenuOpen] = useState(false); 
    const [loadingLogout, setLoadingLogout] = useState(false);
    const navigate = useNavigate();

    // Check JWT cookie for authentication
    const checkAuth = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/verifytoken`, {}, { withCredentials: true });
            console.log('Token verification response:', response.data);
            if (response.data.valid) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error('Error verifying token:', error);
            setIsLoggedIn(false);
        } finally {
            setLoading(false); 
        }
    };
    
    useEffect(() => {
        checkAuth(); 
    }, []);

    const handleLogout = async () => {
        setLoadingLogout(true);
        try {
            await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/google/logout`, { withCredentials: true });
            localStorage.removeItem('jwt');
            setIsLoggedIn(false);
            navigate('/'); 
        } catch (error) {
            console.error('Logout failed', error);
        } finally {
            setLoadingLogout(false);
        }
    };

    return (
        <div className="bg-offwhite">
            <header className="bg-cornflowerblue">
                <div className="flex items-center justify-between px-4 py-3">
                    <div><h1 className="font-roboto text-white text-lg sm:text-2lg md:text-3xl lg:text-4lg">ProfitBreeze</h1></div>
                    <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden text-white">
                        <span className="text-3xl">{menuOpen ? '✕' : '☰'}</span>
                    </button>
                    {!loading && (
                        <div className={`hidden sm:flex space-x-4`}>
                            {isLoggedIn ? (
                                <>
                                    {loadingLogout ? (
                                        <button className="text-white bg-gray-500 px-3 py-2 rounded-lg font-roboto" disabled>
                                            Logging out...
                                        </button>
                                    ) : (
                                        <button onClick={handleLogout} className="text-white bg-red-500 px-3 py-2 rounded-lg font-roboto hover:bg-red-600">
                                            Logout
                                        </button>
                                    )}
                                    <button onClick={() => navigate('/settings')} className="text-cornflowerblue bg-white hover:shadow-md focus:ring-4 focus:outline-none focus:ring-cornflowerblue/50 font-roboto rounded-lg px-3 py-2">Settings</button>
                                </>
                            ) : (
                                <a href="https://profitbreeze.onrender.com/api/auth/google/login">
                                    <button type="button" className="text-cornflowerblue bg-white hover:shadow-md focus:ring-4 focus:outline-none focus:ring-cornflowerblue/50 font-roboto rounded-lg px-3 py-2 text-center inline-flex items-center" title="Sign in with Google">
                                        <svg className="w-6 h-6" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                                        </svg>
                                        <span className="ml-2">Sign in with Google</span>
                                    </button>
                                </a>
                            )}
                        </div>
                    )}
                </div>
                {!loading && menuOpen && (
                    <div className="sm:hidden bg-cornflowerblue w-full py-4">
                        <ul className="space-y-4 px-6">
                            {isLoggedIn ? (
                                <>
                                    <li>
                                        <button onClick={() => navigate('/settings')} className="text-white font-roboto text-lg hover:underline">Settings</button>
                                    </li>
                                    {loadingLogout ? (
                                        <button className="text-white bg-gray-500 px-3 py-2 rounded-lg font-roboto" disabled>
                                            Logging out...
                                        </button>
                                    ) : (
                                        <button onClick={handleLogout} className="text-white bg-red-500 px-3 py-2 rounded-lg font-roboto hover:bg-red-600">
                                            Logout
                                        </button>
                                    )}
                                </>
                            ) : (
                                <li>
                                    <a href="https://profitbreeze.onrender.com/api/auth/google/login">
                                        <button type="button" className="text-cornflowerblue bg-white hover:shadow-md focus:ring-4 focus:outline-none focus:ring-cornflowerblue/50 font-roboto rounded-lg px-3 py-2 text-center inline-flex items-center" title="Sign in with Google">
                                            <svg className="w-6 h-6" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                                            </svg>
                                            <span className="ml-2">Sign in with Google</span>
                                        </button>
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </header>
            <section className="mt-12 pt-12 bg-offwhite max-w-7xl mx-auto flex flex-wrap md:flex-nowrap items-center">
                <div className="flex-1 px-4 sm:px-6 text-center md:text-left md:px-8 lg:px-12">
                    <h1 className="text-xl font-roboto sm:text-2xl md:text-4xl font-bold mb-4 text-cornflowerblue">ProfitBreeze provides profit calculators for popular re-selling websites like StockX and Goat.</h1>
                    <p className="text-base font-roboto sm:text-xl md:text-2xl text-darkcharcoal mb-4">Make the most from your sneakers.</p>
                    <Dropdown />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/2 lg:px-4">
                    <img src={Sneaker} alt="Descriptive Alt Text" className="w-full h-auto hidden md:block" style={{ maxHeight: '550px' }} />
                </div>
            </section>
            <section className="max-w-5xl mx-auto mt-12 px-4 py-12 bg-offwhite overflow-hidden">
                <div className="flex flex-col items-center mb-16 custom:flex-row">
                    <div className="flex justify-center items-center w-full custom:w-1/2 px-2 md:px-0 mb-6 md:mb-0"> 
                        <img src={Bullseye} alt="Accuracy" className="w-auto h-56 max-h-64 md:max-h-72 lg:max-h-80 object-contain" />
                    </div>
                    <div className="w-full custom:w-1/2 px-6">
                        <h2 className="font-semibold mb-2 text-xl sm:text-2xl sm:pt-20 md:pt-4 md:text-3xl font-roboto text-cornflowerblue">Accuracy</h2>
                        <p className="mt-3 sm:text-xl sm:pt-1 md:text-2xl text-darkcharcoal font-roboto">Our calculators utilize location and exchange rates, so you can get an accurate profit calculation anywhere in the world.</p>
                    </div>
                </div>
                <div className="flex flex-col-reverse items-center mb-16 custom:flex-row">
                    <div className="w-full custom:w-1/2 px-6">
                        <h2 className="font-semibold mb-2 text-xl sm:text-2xl sm:pt-20 md:pt-4 md:text-3xl font-roboto text-cornflowerblue">Save Time</h2>
                        <p className="mt-3 sm:text-xl md:text-2xl text-darkcharcoal font-roboto">Our AI chatbot can answer any questions you have about the calculators. Ask for help if you are stuck. Don't be shy!</p>
                    </div>
                    <div className="flex justify-center items-center w-full custom:w-1/2 px-2 md:px-0 mb-6 md:mb-0"> 
                        <img src={SaveTime} alt="Save Time" className="w-auto h-56 max-h-64 md:max-h-72 lg:max-h-80 object-contain" />
                    </div>
                </div>
                <div className="flex flex-col items-center mb-16 custom:flex-row">
                    <div className="flex justify-center items-center w-full custom:w-1/2 px-2 md:px-0 mb-6 md:mb-0">
                        <img src={Settings} alt="Convenience" className="w-auto h-56 max-h-64 md:max-h-72 lg:max-h-80 object-contain" />
                    </div>
                    <div className="w-full custom:w-1/2 px-6">
                        <h2 className="font-semibold mb-2 text-xl sm:text-2xl sm:pt-20 md:pt-4 md:text-3xl font-roboto text-cornflowerblue">Convenience</h2>
                        <p className="mt-3 sm:text-xl sm:pt-1 md:text-2xl text-darkcharcoal font-roboto">Don't worry about remembering your seller settings! Log in with your Google account, and we'll handle it for you.</p>
                    </div>
                </div>
            </section>
            <section className="max-w-full bg-cornflowerblue text-center mt-8 py-14 px-12">
                <div className="text-xl sm:text-2xl md:text-3xl text-white font-semibold font-roboto text-center">GOAT and StockX adjust fees by location and seller level. Optimize our calculators to maximize your profits.</div>
            </section>
            <section>
                <FAQ />
            </section>
            <Chatbot></Chatbot>
        </div>
    );
};

export default Homepage;

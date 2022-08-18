// Modules
import React, { createContext, useState, useEffect } from 'react';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';

// AWS
import Amplify from 'aws-amplify';
import { AmplifyProvider, View } from '@aws-amplify/ui-react'; //! AmplifyProvider is the Theming Wrapper
import '@aws-amplify/ui-react/styles.css';

// CSS
import '@aws-amplify/ui-react/styles.css';
import '@fontsource/inter/variable.css';
import './styles/app.scss';

// Components
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import NotFound from './components/404/NotFound';

export const UserContext = createContext({});

const viewAttributes = {
    as: 'div',
    className: 'app',
};

const App = () => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        console.log('From App: currentUser...', currentUser);
    }, [currentUser]);

    return (
        <AmplifyProvider>
            <View {...viewAttributes}>
                <UserContext.Provider value={{ currentUser, setCurrentUser }}>
                    <MemoryRouter>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Login
                                        currentUser={currentUser}
                                        setCurrentUser={setCurrentUser}
                                    />
                                }
                            />
                            <Route
                                path="/dashboard"
                                element={
                                    currentUser !== {} ? (
                                        <Dashboard
                                            setCurrentUser={setCurrentUser}
                                        />
                                    ) : (
                                        <Navigate replace to="/" />
                                    )
                                }
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </MemoryRouter>
                </UserContext.Provider>
            </View>
        </AmplifyProvider>
    );
};

export default App;

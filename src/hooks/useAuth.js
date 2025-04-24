import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('currentUser');
        return stored ? JSON.parse(stored) : null;
    });

    const register = ({ username, password }) => {
        const raw   = localStorage.getItem('users') || '{}';
        const users = JSON.parse(raw);
        if (users[username]) {
            throw new Error('Username already exists');
        }
        users[username] = { password, membership: 'basic' };
        localStorage.setItem('users', JSON.stringify(users));
    };

    const login = ({ username, password }) => {
        const raw   = localStorage.getItem('users') || '{}';
        const users = JSON.parse(raw);
        const record = users[username];
        if (!record || record.password !== password) {
            throw new Error('Invalid credentials');
        }
        const u = { username, membership: record.membership };
        localStorage.setItem('currentUser', JSON.stringify(u));
        setUser(u);
    };

    const logout = () => {
        localStorage.removeItem('currentUser');
        setUser(null);
    };

    const deleteAccount = () => {
        if (!user) return;
        const username = user.username;

        const raw   = localStorage.getItem('users') || '{}';
        const users = JSON.parse(raw);
        delete users[username];
        localStorage.setItem('users', JSON.stringify(users));

        localStorage.removeItem(`studySets_${username}`);

        logout();
    };

    const subscribe = () => {
        if (!user) throw new Error('No user signed in');
        const username = user.username;

        const raw   = localStorage.getItem('users') || '{}';
        const users = JSON.parse(raw);
        const record = users[username];
        if (!record) throw new Error('User record missing');
        record.membership = 'premium';
        users[username] = record;
        localStorage.setItem('users', JSON.stringify(users));

        const u = { username, membership: 'premium' };
        localStorage.setItem('currentUser', JSON.stringify(u));
        setUser(u);
    };

    return (
        <AuthContext.Provider
            value={{ user, register, login, logout, deleteAccount, subscribe }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

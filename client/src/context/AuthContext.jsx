import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('saas_auth_token') || null);
  const [loading, setLoading] = useState(true);
  const [tokenHistory, setTokenHistory] = useState([]);

  // Fetch current user details on mount or token change
  useEffect(() => {
    async function fetchMe() {
      if (!token) {
        // Automatically provision demo user for friction-free initial load
        await loginWithDemo();
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setTokenHistory(data.token_history || []);
        } else {
          // Token expired or invalid
          localStorage.removeItem('saas_auth_token');
          setToken(null);
          await loginWithDemo();
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMe();
  }, [token]);

  // Demo Login (demo@manujbajaj.com / demo1234)
  const loginWithDemo = async () => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'demo@manujbajaj.com',
          password: 'demo1234'
        })
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('saas_auth_token', data.token);
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      }
    } catch (err) {
      console.error('Demo login error:', err);
    }
  };

  // Standard Login
  const login = async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');

    localStorage.setItem('saas_auth_token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  // Register
  const register = async (name, email, password, selectTrial = true) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, selectTrial })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');

    localStorage.setItem('saas_auth_token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('saas_auth_token');
    setToken(null);
    setUser(null);
  };

  // Update token balance in state immediately when deducted by backend
  const updateBalanceAfterGeneration = (newBalance, deduction, scenario) => {
    setUser(prev => prev ? { ...prev, token_balance: newBalance } : null);
    setTokenHistory(prev => [
      {
        id: Date.now(),
        amount: -deduction,
        reason: `Sales Intelligence Generation for "${scenario}"`,
        balance_after: newBalance,
        created_at: new Date().toISOString()
      },
      ...prev
    ]);
  };

  // Plan Upgrade / Checkout simulation
  const upgradePlan = async (planId) => {
    if (!token) throw new Error('You must be logged in to upgrade.');

    const res = await fetch('/api/billing/upgrade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ planId, paymentMethod: 'sandbox_instant' })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Upgrade failed');

    setUser(prev => prev ? {
      ...prev,
      plan: data.newPlan,
      token_balance: data.newBalance
    } : null);

    setTokenHistory(prev => [
      {
        id: Date.now(),
        amount: data.tokensAdded,
        reason: `Plan Upgrade: ${data.newPlan}`,
        balance_after: data.newBalance,
        created_at: new Date().toISOString()
      },
      ...prev
    ]);

    return data;
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      tokenHistory,
      login,
      register,
      loginWithDemo,
      logout,
      updateBalanceAfterGeneration,
      upgradePlan
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

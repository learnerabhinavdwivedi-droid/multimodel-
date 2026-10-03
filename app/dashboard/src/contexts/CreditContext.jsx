import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CreditContext = createContext(null);

export const CreditProvider = ({ children }) => {
  const { user } = useAuth();
  const [credits, setCredits] = useState(0);
  const [totalUsed, setTotalUsed] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (user) {
      const storedData = localStorage.getItem(`credits_${user.id}`);
      if (storedData) {
        const parsed = JSON.parse(storedData);
        setCredits(parsed.credits);
        setTotalUsed(parsed.totalUsed);
        setHistory(parsed.history || []);
      } else {
        const initialCredits = user.plan === 'pro' ? 500 : 50;
        setCredits(initialCredits);
        setTotalUsed(0);
        setHistory([{
          id: Date.now().toString(),
          action: 'add',
          amount: initialCredits,
          timestamp: new Date().toISOString(),
          description: 'Initial plan credits'
        }]);
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`credits_${user.id}`, JSON.stringify({ credits, totalUsed, history }));
    }
  }, [credits, totalUsed, history, user]);

  const useCredit = (amount, description) => {
    if (credits >= amount) {
      setCredits(prev => prev - amount);
      setTotalUsed(prev => prev + amount);
      setHistory(prev => [{
        id: Date.now().toString(),
        action: 'use',
        amount,
        timestamp: new Date().toISOString(),
        description
      }, ...prev]);
      return true;
    }
    return false;
  };

  const addCredits = (amount, description) => {
    setCredits(prev => prev + amount);
    setHistory(prev => [{
      id: Date.now().toString(),
      action: 'add',
      amount,
      timestamp: new Date().toISOString(),
      description
    }, ...prev]);
  };

  const getBalance = () => credits;

  return (
    <CreditContext.Provider value={{ credits, totalUsed, history, useCredit, addCredits, getBalance }}>
      {children}
    </CreditContext.Provider>
  );
};

export const useCredits = () => {
  const context = useContext(CreditContext);
  if (!context) {
    throw new Error('useCredits must be used within a CreditProvider');
  }
  return context;
};

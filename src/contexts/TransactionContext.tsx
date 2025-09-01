import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  account: string;
  type: 'Credit' | 'Debit';
  amount: string;
  status: 'Completed' | 'Pending' | 'Cancelled';
  memberName?: string;
  serviceId?: string;
  serviceName?: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  getServiceTransactions: (serviceId: string) => Transaction[];
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

// Initial mock data including service transactions
const initialTransactions: Transaction[] = [
  { 
    id: "TXN-001", 
    date: "2024-12-26", 
    description: "Member Deposit - Juan Dela Cruz", 
    account: "Savings Account", 
    type: "Credit", 
    amount: "₱5,000.00",
    status: "Completed"
  },
  { 
    id: "TXN-002", 
    date: "2024-12-26", 
    description: "Office Supplies Purchase", 
    account: "Office Expenses", 
    type: "Debit", 
    amount: "₱2,500.00",
    status: "Completed"
  },
  { 
    id: "TXN-003", 
    date: "2024-12-25", 
    description: "Loan Interest Payment", 
    account: "Interest Income", 
    type: "Credit", 
    amount: "₱1,200.00",
    status: "Pending"
  },
  { 
    id: "TXN-004", 
    date: "2024-12-25", 
    description: "Member Withdrawal - Maria Santos", 
    account: "Savings Account", 
    type: "Debit", 
    amount: "₱3,000.00",
    status: "Completed"
  },
  // Service transactions
  {
    id: "TXN-005",
    date: "2024-12-26",
    description: "Loan Processing Fee",
    account: "Service Revenue",
    type: "Credit",
    amount: "₱500.00",
    status: "Completed",
    memberName: "Juan Dela Cruz",
    serviceId: "1",
    serviceName: "Personal Loan"
  },
  {
    id: "TXN-006",
    date: "2024-12-25",
    description: "Rice Milling Service",
    account: "Service Revenue",
    type: "Credit",
    amount: "₱200.00",
    status: "Pending",
    memberName: "Maria Santos",
    serviceId: "2",
    serviceName: "Rice Milling"
  }
];

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `TXN-${String(transactions.length + 1).padStart(3, '0')}`
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const getServiceTransactions = (serviceId: string) => {
    return transactions.filter(tx => tx.serviceId === serviceId);
  };

  return (
    <TransactionContext.Provider value={{
      transactions,
      addTransaction,
      getServiceTransactions
    }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}
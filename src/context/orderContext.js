import { useContext, createContext, useState } from 'react';

const OrderContext = createContext();

export const useOrderContext = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState({})

    const value = {
        orders,
        setOrders
    };

    return (
    <OrderContext.Provider value={value}>
    {children}
    </OrderContext.Provider>
    );
};

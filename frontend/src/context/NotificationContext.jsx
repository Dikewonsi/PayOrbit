import { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export function NotificationProvider({ children }) {
    const [notification, setNotification] = useState(null);

    const showNotification = (type, message) => {
        setNotification({type, message});

        setTimeout(() => {
            setNotification(null);
        }, 5000);
    };
    
    return (
        <NotificationContext.Provider value={{ showNotification}}>
            {children}

            {notification && (
                <div className={`alert alert-${notification.type === 'success' ? 'success' : 'danger'} position-fixed top-0 end-0 m-3`}>
                    {notification.message}
                </div>
            )}
        </NotificationContext.Provider>
    );
}
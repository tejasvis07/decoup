import React, { createContext, useContext, useState } from 'react';

const CouponsContext = createContext();

export const CouponsProvider = ({ children }) => {
    const [coupons, setCoupons] = useState({});

    const getCouponsByMerchant = (merchant) => {
        return coupons[merchant] || [];
    };

    const addCoupons = (merchant, newCoupons) => {
        setCoupons(prevCoupons => ({
            ...prevCoupons,
            [merchant]: newCoupons
        }));
    };

    return (
        <CouponsContext.Provider value={{ getCouponsByMerchant, addCoupons }}>
            {children}
        </CouponsContext.Provider>
    );
};

export const useCoupons = () => {
    return useContext(CouponsContext);
};

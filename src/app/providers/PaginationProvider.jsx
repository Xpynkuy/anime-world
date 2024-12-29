import React, { createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";


const PaginationContext = createContext();

export const usePagination = () => {
  return useContext(PaginationContext);
};

export const PaginationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useLocalStorage("currentPage", 1);
  const location = useLocation();

  useEffect(() => {
    const savePageForRoutes = ["/catalog", "/title"];
    const isMatchingRoute = savePageForRoutes.some((route) =>
      location.pathname.startsWith(route)
    );

    if (!isMatchingRoute) {
      setCurrentPage(1); // Сбрасываем страницу, если маршрут не соответствует
    }
  }, [location.pathname, setCurrentPage]);

  return (
    <PaginationContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PaginationContext.Provider>
  );
};


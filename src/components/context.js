import { createContext, useContext } from "react";

export const MiguelContext = createContext(null);
export const useMiguelContext = () => useContext(MiguelContext);

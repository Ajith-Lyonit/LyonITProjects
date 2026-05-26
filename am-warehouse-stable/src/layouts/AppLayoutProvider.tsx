import { createContext, useContext, useMemo } from "react";
import { useWindowDimensions } from "react-native";
import { Appsettings } from "./AppSettings";

type LayoutContextType = {
  isDesktop: boolean;
  appConf: Appsettings;
};

const LayoutContext = createContext<LayoutContextType | null>(null);

export const useLayout = () => {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error("useLayout must be used inside AppLayoutProvider");
  }

  return context;
};

export const AppLayoutProvider = ({ children }: any) => {
  const { width } = useWindowDimensions();

  const isDesktop = width >= 800;

  const appConf = useMemo(() => new Appsettings(), []);

  return (
    <LayoutContext.Provider value={{ isDesktop, appConf }}>
      {children}
    </LayoutContext.Provider>
  );
};
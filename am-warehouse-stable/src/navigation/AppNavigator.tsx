import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useWindowDimensions } from "react-native";
import DesktopStack from "../layouts/DesktopStack";
import MobileStack from "../layouts/MobileStack";
import { AppLayoutProvider } from "../layouts/AppLayoutProvider";

const PERSISTENCE_KEY = "NAVIGATION_STATE_V1";

const linking = {
  prefixes: ["http://localhost:8081", "http://localhost:8082"],
  config: {
    screens: {
      dashboard: "dashboard",
      production: "production",
      planning: "planning",
      rmplanning: "rmplanning",
      jobcard: "jobcard",
      labelprinting: "labelprinting",
      fgtransfer: "fgtransfer",
      sterile: "sterile",
      bom: "bom",
      steriledocument: 'steriledocument',
      transferdocument:'transferdocument',
      createuser: 'createuser'
    },
  },
};

export default function AppNavigator({ onLogout, initialRoute = "production" }: any) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 800;

  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState<any>(undefined);

  useEffect(() => {
    const loadState = async () => {
      try {
        const savedState = await AsyncStorage.getItem(PERSISTENCE_KEY);

        if (savedState) {
          setInitialState(JSON.parse(savedState));
        }
      } catch (e) {
        console.log("Navigation state load failed");
      } finally {
        setIsReady(true);
      }
    };

    loadState();
  }, []);

  if (!isReady) return null;

  return (
    <AppLayoutProvider>
      <NavigationContainer linking={linking}>
        {isDesktop ? (
          <DesktopStack
            onLogout={onLogout}
            initialRoute={initialRoute}
          />
        ) : (
          <MobileStack
            onLogout={onLogout}
            initialRoute={initialRoute}
          />
        )}
      </NavigationContainer>
    </AppLayoutProvider>
  );
}
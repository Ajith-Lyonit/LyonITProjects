import { useEffect, useState, useCallback } from "react";
import { View } from "react-native";

import {
  Provider as PaperProvider,
  Portal,
} from "react-native-paper";

import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

import { theme } from "./src/theme/theme";
import AppNavigator from "./src/navigation/AppNavigator";
import Login from "./src/screens/Login/LoginScreen";
import Splash from "./src/screens/Splash/Splash";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const token = await AsyncStorage.getItem("USER_TOKEN");

        if (token) {
          setIsLoggedIn(true);
        }

        await new Promise((res) => setTimeout(res, 500));
      } catch (e) {
        console.log("Init error", e);
      } finally {
        setAppReady(true);
      }
    };

    init();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("USER_TOKEN");
    setIsLoggedIn(false);
  };

  const onLayout = useCallback(async () => {
    if (appReady) {
      await SplashScreen.hideAsync();
    }
  }, [appReady]);

  return (
    <PaperProvider theme={theme}>
      <Portal.Host>
        <View
          style={{ flex: 1 }}
          onLayout={onLayout}
        >
          {!appReady || showSplash ? (
            <Splash onFinish={() => setShowSplash(false)} />
          ) : isLoggedIn ? (
            <AppNavigator
              onLogout={handleLogout}
              initialRoute="production"
            />
          ) : (
            <Login onLogin={() => setIsLoggedIn(true)} />
          )}

          <Toast />
        </View>
      </Portal.Host>
    </PaperProvider>
  );
}
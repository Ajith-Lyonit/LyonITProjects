import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import { TextInput } from "react-native-paper";
import AMButton from "../../components/custom/AMbutton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export default function Login({ onLogin }: any) {
  const { width } = useWindowDimensions();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isDesktop = width >= 800;

  const handleLogin = () => {
    if (username && password) {
      AsyncStorage.setItem("USER_TOKEN", "dummy");
      onLogin();
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Logged in successfully",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Login",
        text2: "Invalid credentials",
      });
    }
  };

  const topHeight = isDesktop ? 260 : 140;
  const logoSize = isDesktop ? 140 : 100;

  return (
    <View style={styles.container}>
      <View style={[styles.topWrapper, { height: topHeight }]}>
        <Image
          source={require("../../../assets/splash/deskarcup.png")}
          style={styles.topImage}
          resizeMode={isDesktop ? "contain" : "cover"}
        />
        <View style={styles.titleOverlay}>
          <Text style={styles.title}>Bapuji Surgicals</Text>
        </View>
      </View>

      <View style={styles.center}>
        <Text style={styles.loginTitle}>Login</Text>

        <Text style={styles.label}>Username</Text>
        <TextInput
          mode="outlined"
          placeholder="Enter username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.label}>Password</Text>

        <TextInput
          mode="outlined"
          placeholder="Enter password"
          secureTextEntry={!showPassword}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />

        <Text style={styles.forgot}>Forgot Password</Text>

        <AMButton title="Login" onPress={handleLogin} />
      </View>

      <View style={styles.logoWrapper}>
        <Image
          source={require("../../../assets/logo.png")}
          style={{ width: logoSize, height: logoSize }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },

  /* TOP IMAGE */
  topWrapper: {
    width: "100%",
    position: "relative",
  },

  topImage: {
    width: "100%",
    height: "100%",
  },

  titleOverlay: {
    position: "absolute",
    top: "27%",
    left: 0,
    right: 0,
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "600", // fixed
  },

  /* FORM */
  center: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    paddingHorizontal: 20,
  },

  loginTitle: {
    fontSize: 24,
    color: "#02B6B6",
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },

  label: {
    fontSize: 14,
    color: "#222",
    marginBottom: 4,
  },

  input: {
    height: 44,
    marginBottom: 16,
  },

  forgot: {
    textAlign: "right",
    marginBottom: 20,
    textDecorationLine: "underline",
  },

  /* LOGO */
  logoWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
});
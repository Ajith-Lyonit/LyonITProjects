import { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";

export default function Splash({ onFinish }: any) {
  const { width } = useWindowDimensions();

  const isDesktop = width >= 800;

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const topHeight = isDesktop ? 260 : 120;
  const bottomHeight = isDesktop ? 200 : 120;
  const logoSize = isDesktop ? 160 : 110;

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={[styles.topWrapper, { height: topHeight }]}>
          <Image
            source={require("../../../assets/splash/deskarcup.png")}
            style={styles.image}
            resizeMode={isDesktop ? "contain" : "cover"}
          />
          <View style={styles.titleOverlay}>
            <Text style={styles.title}>Bapuji Surgicals</Text>
          </View>
        </View>
        <View style={styles.center}>
          <Image
            source={require("../../../assets/logo.png")}
            style={{ width: logoSize, height: logoSize }}
            resizeMode="contain"
          />
        </View>
        <View style={[styles.bottomWrapper, { height: bottomHeight }]}>
          <Image
            source={require("../../../assets/splash/deskarcbel.png")}
            style={styles.image}
            resizeMode={isDesktop ? "contain" : "cover"}
          />
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  wrapper: {
    width: "100%",
    maxWidth: 1300,
    flex: 1,
    justifyContent: "space-between",
  },
  topWrapper: {
    width: "100%",
    position: "relative",
  },
  bottomWrapper: {
    width: "100%",
  },
  image: {
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
    fontWeight: "600",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
});
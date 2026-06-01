import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  Easing,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
} from "react-native";
import { Button, Drawer, IconButton } from "react-native-paper";
import { drawerMenus1, drawerMenus2 } from "../types/DrawerTypes";
import Toast from "react-native-toast-message";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

type Props = {
  visible: boolean;
  onClose: () => void;
  isDesktop: boolean;
  onLogout: () => void;
};

type RootStackParamList = {
  createuser: undefined;
};

type NavProps = NativeStackNavigationProp<RootStackParamList>;

export default function RightDrawer({ visible, onClose, isDesktop, onLogout }: Props) {
  const navigation = useNavigation<NavProps>();
  const slideAnim = useRef(new Animated.Value(-width)).current;
  const [render, setRender] = useState(visible);

  useEffect(() => {
    if (visible) {
      setRender(true);

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 300,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(() => {
        setRender(false);
      });
    }
  }, [visible]);

  if (!render) return null;

  return (
    <View style={styles.overlay}>
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX: slideAnim }],
            width: isDesktop ? width * 0.4 : width * 0.65
          },
        ]}
        pointerEvents="auto"
      >
        <View style={styles.header}>
          <IconButton
            icon="close"
            iconColor="#fff"
            size={20}
            onPress={onClose}
            style={styles.closeBtn}
          />
          <View style={styles.headercirlce}>
            <Image style={{ width: 110, height: 110 }} source={require("../../assets/pro.png")} />
          </View>
          <Text style={styles.profiletext}>Xxxxx xxxxxx</Text>
          <Text style={styles.profiletext}>Employee ID : Xxxxxxx</Text>
          <Text style={styles.profiletext}>Department : Xxxxxxxx</Text>
          <Text style={styles.profiletext}>Location</Text>
        </View>

        {/* Menu */}
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="handled">
            <View style={styles.content}>
              <Drawer.Section>
                {drawerMenus1.map((item, index) => (
                  <Drawer.Item
                    key={index}
                    icon={item.image}
                    label={item.title}
                    onPress={() => { }}
                  />
                ))}
              </Drawer.Section>

              <Drawer.Section>
                {drawerMenus2.map((item, index) => (
                  <Drawer.Item
                    key={index}
                    icon={item.image}
                    label={item.title}
                    onPress={() => {
                      switch (item.action) {
                        case "logout":
                          onClose();
                          onLogout();
                          Toast.show({
                            type: "success",
                            text1: "Logout",
                            text2: "You have been logged out",
                          });
                          break;
                        case "settings":
                          console.log("Go to Settings");
                          break;
                        case "change_password":
                          console.log("Go to Change Password");
                          break;
                        case "contact":
                          console.log("Go to Contact Us");
                          break;
                        case "help":
                          console.log("Go to Help");
                          break;
                        default:
                          console.log("Unknown action:", item.action);
                      }
                    }}
                  />
                ))}
              </Drawer.Section>
            </View>

            <Button
              buttonColor="#02B6B6"
              style={{ width: "50%", margin: 10 }}
              icon="plus"
              mode="contained"
              onPress={() => {
                onClose();

                navigation.navigate("createuser");
              }}
            >
              Add User
            </Button>
          </ScrollView>
        </View>
      </Animated.View>

      {/* Backdrop */}
      <TouchableOpacity onPress={onClose} activeOpacity={1} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    elevation: 10,
  },
  profiletext: {
    color: '#fff'
  },
  drawer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#fff",
    elevation: 5,
  },
  header: {
    padding: 20,
    backgroundColor: "#02B6B6",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  headercirlce: {
    height: 130,
    width: 130,
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#fff",
    borderRadius: 65,
    overflow: "visible",
  },
  closeBtn: {
    margin: 0,
    position: 'absolute',
    right: 10,
    top: 40
  },
  content: {
    flex: 1,
  },
});
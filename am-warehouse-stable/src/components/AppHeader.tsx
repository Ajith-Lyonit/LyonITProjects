import React, { useState } from "react";
import { View, Image, Text, Dimensions, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import RightDrawer from "./AppDrawer";

const { width, height } = Dimensions.get("window");


const horizontalPadding = Math.min(20);

const logoSize = Math.min(width * 0.18, 80);

const isDesktop = width >= 800;

export default function AppHeader({ onLogout }: any) {
    const [drawerVisible, setDrawerVisible] = useState(false);
    return (
        <>
            <View style={styles.container}>
                <Image
                    source={require("../../assets/dot.png")}
                    style={styles.dots}
                    resizeMode="cover"
                />
                <View
                    style={{
                        position: "absolute",
                        top: 30,
                        left: horizontalPadding,
                        right: horizontalPadding,
                        zIndex: 4,
                    }}
                >
                    <Image
                        source={require("../../assets/logo.png")}
                        style={{
                            width: logoSize,
                            height: logoSize,
                        }}
                        resizeMode="contain"
                    />
                </View>
                <Image
                    source={require("../../assets/arc.png")}
                    style={styles.arc}
                    resizeMode="stretch"
                />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>LynQ-Production</Text>
                    <View style={{ flexDirection: 'row', position: 'absolute', right: 0 }}>
                        <IconButton iconColor="#02B6B6" icon={'bell-badge-outline'} size={20} />
                        <IconButton
                            icon="account"
                            size={20}
                            onPress={() => setDrawerVisible(true)}
                        />
                    </View>
                </View>
            </View>
            <RightDrawer
                onLogout={onLogout}
                isDesktop={isDesktop}
                visible={drawerVisible}
                onClose={() => setDrawerVisible(false)}
            />
        </>
    );
}

const scale = Math.min(width / 375, 1);

const styles = StyleSheet.create({
    container: {
        height: 140 * scale,
        backgroundColor: "#fff",
        zIndex: 3,
    },
    dots: {
        position: "absolute",
        height: 150 * scale,
        opacity: 1,
        zIndex: 1,
        width: '100%',
        backgroundColor: '#fff'
    },
    arc: {
        position: "absolute",
        width: width,
        top: height * 0.07,
        height: 120 * scale,
        zIndex: 1,
    },

    headerContent: {
        position: "absolute",
        top: height * 0.05,
        left: 16,
        right: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 3,
    },

    logo: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#1AA7A1",
    },

    icons: {
        flexDirection: "row",
        gap: 12,
    },

    titleContainer: {
        position: "absolute",
        top: height * 0.12,
        width: "100%",
        alignItems: "center",
        padding: 10,
        zIndex: 3,
    },

    title: {
        fontSize: 22,
        fontWeight: "600",
        color: "#1AA7A1",
    },

    subtitle: {
        fontSize: 18,
        marginTop: 6,
    },
});
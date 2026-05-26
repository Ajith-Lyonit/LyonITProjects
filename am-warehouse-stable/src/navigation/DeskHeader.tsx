import { Appbar, IconButton, TouchableRipple } from "react-native-paper";
import { Image, Text, useWindowDimensions, View } from "react-native";
import { useState } from "react";

export default function DeskHeader({ onMenuClick }: { onMenuClick: () => void }) {
    const [index, setIndex] = useState(0);
    const { width } = useWindowDimensions();
    const isDesktop = width >= 800;

    const routes = [
        {
            key: "production",
            title: "Home",
            focusedIcon: "home-outline",
            mobileVisible: true,
            desktopVisible: true,
        },
        {
            key: "dashboard",
            title: "Dash Boards",
            focusedIcon: "chart-line",
            mobileVisible: true,
            desktopVisible: true,
        },
        {
            key: "inventory",
            title: "Inventory",
            focusedIcon: "chart-line",
            mobileVisible: true,
            desktopVisible: true,
        },
        {
            key: "reports",
            title: "Reports",
            focusedIcon: "clipboard-text-clock-outline",
            mobileVisible: true,
            desktopVisible: true,
        },
        {
            key: "sync",
            title: "Sync",
            focusedIcon: "refresh",
            mobileVisible: true,
            desktopVisible: true,
        },
        {
            key: "menu",
            title: "Menu",
            focusedIcon: "menu",
            mobileVisible: true,
            desktopVisible: false,
        },
    ];

    const visibleRoutes = routes.filter(route =>
        isDesktop ? route.desktopVisible : route.mobileVisible
    );

    return (
        <View>
            <Appbar.Header
                style={{
                    backgroundColor: "#fff",
                    paddingHorizontal: 60,
                    paddingVertical: 10,
                    elevation: 1,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.15,
                    shadowRadius: 4,
                    borderBottomWidth: 10,
                    borderBottomColor: "#02B6B6",
                }}
            >
                <Image
                    source={require("../../assets/dot.png")}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: 500,
                        height: "100%",
                    }}
                    resizeMode="cover"
                />
                <Image
                    source={require("../../assets/logo.png")}
                    style={{ width: 100, height: 50 }}
                    resizeMode="contain"
                />
                <View style={{ flex: 1 }} />
                {visibleRoutes.map((route, i) => (
                    <TouchableRipple
                        key={route.key}
                        onPress={() => setIndex(i)}
                        style={{ borderRadius: 5 }}
                    >
                        <Text
                            style={{
                                marginHorizontal: 10,
                                paddingVertical: 5,
                                fontSize: 16,
                                borderBottomWidth: index === i ? 1 : 0,
                                borderBottomColor: index === i ? '#02B6B6' : '#000',
                                color: index === i ? "#02B6B6" : "#000",
                                fontWeight: index === i ? "bold" : "normal",
                            }}
                        >
                            {route.title}
                        </Text>
                    </TouchableRipple>
                ))}
                <View style={{ flexDirection: 'row' }}>
                    <IconButton iconColor="#02B6B6" icon={'bell-badge-outline'} size={20} />
                    <IconButton
                        icon="account"
                        size={20}
                        onPress={onMenuClick}
                    />
                </View>
            </Appbar.Header>
        </View>
    );
}
import { BottomNavigation } from "react-native-paper";
import { useWindowDimensions, View } from "react-native";
import { useState } from "react";

export default function MainTabs() {
    const [index, setIndex] = useState(0);
    const { width } = useWindowDimensions();
    const isDesktop = width >= 800;

    const routes = [
        {
            key: "dashboard",
            title: "Home",
            focusedIcon: "home-outline",
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
            key: "refresh",
            title: "Refresh",
            focusedIcon: "refresh",
            mobileVisible: true,
            desktopVisible: false,
        },
        {
            key: "menu",
            title: "Menu",
            focusedIcon: "menu",
            mobileVisible: true,
            desktopVisible: false,
        },
    ];
    const renderScene = (key: string) => {
        switch (key) {
            case "dashboard":
                return null;
            case "inventory":
                return null;
            case "reports":
                return null;
            case "refresh":
                return null;
            case "menu":
                return null;
            default:
                return null;
        }
    };

    return (
        <View>
            <View>
                {renderScene(routes[index].key)}
            </View>
            {!isDesktop && (
                <BottomNavigation.Bar
                    navigationState={{ index, routes }}
                    onTabPress={({ route }) => {
                        const newIndex = routes.findIndex(r => r.key === route.key);
                        setIndex(newIndex);
                    }}
                    style={{ backgroundColor: '#000' }}
                    activeIndicatorStyle={{ backgroundColor: 'transparent' }}
                    activeColor="#fff"
                    inactiveColor="#02B6B6"
                />
            )}
        </View>
    );
}
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import AppHeader from "../components/AppHeader";
import MainTabs from "../navigation/MainTabs";

export default function MobileLayout({onLogout, children, scroll = true }: any) {
    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.container}>
                <AppHeader onLogout={onLogout} />

                {scroll ? (
                    <ScrollView
                        style={styles.content}
                        contentContainerStyle={styles.contentContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        {children}
                    </ScrollView>
                ) : (
                    <View style={[styles.content, { flex: 1 }]}>
                        {children}
                    </View>
                )}

                <MainTabs />
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: "#fff",
    },

    container: {
        flex: 1,
    },

    content: {
        flex: 1,
        paddingTop:15,
        paddingHorizontal:10
    },

    contentContainer: {
        paddingBottom: 80, // prevents overlap with tabs
    },

    tabs: {
        height: 60,
    },
});
import { View, Platform, ScrollView } from "react-native";
import RMFilter from "../../components/RMPlanning/RMFilter";

export default function RMPlanning() {
    if (Platform.OS === "web") {
        return (
            <View style={{ padding: 10, paddingBottom: 40, minHeight: "100%" }}>
                <RMFilter />
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ padding: 10, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                <RMFilter />
            </ScrollView>
        </View>
    );
}
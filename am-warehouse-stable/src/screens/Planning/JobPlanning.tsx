import { View, Platform, ScrollView } from "react-native";
import JobFilter from "../../components/JobPlanning/Jobfilter";

export default function JobPlanning() {
    if (Platform.OS === "web") {
        return (
            <View style={{ padding: 10, paddingBottom: 40, minHeight: "100%" }}>
                <JobFilter />
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
                <JobFilter />
            </ScrollView>
        </View>
    );
}
import { ScrollView, View } from "react-native";
import JobCardFilter from "../../components/JobCard/JobCardFilter";
import AMBreadcrumb from "../../components/custom/AMBreadcrumb";

export default function JobCard() {
    return (
        <View>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ padding: 10, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                <JobCardFilter />
            </ScrollView>
        </View>
    );
}

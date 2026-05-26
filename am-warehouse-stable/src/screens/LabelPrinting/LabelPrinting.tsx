import { ScrollView, View } from "react-native";
import LabelFilter from "../../components/LabelPrinting/LabelFilter";
import AMBreadcrumb from "../../components/custom/AMBreadcrumb";

export default function LabelPrinting() {
    return (
        <View>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ padding: 10, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                <LabelFilter />
            </ScrollView>
        </View>
    );
}

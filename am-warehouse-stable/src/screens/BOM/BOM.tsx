import { ScrollView, View } from "react-native";
import BOMFilter from "../../components/BOM/BOMFilter";
export default function BOM() {
    return (
        <View>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ padding: 10, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                <BOMFilter />
            </ScrollView>
        </View>
    );
}

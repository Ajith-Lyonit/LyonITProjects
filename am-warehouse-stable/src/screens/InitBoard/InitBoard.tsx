import { ScrollView, View } from "react-native";
import InitBoardFilters from "../../components/InitBoard/InitBoardFilter";
export default function InitBoard() {
    return (
        <View>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ padding: 10, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                <InitBoardFilters />
            </ScrollView>
        </View>
    );
}

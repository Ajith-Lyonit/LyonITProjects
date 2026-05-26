import { ScrollView, View } from "react-native";
import FGTransferFilter from "../../components/FGTransfer/FGTransferFilter";

export default function FGTransfer() {
    return (
        <View>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ padding: 10, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                <FGTransferFilter />
            </ScrollView>
        </View>
    );
}

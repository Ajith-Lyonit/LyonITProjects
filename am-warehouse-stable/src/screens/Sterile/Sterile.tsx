import { ScrollView, View } from "react-native";
import SterileFilter from "../../components/Sterile/SterileFilter";
export default function Sterile() {
    return (
        <View>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ padding: 10, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                <SterileFilter />
            </ScrollView>
        </View>
    );
}

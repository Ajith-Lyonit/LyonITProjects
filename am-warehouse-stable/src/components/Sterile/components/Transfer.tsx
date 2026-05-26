import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AMAutoComplete from "../../custom/AMAutocomplete";
import { options } from "../../../types/TestValue";
import { useState } from "react";
import { RootStackParamList } from "../../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
type NavProps = NativeStackNavigationProp<RootStackParamList>;
export default function TransferCard() {
    const [value, setValue] = useState("")
    const navigation = useNavigation<NavProps>();
    return (
        <ScrollView
            style={styles.container}
            nestedScrollEnabled
            showsVerticalScrollIndicator
        >
            <View style={styles.tranferstrip}>
                <View style={styles.left}>
                    <Text>To Warehouse</Text>
                </View>

                <View style={styles.right}>
                    <AMAutoComplete
                        placeholder="Warehouse 1"
                        value={value}
                        list={options}
                        onChange={(val) => setValue(val)}
                    />
                </View>
            </View>
            <AMAutoComplete
                placeholder="ITR Document no"
                value={value}
                list={options}
                onChange={(val) => setValue(val)}
            />
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <TouchableOpacity key={item} style={styles.jobcard} onPress={() =>
                    navigation.navigate("transferdocument", { docNo: "2229 1036 6575" })
                }>
                    <View style={styles.row}>
                        <Text>ITR No: 2229 1036 6575</Text>
                        <Text>16 Feb 2026</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>Transfer Qty : 250</Text>
                        <Text style={styles.partial}>Partially Receipt</Text>
                    </View>

                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    tranferstrip: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 20
    },

    left: {
        flex: 5,
    },

    right: {
        flex: 7,
    },
    container: {
        flexDirection: "column",
        elevation: 4,
    },
    title: {
        fontWeight: "bold",
        fontSize: 14,
    },
    jobcard: {
        paddingHorizontal: 12,
        paddingVertical: 15,
        marginVertical: 10,
        borderBottomWidth: 1,
        borderColor: "#CECECE",
        gap: 6,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    partial: {
        color: "#E67E22",
        fontWeight: "600",
    },
});
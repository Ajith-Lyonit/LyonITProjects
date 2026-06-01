import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AMAutoComplete from "../../custom/AMAutocomplete";
import { newoptions, options } from "../../../types/TestValue";
import { useState } from "react";
import { RootStackParamList } from "../../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import AMExpoAutocomplete from "../../custom/AMExpoAutocomplete";
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
                    <AMExpoAutocomplete
                        placeholder="Warehouse 1"
                        data={newoptions}
                        onSelect={(val) => { }}
                    />
                </View>
            </View>
            <AMExpoAutocomplete
                placeholder="ITR Document no"
                data={newoptions}
                onSelect={(val) => { }}
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
            <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={{ flex: 4 }} />
                <View style={{ flex: 3, alignItems: "center" }}>
                    <TouchableOpacity style={[styles.btn, { width: "100%" }]} onPress={() => { }}>
                        <Text style={styles.btnText}>Transfer</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 4 }} />
            </View>
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
    btn: {
        backgroundColor: "#02B6B6",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
    },
    btnText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
    },
});
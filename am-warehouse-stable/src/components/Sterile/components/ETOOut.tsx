import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { etoincol, etoindata, newoptions, options } from "../../../types/TestValue";
import { useState } from "react";
import AMDatePicker from "../../custom/AMDatepicker";
import AMDataTable from "../../custom/AMDataTable";
import AMExpoAutocomplete from "../../custom/AMExpoAutocomplete";

type ETOOUtCardProps = {
    isDesktop: boolean
}

export default function ETOOUTCard({ isDesktop }: ETOOUtCardProps) {
    const [value, setValue] = useState({
        unit: "",
        shift: "",
        department: "",
        itemname: ""
    })
    const itemWidth = isDesktop ? "16.66%" : "33.33%";
    return (
        <ScrollView
            style={styles.container}
            nestedScrollEnabled
            showsVerticalScrollIndicator
        >
            <View style={styles.containereto}>

                <View style={[styles.item, { width: itemWidth }]}>
                    <AMExpoAutocomplete
                        placeholder="Bagalur B1"
                        data={newoptions}
                        onSelect={(val) => { }}
                    />
                </View>

                <View style={[styles.item, { width: itemWidth }]}>
                    <AMExpoAutocomplete
                        placeholder="Day Shift"
                        data={newoptions}
                        onSelect={(val) => { }}
                    />
                </View>

                <View style={[styles.item, { width: itemWidth }]}>
                    <AMExpoAutocomplete
                        placeholder="ETO Machine"
                        data={newoptions}
                        onSelect={(val) => { }}
                    />
                </View>

                <View style={[styles.item, { width: itemWidth }]}>
                    <AMDatePicker onChange={(val) => console.log(val)} />
                </View>

                <View style={[styles.item, { width: itemWidth }]}>
                    <AMDatePicker onChange={(val) => console.log(val)} />
                </View>

                <View style={[styles.item, { width: itemWidth }]}>
                    <AMExpoAutocomplete
                        placeholder="Item name"
                        data={newoptions}
                        onSelect={(val) => { }}
                    />
                </View>
            </View>
            <View style={{ marginVertical: 20 }}>
                <AMDataTable amCheckbox={true} columns={etoincol} data={etoindata} />
            </View>
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 4 }} />
                <View style={{ flex: 3, alignItems: "center" }}>
                    <TouchableOpacity style={[styles.btn, { width: "100%" }]} onPress={() => { }}>
                        <Text style={styles.btnText}>Update</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 4 }} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        elevation: 4,
    },
    containereto: {
        flexDirection: "row",
        flexWrap: "wrap",
    },

    item: {
        padding: 5,
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
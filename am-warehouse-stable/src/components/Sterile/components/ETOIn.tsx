import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AMAutoComplete from "../../custom/AMAutocomplete";
import { etoincol, etoindata, options } from "../../../types/TestValue";
import { useState } from "react";
import AMDatePicker from "../../custom/AMDatepicker";
import AMDataTable from "../../custom/AMDataTable";
import AMButton from "../../custom/AMbutton";
import { TextInput } from "react-native-paper";

type ETOINCardProps = {
    isDesktop: boolean
}

export default function ETOINCard({ isDesktop }: ETOINCardProps) {
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
                    <AMAutoComplete
                        placeholder="Bagalur B1"
                        value={value.unit}
                        list={options}
                        onChange={(val) => setValue(prev => ({ ...prev, unit: val }))}
                    />
                </View>

                <View style={[styles.item, { width: itemWidth }]}>
                    <AMAutoComplete
                        placeholder="Day Shift"
                        value={value.shift}
                        list={options}
                        onChange={(val) => setValue(prev => ({ ...prev, shift: val }))}
                    />
                </View>

                <View style={[styles.item, { width: itemWidth }]}>
                    <AMAutoComplete
                        placeholder="ETO Machine"
                        value={value.department}
                        list={options}
                        onChange={(val) => setValue(prev => ({ ...prev, department: val }))}
                    />
                </View>

                <View style={[styles.item, { width: itemWidth }]}>
                    <AMDatePicker onChange={(val) => console.log(val)} />
                </View>

                <View style={[styles.item, { width: itemWidth }]}>
                    <AMDatePicker onChange={(val) => console.log(val)} />
                </View>

                <View style={[styles.item, { width: itemWidth }]}>
                    <AMAutoComplete
                        placeholder="Item name"
                        value={value.itemname}
                        list={options}
                        onChange={(val) => setValue(prev => ({ ...prev, itemname: val }))}
                    />
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.itemset}>
                    <Text style={styles.label}>In Time</Text>
                    <TextInput style={styles.input} placeholder="HH:MM" />
                </View>
                <View style={styles.itemset}>
                    <Text style={styles.label}>Out Time</Text>
                    <TextInput style={styles.input} placeholder="HH:MM" />
                </View>
                <View style={styles.itemset}>
                    <Text style={styles.label}>Capacity</Text>
                    <Text style={styles.readonly}>100</Text>
                </View>
                <View style={styles.itemset}>
                    <Text style={styles.label}>Loaded</Text>
                    <Text style={styles.readonly}>80</Text>
                </View>
                <View style={styles.itemset}>
                    <Text style={styles.label}>Balance</Text>
                    <Text style={styles.readonly}>20</Text>
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
    row: {
        flexDirection: "row",
        alignItems: "flex-start",      // align tops of each column
        gap: 10,
        paddingVertical: 10,
    },
    itemset: {
        flex: 1,
        alignItems: "center",          // center label + value within each col
    },
    label: {
        fontSize: 12,
        color: "#666",
        marginBottom: 6,
        textAlign: "center",           // label centered like screenshot
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: "#fff",
        textAlign: "center",           // "00:00" centered in input
        width: "100%",                 // fill the flex col
    },
    readonly: {
        height: 40,
        borderRadius: 5,
        paddingHorizontal: 8,
        textAlignVertical: "center",
        textAlign: "center",           // numbers centered like screenshot
        fontSize: 14,
        width: "100%",
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
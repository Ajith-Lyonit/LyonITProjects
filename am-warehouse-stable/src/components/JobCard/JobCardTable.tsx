import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { cardcols, carddata, jobcardcols, jobcarddata } from "../../types/TestValue";
import AMDataTable from "../../components/custom/AMDataTable";
import AMBottomPopup from "../custom/AMPopup";
import { Appsettings } from "../../layouts/AppSettings";
import AMButton from "../custom/AMbutton";
import { useState } from "react";
import { TextInput } from "react-native-paper";
import AMDatePicker from "../custom/AMDatepicker";

type RMTablesProps = {
    isDesktop: boolean,
    appConf: Appsettings
}

export default function JobCardTables({ isDesktop, appConf }: RMTablesProps) {
    const [popupState, setPopupState] = useState({
        visible: false,
        view: "list",
        data: null as any,
    });
    return (
        <>
            <View style={[styles.container, { marginTop: 5, flexDirection: 'column' }]}>
                <View style={[styles.container, { marginTop: 5, flexDirection: 'column', marginBottom: 20 }]}>
                    <View>
                        <AMDataTable onPress={(row) => setPopupState({
                            visible: true,
                            view: 'list',
                            data: row
                        })} isDesktop={isDesktop} amCheckbox={true} data={jobcarddata} columns={jobcardcols} />
                    </View>
                </View>
                <AMBottomPopup onClose={() => setPopupState((prev) => ({
                    view: "list",
                    visible: false,
                    data: null
                }))} isDesktop={isDesktop} visible={popupState.visible} appConf={appConf}>
                    <View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Product Name</Text>

                            <Text style={styles.colon}>:</Text>

                            <Text style={styles.value}>
                                STR GAUZE SWAB 7.5CM X 7.5CM 12PLY 2PCS/PCH - SGSP007
                            </Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Product ID</Text>

                            <Text style={styles.colon}>:</Text>

                            <Text style={styles.value}>I00927</Text>
                        </View>
                        <View>
                            <Text style={{ fontWeight: 'bold', marginVertical: 5 }}>RM Consumption</Text>
                        </View>
                        <AMDataTable isDesktop={isDesktop} amCheckbox={false} data={carddata} columns={cardcols} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
                            <Text style={styles.textInner}>Planned Qty.</Text>
                            <Text style={styles.textInner}> 1,00,000</Text>
                            <Text style={styles.textInner}>Sterile</Text>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Completed Qty.</Text>
                                <TextInput style={styles.input} placeholder="" />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Batch No.</Text>
                                <TextInput style={styles.input} placeholder="" />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>MFG. Date</Text>
                                <AMDatePicker
                                    onChange={(val) => console.log(val)}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>EXP. Date</Text>
                                <AMDatePicker
                                    onChange={(val) => console.log(val)}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingVertical: 10, gap: 10 }}>
                            <Text style={styles.textInner}>Balanced to be produced:</Text>
                            <Text style={styles.textInner}>0</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{ width: isDesktop ? "30%" : '50%' }}>

                                <TouchableOpacity style={styles.btn} onPress={() =>
                                    setPopupState((prev) => ({
                                        data: null,
                                        view: "list",
                                        visible: false
                                    }))
                                }>
                                    <Text style={styles.btnText}>Update</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </AMBottomPopup>
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8,
    },
    item: {
        width: "32%",
        marginBottom: 12,
    },
    innerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8,
    },
    containerNest: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 30,
        marginTop: 10,
        marginBottom: 5,
    },
    innerItem: {
        width: "48%",
    },
    textInner: {
        fontWeight: 'medium',
        fontSize: 12
    }, row: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    inputContainer: {
        flex: 1,
        marginVertical: 10
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        backgroundColor: '#fff'
    },
    infoRow: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },

    label: {
        width: 120,
        fontWeight: "400",
    },

    colon: {
        marginRight: 8,
    },

    value: {
        flex: 1,
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
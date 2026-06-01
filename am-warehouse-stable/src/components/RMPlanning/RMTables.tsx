import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { newoptions, options, rmcols, rmdata, rmplancols, rmplandata } from "../../types/TestValue";
import AMDataTable from "../../components/custom/AMDataTable";
import AMBottomPopup from "../custom/AMPopup";
import { Appsettings } from "../../layouts/AppSettings";
import AMButton from "../custom/AMbutton";
import { useState } from "react";
import AMAutoComplete from "../custom/AMAutocomplete";
import { Checkbox } from "react-native-paper";
import AMExpoAutocomplete from "../custom/AMExpoAutocomplete";

type RMTablesProps = {
    isDesktop: boolean,
    appConf: Appsettings
}

export default function RMTables({ isDesktop, appConf }: RMTablesProps) {
    const [popupState, setPopupState] = useState({
        visible: false,
        view: "list",
        data: null as any,
    });
    const [search, setSearch] = useState("")
    const [checked, setChecked] = useState(false)
    return (
        <>
            <View style={[styles.container, { marginTop: 5, flexDirection: 'column' }]}>
                <View style={[styles.container, { marginTop: 5, flexDirection: 'column', marginBottom: 20 }]}>
                    <View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginBottom: 10,
                            }}
                        >
                            <Checkbox
                                color="#02B6B6"
                                status={checked ? "checked" : "unchecked"}
                                onPress={() => setChecked(!checked)}
                            />
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: "bold",
                                    flex: 1,
                                }}
                            >
                                Planning Doc. No.: 106741
                            </Text>
                        </View>
                        <AMDataTable isDesktop={isDesktop} amCheckbox={true} data={rmplandata} columns={rmplancols} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 15, fontWeight: "bold", flex: 1, marginBottom: 10 }}>RM Requirement</Text>
                        <AMDataTable showEditButton={true} onEdit={(row) => setPopupState((prev) => ({
                            visible: true, view: 'list', data: row
                        }))} groupBy="group" isDesktop={isDesktop} amCheckbox={true} data={rmdata} columns={rmcols} />
                    </View>
                </View>
                <View style={[styles.container, { paddingVertical: isDesktop ? 10 : 0 }]}>
                    <TouchableOpacity
                        style={[styles.btn, { width: isDesktop ? "30%" : "50%" }]}
                        onPress={() => setPopupState({ visible: true, view: "list", data: null })}
                    >
                        <Text style={styles.btnText}>Update</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.btn, { width: isDesktop ? "30%" : "50%" }]}
                        onPress={() => { }}
                    >
                        <Text style={styles.btnText}>Send RM Request</Text>
                    </TouchableOpacity>
                </View>
                <AMBottomPopup onClose={() => setPopupState((prev) => ({
                    view: "list",
                    visible: false,
                    data: null
                }))} isDesktop={isDesktop} visible={popupState.visible} appConf={appConf}>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ flex: 1 }} />
                        <View style={{ flex: 2 }}>
                            <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontWeight: 'bold' }}>RM Name</Text>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <Text>{popupState.data !== null && popupState.data.rmName}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontWeight: 'bold' }}>Product ID</Text>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <Text>I01252</Text>
                                </View>
                            </View>
                            <View style={{ paddingVertical: 10 }}>
                                <AMExpoAutocomplete
                                    placeholder="Product Name"
                                    onSelect={() => { }}
                                    data={newoptions}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontWeight: 'bold' }}>Alternate RM</Text>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <Text>I00928</Text>
                                </View>
                            </View>
                            <View style={{ paddingVertical: 16 }}>
                                <AMButton
                                    title="Update"
                                    onPress={() =>
                                        setPopupState(() => ({
                                            data: null,
                                            view: 'list',
                                            visible: false,
                                        }))
                                    }
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1 }} />
                    </View>
                </AMBottomPopup>
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-evenly",
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
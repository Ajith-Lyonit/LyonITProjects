import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { columns, data, newoptions, } from "../../types/TestValue";
import AMDataTable from "../../components/custom/AMDataTable";
import JobListCard from "../Production/JobList";
import { useLayout } from "../../layouts/AppLayoutProvider";
import AMBottomPopup from "../custom/AMPopup";
import AsPerSoCustomerWise from "./Aspersocustomerwise";
import AMAutoComplete from "../custom/AMAutocomplete";
import AMExpoAutocomplete from "../custom/AMExpoAutocomplete";

export default function AsPerMin() {
    const [value, setValue] = useState("");
    const [search, setSearch] = useState("");

    const { isDesktop, appConf } = useLayout()
    const [popupState, setPopupState] = useState({
        visible: false,
        view: "list",
        data: null as any,
    });
    return (
        <>
            <View style={[styles.container, { marginTop: 5, flexDirection: 'column' }]}>
                <View style={[styles.container, { marginTop: 5, flexDirection: 'column' }]}>
                    {/* <View style={{ width: '100%' }}>
                        <Text style={{ fontSize: 12, fontWeight: "bold", marginTop: 10, marginBottom: 5 }}>
                            STR GAUZE SWAB 7.5CM X 7.5CM 12PLY 2PCS/PCH - SGSP007
                        </Text>
                    </View> */}
                    <View style={{ width: "100%", flex: 1 }}>
                        <AMDataTable
                            amCheckbox={true}
                            columns={columns}
                            data={data}
                            onRowSelect={(selectedRows) => console.log(selectedRows)}
                        />
                    </View>
                </View>
                <View style={{ height: 340 }}>
                    <JobListCard onPress={() => setPopupState({ visible: true, view: "list", data: null })}></JobListCard>
                </View>
                <View style={[styles.container, { paddingVertical: isDesktop ? 10 : 0 }]}>
                    <TouchableOpacity
                        style={[styles.btn, { width: isDesktop ? "30%" : "50%" }]}
                        onPress={() => { }}
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
                <AMBottomPopup
                    appConf={appConf}
                    isDesktop={isDesktop}
                    visible={popupState.visible}
                    onClose={() =>
                        setPopupState((prev) => ({ ...prev, visible: false }))
                    }
                >
                    {popupState.view === "list" && (
                        <View>
                            <AsPerSoCustomerWise
                                onPress={(row) => {
                                    setPopupState((prev) => ({
                                        ...prev,
                                        view: "edit",
                                        visible: true,
                                        data: row,
                                    }));
                                }}
                                isDesktop={isDesktop}
                            />

                            <View style={styles.updateButtonContainer}>
                                <TouchableOpacity
                                    style={styles.btn}
                                    onPress={() => setPopupState((prev) => ({ ...prev, view: "list" }))}
                                >
                                    <Text style={styles.btnText}>Update</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    {popupState.view === "edit" && (
                        <View >
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>RM Name</Text>
                                <Text>{popupState.data.rmName}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>Product ID</Text>
                                <Text>I00927</Text>
                            </View>
                            <View style={{ width: "100%" }}>
                                <AMExpoAutocomplete
                                    placeholder="Product Name"
                                    onSelect={() => { }}
                                    data={newoptions}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>Alternate RM</Text>
                                <Text>I00928</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => setPopupState((prev) => ({ ...prev, view: "list" }))}
                            >
                                <Text style={styles.btnText}>Update</Text>
                            </TouchableOpacity>
                        </View>
                    )}

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

    innerItem: {
        width: "48%",
    },
    updateButtonContainer: {
        width: "30%",
        alignSelf: "center",
        marginTop: 20,
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
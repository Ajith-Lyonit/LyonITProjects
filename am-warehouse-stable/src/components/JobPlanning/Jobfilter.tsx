// JobFilter.tsx
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { options } from "../../types/TestValue";
import AsPerSo from "../../components/JobPlanning/ASperso";
import AsPerMin from "../../components/JobPlanning/ASpermin";
import AMAutoComplete from "../../components/custom/AMAutocomplete";
import AMDatePicker from "../custom/AMDatepicker";
import AMSelect from "../custom/AMSelect";
import { useGridColumns, getGridWidth } from "../../utils/Grid";
import AMSwitch from "../custom/AMSwitch";
import AMBottomPopup from "../custom/AMPopup";
import AsPerSoCustomerWise from "./Aspersocustomerwise";
import { useLayout } from "../../layouts/AppLayoutProvider";

export default function JobFilter() {
    const [search, setSearch] = useState("");
    const [enabled, setEnabled] = useState(true);
    const [opt, setOpt] = useState(false);
    const columns = useGridColumns();
    const { isDesktop, appConf } = useLayout();
    const [popupState, setPopupState] = useState({
        visible: false,
        view: "list",
        data: null as any,
    });
    return (
        <View>
            <Text style={styles.title}>Planning</Text>
            <View style={styles.container}>
                <View style={[styles.field, getGridWidth(columns)]}>
                    <AMAutoComplete label="Unit Name" value={search} onChange={setSearch} list={options} />
                </View>
                <View style={[styles.field, getGridWidth(columns)]}>
                    <AMAutoComplete label="Department" value={search} onChange={setSearch} list={options} />
                </View>
                <View style={[styles.field, getGridWidth(columns)]}>
                    <AMAutoComplete label="Shift" value={search} onChange={setSearch} list={options} />
                </View>
                <View style={[styles.field, getGridWidth(columns)]}>
                    <View style={styles.switchContainer}>
                        <AMSwitch
                            label={enabled ? "As per SO" : "As per Min. Stock"}
                            value={enabled}
                            onChange={setEnabled}
                        />
                    </View>
                </View>
                <View style={[styles.field, getGridWidth(columns)]}>
                    <AMDatePicker onChange={(val) => console.log(val)} />
                </View>
                <View style={[styles.field, getGridWidth(columns)]}>
                    <AMDatePicker onChange={(val) => console.log(val)} />
                </View>
                {enabled && (
                    <View style={[styles.field, getGridWidth(columns, 1)]}>
                        <AMSelect
                            label="Mode"
                            value={opt ? "item" : "customer"}
                            setValue={(val: string) => setOpt(val === "item")}
                            list={[
                                { label: "Customer Wise", value: "customer" },
                                { label: "Item Wise", value: "item" },
                            ]}
                        />
                    </View>
                )}
                <View style={[styles.field, getGridWidth(columns, 1)]}>
                    {enabled ? (
                        <AMAutoComplete
                            label={opt ? "Item Name" : "Customer Name"}
                            value={search}
                            onChange={setSearch}
                            list={options}
                        />
                    ) : (
                        <View style={styles.rowWithButton}>
                            <View style={{ flex: 10 }}>
                                <AMAutoComplete
                                    label="Item Name"
                                    value={search}
                                    onChange={setSearch}
                                    list={options}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.addBtn}
                                onPress={() => setPopupState({
                                    visible: true,
                                    view: "list",
                                    data: null as any,
                                })}
                            >
                                <Text style={styles.plus}>+</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
            {/* {enabled ? <AsPerSo checkminso={enabled} ivalue={opt}  /> : <AsPerMin />} */}
            <AsPerSo ivalue={opt} checkminso={enabled} />
{!enabled && <AsPerMin />}
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
                            <AMAutoComplete
                                label="product Name"
                                value={search}
                                onChange={setSearch}
                                list={options}
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
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginHorizontal: -4,
    },
    title: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    switchContainer: {
        width: "100%",
        marginTop: 5,
        backgroundColor: "#E7E7E7",
        borderRadius: 8,
        height: 44,
        justifyContent: "center",
        paddingHorizontal: 10,
    },
    field: {
        paddingHorizontal: 4,
        marginBottom: 8,
        justifyContent: "center",
    },
    radioGroup: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E7E7E7",
        borderRadius: 8,
        gap: 10,
        height: 40,
    },
    rowWithButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    addBtn: {
        flex: 4,
        height: 40,
        width: 50,
        marginTop: 5,
        backgroundColor: "#02B6B6",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    plus: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
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
    updateButtonContainer: {
        width: "30%",
        alignSelf: "center",
        marginTop: 20,
    },
});
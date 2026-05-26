import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { droptions, labcols, labdata, options } from "../../types/TestValue";
import AMAutoComplete from "../custom/AMAutocomplete";
import { useLayout } from "../../layouts/AppLayoutProvider";
import AMDataTable from "../custom/AMDataTable";
import AMBottomPopup from "../custom/AMPopup";
import { IconButton, TextInput } from "react-native-paper";
import AMButton from "../custom/AMbutton";
import AsPerSoCustomerWise from "../JobPlanning/Aspersocustomerwise";


export default function LabelFilter() {
    const [value, setValue] = useState("");
    const { isDesktop, appConf } = useLayout()
    const [popstate, setPopState] = useState({
        visible: false,
        data: null as any,
    })
    const [search, setSearch] = useState("");
    const [popupState, setPopupState] = useState({
        visible: false,
        view: "list",
        data: null as any,
    });
    return (
        <View>
            <View>
                <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
                    Label Printing
                </Text>
            </View>
            <View style={styles.container}>
                <View style={{ width: '100%' }}>
                    <AMAutoComplete
                        placeholder="Planning Doc No."
                        value={value}
                        list={options} onChange={(val) => setValue(val)} />
                </View>
            </View>
            <View style={styles.rowplus}>
                <View style={{ flex: !isDesktop ? 10 : 40 }}>
                    <AMAutoComplete
                        placeholder="Item Name"
                        value={value}
                        list={options}
                        onChange={(val) => setValue(val)}
                    />
                </View>

                <TouchableOpacity
                    style={styles.plusBtn}
                    onPress={(row) => setPopupState({
                    visible: true,
                    data: null,
                    view:'list'
                })}
                >
                    <IconButton icon="plus" size={22} iconColor="#fff" />
                </TouchableOpacity>
            </View>
            <View style={{ width: '100%', marginVertical: 20 }}>
                <AMDataTable onPress={(row) => setPopState({
                    visible: true,
                    data: row
                })} amCheckbox={true} columns={labcols} data={labdata} />
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
                                <AMAutoComplete
                                    label="Product Name"
                                    value={search}
                                    onChange={setSearch}
                                    list={options}
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
                )}

            </AMBottomPopup>
            <AMBottomPopup onClose={() => setPopState(() => ({
                visible: false,
                data: null
            }))} visible={popstate.visible} isDesktop={isDesktop} appConf={appConf}>
                <View>
                    <View style={[styles.row, { justifyContent: 'flex-start', gap: 20 }]}>
                        <Text style={styles.label}>Item Code:</Text>
                        <Text>I01252
                        </Text>
                    </View>
                    <View style={[styles.row, { justifyContent: 'flex-start', gap: 18 }]}>
                        <Text style={styles.label}>Item Name:</Text>
                        <Text>
                            STR GAUZE SWAB 7.5CM X 7.5CM 12PLY
                            2PCS/PCH - SGSP007
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input} placeholder="MRP" />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input} placeholder="Batch No." />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input} placeholder="MFG Date" />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input} placeholder="EXP Date" />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input} placeholder="Completed Qty." />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input} placeholder="No of Boxes" />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input} placeholder="To Box no" />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input} placeholder="From Box no" />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.inputContainer}>
                            <AMButton
                                title="Print Item Label"
                                showDropdown
                                options={droptions}
                                onSelect={(val) => {
                                    console.log("Selected:", val);
                                }} />
                        </View>
                        <View style={styles.inputContainer}>
                            <AMButton
                                title="Print Box Label"
                                showDropdown
                                options={droptions}
                                onSelect={(val) => {
                                    console.log("Selected:", val);
                                }} />
                        </View>
                    </View>
                </View>
            </AMBottomPopup>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8,
        paddingBottom: 20
    },
    item: {
        width: "32%",
        marginBottom: 0,
    },
    innerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8,
    },

    innerItem: {
        width: "48%",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    inputContainer: {
        flex: 1,
        marginVertical: 10
    },
    label: {
        marginBottom: 4,
        fontSize: 14,
        fontWeight: "500",
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        backgroundColor: '#fff'
    },
    rowplus: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    plusBtn: {
        flex: 2,
        height: 40,
        backgroundColor: "#02B6B6",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
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
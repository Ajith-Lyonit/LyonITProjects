import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { mincol, mindata, options, scols, spdata } from "../../types/TestValue";
import AMAutoComplete from "../../components/custom/AMAutocomplete";
import AMDataTable from "../../components/custom/AMDataTable";
import JobListCard from "../Production/JobList";
import AMBottomPopup from "../custom/AMPopup";
import AsPerSoCustomerWise from "./Aspersocustomerwise";
import { useLayout } from "../../layouts/AppLayoutProvider";
import AMButton from "../custom/AMbutton";

type SoProps = {
    ivalue: boolean,
    checkminso: boolean
}

export default function AsPerSo({ ivalue, checkminso }: SoProps) {
    const [search, setSearch] = useState("");
    const { isDesktop, appConf } = useLayout()
    const [popupState, setPopupState] = useState({
        visible: false,
        view: "list",
        data: null as any,
    });
    return (
        checkminso && <>
            <View style={[styles.container, { marginTop: 5, flexDirection: 'column' }]}>
                <View style={[styles.container, { marginTop: 5, flexDirection: 'column', marginBottom: 20 }]}>
                    <View
                        style={{
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 10,
                            marginTop: 10,
                            marginBottom: 5,
                        }}
                    >
                        {checkminso && (
                            <Text style={{ fontSize: 12, fontWeight: "bold", flex: 1 }}>
                                {ivalue
                                    ? "STR GAUZE SWAB 7.5CM X 7.5CM 12PLY 2PCS/PCH - SGSP007"
                                    : "SAMYAT HEALTH CARE PVT LTD"}
                            </Text>
                        )}
                        {checkminso && (
                            <View style={{ flexDirection: 'row', gap: 4 }}>
                                {!ivalue && (
                                    <Text style={{ fontSize: 12, color: "#666" }}>
                                        253318230
                                    </Text>
                                )}
                                <Text style={{ fontSize: 12, color: "#666" }}>
                                    {checkminso && !ivalue && ('21/2/2026')}
                                    {ivalue && 'I01252'}
                                </Text>
                            </View>
                        )}
                    </View>
                    <View style={{ width: "100%", flex: 1 }}>
                        <AMDataTable
                            amCheckbox={true}
                            isDesktop={isDesktop}
                            columns={ivalue ? scols : mincol}
                            data={ivalue ? spdata : mindata}
                            onRowSelect={(selectedRows) => { console.log(selectedRows) }}
                            onPress={() => setPopupState({
                                visible: true,
                                view: "list",
                                data: null,
                            })
                            }
                        />
                    </View>
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
    innerItem: {
        width: "50%",
    },
    container2: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    field: {
        marginBottom: 6,
    },
    desktopField: {
        flex: 1,
        minWidth: 160,
    },
    mobileFull: {
        width: "100%",
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
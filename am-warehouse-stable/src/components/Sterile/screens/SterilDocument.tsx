import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { useState, useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import AMAutoComplete from "../../custom/AMAutocomplete";
import { CameraView, useCameraPermissions } from "expo-camera";
import AMButton from "../../custom/AMbutton";
import AMBottomPopup from "../../custom/AMPopup";
import BatchDocument from "../components/BatchDocument";
import { useLayout } from "../../../layouts/AppLayoutProvider";
import AMExpoAutocomplete from "../../custom/AMExpoAutocomplete";
import { newoptions } from "../../../types/TestValue";

export default function SterileDoument({ route }: any) {
    const [showScanner, setShowScanner] = useState(false);
    const [popState, setPopstate] = useState({ visible: false });
    const [permission, requestPermission] = useCameraPermissions();
    const { isDesktop, appConf } = useLayout();
    const scannedRef = useRef(false);
    const [barcode, setBarcode] = useState("");

    const [tableData, setTableData] = useState([
        { sno: 1, item: "Poly Bag LDPE+PP Mix Transparent", qty: 10, recqty: 5 },
        { sno: 2, item: "Poly Bag LDPE+PP Mix Transparent", qty: 20, recqty: 10 },
        { sno: 3, item: "Poly Bag LDPE+PP Mix Transparent", qty: 20, recqty: 10 },
        { sno: 4, item: "Poly Bag LDPE+PP Mix Transparent", qty: 20, recqty: 10 },
        { sno: 5, item: "Poly Bag LDPE+PP Mix Transparent", qty: 20, recqty: 10 },
        { sno: 6, item: "Poly Bag LDPE+PP Mix Transparent", qty: 20, recqty: 10 },
    ]);

    const updateRow = (index: number) => console.log("Edit row:", index);

    const handleScan = ({ data }: any) => {
        if (scannedRef.current) return;
        scannedRef.current = true;
        setShowScanner(false);
        setBarcode(data);
    };

    const TableHeader = () => (
        <View style={styles.tableHeader}>
            <View style={styles.colSno}>
                <Text style={styles.headerText}>S.No</Text>
            </View>
            <View style={styles.colItem}>
                <Text style={styles.headerText}>Item</Text>
            </View>
            <View style={styles.colQty}>
                <Text style={styles.headerText}>Qty.{"\n"}(Boxes)</Text>
            </View>
            <View style={styles.colRecQty}>
                <Text style={styles.headerText}>Rec Qty.{"\n"}Box</Text>
            </View>
            <View style={styles.colAction} />
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={tableData}
                keyExtractor={(item) => item.sno.toString()}
                contentContainerStyle={{ padding: 12, paddingBottom: 80 }}
                ListHeaderComponent={
                    <>
                        <View style={styles.header}>
                            <Text style={styles.title}>
                                ITR No: {route?.params?.docNo || "2229 1036 6575"}
                            </Text>
                        </View>

                        <View style={styles.searchRow}>
                            <View style={{ flex: 10 }}>
                                <AMExpoAutocomplete
                                    placeholder="Item name"
                                    data={newoptions}
                                    onSelect={(val) => { }}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.scanBtn}
                                onPress={async () => {
                                    scannedRef.current = false;
                                    if (!permission?.granted) await requestPermission();
                                    setShowScanner(true);
                                }}
                            >
                                <MaterialIcons name="qr-code-scanner" size={22} color="#000" />
                            </TouchableOpacity>

                        </View>

                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', paddingVertical: 10 }}>
                            <Text>19 Feb 2026</Text>
                        </View>

                        <TableHeader />
                    </>
                }
                renderItem={({ item, index }) => (
                    <View style={styles.row}>
                        <View style={styles.colSno}>
                            <Text style={styles.snoText}>{item.sno}</Text>
                        </View>
                        <View style={styles.colItem}>
                            <Text style={styles.itemText}>{item.item}</Text>
                        </View>
                        <View style={styles.colQty}>
                            <Text style={styles.numText}>{item.qty}</Text>
                        </View>
                        <View style={styles.colRecQty}>
                            <Text style={styles.numText}>{item.recqty}</Text>
                        </View>
                        <View style={styles.colAction}>
                            <TouchableOpacity
                                onPress={() => { updateRow(index); setPopstate({ visible: true }); }}
                            >
                                <MaterialIcons name="edit" size={20} color="gray" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                ListFooterComponent={
                    <View style={styles.footer}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 4 }} />
                            <View style={{ flex: 3, alignItems: "center" }}>
                                <TouchableOpacity style={[styles.btn, { width: "100%" }]} onPress={() => { }}>
                                    <Text style={styles.btnText}>Update</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 4 }} />
                        </View>
                    </View>
                }
            />

            <AMBottomPopup
                onClose={() => setPopstate({ visible: false })}
                isDesktop={isDesktop}
                appConf={appConf}
                visible={popState.visible}
            >
                <BatchDocument />
            </AMBottomPopup>

            {showScanner && (
                <View style={styles.overlay}>
                    <CameraView
                        style={{ flex: 1 }}
                        barcodeScannerSettings={{ barcodeTypes: ["qr", "code128", "ean13"] }}
                        onBarcodeScanned={handleScan}
                    />
                    <View style={styles.scanBoxWrapper}>
                        <View style={styles.scanBox} />
                        <Text style={{ color: '#fff', textAlign: 'center', width: '70%', paddingVertical: 10 }}>
                            Place a barcode inside the viewfinder rectangle to scan it.
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.closeBtn} onPress={() => setShowScanner(false)}>
                        <MaterialIcons name="close" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        justifyContent: "center",
        flexDirection: "row",
        marginBottom: 10,
        marginTop: 20,
    },
    title: {
        fontSize: 16,
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
    searchRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    scanBtn: {
        flex: 2,
        height: 40,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },

    // ── Table container rows ──────────────────────────
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#DEF1F1",
        paddingVertical: 10,
        paddingHorizontal: 8,
        marginTop: 10,
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderColor: "#ddd",
        alignItems: "center",
    },

    // ── Column widths ─────────────────────────────────
    colSno: {
        width: 44,
        alignItems: "center",
    },
    colItem: {
        flex: 1,                   // takes all remaining space
        paddingHorizontal: 8,
    },
    colQty: {
        width: 80,
        alignItems: "center",
    },
    colRecQty: {
        width: 80,
        alignItems: "center",
    },
    colAction: {
        width: 36,
        alignItems: "center",
    },

    // ── Text roles ────────────────────────────────────
    headerText: {
        fontWeight: "bold",
        fontSize: 12,
        textAlign: "center",       // headings centered
    },
    snoText: {
        fontSize: 12,
        textAlign: "center",
    },
    itemText: {
        fontSize: 12,
        textAlign: "left",
    },
    numText: {
        fontSize: 12,
        textAlign: "right",
    },

    footer: { marginTop: 20, marginBottom: 20 },
    overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.7)" },
    scanBoxWrapper: {
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    scanBox: {
        width: 220, height: 220,
        borderWidth: 2, borderColor: "#fff", borderRadius: 12,
    },
    closeBtn: { position: "absolute", top: 50, right: 20 },
});
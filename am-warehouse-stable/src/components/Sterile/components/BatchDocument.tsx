import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
} from "react-native";
import { useRef, useState } from "react";
import AMAutoComplete from "../../custom/AMAutocomplete";
import AMButton from "../../custom/AMbutton";
import { MaterialIcons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function BatchDocument() {
    const [value, setValue] = useState("");
    const [showScanner, setShowScanner] = useState(false);
    const { width } = useWindowDimensions();
    const [permission, requestPermission] = useCameraPermissions();
    const [barcode, setBarcode] = useState("")
    const isDesktop = width >= 800;
    const scannedRef = useRef(false);
    const handleScan = ({ data }: any) => {
        if (scannedRef.current) return;

        scannedRef.current = true;

        setShowScanner(false);
        setBarcode(data);
    };

    return (
        <View style={styles.container}>
            {/* SEARCH */}
            <View style={styles.topcont}>
                <Text style={{ fontWeight: 'bold', fontSize: isDesktop ? 18 : 15 }}>Item Name: Poly bag LDPE+PP</Text>
            </View>
            <View style={[styles.topend, { justifyContent: isDesktop ? 'center' : 'space-evenly', gap: isDesktop ? 60 : 0 }]}>
                <Text>Total Qty: 250</Text>
                <Text>Received Qty: 250</Text>
            </View>
            <View style={styles.searchRow}>
                <View style={{ flex: 10 }}>
                    <AMAutoComplete
                        placeholder="RFID/Bar Code"
                        value={value}
                        list={[]}
                        onChange={setValue}
                    />
                </View>

                <TouchableOpacity onPress={async () => {
                    scannedRef.current = false;
                    if (!permission?.granted) {
                        await requestPermission();
                    }
                    setShowScanner(true);
                }} style={styles.scanBtn}>
                    <MaterialIcons name="qr-code-scanner" size={22} color="#000" />
                </TouchableOpacity>

            </View>

            {/* LIST */}
            {[1, 2, 3].map((item) => (
                <View key={item} style={styles.card}>
                    {isDesktop ? (
                        // 💻 DESKTOP → all 6 cols in one row, no separate heading
                        <View style={styles.desktopRow}>
                            <Text style={[styles.desktopText, styles.rfidText]}>
                                RFID/Bar Code
                            </Text>
                            <Text style={styles.desktopText}>Batch No : 202123</Text>
                            <Text style={styles.desktopText}>LOT No : 202123</Text>
                            <Text style={styles.desktopText}>Batch Qty : 360</Text>
                            <Text style={styles.desktopText}>MFG Date : 200125</Text>
                            <Text style={styles.desktopText}>EXP Date : 200128</Text>
                        </View>
                    ) : (
                        // 📱 MOBILE → unchanged
                        <>
                            <Text style={styles.heading}>RFID/Bar Code</Text>
                            <View style={styles.infoRow}>
                                <View style={styles.leftCol}>
                                    <Text style={styles.infoText}>Batch No: 202123</Text>
                                    <Text style={styles.infoText}>MFG: 200125</Text>
                                    <Text style={styles.infoText}>LOT: 200125</Text>
                                    <Text style={styles.infoText}>Qty: 360</Text>
                                </View>
                                <View style={styles.rightCol}>
                                    <Text style={styles.infoTextRight}>MFG: 200125</Text>
                                    <Text style={styles.infoTextRight}>EXP: 200125</Text>
                                </View>
                            </View>
                        </>
                    )}
                </View>
            ))}
            {/* FOOTER */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.btn} onPress={() => { }}>
                    <Text style={styles.btnText}>Update</Text>
                </TouchableOpacity>
            </View>
            {showScanner && (
                <View style={styles.overlay}>
                    <CameraView
                        style={{ flex: 1 }}
                        barcodeScannerSettings={{
                            barcodeTypes: ["qr", "code128", "ean13"],
                        }}
                        onBarcodeScanned={handleScan}
                    />

                    {/* 🔳 CENTER SQUARE */}
                    <View style={styles.scanBoxWrapper}>
                        <View style={styles.scanBox} />
                        <Text style={{ color: '#fff', textAlign: 'center', width: '70%', paddingVertical: 10 }}>Place a barcode inside the viewfinder rectangle to scan it. if scan failed enter manually</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.closeBtn}
                        onPress={() => setShowScanner(false)}
                    >
                        <MaterialIcons name="close" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
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
    topcont: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10
    },
    topend: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    heading: {
        fontWeight: "600",
        marginBottom: 6,
    },

    searchRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginTop: 10,
    },

    scanBtn: {
        flex: 2,
        height: 40,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },

    // 📱 MOBILE
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    leftCol: {
        width: "48%",
        alignItems: "flex-start",
    },

    rightCol: {
        width: "48%",
        alignItems: "flex-end",
    },

    infoText: {
        color: "#02B6B6",
        textAlign: "left",
    },

    infoTextRight: {
        color: "#02B6B6",
        textAlign: "right",
    },
    footer: {
        marginTop: 20,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.7)",
    },

    scanBoxWrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },

    scanBox: {
        width: 220,
        height: 220,
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 12,
    },

    closeBtn: {
        position: "absolute",
        top: 50,
        right: 20,
    },
    card: {
        borderBottomWidth: 1,
        borderBottomColor: "#CECECE",
        paddingVertical: 12,
        paddingHorizontal: 6,
    },
    desktopRow: {
        flexDirection: "row",
        alignItems: "center",          // vertically center all items
    },
    desktopText: {
        flex: 1,
        textAlign: "left",             // left-aligned like the screenshot
        color: "#333",
        fontSize: 14,
    },
    rfidText: {
        color: "#02B6B6",              // teal for the RFID col only
        fontWeight: "600",
    },
});
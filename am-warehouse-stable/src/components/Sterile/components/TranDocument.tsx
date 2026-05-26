import React, { useRef, useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AMAutoComplete from "../../custom/AMAutocomplete";
import { useCameraPermissions } from "expo-camera";

export default function TransDocument() {
    const [department, setDepartment] = useState("");
    const [customer, setCustomer] = useState("");
    const [product, setProduct] = useState("");
    const [showScanner, setShowScanner] = useState(false);
    const [permission, requestPermission] =
        useCameraPermissions();
    const [barcode, setBarcode] = useState("");

    const scannedRef = useRef(false);

    const summaryData = [
        { label: "1. Batch", value: 56 },
        { label: "2. Damage", value: 12 },
        { label: "3. Hold", value: 25 },
        { label: "4. Transfer", value: 18 },
        { label: "5. Reserved", value: 32 },
        { label: "6. Available", value: 45 },
        { label: "7. Pending", value: 20 },
    ];

    const total = summaryData.reduce(
        (acc, item) => acc + item.value,
        0
    );

    return (
        <View>
                            <View style={styles.doubleCol}>
                    <View style={styles.infoTopRow}>
                        <View style={styles.infoCard}>
                            <Text style={styles.infoLabel}>
                                Product Name :
                            </Text>

                            <Text style={styles.infoValue}>
                                Poly Bag LDPE+PP
                            </Text>
                        </View>

                        <View style={styles.infoCard}>
                            <Text style={styles.infoLabel}>
                                Required Qty. :
                            </Text>

                            <Text style={styles.infoValue}>
                                505
                            </Text>
                        </View>
                    </View>
                </View>
            <View style={styles.row}>
                <View style={styles.col}>
                    <View style={styles.inputRow}>
                        <View style={styles.inputWrapper}>
                            <AMAutoComplete
                                placeholder="RFID/Bar Code No"
                                value={department}
                                list={[]}
                                onChange={(
                                    val: React.SetStateAction<string>
                                ) => setDepartment(val)}
                            />
                            <Text>Poly Bag LDPE+PP Mix Transparent</Text>
                        </View>

                        <TouchableOpacity
                            onPress={async () => {
                                scannedRef.current = false;

                                if (!permission?.granted) {
                                    await requestPermission();
                                }

                                setShowScanner(true);
                            }}
                            style={styles.scanBtn}
                        >
                            <MaterialIcons
                                name="qr-code-scanner"
                                size={22}
                                color="#000"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Location */}
                <View style={styles.col}>
                    <AMAutoComplete
                        placeholder="A4-R2-L2-R2"
                        value={customer}
                        list={[]}
                        onChange={(
                            val: React.SetStateAction<string>
                        ) => setCustomer(val)}
                    />
                    <Text>A4-R2-L2-R2</Text>
                </View>

                {/* Actual Bin */}
                <View style={styles.col}>
                    <View style={styles.inputRow}>
                        <View style={styles.inputWrapper}>
                            <AMAutoComplete
                                placeholder="Actual Bin"
                                value={product}
                                list={[]}
                                onChange={(
                                    val: React.SetStateAction<string>
                                ) => setProduct(val)}
                            />
                            <Text>Qty. Picked : 560</Text>
                        </View>

                        <TouchableOpacity
                            onPress={async () => {
                                scannedRef.current = false;

                                if (!permission?.granted) {
                                    await requestPermission();
                                }

                                setShowScanner(true);
                            }}
                            style={styles.scanBtn}
                        >
                            <MaterialIcons
                                name="qr-code-scanner"
                                size={22}
                                color="#000"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Summary Table */}
            <View style={styles.summaryTable}>
                {summaryData.map((item, index) => (
                    <View
                        key={index}
                        style={styles.summaryRow}
                    >
                        <Text style={styles.summaryLabel}>
                            {item.label}
                        </Text>

                        <Text style={styles.summaryValue}>
                            {item.value}
                        </Text>
                    </View>
                ))}

                {/* Total Row */}
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>
                        Total
                    </Text>

                    <Text style={styles.totalValue}>
                        {total}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        marginBottom: 15,
    },

    col: {
        flex: 1,
    },

    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    inputWrapper: {
        flex: 1,
    },

    scanBtn: {
        width: 42,
        height: 42,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },

    summaryTable: {
        width: "33%",
        marginLeft: "34%",
        backgroundColor: "#EAF8F2",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#B7E4D3",
        overflow: "hidden",
    },

    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#D8EFE5",
    },

    summaryLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1F2937",
    },

    summaryValue: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#111827",
    },

    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 14,
        backgroundColor: "#D8F3E7",
    },

    totalLabel: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#065F46",
    },

    totalValue: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#065F46",
    },
    doubleCol: {
        flex: 1,
        marginBottom:6
    },

    infoTopRow: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    infoCard: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 14,
    },

    infoLabel: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#374151",
        marginRight: 6,
    },

    infoValue: {
        fontSize: 14,
        color: "#111827",
        flexShrink: 1,
    },
});
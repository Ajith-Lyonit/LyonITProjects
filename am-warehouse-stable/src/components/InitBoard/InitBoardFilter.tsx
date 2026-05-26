import { View, StyleSheet } from "react-native";
import { Chip, IconButton, Text } from "react-native-paper";
import AMBarChart from "../Charts/AMBarChart";
import AMPieChart from "../Charts/AMPieChart";
import AMDashboardGauge from "./components/GaugeGrid";
import { useLayout } from "../../layouts/AppLayoutProvider";
import { useState } from "react";
import AMDropdownMenu from "../custom/AMReportDownload";

export default function InitBoardFilters() {
    const [value, setValue] = useState("production");
    const { isDesktop } = useLayout()
    const data = [
        { label: "0-3", values: [40, 100, 70] },
        { label: "4-6", values: [50, 20, 35] },
        { label: "7-10", values: [30, 40, 25] },
        { label: "11-15", values: [30, 40, 25] },
        { label: "16+", values: [30, 40, 20] },
        { label: "6-10", values: [30, 70, 25] },
        { label: "13-15", values: [30, 40, 100] },
        { label: "20+", values: [30, 40, 120] },
    ];

    const buttons = [
        { key: "production", label: "Production" },
        { key: "wt-in", label: "WT-In" },
        { key: "wt-out", label: "WT-Out" },
        { key: "quality", label: "Quality" },
    ];
    const chipWidth: number | `${number}%` =
        isDesktop
            ? `${100 / buttons.length}%`
            : "23%";
    return (
        <View>
            <Text style={{ textAlign: 'center', paddingBottom: 10, fontWeight: '600' }}>Dashboard</Text>
            <View style={styles.container}>
                {buttons.map((btn) => {
                    const isActive = value === btn.key;
                    return (
                        <Chip
                            key={btn.key}
                            selected={isActive}
                            onPress={() => setValue(btn.key)}
                            style={[
                                styles.chip,
                                isActive && styles.activeChip,
                                { width: chipWidth },
                                isDesktop && styles.desktopChip,
                            ]}
                            textStyle={[
                                styles.chipText,
                                isActive && styles.activeChipText,
                            ]}
                            icon={() => null}
                        >
                            {btn.label}
                        </Chip>
                    );
                })}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text>DD/MM/YY - DD/MM/YY</Text>
                <IconButton icon={'filter-outline'} />
            </View>
            {value === "production" && (
                <View style={styles.gridContainer}>
                    <View style={[styles.card, { marginBottom: !isDesktop ? 0 : 50 }, { padding: !isDesktop ? 0 : 20 }, { width: isDesktop ? "48%" : "100%", borderColor: isDesktop ? '#02B6B6' : '', borderWidth: isDesktop ? 1 : 0 }]}>
                        <View style={styles.chartcont}>
                            <Text style={styles.title}>Age wise Analysis - Open SO</Text>
                            <AMDropdownMenu
                                items={[
                                    { label: "XLSX", icon: "file-excel", onPress: () => console.log("xlsx") },
                                    { label: "PDF", icon: "file-pdf-box", onPress: () => console.log("pdf") },
                                ]}
                            />
                        </View>
                        <AMBarChart data={data} />
                    </View>
                    <View style={[styles.card, { marginBottom: !isDesktop ? 0 : 50 }, { padding: !isDesktop ? 0 : 20 }, { width: isDesktop ? "48%" : "100%", borderColor: isDesktop ? '#02B6B6' : '', borderWidth: isDesktop ? 1 : 0 }]}>
                        <View style={styles.chartcont}>
                            <Text style={styles.title}>Age wise Analysis - Excluding Branch</Text>
                            <AMDropdownMenu
                                items={[
                                    { label: "XLSX", icon: "file-excel", onPress: () => console.log("xlsx") },
                                    { label: "PDF", icon: "file-pdf-box", onPress: () => console.log("pdf") },
                                ]}
                            />
                        </View>
                        <AMBarChart data={data} />
                    </View>
                    <View style={[styles.card, { marginBottom: !isDesktop ? 0 : 50 }, { padding: !isDesktop ? 0 : 20 }, { width: isDesktop ? "48%" : "100%", borderColor: isDesktop ? '#02B6B6' : '', borderWidth: isDesktop ? 1 : 0 }]}>
                        <View style={styles.chartcont}>
                            <Text style={styles.title}>Age wise Analysis - From Branch</Text>
                            <AMDropdownMenu
                                items={[
                                    { label: "XLSX", icon: "file-excel", onPress: () => console.log("xlsx") },
                                    { label: "PDF", icon: "file-pdf-box", onPress: () => console.log("pdf") },
                                ]}
                            />
                        </View>
                        <AMBarChart data={data} />
                    </View>
                    <View style={[styles.card, { marginBottom: !isDesktop ? 0 : 50 }, { padding: !isDesktop ? 0 : 40 }, { width: isDesktop ? "48%" : "100%", borderColor: isDesktop ? '#02B6B6' : '', borderWidth: isDesktop ? 1 : 0 }]}>
                        <View style={styles.chartcont}>
                            <Text style={styles.title}>Order Under Process</Text>
                            <AMDropdownMenu
                                items={[
                                    { label: "XLSX", icon: "file-excel", onPress: () => console.log("xlsx") },
                                    { label: "PDF", icon: "file-pdf-box", onPress: () => console.log("pdf") },
                                ]}
                            />
                        </View>
                        <AMPieChart
                            data={[
                                { label: "Manufacturing", value: 103 },
                                { label: "Repacking", value: 23 },
                                { label: "Trading", value: 34 },
                                { label: "Bapuji Group", value: 63 },
                            ]}
                        />
                    </View>
                </View>
            )}
            {value === "wt-in" && (
                <AMDashboardGauge isDesktop={isDesktop} />
            )}
            {value === "wt-out" && <Text>WT-OUT Content</Text>}
            {value === "quality" && <Text>Quality Content</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    chartcont: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }, title: {
        paddingVertical: 10,
        fontWeight: "semibold",
    },
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 10
    },
    card: {
        borderRadius: 10
    },
    dashboardRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    }, btnWrapper: {
        width: '100%',
        flex: 1,
        flexDirection: 'row'
    },
    button: {
        borderColor: "#02B6B6",
        borderRadius: 6,
        width: '100%'
    },
    content: {
        height: 40,
    },
    label: {
        fontSize: 12,
        flexShrink: 1,
        textAlign: "center",
    },
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    chip: {
        borderColor: "#02B6B6",
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: "#fff",
        marginBottom: 8,
        justifyContent: "center",
        alignItems: "center",
    },

    chipText: {
        color: "#02B6B6",
        fontSize: 12,
        textAlign: "center",
        width: "100%",
    },
    activeChip: {
        backgroundColor: "#02B6B6",
    },
    activeChipText: {
        color: "#fff",
    }, desktopChip: {
        flex: 1,
        marginHorizontal: 4,
    },

})
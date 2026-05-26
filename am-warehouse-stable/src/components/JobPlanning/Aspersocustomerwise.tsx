import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { cuscolplan, cuscolumns, cusdata, cusplandata, rmqcolumns, rmqdata, rmstockcols, rmstockdata, rqcolumns, rqdata } from "../../types/TestValue";
import AMDataTable from "../../components/custom/AMDataTable";
import { Checkbox, TextInput } from "react-native-paper";

type customerWiseProps = {
    isDesktop?: boolean;
    onPress?: (row: any) => void;
};

export default function AsPerSoCustomerWise({ isDesktop, onPress }: customerWiseProps) {
    const [checked, setChecked] = useState(false);
    return (
        <>
            <View style={[styles.container, { marginTop: 5, flexDirection: 'column' }]}>
                <View style={[styles.container, { marginTop: 5, flexDirection: 'column', marginBottom: 20 }]}>
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

                        <Text style={styles.value}>
                            I02907
                        </Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 15, fontWeight: "bold", flex: 1, marginBottom: 10 }}>Requirement</Text>
                        <AMDataTable isDesktop={isDesktop} amCheckbox={true} data={cusplandata} columns={cuscolplan} />
                        <Text style={{ textAlign: 'right', fontSize: 15, fontWeight: "bold", flex: 1, marginBottom: 10 }}>Total Requirement:77,500</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 15, fontWeight: "bold", flex: 1, marginBottom: 10 }}>Available Stock</Text>
                        <AMDataTable isDesktop={isDesktop} amCheckbox={false} data={rqdata} columns={rqcolumns} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 15, fontWeight: "bold", flex: 1, marginBottom: 10 }}>RM Requirement</Text>
                        <AMDataTable showEditButton={true} onEdit={onPress} onPress={onPress} isDesktop={isDesktop} amCheckbox={true} data={rmqdata} columns={rmqcolumns} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, fontWeight: "bold", flex: 1, marginBottom: 10 }}>RM Stock-CARTON BOX (LX59 WX33 HX43CM)-MEDIUM BOX (I00231)</Text>
                        <AMDataTable isDesktop={isDesktop} data={rmstockdata} columns={rmstockcols} />
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 12, fontWeight: "bold", flex: 1, marginBottom: 10 }}>Last 3 Months Avg: 500000</Text>
                        <Text style={{ textAlign: 'right', fontSize: 12, fontWeight: "bold", flex: 1 }}>Last Month: 550000</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Checkbox.Item
                            label="Maintain min Stock"
                            color="#02B6B6"
                            position="leading"
                            status={checked ? "checked" : "unchecked"}
                            onPress={() => {
                                setChecked(!checked);
                            }}
                            style={styles.detailCheckboxItem}
                            labelStyle={styles.detailCheckboxLabel}
                        />

                        <Text style={styles.detailColon}>:</Text>

                        <Text style={styles.detailValue}>
                            550000
                        </Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>
                            Balance To Be Produced
                        </Text>

                        <Text style={styles.detailColon}>:</Text>

                        <Text style={styles.detailValue}>
                            550000
                        </Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>
                            Planned Qty
                        </Text>

                        <Text style={styles.detailColon}>:</Text>

                        <TextInput style={styles.detailInput} />
                    </View>
                </View>
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
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
    input: {
        height: 40,
        borderWidth: 1,
        width: '10%',
        borderColor: "#ccc",
        borderRadius: 6,
        backgroundColor: '#fff'
    },
    infoRow: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 1,
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
    detailLabel: {
        width: 200,
        fontSize: 14,
        fontWeight: "bold",
    },
    detailInput: {
        width: '10%',
        height:40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        paddingHorizontal: 10,
        fontSize: 14,
    },
    detailCheckbox: {
        width: 120,
        paddingVertical: 0,
        paddingHorizontal: 0,
        justifyContent: "flex-start",
    },
    detailRow: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
    },
    detailCheckboxItem: {
        width: 'auto',
        paddingVertical: 0,
        paddingHorizontal: 0,
        justifyContent: "center",
    },
    detailCheckboxLabel: {
        fontSize: 14,
        fontWeight: "bold",
    },
    detailColon: {
        width: 20,
        textAlign: "center",
        fontWeight: "bold",
    },
    detailValue: {
        width: 120,
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "left",
    },
});
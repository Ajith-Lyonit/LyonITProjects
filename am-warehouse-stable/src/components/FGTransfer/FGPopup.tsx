import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function FGInfocard() {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Product Name</Text>
      <Text style={styles.value}>
        STR GAUZE SWAB 7.5CM X 7.5CM 12PLY 2PCS/PCH - SGSP007
      </Text>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Product ID</Text>
          <Text style={styles.value}>I01252</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>Sterile</Text>
          <Text style={styles.value}>Yes</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Completed Qty.</Text>
          <Text style={styles.value}>1,00,000</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>Batch No.</Text>
          <Text style={styles.value}>18032026</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>MFG. Date</Text>
          <Text style={styles.value}>18/3/2026</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>EXP. Date</Text>
          <Text style={styles.value}>17/3/2031</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row" ,marginVertical:10}}>
        <View style={{ flex: 3 }} >
          <Text style={[styles.label, { flex: 3 }]}>Total Boxes</Text>
        </View>
        <View style={{ flex: 4, alignItems: "center" }}>
          <Text style={[styles.label, { flex: 3 }]}>0</Text>
        </View>
        <View style={{ flex: 3 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  col: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 11,
    color: "#777",
  },
  value: {
    fontSize: 13,
    fontWeight: "500",
    color: "#000",
    marginTop: 2,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingTop: 8,
  },
});
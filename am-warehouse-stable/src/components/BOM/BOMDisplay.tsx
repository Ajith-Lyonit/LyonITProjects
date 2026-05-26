import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BOMDisplay() {
  return (
    <View style={styles.container}>
      
      <Text style={styles.text}>
        FG Item Code : Xxxxxx
      </Text>

      <Text style={styles.text}>
        FG Item Name : Xxxxxxxxxxxxxxxxxxxxx
      </Text>

      <View style={styles.row}>
        <Text style={styles.text}>Total Qty. : Xxxxx</Text>
        <Text style={styles.text}>Box Qty. : Xxxxxx</Text>
        <Text style={styles.text}>No. of Boxes : Xxxxx</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
    gap: 8,
    marginBottom:25
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  text: {
    fontSize: 14
  }
});
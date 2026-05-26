import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { bomcols, bomdata, options } from "../../types/TestValue";
import AMAutoComplete from "../custom/AMAutocomplete";
import { useLayout } from "../../layouts/AppLayoutProvider";
import AMDataTable from "../custom/AMDataTable";
import BOMDisplay from "./BOMDisplay";

export default function BOMFilter() {
  const [value, setValue] = useState("");
  const { isDesktop } = useLayout();

  const getFieldStyle = () => {
    if (isDesktop) return styles.desktopField;
    return styles.fullWidthMobile
  };

  return (
    <View>
      <Text style={styles.title}>BOM</Text>
      <View style={[styles.container, isDesktop && styles.desktopRow]}>
        <View style={[styles.field, getFieldStyle()]}>
          <AMAutoComplete
            placeholder="Item name"
            value={value}
            list={options}
            onChange={(val) => setValue(val)}
          />
        </View>
      </View>
      <BOMDisplay/>
      <AMDataTable data={bomdata} columns={bomcols} isDesktop={isDesktop}></AMDataTable>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  container: {
    flexDirection: "row",   
    flexWrap: "wrap",
    gap: 8,
    paddingBottom: 20,
  },
  desktopRow: {
    alignItems: "center",
  },
  field: {
    marginBottom: 4,
  },
  desktopField: {
    flex: 1,
    minWidth: 160,
  },
  fullWidthMobile: {
    width: "100%",
  },
});
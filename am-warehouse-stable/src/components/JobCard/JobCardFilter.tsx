import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { options } from "../../types/TestValue";
import AMAutoComplete from "../custom/AMAutocomplete";
import AMDatePicker from "../custom/AMDatepicker";
import JobCardTables from "./JobCardTable";
import { useLayout } from "../../layouts/AppLayoutProvider";

export default function JobCardFilter() {
  const [value, setValue] = useState("");
  const { isDesktop, appConf } = useLayout();

  const getFieldStyle = (isFullWidth = false) => {
    if (isDesktop) return styles.desktopField;
    if (isFullWidth) return styles.fullWidthMobile;
    return styles.mobileField;
  };

  return (
    <View>
      {/* Title */}
      <Text style={styles.title}>Job Card</Text>

      {/* Filters */}
      <View style={[styles.container, isDesktop && styles.desktopRow]}>

        <View style={[styles.field, getFieldStyle()]}>
          <AMAutoComplete
            placeholder="Planning Doc No."
            value={value}
            list={options}
            onChange={(val) => setValue(val)}
          />
        </View>

        <View style={[styles.field, getFieldStyle()]}>
          <AMAutoComplete
            placeholder="Unit name"
            value={value}
            list={options}
            onChange={(val) => setValue(val)}
          />
        </View>

        <View style={[styles.field, getFieldStyle()]}>
          <AMAutoComplete
            placeholder="Department"
            value={value}
            list={options}
            onChange={(val) => setValue(val)}
          />
        </View>

        <View style={[styles.field, getFieldStyle()]}>
          <AMAutoComplete
            placeholder="Shift"
            value={value}
            list={options}
            onChange={(val) => setValue(val)}
          />
        </View>

        <View style={[styles.field, getFieldStyle()]}>
          <AMDatePicker onChange={(val) => console.log(val)} />
        </View>

        <View style={[styles.field, getFieldStyle()]}>
          <AMDatePicker onChange={(val) => console.log(val)} />
        </View>

        {/* Customer Wise */}
        <View style={[styles.field, getFieldStyle(true)]}>
          <AMAutoComplete
            placeholder="Item Name"
            value={value}
            list={options}
            onChange={(val) => setValue(val)}
          />
        </View>

      </View>

      {/* Table */}
      <JobCardTables isDesktop={isDesktop} appConf={appConf} />
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

  // 🖥 Desktop
  desktopField: {
    flex: 1,
    minWidth: 160,
  },

  // 📱 Mobile (2 per row)
  mobileField: {
    width: "48%",
  },

  // 📱 Full width field
  fullWidthMobile: {
    width: "100%",
  },
});
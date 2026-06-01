import { StyleSheet, Text, View } from "react-native";
import { newoptions } from "../../types/TestValue";
import AMDatePicker from "../custom/AMDatepicker";
import JobCardTables from "./JobCardTable";
import { useLayout } from "../../layouts/AppLayoutProvider";
import AMExpoAutocomplete from "../custom/AMExpoAutocomplete";

export default function JobCardFilter() {
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
          <AMExpoAutocomplete
            placeholder="Planning Doc No."
            data={newoptions}
            onSelect={() => { }}
          />
        </View>

        <View style={[styles.field, getFieldStyle()]}>
          <AMExpoAutocomplete
            placeholder="Unit name"
            data={newoptions}
            onSelect={() => { }}
          />
        </View>

        <View style={[styles.field, getFieldStyle()]}>
          <AMExpoAutocomplete
            placeholder="Department"
            data={newoptions}
            onSelect={() => { }}
          />
        </View>

        <View style={[styles.field, getFieldStyle()]}>
          <AMExpoAutocomplete
            placeholder="Shift"
            data={newoptions}
            onSelect={() => { }}
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
          <AMExpoAutocomplete
            placeholder="Item Name"
            data={newoptions}
            onSelect={() => { }}
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
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { options } from "../../types/TestValue";
import AMAutoComplete from "../custom/AMAutocomplete";
import RMTables from "./RMTables";
import { useLayout } from "../../layouts/AppLayoutProvider";

export default function RMFilter() {
  const [value, setValue] = useState("");
  const { isDesktop, appConf } = useLayout();

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>RM Planning</Text>
      <View
        style={[
          styles.container,
          isDesktop && styles.desktopContainer,
        ]}
      >
        <View style={[styles.item, isDesktop && styles.desktopItem]}>
          <AMAutoComplete
            placeholder="Planning Doc No."
            value={value}
            list={options}
            onChange={(val) => setValue(val)}
          />
        </View>
        <View style={[styles.item, isDesktop && styles.desktopItem]}>
          <AMAutoComplete
            placeholder="Unit name"
            value={value}
            list={options}
            onChange={(val) => setValue(val)}
          />
        </View>
        <View style={[styles.item, isDesktop && styles.desktopItem]}>
          <AMAutoComplete
            placeholder="Department"
            value={value}
            list={options}
            onChange={(val) => setValue(val)}
          />
        </View>

        <View style={[styles.item, isDesktop && styles.desktopItem]}>
          <AMAutoComplete
            placeholder="Shift"
            value={value}
            list={options}
            onChange={(val) => setValue(val)}
          />
        </View>
      </View>
      <RMTables appConf={appConf} isDesktop={isDesktop} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 10,
  },
  desktopContainer: {
    flexWrap: "nowrap",
  },
  item: {
    width: "48%",
    minWidth: 140,
  },
  desktopItem: {
    flex: 1,
    width: "auto",
  },
});
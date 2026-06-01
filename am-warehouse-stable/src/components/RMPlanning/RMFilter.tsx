import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { newoptions, options } from "../../types/TestValue";
import AMAutoComplete from "../custom/AMAutocomplete";
import RMTables from "./RMTables";
import { useLayout } from "../../layouts/AppLayoutProvider";
import AMExpoAutocomplete from "../custom/AMExpoAutocomplete";

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
          <AMExpoAutocomplete
            placeholder="Planning Doc No."
            data={newoptions}
            onSelect={() => { }}
          />
          
        </View>
        <View style={[styles.item, isDesktop && styles.desktopItem]}>
          <AMExpoAutocomplete
            placeholder="Unit name"
            data={newoptions}
            onSelect={() => { }}
          />
        </View>
        <View style={[styles.item, isDesktop && styles.desktopItem]}>
          <AMExpoAutocomplete
            placeholder="Department"
            data={newoptions}
            onSelect={() => { }}
          />
        </View>

        <View style={[styles.item, isDesktop && styles.desktopItem]}>
          <AMExpoAutocomplete
            placeholder="Shift"
            data={newoptions}
            onSelect={() => { }}
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
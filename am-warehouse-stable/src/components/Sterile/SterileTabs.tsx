import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Chip } from "react-native-paper";

type SterileProps = {
  onPress: (value: string) => void;
  isDesktop: boolean;
};

export default function SterileTabs({ onPress, isDesktop }: SterileProps) {
  const [value, setValue] = useState("receipt");
  const buttons = [
    { key: "receipt", label: "Receipt" },
    { key: "eto-in", label: "ETO-In" },
    { key: "eto-out", label: "ETO-Out" },
    { key: "transfer", label: "Transfer" },
  ];
  const chipWidth: number | `${number}%` =
    isDesktop
      ? `${100 / buttons.length}%`
      : "23%";
  const handleClick = (value: any) => {
    setValue(value);
    onPress(value)
  }
  return (
    <View>
      <View style={styles.container}>
        {buttons.map((btn) => {
          const isActive = value === btn.key;
          return (
            <Chip
              key={btn.key}
              selected={isActive}
              onPress={() => handleClick(btn.key)}
              style={[
                styles.chip,
                isActive && styles.activeChip, { width: chipWidth },
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10
  },
  card: {
    marginBottom: 40,
    padding: 10,
    borderRadius: 10
  },
  title: {
    paddingVertical: 10,
    fontWeight: "semibold",
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
  }, dashboardRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  chip: {
    flexDirection: "row",
    justifyContent: "center", 
    alignItems: "center", 
    borderColor: "#02B6B6",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  activeChip: {
    backgroundColor: "#02B6B6",
  },
  chipText: {
    color: "#02B6B6",
    fontSize: 12,
    textAlign: "center",
    width: "100%",
  },
  activeChipText: {
    color: "#fff",
  },
  desktopChip: {
    flex: 1,
    marginHorizontal: 4,
  },

})
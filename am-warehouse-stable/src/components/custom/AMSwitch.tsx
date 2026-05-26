import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Switch, TouchableRipple } from "react-native-paper";

type Props = {
  label?: string;
  value: boolean;
  onChange: (val: boolean) => void;
};

export default function AMSwitch({ label, value, onChange }: Props) {
  const toggle = () => onChange(!value);

  return (
    <TouchableRipple onPress={toggle} style={styles.container}>
      <View style={styles.row}>
        <Switch value={value} onValueChange={toggle} color="#02B6B6" />
        {label && <Text style={styles.label}>{label}</Text>}
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 11,
  },
});
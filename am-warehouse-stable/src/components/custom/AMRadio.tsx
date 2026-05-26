import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton, TouchableRipple } from "react-native-paper";

type Props = {
  label: string;
  value: string;
  selectedValue: string;
  onChange: (val: string) => void;
};

export default function AMRadio({
  label,
  value,
  selectedValue,
  onChange,
}: Props) {
  const isSelected = selectedValue === value;

  const handlePress = () => {
    onChange(value);
  };

  return (
    <TouchableRipple onPress={handlePress}>
      <View style={styles.row}>
        <RadioButton
          value={value}
          status={isSelected ? "checked" : "unchecked"}
          onPress={handlePress}
          color="#02B6B6"
        />
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    marginLeft: 4,
  },
});
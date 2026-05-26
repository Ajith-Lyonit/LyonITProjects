import React from "react";
import { View, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  value: string;
  placeholder?: string;
  setValue: (value: string) => void;
  list: Option[];
};

export default function AMSelect({
  value,
  placeholder,
  setValue,
  list,
}: Props) {
  const [isFocus, setIsFocus] = React.useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "#B0B0B0" }]}
        data={list}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        placeholderStyle={{ color: "#999" ,fontSize: 10}}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 0,
  },
  dropdown: {
    fontSize:12,
    height: 40,
    borderColor:'#D3D3D3',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    cursor:'pointer'
  },
});
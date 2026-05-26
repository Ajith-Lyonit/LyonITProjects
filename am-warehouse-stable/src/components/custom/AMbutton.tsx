import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableRipple, Icon, Menu } from "react-native-paper";

type Option = {
  label: string;
  value: string;
};

type Props = {
  title: string;
  onPress?: () => void;
  icon?: string;
  showDropdown?: boolean;
  options?: Option[];
  onSelect?: (value: string) => void;
};

export default function AMButton({
  title,
  onPress,
  icon,
  showDropdown = false,
  options = [],
  onSelect,
}: Props) {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handlePress = () => {
    if (showDropdown) {
      openMenu();
    } else {
      onPress && onPress();
    }
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <TouchableRipple style={styles.button} onPress={handlePress}>
          <View style={styles.content}>
            <Text style={styles.buttonText}>{title}</Text>

            {icon && <Icon source={icon} size={18} color="#000" />}

            {showDropdown && (
              <Icon source="chevron-down" size={18} color="#000" />
            )}
          </View>
        </TouchableRipple>
      }
    >
      {options.map((item) => (
        <Menu.Item
          key={item.value}
          title={item.label + item.value}
          onPress={() => {
            closeMenu();
            onSelect && onSelect(item.value);
          }}
        />
      ))}
    </Menu>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#02B6B6",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
    textAlign:'center'
  },
});
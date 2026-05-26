import React, { useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";

type Props = {
  label?: string;
  value?: Date | null;
  onChange: (date: Date | null) => void;
};

export default function AMDatePicker({
  label,
  value,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };

  const isValidDate = (text: string) => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (!regex.test(text)) return false;

    const [d, m, y] = text.split("/").map(Number);
    const date = new Date(y, m - 1, d);

    return (
      date.getDate() === d &&
      date.getMonth() === m - 1 &&
      date.getFullYear() === y
    );
  };

  const parseDate = (text: string): Date | null => {
    if (!isValidDate(text)) return null;
    const [d, m, y] = text.split("/").map(Number);
    return new Date(y, m - 1, d);
  };
  const handleChange = (text: string) => {
    let cleaned = text.replace(/\D/g, "");

    if (cleaned.length > 8) return;

    let formatted = "";

    if (cleaned.length <= 2) {
      formatted = cleaned;
    } else if (cleaned.length <= 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    } else {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
    }

    setInputValue(formatted);

    if (formatted.length === 10) {
      const parsed = parseDate(formatted);
      onChange(parsed);
    } else {
      onChange(null);
    }
  };

  React.useEffect(() => {
    if (value) {
      setInputValue(formatDate(value));
    }
  }, [value]);

  return (
    <View>
      <TextInput
        mode="outlined"
        label={label}
        value={inputValue}
        placeholder="dd/mm/yyyy"
        keyboardType="numeric"
        dense
        style={{
          fontSize: 12,
          height: 40,
        }}
        contentStyle={{
          paddingVertical: 4,
        }}
        onChangeText={handleChange}
        error={inputValue.length === 10 && !isValidDate(inputValue)}
        outlineColor="#D3D3D3"
        activeOutlineColor="#B0B0B0"
        right={
          <TextInput.Icon
            icon="calendar"
            onPress={() => setOpen(true)}
          />
        }
      />
      <DatePickerModal
        mode="single"
        locale="en-IN"
        visible={open}
        onDismiss={() => setOpen(false)}
        date={value || undefined}
        onConfirm={({ date }) => {
          setOpen(false);
          onChange(date ?? null);
          setInputValue(formatDate(date ?? null));
        }}
      />
    </View>
  );
}
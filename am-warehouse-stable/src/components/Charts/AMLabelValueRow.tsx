import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Item = {
  label: string;
  value: string | number;
  bgColor?: string;
  valueColor?: string;
};

type Props = {
  data: Item[];
  height?: number;
  borderColor?: string;
};

export default function AMQuarterStrip({
  data,
  height = 50,
  borderColor = "#000",
}: Props) {
  return (
    <View style={[styles.container, { borderColor }]}>
      {data.map((item, index) => {
        const isLastItem = index === data.length - 1;

        return (
          <React.Fragment key={index}>
            {/* LABEL BOX */}
            <View
              style={[
                styles.box,
                {
                  backgroundColor: item.bgColor || "#fff",
                  borderRightWidth: 1,
                  borderColor,
                  height,
                },
              ]}
            >
              <Text style={styles.label}>{item.label}</Text>
            </View>

            <View
              style={[
                styles.box,
                {
                  backgroundColor: "#fff",
                  borderRightWidth: isLastItem ? 0 : 1,
                  borderColor,
                  height,
                },
              ]}
            >
              <Text
                style={[
                  styles.value,
                  { color: item.valueColor || "#111" },
                ]}
              >
                {item.value}
              </Text>
            </View>
          </React.Fragment>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    overflow: "hidden",
    width: "100%",
  },
  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 15,
    fontWeight:'bold',
    color: "#111",
  },
  value: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayout } from "../../layouts/AppLayoutProvider";

type Item = {
  label: string;
  screen?: string;
};

type Props = {
  items: Item[];
};

export default function AMBreadcrumb({ items }: Props) {
  const navigation = useNavigation();
  const { isDesktop } = useLayout();

  return (
    isDesktop && (
      <View style={styles.floatingWrapper}>
        <View style={styles.container}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <View key={index} style={styles.row}>
                <Pressable
                  disabled={!item.screen}
                  onPress={() =>
                    item.screen &&
                    navigation.navigate(item.screen as never)
                  }
                >
                  <Text style={[styles.text, isLast && styles.active]}>
                    {item.label}
                  </Text>
                </Pressable>

                {!isLast && <Text style={styles.sep}>›</Text>}
              </View>
            );
          })}
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  floatingWrapper: {
    position: "absolute",
    top: 18,
    left: 10,
    zIndex: 9999,
    elevation: 9999,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 13,
    color: "#666",
  },
  active: {
    color: "#000",
  },
  sep: {
    marginHorizontal: 8,
    color: "#999",
    fontSize: 16,
  },
});
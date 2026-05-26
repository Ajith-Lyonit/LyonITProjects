import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import AMAutoComplete from "../custom/AMAutocomplete";
import { options } from "../../types/TestValue";

type JobListCardProps = {
  onPress?: () => void
}

export default function JobListCard({ onPress }: JobListCardProps) {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const toggleCheck = (id: number) => {
    setCheckedItems((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  return (
    <View style={styles.container}>

      {/* Fixed Header */}
      <View style={styles.headerWrapper}>
        <View style={styles.headerRow}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleHead}>To-Do List</Text>
          </View>

          <View style={styles.autoCompleteContainer}>
            <AMAutoComplete
              label="Department"
              list={options}
              value={""}
              onChange={(val: string) => { }}
            />
          </View>
        </View>
      </View>

      {/* Scrollable List */}
      <ScrollView
        contentContainerStyle={styles.content}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
          const checked = checkedItems.includes(item);

          return (
            <View key={item} style={styles.jobcard}>

              {/* Row 1 */}
              <View style={styles.row}>
                <Text style={styles.docText}>PD No. 106741</Text>
                <Text style={styles.dateText}>16 Feb 2026</Text>
              </View>

              {/* Row 2 */}
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => { toggleCheck(item); onPress?.() }}
                >
                  <View
                    style={[
                      styles.checkbox,
                      checked && styles.checkedBox,
                    ]}
                  />

                  <Text style={styles.itemText}>
                    Item Name PRINTED PAPER GAUZE SWAB 2's
                  </Text>
                </TouchableOpacity>

                <Text style={styles.valueText}>
                  {item * 100}kg
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerWrapper: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: "#fff",
    zIndex: 10,
  },

  content: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },

  jobcard: {
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#02B6B6",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  docText: {
    fontSize: 13,
    fontWeight: "600",
  },

  dateText: {
    fontSize: 12,
    color: "#666",
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#02B6B6",
    borderRadius: 4,
    marginRight: 8,
  },

  checkedBox: {
    backgroundColor: "#02B6B6",
  },

  itemText: {
    fontSize: 13,
    flexShrink: 1,
  },

  valueText: {
    fontSize: 13,
    fontWeight: "600",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 10,
  },

  titleContainer: {
    flex: 3,
  },

  autoCompleteContainer: {
    flex: 1,
  },

  titleHead: {
    fontSize: 14,
    fontWeight: "700",
  },
});
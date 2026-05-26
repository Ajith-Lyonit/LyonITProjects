import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AMAutoComplete from "../../custom/AMAutocomplete";
import { options } from "../../../types/TestValue";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";

type NavProps = NativeStackNavigationProp<RootStackParamList>;

export default function RecieptCard() {
  const [value, setValue] = useState("")
  
const navigation = useNavigation<NavProps>();
  return (
    <ScrollView
      style={styles.container}
      nestedScrollEnabled
      showsVerticalScrollIndicator
    >
      <AMAutoComplete
        placeholder="Item name"
        value={value}
        list={options}
        onChange={(val) => setValue(val)}
      />
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <TouchableOpacity key={item} style={styles.jobcard} onPress={() =>
       navigation.navigate("steriledocument", { docNo: "2229 1036 6575" })
        }>
          <View style={styles.row}>
            <Text>ITR No: 2229 1036 6575</Text>
            <Text>16 Feb 2026</Text>
          </View>
          <View style={styles.row}>
            <Text>Item Received Qty : 250</Text>
            <Text style={styles.partial}>Partially Receipt</Text>
          </View>

        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    elevation: 4,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
  },
  jobcard: {
    paddingHorizontal: 12,
    paddingVertical: 15,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#CECECE",
    gap: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  partial: {
    color: "#E67E22",
    fontWeight: "600",
  },
});
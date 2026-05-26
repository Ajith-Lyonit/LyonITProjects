// import React, { useState } from "react";
// import {
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Pressable,
// } from "react-native";
// import { TextInput, List } from "react-native-paper";

// type Option = {
//   label: string;
//   value: string;
// };

// type Props = {
//   label?: string;
//   value: string;
//   onChange: (val: string) => void;
//   list: Option[];
//   placeholder?: string;
// };

// export default function AMAutoComplete({
//   label,
//   value,
//   onChange,
//   list,
//   placeholder,
// }: Props) {
//   const [visible, setVisible] = useState(false);

//   const filtered = list.filter((item) =>
//     item.label.toLowerCase().includes(value.toLowerCase())
//   );

//   return (
//     <View style={{ width: "100%" }}>
      
//       {/* 🔥 OUTSIDE CLICK OVERLAY */}
//       {visible && (
//         <Pressable
//           style={StyleSheet.absoluteFillObject}
//           onPress={() => setVisible(false)}
//         />
//       )}

//       <TextInput
//         mode="outlined"
//         label={label}
//         value={value}
//         placeholder={placeholder}
//         dense
//         style={{ fontSize: 12, height: 40 }}
//         contentStyle={{ paddingVertical: 4 }}
//         onFocus={() => setVisible(true)}
//         onChangeText={(text) => {
//           onChange(text);
//           setVisible(true);
//         }}
//         right={<TextInput.Icon icon="magnify" />}
//         outlineColor="#D3D3D3"
//         activeOutlineColor="#B0B0B0"
//       />

//       {visible && filtered.length > 0 && (
//         <View style={styles.dropdown}>
//           {filtered.map((item) => (
//             <TouchableOpacity
//               key={item.value}
//               onPress={() => {
//                 onChange(item.label);
//                 setVisible(false);
//               }}
//             >
//               <List.Item title={item.label} />
//             </TouchableOpacity>
//           ))}
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   dropdown: {
//     position: "absolute",
//     top: 55,
//     zIndex: 1000,
//     elevation: 5,
//     width: "100%",
//     backgroundColor: "white",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderTopWidth: 0,
//     maxHeight: 200,
//   },
// });

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import { TextInput, List } from "react-native-paper";

type Option = {
  label: string;
  value: string;
};

type Props = {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  list: Option[];
  placeholder?: string;
};

export default function AMAutoComplete({
  label,
  value,
  onChange,
  list,
  placeholder,
}: Props) {
  const [visible, setVisible] = useState(false);

  const filtered = list.filter((item) =>
    item.label.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <View style={styles.wrapper}>
      {visible && (
        <Pressable
          style={StyleSheet.absoluteFillObject}
          onPress={() => setVisible(false)}
        />
      )}

      <TextInput
        mode="outlined"
        label={label}
        value={value}
        placeholder={placeholder}
        dense
        style={{ fontSize: 12, height: 40 }}
        contentStyle={{ paddingVertical: 4 }}
        onFocus={() => setVisible(true)}
        onChangeText={(text) => {
          onChange(text);
          setVisible(true);
        }}
        right={<TextInput.Icon icon="magnify" />}
        outlineColor="#D3D3D3"
        activeOutlineColor="#B0B0B0"
      />

      {visible && filtered.length > 0 && (
        <View style={styles.dropdown}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
          >
            {filtered.map((item) => (
              <TouchableOpacity
                key={item.value}
                onPress={() => {
                  onChange(item.label);
                  setVisible(false);
                }}
              >
                <List.Item title={item.label} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    zIndex: 9999,
    elevation: 9999,
    position: "relative",
  },
  dropdown: {
    position: "absolute",
    top: 55,
    left: 0,
    right: 0,
    zIndex: 9999,
    elevation: 9999,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderTopWidth: 0,
    maxHeight: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
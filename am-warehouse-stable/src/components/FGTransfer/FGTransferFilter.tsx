import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { fgcols, fgdata, newoptions, options } from "../../types/TestValue";
import AMDatePicker from "../../components/custom/AMDatepicker";
import AMDataTable from "../../components/custom/AMDataTable";
import { useLayout } from "../../layouts/AppLayoutProvider";
import AMBottomPopup from "../custom/AMPopup";
import FGInfocard from "./FGPopup";
import AMExpoAutocomplete from "../custom/AMExpoAutocomplete";

export default function FGTransferFilter() {
  const [value, setValue] = useState("");
  const { isDesktop, appConf } = useLayout();

  const getFieldStyle = (isFullWidth = false) => {
    if (isDesktop) return styles.desktopField;
    if (isFullWidth) return styles.fullWidthMobile;
    return styles.mobileField;
  };
  const [popState, setPopState] = useState({
    visible: false,
    data: null as any
  })

  return (
    <View>
      <Text style={styles.title}>FG Transfer</Text>
      <View style={[styles.container, isDesktop && styles.desktopRow]}>
        <View style={[styles.field, getFieldStyle()]}>
          <AMExpoAutocomplete
            placeholder="Planning Doc No."
            data={newoptions  }
            onSelect={(val) => {}}
          />
        </View>
        <View style={[styles.field, getFieldStyle()]}>
          <AMExpoAutocomplete
            placeholder="BAGALUR b1"
            data={newoptions  }
            onSelect={(val) => {}}
          />
        </View>
        <View style={[styles.field, getFieldStyle()]}>
          <AMExpoAutocomplete
            placeholder="BLISTER"
            data={newoptions  }
            onSelect={(val) => {}}
          />
        </View>
        <View style={[styles.field, getFieldStyle()]}>
          <AMExpoAutocomplete
            placeholder="day Shift"
            data={newoptions }
            onSelect={(val) => {}}
          />
        </View>
        <View style={[styles.field, getFieldStyle()]}>
          <AMDatePicker onChange={(val) => console.log(val)} />
        </View>
        <View style={[styles.field, getFieldStyle()]}>
          <AMDatePicker onChange={(val) => console.log(val)} />
        </View>
        <View style={[styles.field, getFieldStyle(true)]}>
          <AMExpoAutocomplete
            placeholder="Item Wise"
            data={newoptions  }
            onSelect={(val) => {}}
          />
        </View>
      </View>
      <AMDataTable
        onPress={(row) => setPopState({
          visible: true,
          data: row
        })}
        amCheckbox={true}
        columns={fgcols}
        data={fgdata}
        isDesktop={isDesktop}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
        <TouchableOpacity
          style={[styles.btn, { width: isDesktop ? "30%" : "50%" }]}
          onPress={() => { }}
        >
          <Text style={styles.btnText}>FG Transfer</Text>
        </TouchableOpacity>
      </View>
      <AMBottomPopup visible={popState.visible} onClose={() => setPopState({
        visible: false,
        data: null
      })} isDesktop={isDesktop} appConf={appConf}>
        <FGInfocard />
      </AMBottomPopup>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingBottom: 20,
  },
  desktopRow: {
    alignItems: "center",
  },
  desktopField: {
    flex: 1,
    minWidth: 160,
  },
  mobileField: {
    width: "48%",
  },
  fullWidthMobile: {
    width: "100%",
  },

  field: {
    marginBottom: 4,
  },
  btn: {
    backgroundColor: "#02B6B6",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});

import { View, StyleSheet, Text } from "react-native";
import AMGaugeChart from "../../Charts/AMGaugeChart";
import AMQuarterStrip from "../../Charts/AMLabelValueRow";
import { IconButton } from "react-native-paper";

type DashGaugeprops = {
  isDesktop: boolean
}

export default function AMDashboardGauge({ isDesktop }: DashGaugeprops) {

  return (
    <View style={[styles.container, { paddingBottom: isDesktop ? 50 : 0 }, { borderColor: isDesktop ? '#02B6B6' : '#fff' }]}>
      <View style={styles.chartcont}>
        <Text style={styles.title}>Purchase Against COGS</Text>
        <IconButton icon={'dots-vertical'} />
      </View>
      <View
        style={[
          styles.row,
          !isDesktop ? styles.column : styles.rowDesktop,
        ]}
      >
        <View style={[styles.left, !isDesktop && styles.full]}>
          <AMGaugeChart color="#FFA1A2" label="64.00 L" value={80} gstroke={!isDesktop ? 50 : 70} gsize={!isDesktop ? 200 : 300} />
          <Text style={{ marginVertical: 10, fontWeight: 'medium', fontSize: 14 }}>COGS - 80.00 L</Text>
        </View>
        <View style={[styles.right, {
          paddingHorizontal: isDesktop ? 40 : 0
        }, !isDesktop && styles.full]}>
          <View style={styles.innerGrid}>
            <View>
              <AMGaugeChart
                gfontsize={!isDesktop ? 15 : 22}
                gstroke={!isDesktop ? 15 : 50}
                gsize={!isDesktop ? 100 : 200}
                color="#FFA1A2" label="6 L"
                value={65} />
              <View style={{ flexDirection: "column", alignItems: "center", justifyContent: 'center', marginVertical: 10 }}>
                <Text style={{ fontSize: 14 }}>
                  April Purchase
                </Text>
                <Text style={{ fontSize: 14 }}> (COGS 10 L)</Text>
              </View>
            </View>
            <View>
              <AMGaugeChart
                gfontsize={!isDesktop ? 15 : 22}
                gstroke={!isDesktop ? 15 : 50}
                gsize={!isDesktop ? 100 : 200}
                color="#F6D623"
                label="10 L"
                value={94} />
              <View style={{ flexDirection: "column", alignItems: "center", justifyContent: 'center', marginVertical: 10 }}>
                <Text style={{ fontSize: 14 }}>
                  Q1 Purchase
                </Text>
                <Text style={{ fontSize: 14 }}> (COGS 30 L)</Text>
              </View>
            </View>
            <View>
              <AMGaugeChart
                gfontsize={!isDesktop ? 15 : 22}
                gstroke={!isDesktop ? 15 : 50}
                gsize={!isDesktop ? 100 : 200}
                color="#84ED86"
                label="12.3 L"
                value={100} />
              <View style={{ flexDirection: "column", alignItems: "center", justifyContent: 'center', marginVertical: 10 }}>
                <Text style={{ fontSize: 14 }}>
                  YTD Purchase
                </Text>
                <Text style={{ fontSize: 14 }}> (COGS 12.3 L)</Text>
              </View>
            </View>
          </View>
          <AMQuarterStrip
            data={[
              { label: "Q1", value: "10L", bgColor: "#84ED86" },
              { label: "Q2", value: "8L", bgColor: "#F6D623" },
              { label: "Q3", value: "2L", bgColor: "#FFA1A2" },
              { label: "Q4", value: "0L", bgColor: "#CECECE" },
            ]}
          />
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
  },
  chartcont: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }, title: {
    paddingVertical: 10,
    fontWeight: "semibold",
  },
  row: {
    flex: 1,
  },
  rowDesktop: {
    flexDirection: "row"
  },
  column: {
    flexDirection: "column"
  },
  left: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  right: {
    flex: 7,
  },
  innerGrid: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  full: {
    flex: 1,
  },
});
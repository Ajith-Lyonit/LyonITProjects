import { View, StyleSheet, useWindowDimensions, TouchableOpacity, Text } from "react-native";
import PendingCard from "../../components/Production/PendingCards";
import PendingRequestCard from "../../components/Production/RequestCard";
import ListCard from "../../components/Production/ListCards";
import JobListCard from "../../components/Production/JobList";
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
import { useLayout } from "../../layouts/AppLayoutProvider";
import AMBottomPopup from "../../components/custom/AMPopup";
import AsPerSoCustomerWise from "../../components/JobPlanning/Aspersocustomerwise";
import AMAutoComplete from "../../components/custom/AMAutocomplete";

export default function DashboardScreen() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const [search, setSearch] = useState("");
  const { isDesktop, appConf } = useLayout()
  const [enabled, setEnabled] = useState(false);
  const [popupState, setPopupState] = useState({
    visible: false,
    view: "list",
    data: null as any,
  });
  const PendList = [
    {
      image: require('../../../assets/p1.png'),
      title: 'Planning',
      screen: 'planning',
    },
    {
      image: require('../../../assets/p2.png'),
      title: 'RM Planning',
      screen: 'rmplanning',
    },
    {
      image: require('../../../assets/p3.png'),
      title: 'Job Card',
      screen: 'jobcard'
    },
    {
      image: require('../../../assets/p4.png'),
      title: 'Labels',
      screen: 'labelprinting'
    },
    {
      image: require('../../../assets/p5.png'),
      title: 'FG Transfer',
      screen: 'fgtransfer'
    },
    {
      image: require('../../../assets/p6.png'),
      title: 'Sterile',
      screen: 'sterile'
    },
    {
      image: require('../../../assets/p7.png'),
      title: 'BOM',
      screen: 'bom'
    },
    {
      image: require('../../../assets/p8.png'),
      title: 'Dashboard',
      screen: 'dashboard'
    }
  ];
  return (
    <View>
      <View style={{ paddingHorizontal: 10, paddingTop: 8 }}>
      </View>
      <View style={styles.row}>
        <View style={styles.cardWrapper}>
          <PendingCard title="SO Pending" isDesktop={isDesktop} />
        </View>
        <View style={styles.cardWrapper}>
          <PendingRequestCard title="Pending Request" />
        </View>
      </View>
      <View
        style={[
          styles.container,
          isDesktop && styles.desktopContainer
        ]}
      >
        {PendList.map((item, index) => (
          <ListCard
            isDesktop={isDesktop}
            key={index}
            title={item.title}
            image={item.image}
            onpress={() => navigation.navigate(item.screen as never)}
          />
        ))}
      </View>
      <View style={{ height: 200 }}>
        <JobListCard onPress={() => setPopupState({ visible: true, view: "list", data: null })}></JobListCard>
      </View>
      <AMBottomPopup
        appConf={appConf}
        isDesktop={isDesktop}
        visible={popupState.visible}
        onClose={() =>
          setPopupState((prev) => ({ ...prev, visible: false }))
        }
      >
        {popupState.view === "list" && (
          <View>
            <AsPerSoCustomerWise
              onPress={(row) => {
                setPopupState((prev) => ({
                  ...prev,
                  view: "edit",
                  visible: true,
                  data: row,
                }));
              }}
              isDesktop={isDesktop}
            />

            <View style={styles.updateButtonContainer}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => setPopupState((prev) => ({ ...prev, view: "list" }))}
              >
                <Text style={styles.btnText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {popupState.view === "edit" && (
          <View >
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>RM Name</Text>
              <Text>{popupState.data.rmName}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>Product ID</Text>
              <Text>I00927</Text>
            </View>
            <View style={{ width: "100%" }}>
              <AMAutoComplete
                label="product Name"
                value={search}
                onChange={setSearch}
                list={[]}
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>Alternate RM</Text>
              <Text>I00928</Text>
            </View>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => setPopupState((prev) => ({ ...prev, view: "list" }))}
            >
              <Text style={styles.btnText}>Update</Text>
            </TouchableOpacity>
          </View>
        )}

      </AMBottomPopup>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
  },
  cardWrapper: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: '100%',
    marginVertical: 14,
    flex: 1
  },
  desktopContainer: {
    flexWrap: "nowrap",
    justifyContent: "space-between",
  },
  updateButtonContainer: {
    width: "30%",
    alignSelf: "center",
    marginTop: 20,
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
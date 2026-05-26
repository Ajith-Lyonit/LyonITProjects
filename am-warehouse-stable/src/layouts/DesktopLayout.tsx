import { useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import DeskHeader from "../navigation/DeskHeader";
import RightDrawer from "../components/AppDrawer";
import AMBreadcrumb from "../components/custom/AMBreadcrumb";

interface DesktopLayoutProps {
  onLogout?: () => void;
  children: React.ReactNode;
  breadcrumbItems?: {
    label: string;
    screen?: string;
  }[];
  title?: string;
}

export default function DesktopLayout({
  onLogout,
  children,
  breadcrumbItems = [],
  title = "LynQ Production",
}: DesktopLayoutProps) {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <DeskHeader onMenuClick={() => setDrawerVisible(true)} />

        <View style={styles.topSection}>
          <View style={styles.topContent}>
            {breadcrumbItems.length > 0 && (
              <AMBreadcrumb items={breadcrumbItems} />
            )}

            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentWrapper}>
          {children}
        </View>
      </ScrollView>

      {drawerVisible && (
        <RightDrawer
          visible={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          isDesktop={true}
          onLogout={onLogout!}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    width: "100%",
    zIndex: 10,
  },

  topSection: {
    width: "100%",
    paddingTop: 0,
    paddingHorizontal: 2,
  },
  topContent: {
    maxWidth: 1300,
    width: "100%",
    alignSelf: "center",
  },
  body: {
    paddingTop: 0,
    paddingHorizontal: 16,
    paddingBottom: 0,

    maxWidth: 1300,
    alignSelf: "center",
    width: "100%",

    overflow: "visible",
  },

  contentWrapper: {
    position: "relative",
    overflow: "visible",
  },

  title: {
    fontSize: 23,
    fontWeight: "600",
    color: "#02B6B6",
    textAlign: "center",
    paddingVertical: 20,
  },
});
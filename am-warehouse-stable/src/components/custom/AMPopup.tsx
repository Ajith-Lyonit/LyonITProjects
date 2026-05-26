import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { Modal, Portal, IconButton } from "react-native-paper";
import { Appsettings } from "../../layouts/AppSettings";

type Props = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isDesktop: boolean;
  appConf: Appsettings;
};

export default function AMBottomPopup({
  visible,
  onClose,
  children,
  isDesktop,
  appConf,
}: Props) {
  const { height } = useWindowDimensions();

  const maxPopupHeight = height * 0.8;

  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (visible) {
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({
          y: 0,
          animated: false,
        });
      });
    }
  }, [visible]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={[
          styles.overlay,
          {
            width: isDesktop
              ? appConf.layoutContainerWidth
              : "100%",
          },
        ]}
      >
        <View
          style={[
            styles.container,
            {
              maxHeight: maxPopupHeight,
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.handle} />

            <IconButton
              icon="close"
              size={20}
              onPress={onClose}
              style={styles.closeBtn}
            />
          </View>

          {/* Content */}
          <ScrollView
            ref={scrollRef}
            showsVerticalScrollIndicator={true}
            persistentScrollbar={true}
            nestedScrollEnabled
            keyboardShouldPersistTaps="handled"
            scrollEventThrottle={16}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.contentWrapper}>
              {children}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "flex-end",
    margin: 0,
  },

  container: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
  },

  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },

  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#ccc",
    borderRadius: 2,
  },

  closeBtn: {
    position: "absolute",
    right: 0,
    top: -6,
    backgroundColor: "#f2f2f2",
  },

  scrollView: {
    flexGrow: 0,
  },

  scrollContent: {
    paddingBottom: 20,
    flexGrow: 1,
    justifyContent: "flex-start",
  },

  contentWrapper: {
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
});
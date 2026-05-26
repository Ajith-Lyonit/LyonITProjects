import { View, Text, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect } from "react";

export default function AmBarcodeScanner({ navigation }: any) {
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  if (!permission) return <View />;
  if (!permission.granted) {
    return <Text>No camera permission</Text>;
  }

  const handleScan = ({ data }: any) => {
    // send scanned value back
    navigation.navigate("steriledocument", { docNo: data });
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "code128", "ean13"],
        }}
        onBarcodeScanned={handleScan}
      />
    </View>
  );
}
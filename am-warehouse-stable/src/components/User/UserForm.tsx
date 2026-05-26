import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import {
  TextInput,
  Button,
  Text,
  Avatar,
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

export default function UserForm() {
  const [form, setForm] = useState({
    name: "",
    employeeId: "",
    department: "",
    location: "",
    mobile: "",
    email: "",
    address: "",
    pincode: "",
    state: "Tamilnadu",
  });

  const [photo, setPhoto] = useState<string | null>(null);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    console.log(form);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>User Form</Text>

      <TouchableOpacity style={styles.photoContainer} onPress={pickImage}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.photo} />
        ) : (
          <Avatar.Icon size={100} icon="camera" />
        )}
        <Text style={styles.photoText}>Upload Photo</Text>
      </TouchableOpacity>

      <TextInput
        label="Name *"
        mode="outlined"
        value={form.name}
        onChangeText={(text) => handleChange("name", text)}
        style={styles.input}
      />

      <TextInput
        label="Employee ID *"
        mode="outlined"
        value={form.employeeId}
        onChangeText={(text) => handleChange("employeeId", text)}
        style={styles.input}
      />

      <TextInput
        label="Department *"
        mode="outlined"
        value={form.department}
        onChangeText={(text) => handleChange("department", text)}
        style={styles.input}
      />

      <TextInput
        label="Location / Unit *"
        mode="outlined"
        value={form.location}
        onChangeText={(text) => handleChange("location", text)}
        style={styles.input}
      />

      <TextInput
        label="Mobile Number *"
        mode="outlined"
        keyboardType="phone-pad"
        value={form.mobile}
        onChangeText={(text) => handleChange("mobile", text)}
        style={styles.input}
      />

      <TextInput
        label="Email *"
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
        style={styles.input}
      />

      <TextInput
        label="House no., Street *"
        mode="outlined"
        multiline
        numberOfLines={3}
        value={form.address}
        onChangeText={(text) => handleChange("address", text)}
        style={styles.input}
      />

      <TextInput
        label="Pincode"
        mode="outlined"
        keyboardType="numeric"
        value={form.pincode}
        onChangeText={(text) => handleChange("pincode", text)}
        style={styles.input}
      />

      <TextInput
        label="State"
        mode="outlined"
        editable={false}
        value={form.state}
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
      >
        Submit
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },

  photoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  photoText: {
    marginTop: 8,
    fontSize: 14,
  },

  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
  },

  button: {
    marginTop: 10,
    paddingVertical: 6,
  },
});
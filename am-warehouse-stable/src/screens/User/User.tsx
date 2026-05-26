import { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    useWindowDimensions,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import AMButton from "../../components/custom/AMbutton";
import Toast from "react-native-toast-message";

export default function UserRegistration() {
    const { width } = useWindowDimensions();

    const isDesktop = width >= 800;

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

    const handleChange = (key: string, value: string) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = () => {
        Toast.show({
            type: "success",
            text1: "Success",
            text2: "User created successfully",
        });
    };

    const topHeight = isDesktop ? 260 : 170;

    return (
        <View style={styles.container}>
            {/* TOP IMAGE */}
            <View style={[styles.topWrapper, { height: topHeight }]}>
                <Image
                    source={require("../../../assets/splash/deskarcup.png")}
                    style={styles.topImage}
                    resizeMode={isDesktop ? "contain" : "cover"}
                />

                <View style={styles.titleOverlay}>
                    <Text style={styles.title}>
                        User Registration
                    </Text>
                </View>
            </View>

            {/* FORM */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.formContainer}>

                    {/* Row 1 */}
                    <View style={styles.formRow}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Name*</Text>

                            <TextInput
                                mode="outlined"
                                placeholder="Enter name"
                                value={form.name}
                                onChangeText={(val) =>
                                    handleChange("name", val)
                                }
                                style={styles.input}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>
                                Employee ID*
                            </Text>

                            <TextInput
                                mode="outlined"
                                placeholder="Enter employee ID"
                                value={form.employeeId}
                                onChangeText={(val) =>
                                    handleChange("employeeId", val)
                                }
                                style={styles.input}
                            />
                        </View>
                    </View>

                    {/* Row 2 */}
                    <View style={styles.formRow}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>
                                Department*
                            </Text>

                            <TextInput
                                mode="outlined"
                                placeholder="Enter department"
                                value={form.department}
                                onChangeText={(val) =>
                                    handleChange("department", val)
                                }
                                style={styles.input}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>
                                Location/Unit*
                            </Text>

                            <TextInput
                                mode="outlined"
                                placeholder="Enter location/unit"
                                value={form.location}
                                onChangeText={(val) =>
                                    handleChange("location", val)
                                }
                                style={styles.input}
                            />
                        </View>
                    </View>

                    {/* Row 3 */}
                    <View style={styles.formRow}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>
                                Mobile Number*
                            </Text>

                            <TextInput
                                mode="outlined"
                                placeholder="Enter mobile number"
                                keyboardType="phone-pad"
                                value={form.mobile}
                                onChangeText={(val) =>
                                    handleChange("mobile", val)
                                }
                                style={styles.input}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email*</Text>

                            <TextInput
                                mode="outlined"
                                placeholder="Enter email"
                                keyboardType="email-address"
                                value={form.email}
                                onChangeText={(val) =>
                                    handleChange("email", val)
                                }
                                style={styles.input}
                            />
                        </View>
                    </View>

                    {/* Row 4 */}
                    <View style={styles.formRow}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>
                                Address*
                            </Text>

                            <TextInput
                                mode="outlined"
                                placeholder="House no., Street"
                                multiline
                                numberOfLines={3}
                                value={form.address}
                                onChangeText={(val) =>
                                    handleChange("address", val)
                                }
                                style={styles.addressInput}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>
                                Pincode
                            </Text>

                            <TextInput
                                mode="outlined"
                                placeholder="Enter pincode"
                                keyboardType="numeric"
                                value={form.pincode}
                                onChangeText={(val) =>
                                    handleChange("pincode", val)
                                }
                                style={styles.input}
                            />

                            <Text style={styles.label}>
                                State
                            </Text>

                            <TextInput
                                mode="outlined"
                                value={form.state}
                                editable={false}
                                style={styles.input}
                            />
                        </View>
                    </View>

                    {/* Upload Photo */}
                    <View style={styles.photoWrapper}>
                        <TouchableOpacity style={styles.photoBox}>
                            <MaterialIcons
                                name="add-a-photo"
                                size={34}
                                color="#02B6B6"
                            />
                        </TouchableOpacity>

                        <Text style={styles.photoText}>
                            Upload Photo
                        </Text>
                    </View>

                    {/* Button */}
                    <View style={styles.buttonWrapper}>
                        <AMButton
                            title="Create User"
                            onPress={handleSubmit}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    topWrapper: {
        width: "100%",
        position: "relative",
    },

    topImage: {
        width: "100%",
        height: "100%",
    },

    titleOverlay: {
        position: "absolute",
        top: "28%",
        left: 0,
        right: 0,
        alignItems: "center",
    },

    title: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "600",
    },

    scrollContent: {
        paddingBottom: 40,
    },

    formContainer: {
        width: "100%",
        alignSelf: "center",
        maxWidth:1000,
        marginTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 30,
    },

    photoWrapper: {
        alignItems: "center",
        marginBottom: 25,
    },

    photoBox: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderStyle: "dashed",
        borderColor: "#02B6B6",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FFFF",
    },

    photoText: {
        marginTop: 10,
        fontSize: 14,
        color: "#02B6B6",
        fontWeight: "600",
    },

    label: {
        fontSize: 14,
        color: "#222",
        marginBottom: 6,
        fontWeight: "500",
    },

    input: {
        marginBottom: 16,
        backgroundColor: "#fff",
    },

    addressInput: {
        marginBottom: 16,
        backgroundColor: "#fff",
        minHeight: 90,
    },

    buttonWrapper: {
        marginTop: 10,
    },
    formRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 14,
        marginBottom: 8,
    },

    inputContainer: {
        flex: 1,
    },
});
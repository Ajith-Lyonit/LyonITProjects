// // JobFilter.tsx
// import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
// import { useState } from "react";
// import { newoptions } from "../../types/TestValue";
// import AsPerSo from "../../components/JobPlanning/ASperso";
// import AsPerMin from "../../components/JobPlanning/ASpermin";
// import AMDatePicker from "../custom/AMDatepicker";
// import AMSelect from "../custom/AMSelect";
// import { useGridColumns, getGridWidth } from "../../utils/Grid";
// import AMSwitch from "../custom/AMSwitch";
// import AMBottomPopup from "../custom/AMPopup";
// import AsPerSoCustomerWise from "./Aspersocustomerwise";
// import { useLayout } from "../../layouts/AppLayoutProvider";
// import AMExpoAutocomplete from "../custom/AMExpoAutocomplete";

// export default function JobFilter() {
//     const [enabled, setEnabled] = useState(true);
//     const [opt, setOpt] = useState(false);
//     const columns = useGridColumns();
//     const { isDesktop, appConf } = useLayout();
//     const [popupState, setPopupState] = useState({
//         visible: false,
//         view: "list",
//         data: null as any,
//     });
//     return (
//         <View>
//             <Text style={styles.title}>Planning</Text>
//             <View style={styles.container}>
//                 <View style={[styles.field, getGridWidth(columns)]}>
//                     <AMExpoAutocomplete placeholder="Unit Name" onSelect={() => { }} data={newoptions} />
//                 </View>
//                 <View style={[styles.field, getGridWidth(columns)]}>
//                     <AMExpoAutocomplete placeholder="Department" onSelect={() => { }} data={newoptions} />
//                 </View>
//                 <View style={[styles.field, getGridWidth(columns)]}>
//                     <AMExpoAutocomplete placeholder="Shift" onSelect={() => { }} data={newoptions} />
//                 </View>
//                 <View style={[styles.field, getGridWidth(columns)]}>
//                     <View style={styles.switchContainer}>
//                         <AMSwitch
//                             label={enabled ? "As per SO" : "As per Min. Stock"}
//                             value={enabled}
//                             onChange={setEnabled}
//                         />
//                     </View>
//                 </View>
//                 <View style={[styles.field, getGridWidth(columns)]}>
//                     <AMDatePicker onChange={(val) => console.log(val)} />
//                 </View>
//                 <View style={[styles.field, getGridWidth(columns)]}>
//                     <AMDatePicker onChange={(val) => console.log(val)} />
//                 </View>
//                 {enabled && (
//                     <View style={[styles.field, getGridWidth(columns, 1)]}>
//                         <AMSelect
//                             label="Mode"
//                             value={opt ? "item" : "customer"}
//                             setValue={(val: string) => setOpt(val === "item")}
//                             list={[
//                                 { label: "Customer Wise", value: "customer" },
//                                 { label: "Item Wise", value: "item" },
//                             ]}
//                         />
//                     </View>
//                 )}
//                 <View style={[styles.field, getGridWidth(columns, 1)]}>
//                     {enabled ? (
//                         <AMExpoAutocomplete
//                             placeholder={opt ? "Item Name" : "Customer Name"}

//                             onSelect={() => { }}
//                             data={newoptions}
//                         />
//                     ) : (
//                         <View style={styles.rowWithButton}>
//                             <View style={{ flex: 10 }}>
//                                 <AMExpoAutocomplete
//                                     placeholder="Item Name"

//                                     onSelect={() => { }}
//                                     data={newoptions}
//                                 />
//                             </View>
//                             <TouchableOpacity
//                                 style={styles.addBtn}
//                                 onPress={() => setPopupState({
//                                     visible: true,
//                                     view: "list",
//                                     data: null as any,
//                                 })}
//                             >
//                                 <Text style={styles.plus}>+</Text>
//                             </TouchableOpacity>
//                         </View>
//                     )}
//                 </View>
//             </View>
//             <AsPerSo ivalue={opt} checkminso={enabled} />
//             {!enabled && <AsPerMin />}
//             <AMBottomPopup
//                 appConf={appConf}
//                 isDesktop={isDesktop}
//                 visible={popupState.visible}
//                 onClose={() =>
//                     setPopupState((prev) => ({ ...prev, visible: false }))
//                 }
//             >
//                 {popupState.view === "list" && (
//                     <View>
//                         <AsPerSoCustomerWise
//                             onPress={(row) => {
//                                 setPopupState((prev) => ({
//                                     ...prev,
//                                     view: "edit",
//                                     visible: true,
//                                     data: row,
//                                 }));
//                             }}
//                             isDesktop={isDesktop}
//                         />

//                         <View style={styles.updateButtonContainer}>
//                             <TouchableOpacity
//                                 style={styles.btn}
//                                 onPress={() => setPopupState((prev) => ({ ...prev, view: "list" }))}
//                             >
//                                 <Text style={styles.btnText}>Update</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 )}
//                 {popupState.view === "edit" && (
//                     <View >
//                         <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
//                             <Text style={{ fontWeight: 'bold' }}>RM Name</Text>
//                             <Text>{popupState.data.rmName}</Text>
//                         </View>
//                         <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
//                             <Text style={{ fontWeight: 'bold' }}>Product ID</Text>
//                             <Text>I00927</Text>
//                         </View>
//                         <View style={{ width: "100%" }}>
//                             <AMExpoAutocomplete
//                                 placeholder="product Name"

//                                 onSelect={() => { }}
//                                 data={newoptions}
//                             />
//                         </View>
//                         <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
//                             <Text style={{ fontWeight: 'bold' }}>Alternate RM</Text>
//                             <Text>I00928</Text>
//                         </View>
//                         <TouchableOpacity
//                             style={styles.btn}
//                             onPress={() => setPopupState((prev) => ({ ...prev, view: "list" }))}
//                         >
//                             <Text style={styles.btnText}>Update</Text>
//                         </TouchableOpacity>
//                     </View>
//                 )}

//             </AMBottomPopup>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: "row",
//         flexWrap: "wrap",
//         marginHorizontal: -4,
//     },
//     title: {
//         textAlign: "center",
//         fontSize: 16,
//         fontWeight: "bold",
//         marginBottom: 10,
//     },
//     switchContainer: {
//         width: "100%",
//         marginTop: 5,
//         backgroundColor: "#E7E7E7",
//         borderRadius: 8,
//         height: 44,
//         justifyContent: "center",
//         paddingHorizontal: 10,
//     },
//     field: {
//         paddingHorizontal: 4,
//         marginBottom: 8,
//         justifyContent: "center",
//     },
//     radioGroup: {
//         flexDirection: "row",
//         alignItems: "center",
//         backgroundColor: "#E7E7E7",
//         borderRadius: 8,
//         gap: 10,
//         height: 40,
//     },
//     rowWithButton: {
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 8,
//         overflow: "visible",
//         zIndex: 999,

//     },
//     addBtn: {
//         flex: 4,
//         height: 40,
//         width: 50,
//         marginTop: 5,
//         backgroundColor: "#02B6B6",
//         justifyContent: "center",
//         alignItems: "center",
//         borderRadius: 8,
//     },
//     plus: {
//         color: "#fff",
//         fontSize: 20,
//         fontWeight: "bold",
//     },
//     btn: {
//         backgroundColor: "#02B6B6",
//         paddingVertical: 12,
//         paddingHorizontal: 20,
//         borderRadius: 6,
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     btnText: {
//         color: "#000",
//         fontSize: 16,
//         fontWeight: "500",
//         textAlign: "center",
//     },
//     updateButtonContainer: {
//         width: "30%",
//         alignSelf: "center",
//         marginTop: 20,
//     },
// });

// JobFilter.tsx
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { newoptions } from "../../types/TestValue";
import AsPerSo from "../../components/JobPlanning/ASperso";
import AsPerMin from "../../components/JobPlanning/ASpermin";
import AMDatePicker from "../custom/AMDatepicker";
import AMSelect from "../custom/AMSelect";
import { useGridColumns, getGridWidth } from "../../utils/Grid";
import AMSwitch from "../custom/AMSwitch";
import AMBottomPopup from "../custom/AMPopup";
import AsPerSoCustomerWise from "./Aspersocustomerwise";
import { useLayout } from "../../layouts/AppLayoutProvider";
import AMExpoAutocomplete from "../custom/AMExpoAutocomplete";

export default function JobFilter() {
    const [enabled, setEnabled] = useState(true);
    const [opt, setOpt] = useState(false);
    const columns = useGridColumns();
    const { isDesktop, appConf } = useLayout();
    const [focusedField, setFocusedField] = useState<number | null>(null);

    const [popupState, setPopupState] = useState({
        visible: false,
        view: "list",
        data: null as any,
    });
    const fieldZIndex = (index: number) => ({
        zIndex: focusedField === index ? 1000 : 1,
        overflow: "visible" as const,
    });

    return (
        <View>
            <Text style={styles.title}>Planning</Text>
            <View style={styles.container}>

                {/* Field 0 — Unit Name */}
                <View style={[styles.field, getGridWidth(columns), fieldZIndex(0)]}>
                    <AMExpoAutocomplete
                        placeholder="Unit Name"
                        onSelect={() => setFocusedField(null)}
                        onFocus={() => setFocusedField(0)}
                        onBlur={() => setFocusedField(null)}
                        data={newoptions}
                    />
                </View>

                {/* Field 1 — Department */}
                <View style={[styles.field, getGridWidth(columns), fieldZIndex(1)]}>
                    <AMExpoAutocomplete
                        placeholder="Department"
                        onSelect={() => setFocusedField(null)}
                        onFocus={() => setFocusedField(1)}
                        onBlur={() => setFocusedField(null)}
                        data={newoptions}
                    />
                </View>

                {/* Field 2 — Shift */}
                <View style={[styles.field, getGridWidth(columns), fieldZIndex(2)]}>
                    <AMExpoAutocomplete
                        placeholder="Shift"
                        onSelect={() => setFocusedField(null)}
                        onFocus={() => setFocusedField(2)}
                        onBlur={() => setFocusedField(null)}
                        data={newoptions}
                    />
                </View>

                {/* Field 3 — Toggle switch */}
                <View style={[styles.field, getGridWidth(columns), fieldZIndex(3)]}>
                    <View style={styles.switchContainer}>
                        <AMSwitch
                            label={enabled ? "As per SO" : "As per Min. Stock"}
                            value={enabled}
                            onChange={setEnabled}
                        />
                    </View>
                </View>

                {/* Field 4 — Date picker 1 */}
                <View style={[styles.field, getGridWidth(columns), fieldZIndex(4)]}>
                    <AMDatePicker onChange={(val) => console.log(val)} />
                </View>

                {/* Field 5 — Date picker 2 */}
                <View style={[styles.field, getGridWidth(columns), fieldZIndex(5)]}>
                    <AMDatePicker onChange={(val) => console.log(val)} />
                </View>

                {/* Field 6 — Mode selector (only when "As per SO" is on) */}
                {enabled && (
                    <View style={[styles.field, getGridWidth(columns, 1), fieldZIndex(6)]}>
                        <AMSelect
                            label="Mode"
                            value={opt ? "item" : "customer"}
                            setValue={(val: string) => setOpt(val === "item")}
                            list={[
                                { label: "Customer Wise", value: "customer" },
                                { label: "Item Wise", value: "item" },
                            ]}
                        />
                    </View>
                )}

                {/* Field 7 — Customer / Item autocomplete (or Item + Add button) */}
                <View style={[styles.field, getGridWidth(columns, 1), fieldZIndex(7)]}>
                    {enabled ? (
                        <AMExpoAutocomplete
                            placeholder={opt ? "Item Name" : "Customer Name"}
                            onSelect={() => setFocusedField(null)}
                            onFocus={() => setFocusedField(7)}
                            onBlur={() => setFocusedField(null)}
                            data={newoptions}
                        />
                    ) : (
                        <View style={styles.rowWithButton}>
                            <View style={{ flex: 10, overflow: "visible", zIndex: 9999 }}>
                                <AMExpoAutocomplete
                                    placeholder="Item Name"
                                    onSelect={() => setFocusedField(null)}
                                    onFocus={() => setFocusedField(7)}
                                    onBlur={() => setFocusedField(null)}
                                    data={newoptions}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.addBtn}
                                onPress={() =>
                                    setPopupState({
                                        visible: true,
                                        view: "list",
                                        data: null as any,
                                    })
                                }
                            >
                                <Text style={styles.plus}>+</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>

            <AsPerSo ivalue={opt} checkminso={enabled} />
            {!enabled && <AsPerMin />}

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
                                onPress={() =>
                                    setPopupState((prev) => ({ ...prev, view: "list" }))
                                }
                            >
                                <Text style={styles.btnText}>Update</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {popupState.view === "edit" && (
                    <View>
                        <View
                            style={{
                                width: "100%",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                paddingVertical: 10,
                            }}
                        >
                            <Text style={{ fontWeight: "bold" }}>RM Name</Text>
                            <Text>{popupState.data.rmName}</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                paddingVertical: 10,
                            }}
                        >
                            <Text style={{ fontWeight: "bold" }}>Product ID</Text>
                            <Text>I00927</Text>
                        </View>
                        <View style={{ width: "100%", overflow: "visible", zIndex: 9999 }}>
                            <AMExpoAutocomplete
                                placeholder="Product Name"
                                onSelect={() => { }}
                                data={newoptions}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                paddingVertical: 10,
                            }}
                        >
                            <Text style={{ fontWeight: "bold" }}>Alternate RM</Text>
                            <Text>I00928</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() =>
                                setPopupState((prev) => ({ ...prev, view: "list" }))
                            }
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
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginHorizontal: -4,
        // Required: allows absolutely-positioned dropdowns to escape
        // the flex container without being clipped.
        overflow: "visible",
    },
    title: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    switchContainer: {
        width: "100%",
        marginTop: 5,
        backgroundColor: "#E7E7E7",
        borderRadius: 8,
        height: 44,
        justifyContent: "center",
        paddingHorizontal: 10,
    },
    field: {
        paddingHorizontal: 4,
        marginBottom: 8,
        justifyContent: "center",
        // Required: lets the dropdown escape this wrapper too
        overflow: "visible",
    },
    radioGroup: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E7E7E7",
        borderRadius: 8,
        gap: 10,
        height: 40,
    },
    rowWithButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        overflow: "visible",
        zIndex: 999,
    },
    addBtn: {
        flex: 4,
        height: 40,
        width: 50,
        marginTop: 5,
        backgroundColor: "#02B6B6",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    plus: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
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
    updateButtonContainer: {
        width: "30%",
        alignSelf: "center",
        marginTop: 20,
    },
});

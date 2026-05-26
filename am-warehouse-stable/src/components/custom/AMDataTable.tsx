// import React, { useState } from "react";
// import { View, ScrollView, StyleSheet, Text, TextInput } from "react-native";
// import { DataTable, Checkbox } from "react-native-paper";

// type Column = {
//   key: string;
//   title: string;
//   editable?: boolean;
// };

// type Row = {
//   id: string | number;
//   [key: string]: any;
// };

// type Props = {
//   columns: Column[];
//   data: Row[];
//   onRowSelect?: (selectedRows: Row[]) => void;
//   onPress?: (row: Row) => void;
//   amCheckbox?: boolean;
//   isDesktop?: boolean;
//   groupBy?: string;
// };

// export default function AMDataTable({
//   columns,
//   data,
//   onRowSelect,
//   onPress,
//   amCheckbox,
//   isDesktop,
//   groupBy,
// }: Props) {
//   const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());
//   const [tableData, setTableData] = useState<Row[]>(data);

//   const toggleRow = (id: string | number) => {
//     const newSet = new Set(selectedIds);
//     if (newSet.has(id)) newSet.delete(id);
//     else newSet.add(id);

//     setSelectedIds(newSet);

//     if (onRowSelect) {
//       const selectedRows = tableData.filter((row) => newSet.has(row.id));
//       onRowSelect(selectedRows);
//     }
//   };
//   const handleChange = (rowId: string | number, key: string, value: any) => {
//     const updated = tableData.map((row) =>
//       row.id === rowId ? { ...row, [key]: value } : row
//     );
//     setTableData(updated);
//   };

//   const groupedData = React.useMemo(() => {
//     if (!groupBy) return null;
//     const groups: Record<string, Row[]> = {};

//     tableData.forEach((row) => {
//       const key = row[groupBy] || "Others";
//       if (!groups[key]) groups[key] = [];
//       groups[key].push(row);
//     });

//     return groups;
//   }, [tableData, groupBy]);

//   return (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator
//       contentContainerStyle={{ minWidth: "100%" }}
//       style={{ width: "100%" }}
//     >
//       <View
//         style={{
//           borderColor: "#02B6B6",
//           borderWidth: 1,
//           borderRadius: 10,
//           width: "100%",
//         }}
//       >
//         <DataTable.Header>
//           {amCheckbox && (
//             <View style={[styles.headerCell, styles.checkboxCell]} />
//           )}

//           {columns.map((col) => (
//             <View
//               key={col.key}
//               style={[styles.headerCell, { width: isDesktop ? 180 : 100 }]}
//             >
//               <Text style={styles.headerText}>{col.title}</Text>
//             </View>
//           ))}
//         </DataTable.Header>

//         <ScrollView       nestedScrollEnabled
//       keyboardShouldPersistTaps="handled"
//       showsVerticalScrollIndicator
//       style={{ maxHeight: 300 }}
//       contentContainerStyle={{ flexGrow: 1 }} >
//           {groupBy && groupedData
//             ? Object.entries(groupedData).map(([group, rows]) => (
//                 <View key={group}>
//                   <View style={styles.groupHeader}>
//                     <Text style={styles.groupText}>{group}</Text>
//                   </View>

//                   {rows.map((row) => (
//                     <DataTable.Row key={row.id} onPress={() => onPress?.(row)}>
//                       {amCheckbox && (
//                         <View style={[styles.cell, styles.checkboxCell]}>
//                           <Checkbox
//                             color="#02B6B6"
//                             status={
//                               selectedIds.has(row.id) ? "checked" : "unchecked"
//                             }
//                             onPress={() => toggleRow(row.id)}
//                           />
//                         </View>
//                       )}

//                       {columns.map((col) => (
//                         <View
//                           key={col.key}
//                           style={[styles.cell, { width: isDesktop ? 180 : 100 }]}
//                         >
//                           {col.editable ? (
//                             <TextInput
//                               style={styles.input}
//                               value={String(row[col.key] ?? "")}
//                               onChangeText={(val) =>
//                                 handleChange(row.id, col.key, val)
//                               }
//                             />
//                           ) : (
//                             <Text style={styles.cellText}>
//                               {row[col.key]}
//                             </Text>
//                           )}
//                         </View>
//                       ))}
//                     </DataTable.Row>
//                   ))}
//                 </View>
//               ))
//             : tableData.map((row) => (
//                 <DataTable.Row key={row.id} onPress={() => onPress?.(row)}>
//                   {amCheckbox && (
//                     <View style={[styles.cell, styles.checkboxCell]}>
//                       <Checkbox
//                         color="#02B6B6"
//                         status={
//                           selectedIds.has(row.id) ? "checked" : "unchecked"
//                         }
//                         onPress={() => toggleRow(row.id)}
//                       />
//                     </View>
//                   )}

//                   {columns.map((col) => (
//                     <View
//                       key={col.key}
//                       style={[styles.cell, { width: isDesktop ? 180 : 100 }]}
//                     >
//                       {col.editable ? (
//                         <TextInput
//                           style={styles.input}
//                           value={String(row[col.key] ?? "")}
//                           onChangeText={(val) =>
//                             handleChange(row.id, col.key, val)
//                           }
//                         />
//                       ) : (
//                         <Text style={styles.cellText}>
//                           {row[col.key]}
//                         </Text>
//                       )}
//                     </View>
//                   ))}
//                 </DataTable.Row>
//               ))}
//         </ScrollView>
//       </View>
//     </ScrollView>
//   );
// }

// const COLUMN_WIDTH = 120;
// const CHECKBOX_WIDTH = 50;

// const styles = StyleSheet.create({
//   groupHeader: {
//     backgroundColor: "#E6F7F7",
//     padding: 8,
//     borderTopWidth: 1,
//     borderColor: "#02B6B6",
//   },
//   groupText: {
//     fontWeight: "bold",
//     fontSize: 13,
//   },
//   headerCell: {
//     width: COLUMN_WIDTH,
//     padding: 10,
//     justifyContent: "center",
//   },
//   checkboxCell: {
//     width: CHECKBOX_WIDTH,
//   },
//   headerText: {
//     fontWeight: "bold",
//     fontSize: 12,
//   },
//   cellText: {
//     fontSize: 12,
//   },
//   cell: {
//     width: COLUMN_WIDTH,
//     padding: 10,
//     justifyContent: "center",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 6,
//     padding: 6,
//     fontSize: 12,
//   },
// });

// import React, { useState } from "react";
// import { View, ScrollView, StyleSheet, Text, TextInput, DimensionValue } from "react-native";
// import { DataTable, Checkbox } from "react-native-paper";

// type Column = {
//   key: string;
//   title: string;
//   editable?: boolean;
//   width?: boolean;
// };

// type Row = {
//   id: string | number;
//   [key: string]: any;
// };

// type Props = {
//   columns: Column[];
//   data: Row[];
//   onRowSelect?: (selectedRows: Row[]) => void;
//   onPress?: (row: Row) => void;
//   amCheckbox?: boolean;
//   isDesktop?: boolean;
//   groupBy?: string;
//   showEditButton?: boolean;
//   onEdit?: (row: Row) => void;
// };
// export default function AMDataTable({
// columns,
//   data,
//   onRowSelect,
//   onPress,
//   amCheckbox,
//   isDesktop,
//   groupBy,
//   showEditButton,
//   onEdit,
// }: Props) {
//   const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());
//   const [tableData, setTableData] = useState<Row[]>(data);

//   const fixedColCount = columns.filter((c) => c.width).length;
//   const normalCols = columns.filter((c) => !c.width);
// const actionCols = showEditButton ? 1 : 0;
//   const checkboxCols = amCheckbox ? 1 : 0;
// const fixedWidthPercent =
//   35 * fixedColCount +
//   (showEditButton ? 12 : 0);

// const remainingWidth =
//   100 -
//   fixedWidthPercent -
//   (amCheckbox ? 5 : 0);

// const normalColWidth =
//   normalCols.length > 0
//     ? remainingWidth / normalCols.length
//     : remainingWidth;

//   const toggleRow = (id: string | number) => {
//     const newSet = new Set(selectedIds);
//     if (newSet.has(id)) newSet.delete(id);
//     else newSet.add(id);

//     setSelectedIds(newSet);

//     if (onRowSelect) {
//       const selectedRows = tableData.filter((row) => newSet.has(row.id));
//       onRowSelect(selectedRows);
//     }
//   };

//   const getColWidth = (col?: boolean): DimensionValue => {
//     if (col) return "35%";
//     return `${normalColWidth}%`;
//   };

//   const handleChange = (rowId: string | number, key: string, value: any) => {
//     const updated = tableData.map((row) =>
//       row.id === rowId ? { ...row, [key]: value } : row
//     );
//     setTableData(updated);
//   };

//   const groupedData = React.useMemo(() => {
//     if (!groupBy) return null;
//     const groups: Record<string, Row[]> = {};

//     tableData.forEach((row) => {
//       const key = row[groupBy] || "Others";
//       if (!groups[key]) groups[key] = [];
//       groups[key].push(row);
//     });

//     return groups;
//   }, [tableData, groupBy]);

//   return (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator
//       contentContainerStyle={{ minWidth: "100%" }}
//       style={{ width: "100%" }}
//     >
//       <View
//         style={{
//           borderColor: "#02B6B6",
//           borderWidth: 1,
//           borderRadius: 10,
//           width: "100%",
//         }}
//       >
//         <DataTable.Header>
//           {amCheckbox && (
//             <View style={[styles.headerCell, { width: '6%' }]} />
//           )}

//           {columns.map((col) => (
//             <View
//               key={col.key}
//               style={[styles.headerCell, { width: getColWidth(col.width) }]}
//             >
//               <Text style={styles.headerText}>{col.title}</Text>
//             </View>
//           ))}
//         </DataTable.Header>
//         <ScrollView
//           nestedScrollEnabled
//           keyboardShouldPersistTaps="handled"
//           showsVerticalScrollIndicator
//           style={{ maxHeight: 300 }}
//           contentContainerStyle={{ flexGrow: 1 }}
//         >
//           {groupBy && groupedData
//             ? Object.entries(groupedData).map(([group, rows]) => (
//               <View key={group}>
//                 <View style={styles.groupHeader}>
//                   <Text style={styles.groupText}>{group}</Text>
//                 </View>

//                 {rows.map((row) => (
//                   <DataTable.Row key={row.id} onPress={() => onPress?.(row)}>
//                     {amCheckbox && (
//                       <View style={[styles.cell, { width: '6%' }]}>
//                         <Checkbox
//                           color="#02B6B6"
//                           status={
//                             selectedIds.has(row.id) ? "checked" : "unchecked"
//                           }
//                           onPress={() => toggleRow(row.id)}
//                         />
//                       </View>
//                     )}

//                     {columns.map((col) => (
//                       <View
//                         key={col.key}
//                         style={[styles.cell, { width: getColWidth(col.width) }]}
//                       >
//                         {col.editable ? (
//                           <TextInput
//                             style={styles.input}
//                             value={String(row[col.key] ?? "")}
//                             onChangeText={(val) =>
//                               handleChange(row.id, col.key, val)
//                             }
//                           />
//                         ) : (
//                           <Text style={styles.cellText}>
//                             {row[col.key]}
//                           </Text>
//                         )}
//                       </View>
//                     ))}
//                   </DataTable.Row>
//                 ))}
//               </View>
//             ))
//             : tableData.map((row) => (
//               <DataTable.Row key={row.id} onPress={() => onPress?.(row)}>
//                 {amCheckbox && (
//                   <View style={[styles.cell, { width: '6%' }]}>
//                     <Checkbox
//                       color="#02B6B6"
//                       status={
//                         selectedIds.has(row.id) ? "checked" : "unchecked"
//                       }
//                       onPress={() => toggleRow(row.id)}
//                     />
//                   </View>
//                 )}

//                 {columns.map((col) => (
//                   <View
//                     key={col.key}
//                     style={[styles.cell, { width: getColWidth(col.width) }]}
//                   >
//                     {col.editable ? (
//                       <TextInput
//                         style={styles.input}
//                         value={String(row[col.key] ?? "")}
//                         onChangeText={(val) =>
//                           handleChange(row.id, col.key, val)
//                         }
//                       />
//                     ) : (
//                       <Text style={styles.cellText}>
//                         {row[col.key]}
//                       </Text>
//                     )}
//                   </View>
//                 ))}
//               </DataTable.Row>
//             ))}
//         </ScrollView>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   groupHeader: {
//     backgroundColor: "#E6F7F7",
//     padding: 8,
//     borderTopWidth: 1,
//     borderColor: "#02B6B6",
//   },
//   groupText: {
//     fontWeight: "bold",
//     fontSize: 13,
//   },
//   headerCell: {
//     padding: 10,
//     justifyContent: "center",
//   },
//   headerText: {
//     fontWeight: "bold",
//     fontSize: 12,
//   },
//   cellText: {
//     fontSize: 12,
//   },
//   cell: {
//     padding: 10,
//     justifyContent: "center",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 6,
//     padding: 6,
//     fontSize: 12,
//   },
// });

// import React, { useState } from "react";
// import {
//   View,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   DimensionValue,
// } from "react-native";
// import { DataTable, Checkbox, Button, IconButton } from "react-native-paper";

// type Column = {
//   key: string;
//   title: string;
//   editable?: boolean;
//   width?: boolean;
// };

// type Row = {
//   id: string | number;
//   [key: string]: any;
// };

// type Props = {
//   columns: Column[];
//   data: Row[];
//   onRowSelect?: (selectedRows: Row[]) => void;
//   onPress?: (row: Row) => void;
//   amCheckbox?: boolean;
//   isDesktop?: boolean;
//   groupBy?: string;
//   showEditButton?: boolean;
//   onEdit?: (row: Row) => void;
// };

// export default function AMDataTable({
//   columns,
//   data,
//   onRowSelect,
//   onPress,
//   amCheckbox,
//   isDesktop,
//   groupBy,
//   showEditButton,
//   onEdit,
// }: Props) {
//   const [selectedIds, setSelectedIds] = useState<
//     Set<string | number>
//   >(new Set());

//   const [tableData, setTableData] = useState<Row[]>(data);

//   const fixedColCount = columns.filter((c) => c.width).length;
//   const normalCols = columns.filter((c) => !c.width);

//   const checkboxCols = amCheckbox ? 1 : 0;
//   const actionCols = showEditButton ? 1 : 0;

//   const fixedWidthPercent =
//     35 * fixedColCount +
//     (showEditButton ? 12 : 0);

//   const remainingWidth =
//     100 -
//     fixedWidthPercent -
//     (amCheckbox ? 5 : 0);

//   const normalColWidth =
//     normalCols.length > 0
//       ? remainingWidth / normalCols.length
//       : remainingWidth;

//   const toggleRow = (id: string | number) => {
//     const newSet = new Set(selectedIds);

//     if (newSet.has(id)) newSet.delete(id);
//     else newSet.add(id);

//     setSelectedIds(newSet);

//     if (onRowSelect) {
//       const selectedRows = tableData.filter((row) =>
//         newSet.has(row.id)
//       );

//       onRowSelect(selectedRows);
//     }
//   };

//   const getColWidth = (
//     col?: boolean
//   ): DimensionValue => {
//     if (col) return "35%";

//     return `${normalColWidth}%`;
//   };

//   const handleChange = (
//     rowId: string | number,
//     key: string,
//     value: any
//   ) => {
//     const updated = tableData.map((row) =>
//       row.id === rowId
//         ? { ...row, [key]: value }
//         : row
//     );

//     setTableData(updated);
//   };

//   const groupedData = React.useMemo(() => {
//     if (!groupBy) return null;

//     const groups: Record<string, Row[]> = {};

//     tableData.forEach((row) => {
//       const key = row[groupBy] || "Others";

//       if (!groups[key]) groups[key] = [];

//       groups[key].push(row);
//     });

//     return groups;
//   }, [tableData, groupBy]);

//   return (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator
//       contentContainerStyle={{ minWidth: "100%" }}
//       style={{ width: "100%" }}
//     >
//       <View
//         style={{
//           borderColor: "#02B6B6",
//           borderWidth: 1,
//           borderRadius: 10,
//           width: "100%",
//         }}
//       >
//         <DataTable.Header>
//           {amCheckbox && (
//             <View
//               style={[
//                 styles.headerCell,
//                 { width: "6%" },
//               ]}
//             />
//           )}

//           {columns.map((col) => (
//             <View
//               key={col.key}
//               style={[
//                 styles.headerCell,
//                 {
//                   width: getColWidth(col.width),
//                 },
//               ]}
//             >
//               <Text style={styles.headerText}>
//                 {col.title}
//               </Text>
//             </View>
//           ))}

//           {showEditButton && (
//             <View
//               style={[
//                 styles.headerCell,
//                 { width: "12%" },
//               ]}
//             >
//               <Text style={styles.headerText}>
//                 Action
//               </Text>
//             </View>
//           )}
//         </DataTable.Header>

//         <ScrollView
//           nestedScrollEnabled
//           keyboardShouldPersistTaps="handled"
//           showsVerticalScrollIndicator
//           style={{ maxHeight: 300 }}
//           contentContainerStyle={{ flexGrow: 1 }}
//         >
//           {groupBy && groupedData
//             ? Object.entries(groupedData).map(
//               ([group, rows]) => (
//                 <View key={group}>
//                   <View style={styles.groupHeader}>
//                     <Text style={styles.groupText}>
//                       {group}
//                     </Text>
//                   </View>

//                   {rows.map((row) => (
//                     <DataTable.Row
//                       key={row.id}
//                       onPress={() =>
//                         onPress?.(row)
//                       }
//                     >
//                       {amCheckbox && (
//                         <View
//                           style={[
//                             styles.cell,
//                             { width: "6%" },
//                           ]}
//                         >
//                           <Checkbox
//                             color="#02B6B6"
//                             status={
//                               selectedIds.has(
//                                 row.id
//                               )
//                                 ? "checked"
//                                 : "unchecked"
//                             }
//                             onPress={() =>
//                               toggleRow(row.id)
//                             }
//                           />
//                         </View>
//                       )}

//                       {columns.map((col) => (
//                         <View
//                           key={col.key}
//                           style={[
//                             styles.cell,
//                             {
//                               width: getColWidth(
//                                 col.width
//                               ),
//                             },
//                           ]}
//                         >
//                           {col.editable ? (
//                             <TextInput
//                               style={styles.input}
//                               value={String(
//                                 row[col.key] ?? ""
//                               )}
//                               onChangeText={(
//                                 val
//                               ) =>
//                                 handleChange(
//                                   row.id,
//                                   col.key,
//                                   val
//                                 )
//                               }
//                             />
//                           ) : (
//                             <Text
//                               style={
//                                 styles.cellText
//                               }
//                             >
//                               {row[col.key]}
//                             </Text>
//                           )}
//                         </View>
//                       ))}

//                       {showEditButton && (
//                         <View
//                           style={[
//                             styles.cell,
//                             { width: "12%" },
//                           ]}
//                         >
//                           <IconButton
//                             icon="pencil"
//                             iconColor="#02B6B6"
//                             size={20}
//                             onPress={() => onEdit?.(row)}
//                           />
//                         </View>
//                       )}
//                     </DataTable.Row>
//                   ))}
//                 </View>
//               )
//             )
//             : tableData.map((row) => (
//               <DataTable.Row
//                 key={row.id}
//                 onPress={() => onPress?.(row)}
//               >
//                 {amCheckbox && (
//                   <View
//                     style={[
//                       styles.cell,
//                       { width: "6%" },
//                     ]}
//                   >
//                     <Checkbox
//                       color="#02B6B6"
//                       status={
//                         selectedIds.has(row.id)
//                           ? "checked"
//                           : "unchecked"
//                       }
//                       onPress={() =>
//                         toggleRow(row.id)
//                       }
//                     />
//                   </View>
//                 )}

//                 {columns.map((col) => (
//                   <View
//                     key={col.key}
//                     style={[
//                       styles.cell,
//                       {
//                         width: getColWidth(
//                           col.width
//                         ),
//                       },
//                     ]}
//                   >
//                     {col.editable ? (
//                       <TextInput
//                         style={styles.input}
//                         value={String(
//                           row[col.key] ?? ""
//                         )}
//                         onChangeText={(val) =>
//                           handleChange(
//                             row.id,
//                             col.key,
//                             val
//                           )
//                         }
//                       />
//                     ) : (
//                       <Text
//                         style={styles.cellText}
//                       >
//                         {row[col.key]}
//                       </Text>
//                     )}
//                   </View>
//                 ))}

//                 {showEditButton && (
//                   <View
//                     style={[
//                       styles.cell,
//                       { width: "12%" },
//                     ]}
//                   >
//                     <IconButton
//                       icon="pencil"
//                       iconColor="#02B6B6"
//                       size={20}
//                       onPress={() => onEdit?.(row)}
//                     />
//                   </View>
//                 )}
//               </DataTable.Row>
//             ))}
//         </ScrollView>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   groupHeader: {
//     backgroundColor: "#E6F7F7",
//     padding: 8,
//     borderTopWidth: 1,
//     borderColor: "#02B6B6",
//   },

//   groupText: {
//     fontWeight: "bold",
//     fontSize: 13,
//   },

//   headerCell: {
//     padding: 10,
//     justifyContent: "center",
//   },

//   headerText: {
//     fontWeight: "bold",
//     fontSize: 12,
//   },

//   cellText: {
//     fontSize: 12,
//   },

//   cell: {
//     padding: 10,
//     justifyContent: "center",
//   },

//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 6,
//     padding: 6,
//     fontSize: 12,
//   },
// });

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
// } from "react-native";
// import { DataTable, Checkbox, IconButton } from "react-native-paper";

// type Column = {
//   key: string;
//   title: string;
//   editable?: boolean;
//   width?: boolean;
// };

// type Row = {
//   id: string | number;
//   [key: string]: any;
// };

// type Props = {
//   columns: Column[];
//   data: Row[];
//   onRowSelect?: (selectedRows: Row[]) => void;
//   onPress?: (row: Row) => void;
//   amCheckbox?: boolean;
//   isDesktop?: boolean;
//   groupBy?: string;
//   showEditButton?: boolean;
//   onEdit?: (row: Row) => void;
// };

// // ── Layout constants ──────────────────────────────────────────
// const CHECKBOX_FLEX = 0.5;   // narrow fixed-ratio column
// const FIXED_COL_FLEX = 2;    // wider column (width=true)
// const NORMAL_COL_FLEX = 1.5; // standard column
// const ACTION_FLEX = 0.8;     // edit button column

// export default function AMDataTable({
//   columns,
//   data,
//   onRowSelect,
//   onPress,
//   amCheckbox,
//   isDesktop,
//   groupBy,
//   showEditButton,
//   onEdit,
// }: Props) {
//   const [selectedIds, setSelectedIds] = useState<Set<string | number>>(
//     new Set()
//   );
//   const [tableData, setTableData] = useState<Row[]>(data);

//   // ── Helpers (logic unchanged) ────────────────────────────────
//   const toggleRow = (id: string | number) => {
//     const newSet = new Set(selectedIds);
//     if (newSet.has(id)) newSet.delete(id);
//     else newSet.add(id);
//     setSelectedIds(newSet);
//     if (onRowSelect) {
//       const selectedRows = tableData.filter((row) => newSet.has(row.id));
//       onRowSelect(selectedRows);
//     }
//   };

//   const handleChange = (rowId: string | number, key: string, value: any) => {
//     const updated = tableData.map((row) =>
//       row.id === rowId ? { ...row, [key]: value } : row
//     );
//     setTableData(updated);
//   };

//   const groupedData = React.useMemo(() => {
//     if (!groupBy) return null;
//     const groups: Record<string, Row[]> = {};
//     tableData.forEach((row) => {
//       const key = row[groupBy] || "Others";
//       if (!groups[key]) groups[key] = [];
//       groups[key].push(row);
//     });
//     return groups;
//   }, [tableData, groupBy]);

//   // ── Shared cell style helper ─────────────────────────────────
//   const getColFlex = (isFixed?: boolean) =>
//     isFixed ? FIXED_COL_FLEX : NORMAL_COL_FLEX;


//   useEffect(() => {
//     setTableData(data);
//   }, [data]);
//   // ── Row renderer ─────────────────────────────────────────────
//   const renderRow = (row: Row) => (
//     <DataTable.Row
//       key={row.id}
//       onPress={() => onPress?.(row)}
//       style={styles.row}
//     >
//       {amCheckbox && (
//         <View style={[styles.cell, { flex: CHECKBOX_FLEX }]}>
//           <Checkbox
//             color="#02B6B6"
//             status={selectedIds.has(row.id) ? "checked" : "unchecked"}
//             onPress={() => toggleRow(row.id)}
//           />
//         </View>
//       )}

//       {columns.map((col) => (
//         <View
//           key={col.key}
//           style={[styles.cell, { flex: getColFlex(col.width) }]}
//         >
//           {col.editable ? (
//             <TextInput
//               style={styles.input}
//               value={String(row[col.key] ?? "")}
//               onChangeText={(val) => handleChange(row.id, col.key, val)}
//             />
//           ) : (
//             <Text style={styles.cellText} numberOfLines={1} ellipsizeMode="tail">
//               {row[col.key]}
//             </Text>
//           )}
//         </View>
//       ))}

//       {showEditButton && (
//         <View style={[styles.cell, { flex: ACTION_FLEX, alignItems: "center" }]}>
//           <IconButton
//             icon="pencil"
//             iconColor="#02B6B6"
//             size={18}
//             onPress={() => onEdit?.(row)}
//           />
//         </View>
//       )}
//     </DataTable.Row>
//   );

//   // ── Render ───────────────────────────────────────────────────
//   return (
//     <View
//       style={{
//         borderColor: "#02B6B6",
//         borderWidth: 1,
//         borderRadius: 10,
//         overflow: "hidden",      // clips children to rounded border
//         width: "100%",
//       }}
//     >
//       {/* Header */}
//       <DataTable.Header style={styles.header}>
//         {amCheckbox && (
//           <View style={[styles.headerCell, { flex: CHECKBOX_FLEX }]} />
//         )}

//         {columns.map((col) => (
//           <View
//             key={col.key}
//             style={[styles.headerCell, { flex: getColFlex(col.width) }]}
//           >
//             <Text style={styles.headerText}>{col.title}</Text>
//           </View>
//         ))}

//         {showEditButton && (
//           <View
//             style={[styles.headerCell, { flex: ACTION_FLEX, alignItems: "center" }]}
//           >
//             <Text style={styles.headerText}>Action</Text>
//           </View>
//         )}
//       </DataTable.Header>

//       {/* Body */}
//       <ScrollView
//         nestedScrollEnabled
//         keyboardShouldPersistTaps="handled"
//         showsVerticalScrollIndicator
//         style={{ maxHeight: 300 }}
//         contentContainerStyle={{ flexGrow: 1 }}
//       >
//         {groupBy && groupedData
//           ? Object.entries(groupedData).map(([group, rows]) => (
//             <View key={group}>
//               <View style={styles.groupHeader}>
//                 <Text style={styles.groupText}>{group}</Text>
//               </View>
//               {rows.map(renderRow)}
//             </View>
//           ))
//           : tableData.map(renderRow)}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   groupHeader: {
//     backgroundColor: "#E6F7F7",
//     padding: 8,
//     borderTopWidth: 1,
//     borderColor: "#02B6B6",
//   },
//   groupText: {
//     fontWeight: "bold",
//     fontSize: 13,
//   },
//   header: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#02B6B6",
//   },
//   row: {
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderBottomColor: "#E0F7F7",
//   },
//   headerCell: {
//     paddingLeft: 16,
//     paddingRight: 8,
//     paddingVertical: 10,
//     justifyContent: "center",
//   },
//   headerText: {
//     fontWeight: "bold",
//     fontSize: 12,
//     color: "#000",
//   },
//   cell: {
//     paddingLeft: 16,
//     paddingRight: 8,
//     paddingVertical: 10,
//     justifyContent: "center",
//   },
//   cellText: {
//     fontSize: 12,
//     color: "#333",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 6,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     fontSize: 12,
//   },
// });
import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { DataTable, Checkbox, IconButton } from "react-native-paper";

type Column = {
  key: string;
  title: string;
  editable?: boolean;
  width?: boolean;
  type: "text" | "number";
};

type Row = {
  id: string | number;
  [key: string]: any;
};

type Props = {
  columns: Column[];
  data: Row[];
  onRowSelect?: (selectedRows: Row[]) => void;
  onPress?: (row: Row) => void;
  amCheckbox?: boolean;
  isDesktop?: boolean;
  groupBy?: string;
  showEditButton?: boolean;
  onEdit?: (row: Row) => void;
};

const CHECKBOX_FLEX = 0.5;
const FIXED_COL_FLEX = 2;
const NORMAL_COL_FLEX = 1.5;
const NUMBER_COL_FLEX = 1.8;
const ACTION_FLEX = 0.8;

export default function AMDataTable({
  columns,
  data,
  onRowSelect,
  onPress,
  amCheckbox,
  isDesktop,
  groupBy,
  showEditButton,
  onEdit,
}: Props) {
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(
    new Set()
  );
  const [tableData, setTableData] = useState<Row[]>(data);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const toggleRow = (id: string | number) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
    if (onRowSelect) {
      const selectedRows = tableData.filter((row) => newSet.has(row.id));
      onRowSelect(selectedRows);
    }
  };

  const handleChange = (rowId: string | number, key: string, value: any) => {
    const updated = tableData.map((row) =>
      row.id === rowId ? { ...row, [key]: value } : row
    );
    setTableData(updated);
  };

  const groupedData = React.useMemo(() => {
    if (!groupBy) return null;
    const groups: Record<string, Row[]> = {};
    tableData.forEach((row) => {
      const key = row[groupBy] || "Others";
      if (!groups[key]) groups[key] = [];
      groups[key].push(row);
    });
    return groups;
  }, [tableData, groupBy]);

  const getColFlex = (isFixed?: boolean, type?: string) => {
    if (isFixed) return FIXED_COL_FLEX;
    if (type === "number") return NUMBER_COL_FLEX;
    return NORMAL_COL_FLEX;
  };

  const isNumeric = (col: Column, value: any) => {
    if (col.type === "number") return true;
    if (col.type === "text") return false;
    return (
      !isNaN(Number(value)) &&
      value !== "" &&
      value !== null &&
      value !== undefined
    );
  };

  const renderRow = (row: Row) => (
    <DataTable.Row
      key={row.id}
      onPress={() => onPress?.(row)}
      style={styles.row}
    >
      {amCheckbox && (
        <View style={[styles.cell, { flex: CHECKBOX_FLEX, alignItems: "center" }]}>
          <Checkbox
            color="#02B6B6"
            status={selectedIds.has(row.id) ? "checked" : "unchecked"}
            onPress={() => toggleRow(row.id)}
          />
        </View>
      )}

      {columns.map((col) => {
        const value = row[col.key];
        const numeric = isNumeric(col, value);
        return (
          <View
            key={col.key}
            style={[
              styles.cell,
              { flex: getColFlex(col.width, col.type) },
              numeric ? styles.cellRight : styles.cellLeft,
            ]}
          >
            {col.editable ? (
              <TextInput
                style={[styles.input, numeric && { textAlign: "right" }]}
                value={String(value ?? "")}
                onChangeText={(val) => handleChange(row.id, col.key, val)}
              />
            ) : (
              <Text
                style={[styles.cellText, numeric && styles.cellTextRight]}
                numberOfLines={numeric ? undefined : 1}
                ellipsizeMode={numeric ? undefined : "tail"}
              >
                {value}
              </Text>
            )}
          </View>
        );
      })}

      {showEditButton && (
        <View style={[styles.cell, { flex: ACTION_FLEX, alignItems: "center" }]}>
          <IconButton
            icon="pencil"
            iconColor="#02B6B6"
            size={18}
            onPress={() => onEdit?.(row)}
          />
        </View>
      )}
    </DataTable.Row>
  );

  return (
    <View
      style={{
        borderColor: "#02B6B6",
        borderWidth: 1,
        borderRadius: 10,
        overflow: "hidden",
        width: "100%",
      }}
    >
      {/* Header */}
      <View style={styles.header}>
        {amCheckbox && (
          <View style={[styles.headerCell, { flex: CHECKBOX_FLEX }]} />
        )}

        {columns.map((col) => (
          <View
            key={col.key}
            style={[
              styles.headerCell,
              { flex: getColFlex(col.width, col.type) },
              col.type === "number" ? styles.headerRight : styles.headerLeft,
            ]}
          >
            <Text
              style={[
                styles.headerText,
                col.type === "number" && styles.headerTextRight,
              ]}
            >
              {col.title}
            </Text>
          </View>
        ))}

        {showEditButton && (
          <View style={[styles.headerCell, styles.headerLeft, { flex: ACTION_FLEX }]}>
            <Text style={styles.headerText}>Action</Text>
          </View>
        )}
      </View>

      {/* Body */}
      <ScrollView
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator
        style={{ maxHeight: 300 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {groupBy && groupedData
          ? Object.entries(groupedData).map(([group, rows]) => (
            <View key={group}>
              <View style={styles.groupHeader}>
                <Text style={styles.groupText}>{group}</Text>
              </View>
              {rows.map(renderRow)}
            </View>
          ))
          : tableData.map(renderRow)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  groupHeader: {
    backgroundColor: "#E6F7F7",
    padding: 8,
    borderTopWidth: 1,
    borderColor: "#02B6B6",
  },
  groupText: {
    fontWeight: "bold",
    fontSize: 13,
  },
  header: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#02B6B6",
    backgroundColor: "#F9FAFA",
    paddingVertical: 10,
  },
  row: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E0F7F7",
  },
  headerCell: {
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  headerLeft: {
    alignItems: "flex-start",
    paddingLeft: 8,
  },
  headerRight: {
    alignItems: "flex-end",
    paddingRight: 12,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#000",
  },
  headerTextRight: {
    textAlign: "right",
  },
  cell: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    justifyContent: "center",
  },
  cellLeft: {
    alignItems: "flex-start",
  },
  cellRight: {
    alignItems: "flex-end",
    paddingRight: 12,
  },
  cellText: {
    fontSize: 12,
    color: "#333",
    textAlign: "left",
  },
  cellTextRight: {
    textAlign: "right",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 12,
    width: "100%",
  },
});
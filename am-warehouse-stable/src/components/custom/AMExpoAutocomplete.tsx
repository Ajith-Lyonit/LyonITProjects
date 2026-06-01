import { useMemo, useRef, useState, useCallback, useEffect } from "react";
import {
    View,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Platform,
    Modal,
    Pressable,
} from "react-native";
import { TextInput, Text } from "react-native-paper";

type Item = {
    id: string;
    label: string;
};

type Props = {
    data: Item[];
    onSelect: (item: Item) => void;
    placeholder?: string;
    onFocus?: () => void;
    onBlur?: () => void;
};

let createPortal: any = null;
if (Platform.OS === "web") {
    createPortal = require("react-dom").createPortal;
}

function WebDropdown({
    items,
    anchorEl,
    onSelectItem,
    onClose,
}: {
    items: Item[];
    anchorEl: HTMLElement | null;
    onSelectItem: (item: Item) => void;
    onClose: () => void;
}) {
    const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });

    useEffect(() => {
        if (!anchorEl) return;
        const update = () => {
            const rect = anchorEl.getBoundingClientRect();
            setPos({
                top: rect.bottom + window.scrollY + 2,
                left: rect.left + window.scrollX,
                width: rect.width,
            });
        };
        update();
        window.addEventListener("scroll", update, true);
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("scroll", update, true);
            window.removeEventListener("resize", update);
        };
    }, [anchorEl]);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            const t = e.target as HTMLElement;
            if (!t.closest("[data-am-dropdown]") && !t.closest("[data-am-anchor]")) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [onClose]);

    const style: React.CSSProperties = {
        position: "absolute",
        top: pos.top,
        left: pos.left,
        width: pos.width,
        backgroundColor: "#fff",
        borderRadius: 8,
        border: "1px solid #ddd",
        maxHeight: 220,
        overflowY: "auto",
        zIndex: 999999,
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    };

    if (!createPortal) return null;

    return createPortal(
        <div data-am-dropdown style={style}>
            {items.map((item) => (
                <div
                    key={item.id}
                    onMouseDown={(e) => {
                        e.preventDefault();
                        onSelectItem(item);
                    }}
                    style={{
                        padding: "10px 14px",
                        borderBottom: "1px solid #f3f3f3",
                        cursor: "pointer",
                        fontSize: 14,
                        color: "#333",
                    }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.backgroundColor = "#f0fafa";
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.backgroundColor =
                            "transparent";
                    }}
                >
                    {item.label}
                </div>
            ))}
        </div>,
        document.body
    );
}

// ─── Native Modal Dropdown ───────────────────────────────────────────────────
// Uses RN Modal (renders above everything on iOS/Android)
// measureInWindow gives us screen coordinates to position the list
function NativeDropdown({
    items,
    pos,
    onSelectItem,
    onClose,
}: {
    items: Item[];
    pos: { top: number; left: number; width: number };
    onSelectItem: (item: Item) => void;
    onClose: () => void;
}) {
    return (
        <Modal
            visible
            transparent
            animationType="none"
            statusBarTranslucent
            onRequestClose={onClose}
        >
            {/* Full-screen backdrop — tap outside closes */}
            <Pressable style={StyleSheet.absoluteFill} onPress={onClose}>
                {/* Inner Pressable stops backdrop tap from firing when inside list */}
                <Pressable
                    style={[
                        styles.nativeDropdown,
                        {
                            top: pos.top,
                            left: pos.left,
                            width: pos.width,
                        },
                    ]}
                    onPress={() => {/* swallow */}}
                >
                    <FlatList
                        keyboardShouldPersistTaps="always"
                        data={items}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.item}
                                activeOpacity={0.7}
                                onPress={() => onSelectItem(item)}
                            >
                                <Text>{item.label}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </Pressable>
            </Pressable>
        </Modal>
    );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function AMExpoAutocomplete({
    data,
    onSelect,
    placeholder = "Search...",
    onFocus,
    onBlur,
}: Props) {
    const [query, setQuery] = useState("");
    const [visible, setVisible] = useState(false);
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

    // Used on web to get real DOM rect
    const domRef = useRef<HTMLElement | null>(null);
    // Used on native for measureInWindow
    const rnRef = useRef<View>(null);

    // Prevent closing when a selection is in progress
    const selectingRef = useRef(false);

    const filtered = useMemo(() => {
        if (!query) return data;
        return data.filter((item) =>
            item.label.toLowerCase().includes(query.toLowerCase())
        );
    }, [query, data]);

    const setRef = useCallback((node: View | null) => {
        (rnRef as any).current = node;
        if (Platform.OS === "web" && node) {
            domRef.current = node as unknown as HTMLElement;
        }
    }, []);

    const openDropdown = useCallback(() => {
        if (Platform.OS === "web") {
            // Web: position is handled live by WebDropdown via getBoundingClientRect
            setVisible(true);
        } else {
            // Native: measure screen position then show
            rnRef.current?.measureInWindow((x, y, width, height) => {
                setDropdownPos({ top: y + height + 2, left: x, width });
                setVisible(true);
            });
        }
    }, []);

    const onSelectItem = useCallback(
        (item: Item) => {
            selectingRef.current = true;
            setQuery(item.label);
            onSelect(item);
            setVisible(false);
            onBlur?.();
            // Reset after event loop settles
            setTimeout(() => {
                selectingRef.current = false;
            }, 300);
        },
        [onSelect, onBlur]
    );

    const handleClose = useCallback(() => {
        if (selectingRef.current) return;
        setVisible(false);
        onBlur?.();
    }, [onBlur]);

    const showDropdown = visible && filtered.length > 0;

    return (
        <View
            ref={setRef}
            style={styles.container}
            collapsable={false}
            // @ts-ignore web-only
            data-am-anchor
        >
            <TextInput
                mode="outlined"
                value={query}
                placeholder={placeholder}
                onFocus={() => {
                    openDropdown();
                    onFocus?.();
                }}
                onBlur={() => {
                    setTimeout(() => {
                        if (!selectingRef.current) {
                            setVisible(false);
                            onBlur?.();
                        }
                    }, 200);
                }}
                onChangeText={(text) => {
                    setQuery(text);
                    if (!visible) openDropdown();
                }}
                left={<TextInput.Icon icon="magnify" />}
                style={styles.input}
            />

            {/* Web */}
            {Platform.OS === "web" && showDropdown && (
                <WebDropdown
                    items={filtered}
                    anchorEl={domRef.current}
                    onSelectItem={onSelectItem}
                    onClose={handleClose}
                />
            )}

            {/* Native (iOS / Android) */}
            {Platform.OS !== "web" && showDropdown && (
                <NativeDropdown
                    items={filtered}
                    pos={dropdownPos}
                    onSelectItem={onSelectItem}
                    onClose={handleClose}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    input: {
        backgroundColor: "#fff",
        fontSize: 12,
        height: 40,
    },
    nativeDropdown: {
        position: "absolute",
        backgroundColor: "#fff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        maxHeight: 220,
        // Shadow for iOS
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        // Shadow for Android
        elevation: 16,
    },
    item: {
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#f3f3f3",
    },
});

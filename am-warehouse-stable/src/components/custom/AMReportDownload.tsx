// components/custom/AMDropdownMenu.tsx
import { useState } from "react";
import { IconButton, Menu } from "react-native-paper";

type MenuItem = {
    label: string;
    icon: string;
    onPress: () => void;
};

type Props = {
    items: MenuItem[];
};

export default function AMDropdownMenu({ items }: Props) {
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            contentStyle={{ backgroundColor: "#fff", paddingVertical: 0 }}
            anchor={
                <IconButton
                    icon="dots-vertical"
                    onPress={() => setMenuVisible(true)}
                />
            }
        >
            {items.map((item) => (
                <Menu.Item
                    key={item.label}
                    leadingIcon={item.icon}
                    onPress={() => {
                        setMenuVisible(false);
                        item.onPress();
                    }}
                    title={item.label}
                    titleStyle={{ fontSize: 12 }}
                    style={{ height: 36, minWidth: 100 }}
                />
            ))}
        </Menu>
    );
}
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";

type PendingCardProps = {
    title: string;
};

export default function PendingRequestCard({ title }: PendingCardProps) {
    const { width } = useWindowDimensions();
    const isDesktop = width >= 900;
    const itemWidth = isDesktop ? "23%" : "48%";
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.row}>
                {[
                    { value: 10, label:"0-3 days" },
                    { value: 5, label: "4-6 Days" },
                    { value: 3, label: "7-10 Days" },
                    { value: 12, label: "10> Days" },
                ].map((item, index) => (
                    <View key={index} style={[styles.smallCard, { width: itemWidth }]}>
                        <Text style={styles.smallText}>{item.value}</Text>
                        <Text style={styles.label}>{item.label}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 10,
        elevation: 3,
        borderColor: '#02B6B6',
        borderWidth: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
        color: "#1AA7A1",
        textAlign:'center'
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    smallCard: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingVertical: 4,
        marginBottom: 10,
        alignItems: "center",
    },
    smallText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    label: {
        fontSize: 12,
        fontWeight:'bold',
        color: "#02B6B6",
        marginTop: 4,
    },
});
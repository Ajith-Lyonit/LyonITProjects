import { View, Text, StyleSheet } from "react-native";

type PendingCardProps = {
    title: string;
    isDesktop:boolean
};

export default function PendingCard({ title,isDesktop }: PendingCardProps) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.row}>
                <View style={styles.smallCard}>
                    <Text style={[styles.label,{fontSize:isDesktop?12:10}]}>High</Text>
                    <Text style={styles.smallText}>10</Text>
                </View>
                <View style={styles.smallCard}>
                    <Text style={[styles.label,{fontSize:isDesktop?12:10}]}>Medium</Text>
                    <Text style={styles.smallText}>5</Text>
                </View>
                <View style={styles.smallCard}>
                    <Text style={[styles.label,{fontSize:isDesktop?12:10}]}>Low</Text>
                    <Text style={styles.smallText}>5</Text>
                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1, // allows card to grow
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 5,
        elevation: 3,
        borderColor: "#02B6B6",
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
        justifyContent: "space-between",
        alignItems:'center'
    },  

    smallCard: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        marginHorizontal: 4,
        paddingVertical: 4,
        justifyContent:'center',
        alignItems:'center'
    },

    smallText: {
        fontSize: 16,
        color:'#02B6B6',
        fontWeight: "bold",
    },

    label: {
        color:'#021818',
        fontWeight:'bold',
        marginTop: 4,
    },
});
import { View, Text, StyleSheet, Image, ImageSourcePropType } from "react-native";
import { TouchableRipple } from "react-native-paper";

interface ListCardProps {
    title: string
    image: ImageSourcePropType,
    isDesktop?: boolean;
    onpress?: () => void;
}

export default function ListCard({ title, image, isDesktop, onpress }: ListCardProps) {
    return (
        <TouchableRipple style={[
                styles.card,
                { width: isDesktop ? "12%" : "23%" }
            ]} onPress={onpress}>
            <View>
                <View style={[styles.iconBox,{width:isDesktop?130:80},{height:isDesktop?120:80}]}>
                    <Image source={image} style={styles.image} />
                </View>
                <Text style={[
                    styles.title,
                    { fontSize: isDesktop ? 12 : 10 }
                ]}>{title}</Text>
            </View>
        </TouchableRipple>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        padding: 12,
        alignItems: "center",
        justifyContent: "flex-start"
    },

    iconBox: {
        backgroundColor: "#02B6B6",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
        elevation: 4,
    },

    image: {
        width: "100%",
        height: 40,
        resizeMode: "contain",
    },

    title: {
        fontWeight: 700,
        color: "#000",
        textAlign: "center",
    },
});
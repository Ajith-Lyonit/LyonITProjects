import { StyleSheet, Text, View } from "react-native";
import PendingCard from "../Production/PendingCards";
import PendingRequestCard from "../Production/RequestCard";
import SterileTabs from "./SterileTabs";
import { useState } from "react";
import RecieptCard from "./components/Receipt";
import TransferCard from "./components/Transfer";
import ETOINCard from "./components/ETOIn";
import ETOOUTCard from "./components/ETOOut";
import { useLayout } from "../../layouts/AppLayoutProvider";

export default function SterileFilter() {
    const { isDesktop } = useLayout()
    const [tabItem,setTabItem] =  useState("receipt")
    return (
        <View>
            <Text style={styles.title}>Sterile</Text>
            <View style={styles.row}>
                <View style={styles.cardWrapper}>
                    <PendingCard title="Pending" isDesktop={isDesktop} />
                </View>
                <View style={styles.cardWrapper}>
                    <PendingRequestCard title="Pending Request" />
                </View>
            </View>
            <SterileTabs isDesktop={isDesktop} onPress={(val) => {
                setTabItem(val)
            }} />
            {tabItem=="receipt" && <RecieptCard/>}
            {tabItem=="eto-in" && <ETOINCard isDesktop={isDesktop}/>}
            {tabItem=="eto-out" && <ETOOUTCard isDesktop={isDesktop}/>}
            {tabItem=="transfer" && <TransferCard/>}
        </View>
    )
}


const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 20
    },
    cardWrapper: {
        flex: 1,
    },
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: '100%',
        marginVertical: 14,
        flex: 1
    },
    title: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
});
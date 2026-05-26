import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DashboardScreen from "../screens/Dashboard/DashboardScreen";
import JobPlanning from "../screens/Planning/JobPlanning";
import RMPlanning from "../screens/RMPlanning/RMPlanning";
import JobCard from "../screens/JobCard/Jobcard";
import LabelPrinting from "../screens/LabelPrinting/LabelPrinting";
import FGTransfer from "../screens/FGTransfer/FGTransfer";
import BOM from "../screens/BOM/BOM";
import Sterile from "../screens/Sterile/Sterile";

import MobileLayout from "../layouts/MobileLayout";
import InitBoard from "../screens/InitBoard/InitBoard";
import SterileDoument from "../components/Sterile/screens/SterilDocument";

import { RootStackParamList } from "../navigation/types";
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MobileStack({onLogout, initialRoute = "production" }: any) {
    const withMobileLayout = (Component: any, options?: { scroll?: boolean }) => {
    return (props: any) => (
        <MobileLayout onLogout={onLogout} scroll={options?.scroll}>
            <Component {...props} />
        </MobileLayout>
        
    );
};
    return (
        <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="production"
                component={withMobileLayout(DashboardScreen)}
            />
            <Stack.Screen
                name="dashboard"
                component={withMobileLayout(InitBoard)}
            />
            <Stack.Screen
                name="planning"
                component={withMobileLayout(JobPlanning)}
            />
            <Stack.Screen
                name="rmplanning"
                component={withMobileLayout(RMPlanning)}
            />
            <Stack.Screen
                name="jobcard"
                component={withMobileLayout(JobCard)}
            />
            <Stack.Screen
                name="labelprinting"
                component={withMobileLayout(LabelPrinting)}
            />
            <Stack.Screen
                name="fgtransfer"
                component={withMobileLayout(FGTransfer)}
            />
            <Stack.Screen
                name="sterile"
                component={withMobileLayout(Sterile)}
            />
            <Stack.Screen
                name="bom"
                component={withMobileLayout(BOM)}
            />
            <Stack.Screen
                name="steriledocument"
                component={withMobileLayout(SterileDoument, { scroll: false })}
            />
        </Stack.Navigator>
    );
}
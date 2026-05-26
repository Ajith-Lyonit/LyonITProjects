// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import DashboardScreen from "../screens/Dashboard/DashboardScreen";
// import InitBoard from "../screens/InitBoard/InitBoard";
// import JobPlanning from "../screens/Planning/JobPlanning";
// import RMPlanning from "../screens/RMPlanning/RMPlanning";
// import JobCard from "../screens/JobCard/Jobcard";
// import LabelPrinting from "../screens/LabelPrinting/LabelPrinting";
// import FGTransfer from "../screens/FGTransfer/FGTransfer";
// import BOM from "../screens/BOM/BOM";
// import Sterile from "../screens/Sterile/Sterile";
// import DesktopLayout from "../layouts/DesktopLayout";
// import SterileDoument from "../components/Sterile/screens/SterilDocument";
// import Login from "../screens/Login/LoginScreen";

// const Stack = createNativeStackNavigator();

// export default function DesktopStack({ onLogout, initialRoute = "production" }: any) {
//     const withDesktopLayout = (Component: any) => (props: any) => (
//         <DesktopLayout onLogout={onLogout}>
//             <Component {...props} />
//         </DesktopLayout>
//     );
//     return (
//         <Stack.Navigator
//             initialRouteName={initialRoute}
//             screenOptions={{
//                 headerShown: false,
//                 animation: "fade",
//             }}
//         >
//             <Stack.Screen
//                 name="production"
//                 component={withDesktopLayout(DashboardScreen)}
//             />
//             <Stack.Screen
//                 name="dashboard"
//                 component={withDesktopLayout(InitBoard)}
//             />
//             <Stack.Screen
//                 name="planning"
//                 component={withDesktopLayout(JobPlanning)}
//             />
//             <Stack.Screen
//                 name="rmplanning"
//                 component={withDesktopLayout(RMPlanning)}
//             />
//             <Stack.Screen
//                 name="jobcard"
//                 component={withDesktopLayout(JobCard)}
//             />
//             <Stack.Screen
//                 name="labelprinting"
//                 component={withDesktopLayout(LabelPrinting)}
//             />
//             <Stack.Screen
//                 name="fgtransfer"
//                 component={withDesktopLayout(FGTransfer)}
//             />
//             <Stack.Screen
//                 name="sterile"
//                 component={withDesktopLayout(Sterile)}
//             />
//             <Stack.Screen
//                 name="bom"
//                 component={withDesktopLayout(BOM)}
//             />
//             <Stack.Screen
//                 name="steriledocument"
//                 component={withDesktopLayout(SterileDoument)}
//             />
//             <Stack.Screen
//                 name="login"
//                 component={withDesktopLayout(Login)}
//             />
//         </Stack.Navigator>
//     );
// }
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "../screens/Dashboard/DashboardScreen";
import InitBoard from "../screens/InitBoard/InitBoard";
import JobPlanning from "../screens/Planning/JobPlanning";
import RMPlanning from "../screens/RMPlanning/RMPlanning";
import JobCard from "../screens/JobCard/Jobcard";
import LabelPrinting from "../screens/LabelPrinting/LabelPrinting";
import FGTransfer from "../screens/FGTransfer/FGTransfer";
import BOM from "../screens/BOM/BOM";
import Sterile from "../screens/Sterile/Sterile";
import SterileDoument from "../components/Sterile/screens/SterilDocument";
import Login from "../screens/Login/LoginScreen";

import DesktopLayout from "../layouts/DesktopLayout";
import TransferDoument from "../components/Sterile/screens/TransferDocument";
import UserRegistration from "../screens/User/User";

const Stack = createNativeStackNavigator();

export default function DesktopStack({
    onLogout,
    initialRoute = "production",
}: any) {

    const withDesktopLayout =
        (
            Component: any,
            title:string,
            breadcrumbItems: any[]
        ) =>
            (props: any) => (
                <DesktopLayout
                    onLogout={onLogout}
                    title={title}
                    breadcrumbItems={breadcrumbItems}
                >
                    <Component {...props} />
                </DesktopLayout>
            );

    return (
        <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
                headerShown: false,
                animation: "fade",
            }}
        >
            <Stack.Screen
                name="production"
                component={withDesktopLayout(
                    DashboardScreen,
                     "LynQ Production",
                    [{ label: "Production" }]
                )}
            />


            <Stack.Screen
                name="planning"
                component={withDesktopLayout(
                    JobPlanning,
                    "LynQ Production",
                    [
                        { label: "Production", screen: "production" },
                        { label: "Planning" },
                    ]
                )}
            />

            <Stack.Screen
                name="rmplanning"
                component={withDesktopLayout(
                    RMPlanning,
                    "LynQ Production",
                    [
                        { label: "Production", screen: "production" },
                        { label: "RM Planning" },
                    ]
                )}
            />

            <Stack.Screen
                name="jobcard"
                component={withDesktopLayout(
                    JobCard,
                    "LynQ Production",
                    [
                        { label: "Production", screen: "production" },
                        { label: "Job Card" },
                    ]
                )}
            />

            <Stack.Screen
                name="labelprinting"
                component={withDesktopLayout(
                    LabelPrinting,
                    "LynQ Production",
                    [
                        { label: "Production", screen: "production" },
                        { label: "Label Printing" },
                    ]
                )}
            />

            <Stack.Screen
                name="fgtransfer"
                component={withDesktopLayout(
                    FGTransfer,
                    "LynQ Production",
                    [
                        { label: "Production", screen: "production" },
                        { label: "FG Transfer" },
                    ]
                )}
            />

            <Stack.Screen
                name="sterile"
                component={withDesktopLayout(
                    Sterile,
                    "LynQ Production",
                    [
                        { label: "Production", screen: "production" },
                        { label: "Sterile" },
                    ]
                )}
            />
            <Stack.Screen
                name="steriledocument"
                component={withDesktopLayout(
                    SterileDoument,
                    "LynQ Production",
                    [
                        { label: "Production", screen: "production" },
                        { label: "Sterile", screen: 'sterile' },
                        { label: "Document" },
                    ]
                )}
            />


            <Stack.Screen
                name="bom"
                component={withDesktopLayout(
                    BOM,
                    "LynQ Production",
                    [
                        { label: "Production", screen: "production" },
                        { label: "BOM" },
                    ]
                )}
            />

                        <Stack.Screen
                name="dashboard"
                component={withDesktopLayout(
                    InitBoard,
                    "LynQ Production",
                    [
                        { label: "Production", screen: "production" },
                        { label: "Dashboard" },
                    ]
                )}
            />

            <Stack.Screen
                name="transferdocument"
                component={withDesktopLayout(
                    TransferDoument,
                    "LynQ Production",
                    [
                        { label: "Production", screen: "production" },
                        { label: "Transfer", screen: 'sterile' },
                        { label: "Document" },
                    ]
                )}
            />
            <Stack.Screen
                name="createuser"
                component={UserRegistration}
            />
            <Stack.Screen
                name="login"
                component={Login}
            />
        </Stack.Navigator>
    );
}
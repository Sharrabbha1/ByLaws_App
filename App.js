// import React from 'react'; 
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
// import CitizenDashboard from './Screens/CitizenDashboard';
// import ReportingPage from './Screens/ReportingPage';
// import SearchViolation from './Screens/SearchViolation';
// import AdditionalDetailsPage from './Screens/AdditionalDetailsPage';
// import MyReportsPage from './Screens/MyReportsPage';
// import ProfilePage from './Screens/ProfilePage';
// import LandingPage from './Screens/LandingPage';
// import LoginPage from './Screens/LoginPage';
// import ApplicationPage from './Screens/ApplicationPage';
// import ReportDetailsPage from './Screens/ReportDetailsPage';



// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// // Stack for New Report
// function NewReportStack() {
//     return (
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="ReportingPage" component={ReportingPage} />
//             <Stack.Screen name="SearchViolation" component={SearchViolation} />
            
//             <Stack.Screen
//                 name="AdditionalDetailsPage"
//                 component={AdditionalDetailsPage}
//                 options={{ title: 'Additional Details' }} // Add title for clarity
//             />
//         </Stack.Navigator>
//     );
// }
// function AuthStack() {
//     return (
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="LandingPage" component={LandingPage} />
//             <Stack.Screen name="LoginPage" component={LoginPage} />
//             <Stack.Screen name="ApplicationPage" component={ApplicationPage} />
//         </Stack.Navigator>
//     );
// }


// export default function App() {
//     return (
//         <NavigationContainer>
//             <Stack.Navigator screenOptions={{ headerShown: false }}>
//                 <Stack.Screen name="AuthStack" component={AuthStack} />
//                 <Stack.Screen name="MainApp" component={MainTabNavigator} />
//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// }

// function MainTabNavigator() {
//     return (
//         <Tab.Navigator
//             screenOptions={({ route }) => ({
//                 headerShown: false,
//                 tabBarStyle: styles.tabBar,
//                 tabBarActiveTintColor: '#eff1ef',
//                 tabBarInactiveTintColor: '#a5aba5',
//                 tabBarIcon: ({ color, size }) => {
//                     let iconName;
//                     if (route.name === 'Home') iconName = 'home';
//                     else if (route.name === 'New Report') iconName = 'file-alt';
//                     else if (route.name === 'My Reports') iconName = 'list-alt';
//                     else if (route.name === 'Profile') iconName = 'user';

//                     return <FontAwesome5 name={iconName} size={size} color={color} />;
//                 },
//             })}
//         >
//             <Tab.Screen name="Home" component={CitizenDashboard} />
//             <Tab.Screen name="New Report" component={NewReportStack} />
//             <Tab.Screen name="My Reports" component={MyReportsPage} />
//             <Tab.Screen name="Profile" component={ProfilePage} />
//         </Tab.Navigator>
//     );
// }


// const styles = {
//     tabBar: {
//         backgroundColor: '#5A6E5B',
//         borderTopWidth: 1,
//         borderTopColor: '#3d3f3d',
//         paddingVertical: 5,
//     },
// };

// import React from 'react'; 
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { FontAwesome5 } from '@expo/vector-icons';

// // Screens
// import CitizenDashboard from './Screens/CitizenDashboard';
// import ReportingPage from './Screens/ReportingPage';
// import SearchViolation from './Screens/SearchViolation';
// import AdditionalDetailsPage from './Screens/AdditionalDetailsPage';
// import MyReportsPage from './Screens/MyReportsPage';
// import ProfilePage from './Screens/ProfilePage';
// import LandingPage from './Screens/LandingPage';
// import LoginPage from './Screens/LoginPage';
// import ApplicationPage from './Screens/ApplicationPage';
// import ReportDetailsPage from './Screens/ReportDetailsPage';

// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// // New Report Stack
// function NewReportStack() {
//     return (
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="ReportingPage" component={ReportingPage} />
//             <Stack.Screen name="SearchViolation" component={SearchViolation} />
//             <Stack.Screen name="AdditionalDetailsPage" component={AdditionalDetailsPage} />
//         </Stack.Navigator>
//     );
// }

// // Reports Stack with ReportDetailsPage
// function ReportsStack() {
//     return (
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="MyReportsPage" component={MyReportsPage} />
//             <Stack.Screen name="ReportDetailsPage" component={ReportDetailsPage} />
//         </Stack.Navigator>
//     );
// }

// // Auth Stack
// function AuthStack() {
//     return (
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="LandingPage" component={LandingPage} />
//             <Stack.Screen name="LoginPage" component={LoginPage} />
//             <Stack.Screen name="ApplicationPage" component={ApplicationPage} />
//         </Stack.Navigator>
//     );
// }

// // Tab Navigation
// function MainTabNavigator() {
//     return (
//         <Tab.Navigator
//             screenOptions={({ route }) => ({
//                 headerShown: false,
//                 tabBarStyle: styles.tabBar,
//                 tabBarActiveTintColor: '#eff1ef',
//                 tabBarInactiveTintColor: '#a5aba5',
//                 tabBarIcon: ({ color, size }) => {
//                     let iconName;
//                     if (route.name === 'Home') iconName = 'home';
//                     else if (route.name === 'New Report') iconName = 'file-alt';
//                     else if (route.name === 'My Reports') iconName = 'list-alt';
//                     else if (route.name === 'Profile') iconName = 'user';

//                     return <FontAwesome5 name={iconName} size={size} color={color} />;
//                 },
//             })}
//         >
//             <Tab.Screen name="Home" component={CitizenDashboard} />
//             <Tab.Screen name="New Report" component={NewReportStack} />
//             <Tab.Screen name="My Reports" component={ReportsStack} />
//             <Tab.Screen name="Profile" component={ProfilePage} />
//         </Tab.Navigator>
//     );
// }

// // Root App
// export default function App() {
//     return (
//         <NavigationContainer>
//             <Stack.Navigator screenOptions={{ headerShown: false }}>
//                 <Stack.Screen name="AuthStack" component={AuthStack} />
//                 <Stack.Screen name="MainApp" component={MainTabNavigator} />
//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// }

// const styles = {
//     tabBar: {
//         backgroundColor: '#5A6E5B',
//         borderTopWidth: 1,
//         borderTopColor: '#3d3f3d',
//         paddingVertical: 5,
//     },
// };
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { FontAwesome5 } from '@expo/vector-icons';

// // Screens
// import CitizenDashboard from './Screens/CitizenDashboard';
// import ReportingPage from './Screens/ReportingPage';
// import SearchViolation from './Screens/SearchViolation';
// import AdditionalDetailsPage from './Screens/AdditionalDetailsPage';
// import MyReportsPage from './Screens/MyReportsPage';
// import ProfilePage from './Screens/ProfilePage';
// import LandingPage from './Screens/LandingPage';
// import LoginPage from './Screens/LoginPage';
// import ApplicationPage from './Screens/ApplicationPage';
// import ReportDetailsPage from './Screens/ReportDetailsPage';
// import ForgotPasswordPage from './Screens/ForgotPasswordScreen';
// import ResetPasswordPage from './Screens/ResetPasswordPage';

// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// // New Report Stack
// function NewReportStack() {
//     return (
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="ReportingPage" component={ReportingPage} />
//             <Stack.Screen name="SearchViolation" component={SearchViolation} />
//             <Stack.Screen name="AdditionalDetailsPage" component={AdditionalDetailsPage} />
//         </Stack.Navigator>
//     );
// }

// // Reports Stack
// function ReportsStack() {
//     return (
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="MyReportsPage" component={MyReportsPage} />
//             <Stack.Screen name="ReportDetailsPage" component={ReportDetailsPage} />
//         </Stack.Navigator>
//     );
// }

// // Auth Stack
// function AuthStack() {
//     return (
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="LandingPage" component={LandingPage} />
//             <Stack.Screen name="LoginPage" component={LoginPage} />
//             <Stack.Screen name="ApplicationPage" component={ApplicationPage} />
//             <Stack.Screen name="ForgotPasswordPage" component={ForgotPasswordPage} />
//             <Stack.Screen name="ResetPasswordPage" component={ResetPasswordPage} />
//         </Stack.Navigator>
//     );
// }

// // Tab Navigation
// function MainTabNavigator() {
//     return (
//         <Tab.Navigator
//             screenOptions={({ route }) => ({
//                 headerShown: false,
//                 tabBarStyle: styles.tabBar,
//                 tabBarActiveTintColor: '#eff1ef',
//                 tabBarInactiveTintColor: '#a5aba5',
//                 tabBarIcon: ({ color, size }) => {
//                     let iconName;
//                     if (route.name === 'Home') iconName = 'home';
//                     else if (route.name === 'New Report') iconName = 'file-alt';
//                     else if (route.name === 'My Reports') iconName = 'list-alt';
//                     else if (route.name === 'Profile') iconName = 'user';

//                     return <FontAwesome5 name={iconName} size={size} color={color} />;
//                 },
//             })}
//         >
//             <Tab.Screen name="Home" component={CitizenDashboard} />
//             <Tab.Screen name="New Report" component={NewReportStack} />
//             <Tab.Screen name="My Reports" component={ReportsStack} />
//             <Tab.Screen name="Profile" component={ProfilePage} />
//         </Tab.Navigator>
//     );
// }

// // Root App
// export default function App() {
//     return (
//         <NavigationContainer>
//             <Stack.Navigator screenOptions={{ headerShown: false }}>
//                 <Stack.Screen name="AuthStack" component={AuthStack} />
//                 <Stack.Screen name="MainApp" component={MainTabNavigator} />
//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// }

// const styles = {
//     tabBar: {
//         backgroundColor: '#5A6E5B',
//         borderTopWidth: 1,
//         borderTopColor: '#3d3f3d',
//         paddingVertical: 5,
//     },
// };
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome5 } from '@expo/vector-icons';

// Screens
import CitizenDashboard from './Screens/CitizenDashboard';
import ReportingPage from './Screens/ReportingPage';
import SearchViolation from './Screens/SearchViolation';
import AdditionalDetailsPage from './Screens/AdditionalDetailsPage';
import MyReportsPage from './Screens/MyReportsPage';
import ProfilePage from './Screens/ProfilePage';
import LandingPage from './Screens/LandingPage';
import LoginPage from './Screens/LoginPage';
import ApplicationPage from './Screens/ApplicationPage';
import ReportDetailsPage from './Screens/ReportDetailsPage';
import ForgotPasswordScreen from './Screens/ForgotPasswordScreen'; // ✅ Keep this one

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// New Report Stack
function NewReportStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ReportingPage" component={ReportingPage} />
      <Stack.Screen name="SearchViolation" component={SearchViolation} />
      <Stack.Screen name="AdditionalDetailsPage" component={AdditionalDetailsPage} />
    </Stack.Navigator>
  );
}

// Reports Stack
function ReportsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyReportsPage" component={MyReportsPage} />
      <Stack.Screen name="ReportDetailsPage" component={ReportDetailsPage} />
    </Stack.Navigator>
  );
}

// Auth Stack
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="ApplicationPage" component={ApplicationPage} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      {/* Removed ResetPasswordPage */}
    </Stack.Navigator>
  );
}

// Tab Navigation
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#eff1ef',
        tabBarInactiveTintColor: '#a5aba5',
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'New Report') iconName = 'file-alt';
          else if (route.name === 'My Reports') iconName = 'list-alt';
          else if (route.name === 'Profile') iconName = 'user';

          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={CitizenDashboard} />
      <Tab.Screen name="New Report" component={NewReportStack} />
      <Tab.Screen name="My Reports" component={ReportsStack} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
}

// Root App
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="MainApp" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = {
  tabBar: {
    backgroundColor: '#5A6E5B',
    borderTopWidth: 1,
    borderTopColor: '#3d3f3d',
    paddingVertical: 5,
  },
};
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { FontAwesome5 } from '@expo/vector-icons';

// // Screens
// import CitizenDashboard from './Screens/CitizenDashboard';
// import ReportingPage from './Screens/ReportingPage';
// import SearchViolation from './Screens/SearchViolation';
// import AdditionalDetailsPage from './Screens/AdditionalDetailsPage';
// import MyReportsPage from './Screens/MyReportsPage';
// import ProfilePage from './Screens/ProfilePage';
// import LandingPage from './Screens/LandingPage';
// import LoginPage from './Screens/LoginPage';
// import ApplicationPage from './Screens/ApplicationPage';
// import ReportDetailsPage from './Screens/ReportDetailsPage';
// import ForgotPasswordScreen from './Screens/ForgotPassword'; // ✅ Renamed for consistency

// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// // New Report Stack
// function NewReportStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="ReportingPage" component={ReportingPage} />
//       <Stack.Screen name="SearchViolation" component={SearchViolation} />
//       <Stack.Screen name="AdditionalDetailsPage" component={AdditionalDetailsPage} />
//     </Stack.Navigator>
//   );
// }

// // Reports Stack
// function ReportsStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="MyReportsPage" component={MyReportsPage} />
//       <Stack.Screen name="ReportDetailsPage" component={ReportDetailsPage} />
//     </Stack.Navigator>
//   );
// }

// // Auth Stack
// function AuthStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="LandingPage" component={LandingPage} />
//       <Stack.Screen name="LoginPage" component={LoginPage} />
//       <Stack.Screen name="ApplicationPage" component={ApplicationPage} />
//     </Stack.Navigator>
//   );
// }

// // Main Tab Navigator
// function MainTabNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarStyle: styles.tabBar,
//         tabBarActiveTintColor: '#eff1ef',
//         tabBarInactiveTintColor: '#a5aba5',
//         tabBarIcon: ({ color, size }) => {
//           let iconName;
//           if (route.name === 'Home') iconName = 'home';
//           else if (route.name === 'New Report') iconName = 'file-alt';
//           else if (route.name === 'My Reports') iconName = 'list-alt';
//           else if (route.name === 'Profile') iconName = 'user';

//           return <FontAwesome5 name={iconName} size={size} color={color} />;
//         },
//       })}
//     >
//       <Tab.Screen name="Home" component={CitizenDashboard} />
//       <Tab.Screen name="New Report" component={NewReportStack} />
//       <Tab.Screen name="My Reports" component={ReportsStack} />
//       <Tab.Screen name="Profile" component={ProfilePage} />
//     </Tab.Navigator>
//   );
// }

// // Root App
// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="AuthStack" component={AuthStack} />
//         <Stack.Screen name="MainApp" component={MainTabNavigator} />
//         <Stack.Screen name="ForgotPasswordPage" component={ForgotPasswordPage} /> {/* ✅ Globally accessible */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = {
//   tabBar: {
//     backgroundColor: '#5A6E5B',
//     borderTopWidth: 1,
//     borderTopColor: '#3d3f3d',
//     paddingVertical: 5,
//   },
// };

import React from "react";
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ConsolidateScreen from "./ConsolidateScreen";
import ProfileScreen from "./profileScreen";
import DrawerContent from "../navigation/DrawerContent";
import SupportScreen from "./supportScreen";
import DepositScreen from "./depositScreen";
import SettingsScreen from "./settingsScreens";
import MenuMoneyScreen from "./menuMoneyScreen";
import SendMoneyScreen from "./sendMoneyScreen";
import ContactsScreen from "./contactsScreen";
const Drawer = createDrawerNavigator();

//

export const homeScreen = (props) => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={ConsolidateScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Support" component={SupportScreen} />
      <Drawer.Screen name="Deposit" component={DepositScreen} />
      <Drawer.Screen name="MenuMoney" component={MenuMoneyScreen} />
      <Drawer.Screen name="SendMoney" component={SendMoneyScreen} />
      <Drawer.Screen name="Contacts" component={ContactsScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({});

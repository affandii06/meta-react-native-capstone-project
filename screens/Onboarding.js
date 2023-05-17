import React, { useState, useRef, useContext, useCallback } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Pressable,
} from "react-native";
import PagerView from "react-native-pager-view";
import { EmailValidator, NameValidator } from "../utils";
import Constants from "expo-constants";

import { AuthContext } from "../contexts/AuthContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const Onboarding = () => {
  const [firstName, onChangeFirstName] = useState("");
  const [lastName, onChangeLastName] = useState("");
  const [email, onChangeEmail] = useState("");

  const isEmailValid = EmailValidator(email);
  const isFirstNameValid = validateName(firstName);
  const isLastNameValid = validateName(lastName);
  const viewPagerRef = useRef(PagerView);

  const { onboard } = useContext(AuthContext);

  // FONTS
  const [fontsLoaded] = useFonts({
    "Karla-Regular": require("../assets/fonts/Karla-Regular.ttf"),
    "Karla-Medium": require("../assets/fonts/Karla-Medium.ttf"),
    "Karla-Bold": require("../assets/fonts/Karla-Bold.ttf"),
    "Karla-ExtraBold": require("../assets/fonts/Karla-ExtraBold.ttf"),
    "MarkaziText-Regular": require("../assets/fonts/MarkaziText-Regular.ttf"),
    "MarkaziText-Medium": require("../assets/fonts/MarkaziText-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      onLayout={onLayoutRootView}
    >
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../img/littleLemonLogo.png")}
          accessible={true}
          accessibilityLabel={"Little Lemon Logo"}
        />
      </View>
      <Text style={styles.welcomeText}>Let us get to know you</Text>
      <PagerView
        style={styles.viewPager}
        scrollEnabled={false}
        initialPage={0}
        ref={viewPagerRef}
      >
        <View style={styles.page} key="1">
          <View style={styles.pageContainer}>
            <Text style={styles.text}>First Name</Text>
            <TextInput
              style={styles.inputBox}
              value={firstName}
              onChangeText={onChangeFirstName}
              placeholder={"First Name"}
            />
          </View>
          <View style={styles.pageIndicator}>
            <View style={[styles.pageDot, styles.pageDotActive]}></View>
            <View style={styles.pageDot}></View>
            <View style={styles.pageDot}></View>
          </View>
          <Pressable
            style={[styles.btn, isFirstNameValid ? "" : styles.btnDisabled]}
            onPress={() => viewPagerRef.current.setPage(1)}
            disabled={!isFirstNameValid}
          >
            <Text style={styles.btntext}>Next</Text>
          </Pressable>
        </View>
        <View style={styles.page} key="2">
          <View style={styles.pageContainer}>
            <Text style={styles.text}>Last Name</Text>
            <TextInput
              style={styles.inputBox}
              value={lastName}
              onChangeText={onChangeLastName}
              placeholder={"Last Name"}
            />
          </View>
          <View style={styles.pageIndicator}>
            <View style={styles.pageDot}></View>
            <View style={[styles.pageDot, styles.pageDotActive]}></View>
            <View style={styles.pageDot}></View>
          </View>
          <View style={styles.buttons}>
            <Pressable
              style={styles.halfBtn}
              onPress={() => viewPagerRef.current.setPage(0)}
            >
              <Text style={styles.btntext}>Back</Text>
            </Pressable>
            <Pressable
              style={[
                styles.halfBtn,
                isLastNameValid ? "" : styles.btnDisabled,
              ]}
              onPress={() => viewPagerRef.current.setPage(2)}
              disabled={!isLastNameValid}
            >
              <Text style={styles.btntext}>Next</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.page} key="3">
          <View style={styles.pageContainer}>
            <Text style={styles.text}>Email</Text>
            <TextInput
              style={styles.inputBox}
              value={email}
              onChangeText={onChangeEmail}
              placeholder={"Email"}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.pageIndicator}>
            <View style={styles.pageDot}></View>
            <View style={styles.pageDot}></View>
            <View style={[styles.pageDot, styles.pageDotActive]}></View>
          </View>
          <View style={styles.buttons}>
            <Pressable
              style={styles.halfBtn}
              onPress={() => viewPagerRef.current.setPage(1)}
            >
              <Text style={styles.btntext}>Back</Text>
            </Pressable>
            <Pressable
              style={[styles.halfBtn, isEmailValid ? "" : styles.btnDisabled]}
              onPress={() => onboard({ firstName, lastName, email })}
              disabled={!isEmailValid}
            >
              <Text style={styles.btntext}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </PagerView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  header: {
    backgroundColor: "#dee3e9",
    flexDirection: "row",
    justifyContent: "center",
    padding: 12,
  },
  logo: {
    height: 50,
    resizeMode: "contain",
    width: 150,
  },
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
  },
  pageContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  welcomeText: {
    color: "#495E57",
    fontSize: 40,
    fontFamily: "MarkaziText-Medium",
    paddingVertical: 60,
    textAlign: "center",
  },
  text: {
    color: "#495E57",
    fontSize: 24,
    fontFamily: "Karla-ExtraBold",
  },
  inputBox: {
    alignSelf: "stretch",
    borderColor: "#EDEFEE",
    backgroundColor: "#EDEFEE",
    borderRadius: 9,
    borderWidth: 1,
    fontSize: 20,
    fontFamily: "Karla-Medium",
    height: 50,
    margin: 18,
    padding: 10,
  },
  btn: {
    alignSelf: "stretch",
    backgroundColor: "#f4ce14",
    borderColor: "#f4ce14",
    borderRadius: 9,
    borderWidth: 1,
    marginHorizontal: 18,
    marginBottom: 60,
    padding: 10,
  },
  btnDisabled: {
    backgroundColor: "#f1f4f7",
  },
  buttons: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 18,
    marginBottom: 60,
  },
  halfBtn: {
    alignSelf: "stretch",
    borderColor: "#f4ce14",
    backgroundColor: "#f4ce14",
    borderRadius: 9,
    borderWidth: 1,
    flex: 1,
    marginRight: 18,
    padding: 10,
  },
  btntext: {
    alignSelf: "center",
    color: "#333",
    fontFamily: "Karla-Bold",
    fontSize: 22,
  },
  pageIndicator: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    justifyContent: "center",
    marginBottom: 20,
  },
  pageDot: {
    backgroundColor: "#67788a",
    borderRadius: 11,
    height: 22,
    marginHorizontal: 10,
    width: 22,
  },
  pageDotActive: {
    backgroundColor: "#f4ce14",
    borderRadius: 11,
    height: 22,
    width: 22,
  },
});

export default Onboarding;

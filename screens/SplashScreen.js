import React from "react";
import { View, StyleSheet, Image } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../img/littleLemonLogo.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    height: 100,
    resizeMode: "contain",
    width: "90%",
  },
});

export default SplashScreen;

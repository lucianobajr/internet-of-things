import React, { useState, useEffect } from "react";
import { firebase } from "@react-native-firebase/database";

import { StyleSheet, Text, View } from "react-native";

const reference = firebase.app().database().ref("/motion");

export default function App() {
  const [motion, setMotion] = useState("");

  useEffect(() => {
    reference.on("value", (room) => {
      const data = room.val();
      setMotion(data);
    });

    return () => {
      reference.off("value");
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Motion: {motion}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

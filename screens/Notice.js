import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Notice({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleStyle}>
        <Text style={styles.TextTitle}>8초간 1컷이 촬영됩니다</Text>
        <Text style={styles.TextDefalut}>원하는 경우 바로 촬영할 수 있습니다</Text>
      </View>

      {/* Button Section */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CameraScreen", {screen:"CameraScreen"})} // 페이지 이동 시 replace 사용
      >
        <Text style={styles.buttonText}>촬영시작</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    titleStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#1c1c1c",
    },
    button: {
      backgroundColor: "#fee500",
      marginTop: 80,
      marginBottom: 180,
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
      width: 250,
      alignItems: 'center',
      alignContent: 'center'
    },
    buttonText: {
      color: '#000',
      fontSize: 18,
      fontWeight: "bold",
      alignItems: 'center',
      alignContent: 'center'
    },
    TextTitle: {
      color: "#fff",
      fontSize: 38,
      fontWeight: "bold"
    },
    TextDefalut: {
      color: "#fff",
      fontSize: 18
    }
  });


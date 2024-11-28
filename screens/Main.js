// Main.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function Main({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Title Section */}
      <View style={styles.titleStyle}>
        <Text style={styles.TextTitle}>마이컷</Text>
        <Text style={styles.TextDefalut}>내 손에서 즐기는 4컷사진</Text>
      </View>

      {/* Button Section */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CameraScreen")} // 카메라 화면으로 이동
      >
        <Text style={styles.buttonText}>촬영하기</Text>
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
    backgroundColor: "#fff",
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
    fontSize: 60,
    fontWeight: "bold"
  },
  TextDefalut: {
    color: "#fff",
    fontSize: 18
  }
});

export default Main;

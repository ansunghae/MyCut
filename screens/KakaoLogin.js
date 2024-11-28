import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
require("dotenv").config()

const REST_API_KEY = process.env.REST_API_KEY;
const REDIRECT_URI = process.env.REDIRECT_URI;

const KakaoLogin = ({ navigation }) => {
  const [showWebView, setShowWebView] = useState(true);

  const KakaoLoginWebView = (data) => {
    const exp = "code=";
    const condition = data.indexOf(exp);
    if (condition !== -1) {
      const authorize_code = data.substring(condition + exp.length);
      console.log("Authorization Code:", authorize_code);

      // WebView를 숨기고 Main 화면으로 이동, 스택을 리셋
      setShowWebView(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "Main", params: { token: authorize_code } }],
      });  // reset 사용
    }
  };

  if (!showWebView) {
    return (
      <View style={Styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={Styles.container}>
      <WebView
        style={{ flex: 1 }}
        originWhitelist={["*"]}
        scalesPageToFit={false}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        javaScriptEnabled
        onNavigationStateChange={(event) => {
          if (event.url.includes("code=")) {
            KakaoLoginWebView(event.url);
          }
        }}
      />
    </View>
  );
};

export default KakaoLogin;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

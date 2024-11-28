import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Alert, Linking, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

export default function CameraScreen() {
  const [facing, setFacing] = useState("front");
  const [permission, requestPermission] = useCameraPermissions();
  const [countdown, setCountdown] = useState(8);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [isTakingPhotos, setIsTakingPhotos] = useState(false);
  const camera = useRef(null);
  const navigation = useNavigation(); // Initialize navigation hook

  const checkPermissions = async () => {
    if (!permission) return;

    if (permission?.status !== 'granted') {
      if (!permission?.canAskAgain) {
        Alert.alert(
          "권한이 필요합니다.",
          "앱 설정에서 카메라 권한을 활성화해주세요.",
          [
            { text: "취소", style: 'cancel' },
            { text: "설정열기", onPress: () => { Linking.openSettings() } }
          ],
          { cancelable: false }
        )
      } else {
        requestPermission()
      }
    }
  }

  useEffect(() => {
    checkPermissions();
  }, [permission]);

  // 사진을 찍는 함수
  const takePicture = async () => {
    if (camera.current) {
      const photoData = await camera.current.takePictureAsync();
      setCapturedPhotos(prevPhotos => [...prevPhotos, photoData.uri]); // 사진 저장
    }
  };

  const startCountdown = useCallback(() => {
    setIsTakingPhotos(true);
    let countdownTimer = 8;
    let count = 0;
    let interval;

    interval = setInterval(() => {
      setCountdown(countdownTimer);
      countdownTimer--;

      if (countdownTimer === 0) {
        takePicture(); // 사진 촬영
        countdownTimer = 8; // 타이머 초기화
        count++;
      }

      if (count >= 6) {
        clearInterval(interval);
        setIsTakingPhotos(false);
      }
    }, 1000);
  }, []);

  // `capturedPhotos`가 업데이트된 후에 화면 전환을 처리하는 `useEffect`
  useEffect(() => {
    if (capturedPhotos.length === 6) {
      navigation.replace("PictureAfter", { photos: capturedPhotos });
    }
  }, [capturedPhotos, navigation]);

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={camera}>
        <View style={styles.buttonContainer}>
          <Text style={styles.text}>카메라 작동중</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={startCountdown}
            disabled={isTakingPhotos}
          >
            <Text style={styles.text}>{isTakingPhotos ? "촬영 중..." : "촬영 시작"}</Text>
          </TouchableOpacity>

          {isTakingPhotos && (
            <Text style={styles.countdownText}>
              남은 시간: {countdown}초
            </Text>
          )}
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 15,
    borderRadius: 50,
    marginTop: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  countdownText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'red',
    marginTop: 20,
  },
});

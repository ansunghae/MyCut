import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, useCameraPermissions } from 'expo-camera'; // Correct import

export default function CameraScreen() {
  const [facing, setFacing] = useState('back'); // Set initial camera type to 'back'
  const [permission, requestPermission] = useCameraPermissions(); // Camera permissions hook

  // Check if permission is still loading
  useEffect(() => {
    const checkPermissions = async () => {
      if (permission?.status !== 'granted') {
        await requestPermission(); // Request permission if not granted
      }
    };

    if (permission?.status === 'undetermined') {
      checkPermissions(); // Ask for permission if it's undetermined
    }
  }, [permission, requestPermission]);

  // If permission is still loading or not granted
  if (permission === null) {
    return <View style={styles.container}><Text>카메라 권한을 요청 중입니다...</Text></View>;
  }

  // If permission is denied
  if (permission.status === 'denied') {
    return (
      <View style={styles.container}>
        <Text>카메라 권한이 필요합니다.</Text>
        <Button onPress={requestPermission} title="권한 요청하기" />
      </View>
    );
  }

  // Toggle the camera facing (front/back)
  const toggleCameraFacing = () => {
    setFacing(facing === 'back' ? 'front' : 'back');
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
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
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

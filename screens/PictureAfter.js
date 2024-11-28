import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

export default function PictureAfter({ route }) {
    const { photos } = route.params; // 전달된 사진 URI 배열
    const ph = route.params.photos
    console.log(photos); // 전달된 사진 URI 배열을 확인
    console.log(ph)
  
    return (
      <View style={styles.container}>
        <Text style={styles.text}>촬영된 사진들:</Text>
        <ScrollView contentContainerStyle={styles.photoContainer}>
          {photos.length > 0 ? (
            photos.map((uri, index) => (
              <Image key={index} source={{ uri }} style={styles.photo} />
            ))
          ) : (
            <Text>사진이 없습니다.</Text>
          )}
        </ScrollView>
      </View>
    );
  }  
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  photoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 5,
  },
});

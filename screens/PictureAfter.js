import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, FlatList } from 'react-native';

export default function PictureAfter({ route }) {
  const { photos } = route.params; // 전달받은 사진 리스트
  const [selectedPhotos, setSelectedPhotos] = useState([null, null, null, null]); // 선택된 사진 4장

  const handlePhotoClick = (uri) => {
    // 이미 선택된 경우 선택 해제
    if (selectedPhotos.includes(uri)) {
      setSelectedPhotos((prev) => prev.map((photo) => (photo === uri ? null : photo)));
    } else {
      // 비어있는 칸에 추가 (최대 4장까지)
      const nextIndex = selectedPhotos.findIndex((photo) => photo === null);
      if (nextIndex !== -1) {
        setSelectedPhotos((prev) => {
          const updated = [...prev];
          updated[nextIndex] = uri;
          return updated;
        });
      }
    }
  };

  const renderSelectedPhotos = () => (
    <View style={styles.gridContainer}>
      {selectedPhotos.map((photo, index) => (
        <View key={index} style={styles.gridItem}>
          {photo && <Image source={{ uri: photo }} style={styles.gridImage} />}
        </View>
      ))}
    </View>
  );

  const renderPhotoList = () => (
    <FlatList
      data={photos}
      horizontal
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlePhotoClick(item)} style={styles.photoItem}>
          <Image source={{ uri: item }} style={styles.photoThumbnail} />
          {selectedPhotos.includes(item) && <View style={styles.selectedOverlay} />}
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.photoList}
    />
  );

  const selectedCount = selectedPhotos.filter(Boolean).length; // 선택된 사진 수

  const ShowButton = () => {
    if(selectedCount == 4){
      return <Text>dasf</Text>
    } return null;
  }
  return (
    <View style={styles.container}>
      {/* 선택된 사진 그리드 */}
      {renderSelectedPhotos()}

      {/* 선택 상태 표시 */}
      <Text style={styles.infoText}>
        선택한 사진: {selectedCount} / 4
      </Text>

      {/* 가로 스크롤 사진 리스트 */}
      {renderPhotoList()}
      {ShowButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  gridItem: {
    width: '48%',
    aspectRatio: 1, // 정사각형
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  gridImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  photoList: {
    alignItems: 'center',
  },
  photoItem: {
    marginHorizontal: 8,
    position: 'relative',
  },
  photoThumbnail: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  selectedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 8,
  },
});

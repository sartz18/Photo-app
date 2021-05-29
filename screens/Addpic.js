import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, Button, Image } from 'react-native'
import { Camera } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'
import { StyledButton,ButtonText } from '../components/style'


export default function AddPic({ navigation,route}) {

  const {username}=route.params
  const [cameraPermission, setCameraPermission] = useState(null)
  const [galleryPermission, setGalleryPermission] = useState(null)

  const [camera, setCamera] = useState(null)
  const [image, setImage] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)

  const createFormData = (photo) => {
        const data = new FormData()
    
        data.append('image', {
            name: `${username}`+'.jpg',
            type: 'image/jpg',
            uri: photo.uri
        })
    
        return data
    }

  const permisionFunction = async () => {
      
      cameraPermission = await Camera.requestPermissionsAsync()
      setCameraPermission(cameraPermission.status === 'granted')
      galleryPermission = await ImagePicker.getMediaLibraryPermissionsAsync()
      setGalleryPermission(imagePermission.status === 'granted')
      if (galleryPermission.status !== 'granted' && cameraPermission.status !== 'granted') {
          alert('Permission for media access needed.')
      }
  }

  useEffect(() => {
    permisionFunction()
  }, [])

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.2
      })
      setImage(data)
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.2
    })

    if (!result.cancelled) {
        setImage(result)
    }
  }
  
  const uploadPic=async()=>{
      const data=createFormData(image)
      await axios.post(`https://photo-app-backend-api.herokuapp.com/image/upload`,data)
      navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={'1:1'}
        />
      </View>

      <Button title={'Take Picture'} onPress={takePicture} />
      <Button title={'Gallery'} onPress={pickImage} />
      {image && <Image source={{ uri: image.uri }} style={{ flex: 1 }} />}
      {image && <StyledButton onPress={uploadPic}>
          <ButtonText>Upload</ButtonText>
      </StyledButton>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  button: {
    flex: 0.1,
    padding: 10,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
});

import React,{useState,useEffect} from 'react'
import KeyboardWrapper from '../components/keyboardAvoidingWrapper'
import {
    Colors,
    Container,
    HeaderContainer,
    Title,
    AddPicContainer,
    AddPicButton,
    LogOutContainer,
    LogOutContent,
    PicBox,
    Picture,
    PicText
} from '../components/style'
import axios from 'axios'
import { Button, Alert } from 'react-native'

const Home=({navigation,route})=>{

    const [response,setResponse]=useState([])
    
    const getAllImage=async()=>{
        const url='https://photo-app-backend-api.herokuapp.com/image/all'
        const data=await axios.get(url)
        for(let i=0;i<data.data.images.length;i++){
            setResponse(prevItems => [...prevItems,data.data.images[i]])
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getAllImage()
        })
        return unsubscribe
      }, [navigation])

    const clickHandler = () => {
        navigation.navigate('Addpic',{...route.params})    
    }

    return (
        <KeyboardWrapper>
            <Container>
                <HeaderContainer>
                    <Title>Photo App</Title>
                    <AddPicContainer onPress={clickHandler}>
                        <AddPicButton
                            source={{
                            uri:
                                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
                            }}
                        />
                    </AddPicContainer>
                    <LogOutContainer>
                    <Button 
                            title = "Test"
                            onPress={() => Alert.alert("Holdup", "Do you really want to logout?", [
                                { text: "Yes", onPress: () => navigation.navigate('Login')},
                                { text: "No"},
                            ])} />
                        <LogOutContent>Logout</LogOutContent>
                    </LogOutContainer>
                </HeaderContainer>
                {response.map((image) => {
                   return(
                       <PicBox key={image._id}>
                           <Picture source={{uri:image.path}} />
                           <PicText>Uploaded by: {image.username}</PicText>
                           <PicText>Face Count: {image.countOfFaces}</PicText>
                       </PicBox>
                   )
                })}
            </Container>
        </KeyboardWrapper>
    )
}

export default Home


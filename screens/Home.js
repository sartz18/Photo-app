import React,{useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import {View} from 'react-native'
import {Octicons,Ionicons} from '@expo/vector-icons'
import KeyboardAvoidingWrapper from '../components/keyboardAvoidingWrapper';

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    Subtitle,
    StyledFormArea,
    StyledTextInput,
    StyledInputLabel,
    LeftIcon,
    RightIcon,
    StyledButton,
    ButtonText,
    Colors,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent
} from '../components/style'

const {brand,darklight}=Colors

const Home=({navigation})=>{

    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('../assets/image/pic5.png')} />
                <PageTitle>Photo App</PageTitle>
                <Subtitle>Home Page</Subtitle>
                <TextLink onPress={()=>navigation.navigate('Login')}>
                    <TextLinkContent>LogOut</TextLinkContent>
                </TextLink>
            </InnerContainer>
        </StyledContainer>
    )
}


export default Home
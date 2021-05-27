import React,{useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import {View,ActivityIndicator} from 'react-native'
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

import axios from 'axios'

const {brand,darklight,primary}=Colors

const Login=({navigation})=>{


    const [hidePassword,setHidePassword]=useState(true)
    const [message,setMessage]=useState()
    const [messageType,setMessageType]=useState()

    const handleLogin=async(credentials,setSubmitting)=>{

        handleMessage(null)
        const url='https://photo-app-backend-api.herokuapp.com/user/signin'

        try{
            const response=await axios.post(url,credentials)
            const result=response.data
            const {message,status,data}=result

            if(status !== 'SUCCESS'){
                handleMessage(message,status)
            }
            else{
                navigation.navigate('Home',{...data[0]})
            }
            setSubmitting(false)
        }
        catch(error){
            console.log(error.JSON())
            handleMessage('An error occured. Check your connection and try again')
            setSubmitting(false)
        }
        
    }

    const handleMessage=(message,type='FAILED')=>{
        setMessage(message)
        setMessageType(type)
    }

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style='dark' />
                <InnerContainer>
                    <PageLogo resizeMode="cover" source={require('../assets/image/pic5.png')} />
                    <PageTitle>Photo App</PageTitle>
                    <Subtitle>Account Login</Subtitle>

                    <Formik
                        initialValues={{email:'',password:''}}
                        onSubmit={(values,{setSubmitting})=>{
                            
                            if(values.email == '' || values.password == ''){
                                handleMessage('All fields are mandatory')
                                setSubmitting(false)
                            }
                            else{
                                handleLogin(values,setSubmitting)
                            }
                        }}
                    >{({handleChange,handleBlur,handleSubmit,values,isSubmitting})=><StyledFormArea>
                            <MytextInput
                                label="Email Address"
                                icon="mail"
                                placeholder="andy@gmail.com"
                                placeholderTextColor={darklight}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />

                            <MytextInput
                                label="Password"
                                icon="lock"
                                placeholder="***********"
                                placeholderTextColor={darklight}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                            />
                            <MsgBox type={messageType}>{message}</MsgBox>
                            {!isSubmitting && <StyledButton onPress={handleSubmit}>
                                <ButtonText>Login</ButtonText>
                            </StyledButton>}

                            {isSubmitting && <StyledButton disabled={true}>
                                <ActivityIndicator size='large' color={primary} />
                            </StyledButton>}
                            <Line />
                            <ExtraView>
                                <ExtraText>Don't Have An Account Already?</ExtraText>
                                <TextLink onPress={()=>navigation.navigate('Signup')}>
                                    <TextLinkContent> Sign Up</TextLinkContent>
                                </TextLink>
                            </ExtraView>
                        </StyledFormArea>}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    )
}

const MytextInput=({label,icon,isPassword,hidePassword,setHidePassword,...props})=>{
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand}/>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={()=> setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' :'md-eye'} size={30} color={darklight} />
                </RightIcon>
            )}
        </View>
    )
}

export default Login
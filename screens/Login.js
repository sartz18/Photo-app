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

const Login=({navigation})=>{

    const [hidePassword,setHidePassword]=useState(true)

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
                        onSubmit={(values)=>{
                            // we'll do authentication
                            navigation.navigate('Home')
                        }}
                    >{({handleChange,handleBlur,handleSubmit,values})=><StyledFormArea>
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
                            <MsgBox>...</MsgBox>
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Login</ButtonText>
                            </StyledButton>
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
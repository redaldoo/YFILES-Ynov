import React from 'react';
import {Text,View,Image, TextInput} from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import firebase from '../../firebase/config';


export default class Login extends React.Component{
    constructor() {
        super();
        this.state = { 
          email: '', 
          password: '',
          isLoading: false
        }
      }
    
      updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
      }
    
      userLogin = () => {
        if(this.state.email === '' && this.state.password === '') {
          Alert.alert('Enter details to signin!')
        } else {
          this.setState({
            isLoading: true,
          })
          firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password)
          .then((res) => {
            console.log(res)
            console.log('User logged-in successfully!')
            this.setState({
              isLoading: false,
              email: '', 
              password: ''
            })
            localStorage.setItem('uid', res.user.uid)
            this.props.navigation.navigate('Dashboard')
          })
          .catch(error => this.setState({ errorMessage: error.message }))
        }
      }
    render(){
        const {navigate} = this.props.navigation
        return(
            <View style={{backgroundColor:"#FFF",height:"100%"}}>
                <Image source ={require('../images/image.png')}
                    style={{width:"100%",height:"43%"}}
                />
                <Text
                 style={{
                     fontSize:30,
                     fontFamily:"SemiBold",
                     alignSelf:"center",
                 }}
                >Storage made simple</Text>

                <Text
                style={{
                    fontFamily:"SemiBold",
                    marginHorizontal:55,
                    textAlign:'center',
                    marginTop:5,
                    opacity:0.4
                }}
                >
                    File sharing and storage in a better way.
                </Text>

                <View style={{
                    flexDirection:"row",
                    alignItems:"center",
                    marginHorizontal:55,
                    borderWidth:2,
                    marginTop:50,
                    paddingHorizontal:10,
                    borderColor:"#00716F",
                    borderRadius:23,
                    paddingVertical:2
                }}>
                    <Icon name="mail" color="#00716F" size={24}/>
                    <TextInput 
                        placeholder="Enter your email"
                        style={{paddingHorizontal:5}}
                        value={this.state.email}
                        onChangeText={(val) => this.updateInputVal(val, 'email')}
                    />

                    

                </View>
                <View style={{
                    flexDirection:"row",
                    alignItems:"center",
                    marginHorizontal:55,
                    borderWidth:2,
                    marginTop:15,
                    paddingHorizontal:10,
                    borderColor:"#00716F",
                    borderRadius:23,
                    paddingVertical:2
                }}>
                   <Icon name="key" color="#00716F" size={24}/>
                   <TextInput 
                        placeholder="Password"
                        placeholderTextColor="#00716F"
                        style={{paddingHorizontal:5}}
                        value={this.state.password}
                        onChangeText={(val) => this.updateInputVal(val, 'password')}
                        maxLength={15}
                        secureTextEntry={true}
                    />
                    

                </View>

                <View style={{
                    marginHorizontal:55,
                    alignItems:"center",
                    justifyContent:"center",
                    marginTop:30,
                    backgroundColor:"#00716F",
                    paddingVertical:10,
                    borderRadius:23
                }}>
                    <Text 
                        onPress={() => this.userLogin()}
                        style={{
                        color:"white",
                        fontFamily:"SemiBold"
                    }}>Login</Text>
                </View>
                <Text 
                
                onPress={()=>navigate('Register')}
                
                style={{
                    alignSelf:"center",
                    color:"#00716F",
                    fontFamily:"SemiBold",
                    paddingVertical:30
                }}>New User</Text>
            </View>
        )
    }
}
import React from 'react';
import {Text,View,Image, TextInput} from 'react-native';
import firebase from '../../firebase/config';


export default class Register extends React.Component{
    constructor() {
        super();
        this.state = { 
          displayName: '',
          displayLastName: '',
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
    
      registerUser = () => {
        if(this.state.email === '' && this.state.password === '') {
          Alert.alert('Enter details to signup!')
        } else {
          this.setState({
            isLoading: true,
          })
          firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then((res) => {
            res.user.updateProfile({
              displayName: this.state.displayName
            })
            console.log('User registered successfully!')
            this.setState({
              isLoading: false,
              displayName: '',
              email: '', 
              password: ''
            })
            this.props.navigation.navigate('Login')
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
                    marginTop:15,
                    paddingHorizontal:10,
                    borderColor:"#00716F",
                    borderRadius:23,
                    paddingVertical:2
                }}>
                  
                    <TextInput 
                        style={{paddingHorizontal:10}}
                        placeholder="First name"
                        value={this.state.displayName}
                        onChangeText={(val) => this.updateInputVal(val, 'displayName')}
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
                    
                    <TextInput 
                        style={{paddingHorizontal:10}}
                        placeholder="Last name"
                        value={this.state.displayLastName}
                        onChangeText={(val) => this.updateInputVal(val, 'displayLastName')}
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
                  
                    <TextInput 
                        style={{paddingHorizontal:10}}
                        placeholder="Email"
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
                   
                   <TextInput 
                        style={{paddingHorizontal:10}}
                        placeholder="Password"
                        value={this.state.password}
                        onChangeText={(val) => this.updateInputVal(val, 'password')}
                        maxLength={15}
                        secureTextEntry={true}
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
                   
                   <TextInput 
                        secureTextEntry
                        placeholder="Confirm Password"
                        placeholderTextColor="#00716F"
                        style={{paddingHorizontal:10}}
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
                        onPress={() => this.registerUser()}
                        style={{
                        color:"white",
                        fontFamily:"SemiBold"
                    }}>Create Account</Text>
                </View>
                <Text 
                
                onPress={()=>navigate('Login')}
                
                style={{
                    alignSelf:"center",
                    color:"#00716F",
                    fontFamily:"SemiBold",
                    paddingVertical:30
                }}>Already a member</Text>
                
                
              
            </View>
        )
    }
}
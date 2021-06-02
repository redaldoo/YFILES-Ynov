import React from 'react';
import {Text,View,Image, TextInput} from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';

export default class Settings extends React.Component{

    render(){
        const {navigate} = this.props.navigation
        return(
            <View style={{backgroundColor:"#FFF",height:"100%"}}>
                <Image source ={require('../images/settings.png')}
                    style={{width:"100%",height:"43%"}}
                />
                <Text
                 style={{
                     fontSize:30,
                     fontFamily:"SemiBold",
                     alignSelf:"center",
                 }}
                >Settings</Text>

                <Text
                style={{
                    fontFamily:"SemiBold",
                    marginHorizontal:55,
                    textAlign:'center',
                    marginTop:5,
                    opacity:0.4
                }}
                >
                    Edit your personal info
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

                    

                </View> <Text 
                        onPress={()=>navigate('')}
                        style={{
                        color:"white",
                        fontFamily:"SemiBold"
                    }}>Update</Text>
            </View>
        )
    }
}
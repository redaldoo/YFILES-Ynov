import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TextInput } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons'; 
import firebase from '../../firebase/config';
import Icon from '@expo/vector-icons/AntDesign';
import Folders from '../components/folders';
import Axios from 'axios';


export default function Dashboard(props){
    const [userInfo, setUserInfo] = useState({}) 
    const [userFolders, setUserFolders] = useState([])
    const [userFiles, setUserFiles] = useState([]) 
    const [folderName, setFolderName] = useState('')
    const [folderNameErr, setFolderNameErr] = useState('')
    const Utils = Utils;
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#FFF"
        },
        text: {
            fontFamily: "SemiBold",
            color: "#52575D"
        },
        textFolder: {
            textAlign: "center",
            fontFamily: "SemiBold",
            color: "#52575D"
        },
        image: {
            flex: 1,
            height: 200,
            width: 200
        },
        titleBar: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 24,
            marginHorizontal: 16
        },
        subText: {
            fontSize: 12,
            color: "#AEB5BC",
            textTransform: "uppercase",
            fontWeight: "500"
        },
        profileImage: {
            width: 200,
            height: 200,
            borderRadius: 100,
            overflow: "hidden",
            
        },
        dm: {
            backgroundColor: "#41444B",
            position: "absolute",
            top: 20,
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center"
        },
        active: {
            backgroundColor: "#34FFB9",
            position: "absolute",
            bottom: 28,
            left: 10,
            padding: 4,
            height: 20,
            width: 20,
            borderRadius: 10
        },
        add: {
            backgroundColor: "#41444B",
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 60,
            height: 60,
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center"
        },
        infoContainer: {
            alignSelf: "center",
            alignItems: "center",
            marginTop: 16
        },
        statsContainer: {
            flexDirection: "row",
            alignSelf: "center",
            marginTop: 32
        },
        statsBox: {
            alignItems: "center",
            flex: 1
        },
        mediaImageContainer: {
            width: 180,
            height: 200,
            borderRadius: 12,
            overflow: "hidden",
            marginHorizontal: 10
        },
        mediaCount: {
            backgroundColor: "#41444B",
            position: "absolute",
            top: "50%",
            marginTop: -50,
            marginLeft: 30,
            width: 100,
            height: 100,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 12,
            shadowColor: "rgba(0, 0, 0, 0.38)",
            shadowOffset: { width: 0, height: 10 },
            shadowRadius: 20,
            shadowOpacity: 1
        },
        recent: {
            marginLeft: 78,
            marginTop: 32,
            marginBottom: 6,
            fontSize: 10
        },
        recentItem: {
            flexDirection: "row",
            alignItems: "flex-start",
            marginBottom: 16
        },
        activityIndicator: {
            backgroundColor: "#CABFAB",
            padding: 4,
            height: 12,
            width: 12,
            borderRadius: 6,
            marginTop: 3,
            marginRight: 20
        },
      
    });


    const onChangeFolderName = (val) => {
      
        setFolderName(val)
    }
    const onSubmitFolderName = async (userFolders) => {
       
        const UID = localStorage.getItem('uid')
        
        if(folderName != ''){
            try {
                // let formData = new FormData();    //formdata object
                // formData.append('folderName', 'test');
                await Axios.post(`http://localhost:5001/ynovpfa/europe-west3/api/v1/folders/folder/${UID}`,{folderName : folderName})
                .then((res)=> {
                    console.log(res)
                    // window.alert(`New folder has been created successfully, folder ID : ${res.data.documentID} `)
                    var newFolder = {id : res.data.documentID, folderName : folderName}
                    var list = userFolders.concat(newFolder)
                    setUserFolders(list)
                    
                })
                .catch((err)=> {
                    console.log(err.message)
                })
            } catch (err) {
                console.log(err)
            }
        } else {
            setFolderNameErr('Dude, folder name must not be empty !')
        }
    } 
    const signOut = () => {
    console.log(this)

    firebase.auth().signOut().then(() => {
        console.log(this)
    
        props.navigation.navigate('Login')
    })
    .catch((err)=>{console.log(err)})
    }
      useEffect(()=> {
        GET_FOLDERS()
    }, [])
    const GET_FOLDERS = async () => {
        let UID = localStorage.getItem('uid');
        try {
            await Axios.get(`http://localhost:5001/ynovpfa/europe-west3/api/v1/folders/folders/${UID}`)
            .then(res => {
                if(res) {
                    console.log(res)
                    setUserFiles(res.data.files)
                    setUserFolders(res.data.folders)
                    setUserInfo(res.data.userData)
                } 
            })
            .catch((err)=>{console.log(err)})
        } catch (error) {
            console.log(error)
        }
        
    }

        return(
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titleBar}>
                    
                <AntDesign name="logout" size={24} color="black" onPress={() =>signOut ()} /> 
                </View>

                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image source={require("../images/profile-pic.jpg")} style={styles.image} resizeMode="center"></Image>
                    </View>
                    <View style={styles.dm}>
                    <Ionicons name="settings" size={24} color="#DFD8C8" onPress={()=>navigate('Settings')} />
                    </View>
                    <View style={styles.active}></View>
                    <View style={styles.add}>
                    <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}></Text>
                   
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}  >@{userInfo.firstName}</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>{userFolders.length}</Text>
                        <Text style={[styles.text, styles.subText]}>Total folders</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>{userFiles.length}</Text>
                        <Text style={[styles.text, styles.subText]}>Total files</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>15</Text>
                        <Text style={[styles.text, styles.subText]}></Text>
                    </View>
                </View>

                <View style={{ marginTop: 32 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <Folders folders={userFolders} action={setUserFolders} />
                    </ScrollView>
                    <View style={styles.mediaCount}>
                        <Text style={[styles.text, { fontSize: 24, color: "#DFD8C8", fontWeight: "300" }]}>{userFolders.length}</Text>
                        <Text style={[styles.text, { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" }]}>Folders</Text>
                    </View>
                </View>
                <Text style={[styles.subText, styles.recent]}>Add a folder</Text>
                <View style={{ alignItems: "center" }}>
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
                    <Icon name="folder1" color="#00716F" size={24}/>
                    <TextInput  
                            style={{paddingHorizontal:10}} 
                            placeholder="Name of folder" 
                            onChangeText={(val) =>onChangeFolderName(val, 'folderName')}
                           
                    />

                    

                </View>
                <View style={{
                    marginHorizontal:55,
                    alignItems:"center",
                    justifyContent:"center",
                    marginTop:10,
                    
                    paddingVertical:10,
                    borderRadius:23
                }}>
                    <Icon
                        
                        size={24}
                        name="addfolder"
                        onPress={() =>onSubmitFolderName(userFolders)} 
                    />
                </View>
                    
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};




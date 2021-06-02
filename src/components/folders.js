import React from 'react';
import {StyleSheet,Text,View,Image} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Axios from 'axios';
export default function Folders(props){
    const styles = StyleSheet.create ({
        textFolder: {
            textAlign: "center",
            fontFamily: "SemiBold",
            color: "#52575D"
        },
        mediaImageContainer: {
            width: 180,
            height: 200,
            borderRadius: 12,
            overflow: "hidden",
            marginHorizontal: 10
        },
        image: {
            flex: 1,
            height: 200,
            width: 200
        }
    
    });
    const DeleteFolder = async (fid) => {
        console.log(fid)
        let UID = localStorage.getItem('uid')
        try {
            await Axios.delete(`http://localhost:5001/ynovpfa/europe-west3/api/v1/folders/folder/${UID}/${fid}`)
                    .then((res)=> {
                        console.log(res)
                        // window.alert('Document has been deleted successfully !')
                        // window.location.href="/dashboard"
                    })
                    .catch((err)=> {
                        console.log(err)
                    }) 
        } catch(err) {
            console.log(err)
        }
    }

    
        return(
          <>
             {props.folders.map((f,i)=> {
                 return(
             
                    <View style={styles.mediaImageContainer}>
                            
                            <Text style={styles.textFolder}>{f.folderName}</Text>
                          <Image source={require("../images/media1.png")} style={styles.image} resizeMode="cover"></Image>
                          <AntDesign name="delete" size={24} color="black" onPress={() =>DeleteFolder(f.id)}  />

                     </View>
                 )
                    })} 
              </>   
                               
    );

    }
        


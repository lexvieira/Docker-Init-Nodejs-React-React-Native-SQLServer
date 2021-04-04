import React, { useState, useEffect } from "react";
import { StyleSheet, View, ImageBackground, Text, Image, TouchableOpacity } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Feather as Icon } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import api from "../../services/api";

interface Params {
    user_id: number,
    myAnyOtherParam: any
}

interface User {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    dob: string,    
    age: number,
    user_url: string,
}

const UserDetail = () => {
const [user, setUser] = useState<User>({} as User); 

const route = useRoute();
const routeParams = route.params as Params;

useEffect(() => {
    api.get(`users/${routeParams.user_id}`).then(response => {
        setUser(response.data);
    })
},[]);
 
return (
    
    <ImageBackground 
        source={require('../../assets/home-background.png')}
        style={styles.container}
        imageStyle={{ width: 274, height: 368}}>
            <View style={styles.container}>
                <Text style={styles.title}>User Details</Text>
                <View>
                  <Text style={styles.label}>Avatar: </Text>
                  <Image style={styles.avatar} source={{ uri: user.user_url }}/>
                </View>
                <View>
                    <Text style={styles.label}>Nome: </Text>
                    <Text style={styles.description}>{user.first_name} {user.last_name}</Text>
                    <Text style={styles.label}>Idade: </Text>
                    <Text style={styles.description}>{user.age}</Text>
                    <Text style={styles.label}>Email: </Text>                    
                    <Text style={styles.description}>{user.email}</Text>
                </View>                
            </View>
            
    </ImageBackground>
)
 
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    //   backgroundColor: '#f0f0f5',
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
    avatar: {
      width: 54,
      height: 54,
      borderRadius: 30,
      borderWidth: 2,
      borderColor: 'gray',
      marginTop: 5
    },
    title: {
      color: '#322153',
      fontSize: 32,
    //   fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
    label: {
      color: '#6C6C80',
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 16,
    //   fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },  

    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 8,
    //   fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
    //   fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    },

    container_table: { flex: 1, padding: 5, paddingTop: 5, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }    
  });

export default UserDetail;
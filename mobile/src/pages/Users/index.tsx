import React, { useState, useEffect} from "react";
import { StyleSheet, View, ImageBackground, TouchableOpacity ,Text, Image } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Feather as Icon } from "@expo/vector-icons";
import api from "../../services/api";

interface Users {
    id: number,
    first_name: string,
    last_name: string,
    dob: string,    
    age: number,
}

const Users = () => {
    const navigation = useNavigation();    
    const [users, setUsers] = useState<Users[]>([]);

    useEffect(() => {
        api.get('users').then(response => {
            setUsers(response.data);
        })
    })

    function handleNavigateBack(){
        navigation.goBack();
      }

    return (
        <ImageBackground 
            source={require('../../assets/home-background.png')}
            style={styles.container}
            imageStyle={{ width: 274, height: 368 }}
        >
            <TouchableOpacity onPress={handleNavigateBack}> 
                <Icon name="arrow-left" size={20} color="#34cb79" />
            </TouchableOpacity>               
            <View style={styles.container}>
                <View style={styles.main}>
                    <Image source={require("../../assets/logo.png")} />
                    <View>
                        <Text style={styles.title}>Usuários Cadastros no Sisetma</Text>
                        <Text style={styles.description}>Usando React-native-table-component</Text>
                    </View>
                </View>
                <View style={styles.container}>
                    {users.map(user => {
                        return (
                                <Text key={String(user.id)}>
                                    {user.first_name}
                                </Text>
                            )                        
                    })}
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
  
    title: {
      color: '#322153',
      fontSize: 32,
    //   fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
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
    }
  });

export default Users;
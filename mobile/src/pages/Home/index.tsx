import React from "react";
import { StyleSheet, View, ImageBackground, Text, Image, TouchableOpacity } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const Home = () => {
const navigation = useNavigation();


function handleNavigateToUsers(){
  navigation.navigate('Users');
}

function handleNavigateBack(){
  navigation.goBack();
}

return (

    <ImageBackground 
        source={require('../../assets/home-background.png')}
        style={styles.container}
        imageStyle={{ width: 274, height: 368}}> 
        <TouchableOpacity onPress={handleNavigateBack}> 
            <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>           
        <View style={styles.container}>
            <View style={styles.main}>
                <Image source={require('../../assets/logo.png')}/>
                <View>
                    <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                    <Text style={styles.description}>Recicle conosco, encontre um ponto de reciclágem próximo</Text>                    
                </View>
            </View>
        </View>

        <View style={styles.footer}>
            <RectButton style={styles.button}  onPress={handleNavigateToUsers}> 
                <View style={styles.buttonIcon}>
                    <Text>
                        <Icon name="users" color="#FFF" size={24} />                        
                    </Text>
                </View>
                <Text style={styles.buttonText}>
                    Users List
                </Text>
            </RectButton>            
        </View>
    </ImageBackground>
)}

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
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
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
      // fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });


export default Home;

import React, { useState, useEffect} from "react";
import { StyleSheet, View, ImageBackground, TouchableOpacity ,Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather as Icon } from "@expo/vector-icons";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import api from "../../services/api";

interface Users {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    dob: string,    
    age: number,
}

const Users = () => {
    const navigation = useNavigation();    
    const [users, setUsers] = useState<Users[]>([]);
    const [dataUser,setDataUser] = useState([]);

    //DataExample 
    const tableHead = ["First Name","Last Name","Email","Age", "Detail"];

    useEffect(() => {
        api.get('users').then(response => {
            setUsers(response.data);
            const userData:any = [];
            response.data.map((user: Users ) => {
              userData.push([
                  user.first_name,
                  user.last_name,
                  user.email,
                  user.age                
              ]);
            });
            setDataUser(userData);
        });
    },[])

    function handleNavigateBack(){
        navigation.goBack();
    }


   function handleNavigateToDetail(id: number){
      navigation.navigate('UserDetail', { 
          user_id: id,
          myAnyOtherParam: ["item 1", "item 2..."]
        });
    }       

    // const element = (data:number) => (
    //   <TouchableOpacity onPress={handleNavigateToDetail(data)}>
    //     <Icon name="user" size={20} color="#34cb79" />
    //   </TouchableOpacity>
    // )


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
                        <Text style={styles.title}>Usuários Cadastrados no Sistema</Text>
                        <Text style={styles.description}>Usando React-native-table-component</Text>
                    </View>
                </View>          
            </View>
            
            <View style={styles.container_table}>
                  <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                      {                    
                        users.map((user, userIndex) => {
                          return (
                            <TableWrapper key={user.id} style={styles.row}>
                              <Cell data={user.first_name} textStyle={styles.text} />
                              <Cell data={user.last_name} textStyle={styles.text} />
                              <Cell data={user.email} textStyle={styles.text} />
                              <Cell data={user.age} textStyle={styles.text} />
                              <Cell textStyle={styles.text}
                                data={
                                  <TouchableOpacity onPress={() => handleNavigateToDetail(user.id)}>
                                    <View style={styles.btn}>
                                      <Icon name="user" size={20} color="#34cb79" />
                                    </View>
                                  </TouchableOpacity>                                  
                                }
                              >
                              </Cell>
                            </TableWrapper>
                          )
                        })
                      }
                  </Table>
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
    },

    container_table: { flex: 1, padding: 5, paddingTop: 5, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    text_cell: { margin: 6, alignItems: "center" },    
    row: { flexDirection: 'row', backgroundColor: '#FFF' },
    btn: { marginLeft: 15, borderRadius: 2 },
    btnText: { textAlign: 'center' }
  });

export default Users;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Modal,
  Pressable,
  View,
  Text,
  SectionList,
  Button,
  StyleSheet,
  TextInput,
} from "react-native";
import { colors } from "../res";
import axios from "axios";

// var contacts = [
//   {
//     eMail: "cuarto@email.com",
//     name: "Cecilia Puente",
//   },
// ];

export default function ContactsScreen(props) {
  const loginUser = useSelector((state) => state.login.loginUser);
  const [modalVisible, setModalVisible] = useState(false);
  const [contacts, setContacts] = useState([]);

  const [email, setEmail] = useState("");
  const [get, setGet] = useState(0);

  const handleChangeText = (value) => {
    setEmail(value);
  };

  useEffect(() => {
    axios
      .get("http://192.168.0.27:8080/users/contact/" + loginUser.id)
      .then((data) => {
        setContacts(data.data);
      });
  }, [get]);

  var getData = () => {
    let contactsArr = [];
    let aCode = "A".charCodeAt(0);
    for (let i = 0; i < 26; i++) {
      let currChar = String.fromCharCode(aCode + i);
      let obj = {
        title: currChar,
      };
      let currContacts = contacts.filter((item) => {
        return item.alias[0].toUpperCase() === currChar;
      });
      if (currContacts.length > 0) {
        currContacts.sort((a, b) => a.alias.localeCompaer(b.alias));
        obj.data = currContacts;
        contactsArr.push(obj);
      }
    }
    return contactsArr;
  };

  const transfer = (item) => {
    props.navigation.navigate("SendMoney", item);
  };

  const agregarContacto = () => {
    var dato = {
      email,
    };
    axios
      .post("http://192.168.0.27:8080/users/contact/" + loginUser.id, dato)
      .then((data) => {
        if (data.data === "ya es un contacto") {
          setModalVisible(!modalVisible);
          Alert.alert("AVISO", "El usuario ya es su contacto");
        } else {
          setModalVisible(!modalVisible);
          Alert.alert("EXITO", "Usuario agregado");
          setGet(Math.random());
        }
      })
      .catch((error) => {
        setModalVisible(!modalVisible);
        Alert.alert("ERROR", "Usuario no existe");
      });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.header}> Tus Contactos</Text>
        <SectionList
          sections={getData()}
          ListFooterComponent={() => (
            <Button
              title="Agregar Contacto"
              onPress={() => setModalVisible(true)}
            />
          )}
          //Estructura de item => { index:2, nombre:"segundo"}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View>
                <Text style={styles.contactNames}>{item.alias}</Text>
              </View>
              <View style={styles.transferBtn}>
                <Button onPress={() => transfer(item)} title="Transferir" />
              </View>
            </View>
          )}
          keyExtractor={(item) => item.index}
          /* Estructura de cada sección:
        {data: [ {index:1, nombre: primero} , {index: 34, nombre:pablo}]}
        */
          renderSectionHeader={({ section }) => {
            <View style={styles.sectionHeader}>
              <Text>{section.title}</Text>
            </View>;
          }}
        />
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Ingrese e-mail del contacto a agregar
              </Text>
              <TextInput
                style={styles.email}
                placeholder="E-mail"
                onChangeText={(value) => handleChangeText(value, "email")}
                value={email}
              ></TextInput>
              <View
                style={{
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <View style={{ paddingRight: 30 }}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Cancelar</Text>
                  </Pressable>
                </View>
                <View>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => agregarContacto()}
                  >
                    <Text style={styles.textStyle}>Agregar</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  container: {
    marginTop: 35,
    width: 300,
  },
  header: {
    alignSelf: "center",
    fontSize: 35,
    color: colors.accent,
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",

    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    margin: 7,
    paddingLeft: 3,
    backgroundColor: colors.secondary,
  },
  contactNames: {
    fontSize: 20,
    color: colors.primary,
    paddingRight: 30,
  },
  transferBtn: {
    alignSelf: "flex-end",
  },
  sectionHeader: {},

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  email: {
    paddingBottom: 20,
  },
});

import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/core";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleSignUp = () => {
    try {
      createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          console.log("User registered:", user);
        }
      );
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        navigation.navigate("home");
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("home");
      }
    });

    return unsubscribe;
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
        <Text style={styles.header}>Sign in</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        ></TextInput>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        ></TextInput>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleLogin()} style={styles.button}>
          <Text style={styles.button1}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>  navigation.navigate('Register')}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#f4f4f4'
  },
  inputContainer: {
    width: "80%",
    marginTop: 15,
    margin: 40,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 15,
    fontSize: 16,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  buttonContainer: {
    width: "80%",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  buttonOutline: {
    backgroundColor: '#fff',
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    borderColor: '#0783f9',
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    textAlign: 'center',
    color: '#0783f9',
    fontWeight: '700',
    fontSize: 16,
  },
button1:{
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 10,
    borderColor: '#0783f9',
    borderWidth: 2,
    width:'80%',
    textAlign: 'center',
    color: '#0783f9',
    fontWeight: '700',
    fontSize: 16,
    
},
header: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Add a color that fits your design
},
});

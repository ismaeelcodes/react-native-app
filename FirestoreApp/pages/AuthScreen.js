import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    console.log('Wow');
    console.log(email, password);
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
    
        const user = userCredential.user;
        console.log('User registered:', user);
        Alert.alert("Registered successfully!");
      })
      .catch((error) => {
       
        const errorMessage = error.message;
        Alert.alert("Registration Error", errorMessage);
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigation.replace("List"))
      .catch((error) => Alert.alert("Login Error", error.message));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button title="Register" onPress={handleRegister} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16 },
  input: { height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 12, paddingHorizontal: 8 },
});

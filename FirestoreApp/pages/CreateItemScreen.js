import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function CreateItemScreen({ navigation }) {
  const [name, setName] = useState("");

  const handleCreate = async () => {
    try {
        console.log('here')
      await addDoc(collection(db, "items"), { name });
      console.log('her2')
      Alert.alert("Item added successfully!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Item Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Button title="Create" onPress={handleCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 12, paddingHorizontal: 8 },
});

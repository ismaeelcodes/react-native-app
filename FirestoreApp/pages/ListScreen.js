import React, { useState, useEffect } from "react";
import { View, Button, FlatList, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { db } from "../firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";

export default function ListScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "items"));
      setItems(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      Alert.alert("Error", "Error fetching items: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await deleteDoc(doc(db, "items", itemId));
      Alert.alert("Success", "Item deleted!");
      fetchItems();
    } catch (error) {
      Alert.alert("Error", "Error deleting item: " + error.message);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchItems();
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onLongPress={() =>
        Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
          { text: "Cancel", style: "cancel" },
          { text: "Delete", style: "destructive", onPress: () => handleDelete(item.id) },
        ])
      }
    >
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Button title="Add a new item" onPress={() => navigation.navigate("CreateItem")} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshing={loading}
        onRefresh={fetchItems}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: "#f9f9f9",
  },
  itemContainer: {
    backgroundColor: "#fff",
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

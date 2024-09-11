import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getNotes, deleteNote } from './api'; // Importez les méthodes depuis api.js
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await getNotes(); // Utilisez la méthode getNotes
      setNotes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id); // Utilisez la méthode deleteNote
      Alert.alert('Succès', 'Note supprimée avec succès');
      fetchNotes(); // Rafraîchir les données après suppression
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Erreur lors de la suppression de la note');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gestion de note</Text>

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('NoteForm')}>
        <Text style={styles.addButtonText}>Ajouter une note +</Text>
      </TouchableOpacity>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.noteCard}>
            <Text style={styles.noteText}>Nom: {item.nom}</Text>
            <View style={styles.separator} />
            <Text style={styles.noteText}>Prénom: {item.prenom}</Text>
            <View style={styles.separator} />
            <Text style={styles.noteText}>Classe: {item.classe}</Text>
            <View style={styles.separator} />
            <Text style={styles.noteText}>Matière: {item.matiere}</Text>
            <View style={styles.separator} />
            <Text style={styles.noteText}>Note: {item.note}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('NoteForm', { noteData: item })}
                style={styles.modifyButton}
              >
                <Text style={styles.modifyButtonText}>Modifier</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteNote(item.id)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#000',
  },
  addButton: {
    backgroundColor: '#8CAACF',
    padding: 15,
    borderRadius: 30,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#4B7CB8',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 4,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  noteCard: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  noteText: {
    fontSize: 16,
    marginVertical: 5,
    color: '#000',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modifyButton: {
    backgroundColor: '#8CAACF',
    padding: 10,
    borderRadius: 40,
    flex: 0.45,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#D3E6FF',
    borderWidth: 1,
    borderColor: '#0165FC',
    padding: 10,
    borderRadius: 40,
    flex: 0.45,
    alignItems: 'center',
  },
  modifyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButtonText: {
    color: '#8CAACF',
    fontWeight: 'bold',
  },
});

export default Home;

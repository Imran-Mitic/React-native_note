import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import api from './api'; 
import { addNote, editNote } from './api'; // Importer les fonctions ici

const NoteForm = ({ route, navigation }) => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [classe, setClasse] = useState('');
  const [matiere, setMatiere] = useState('');
  const [note, setNote] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (route.params && route.params.noteData) {
      const { nom, prenom, classe, matiere, note } = route.params.noteData;
      setNom(nom);
      setPrenom(prenom);
      setClasse(classe);
      setMatiere(matiere);
      setNote(note.toString());
      setIsEditing(true);
    }
  }, [route.params]);

  const handleSubmit = async () => {
    if (!nom || !prenom || !classe || !matiere || !note) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
  
    try {
      if (isEditing) {
        const { id } = route.params.noteData;
        const response = await editNote(id, {
          nom,
          prenom,
          classe,
          matiere,
          note: parseFloat(note),
        });
        Alert.alert('Succès', 'Note modifiée avec succès');
      } else {
        const response = await addNote({
          nom,
          prenom,
          classe,
          matiere,
          note: parseFloat(note),
        });
        console.log('Ajout réussi : ', response.data); // Vérifiez la réponse
        Alert.alert('Succès', 'Note ajoutée avec succès');
      }
  
      setNom('');
      setPrenom('');
      setClasse('');
      setMatiere('');
      setNote('');
      navigation.goBack();
    } catch (error) {
      console.error(error); // Affichez l'erreur complète pour plus de détails
      Alert.alert('Erreur', `Erreur lors de la ${isEditing ? 'modification' : 'création'} de la note`);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {isEditing ? 'Modifier la Note' : 'Formulaire d\'ajout'}
      </Text>

      <Text style={styles.label}>Nom:</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrer votre nom"
        placeholderTextColor="#999"
        value={nom}
        onChangeText={setNom}
      />

      <Text style={styles.label}>Prénom:</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrer votre prénom"
        placeholderTextColor="#999"
        value={prenom}
        onChangeText={setPrenom}
      />

      <Text style={styles.label}>Classe:</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrer votre classe"
        placeholderTextColor="#999"
        value={classe}
        onChangeText={setClasse}
      />

      <Text style={styles.label}>Matière:</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrer votre matière"
        placeholderTextColor="#999"
        value={matiere}
        onChangeText={setMatiere}
      />

      <Text style={styles.label}>Note:</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrer votre note"
        placeholderTextColor="#999"
        value={note}
        onChangeText={setNote}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Text style={styles.addButtonText}>
          {isEditing ? 'Modifier' : 'Ajouter'}
        </Text>
      </TouchableOpacity>
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
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#FFF',
    color:'#000'
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
});

export default NoteForm;

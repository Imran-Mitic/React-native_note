import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.204.14:3000/notes',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Méthode GET pour récupérer toutes les notes
export const getNotes = () => {
    return api.get('/');
  };
  
  // Méthode POST pour ajouter une nouvelle note
  export const addNote = (noteData) => {
    return api.post('/', noteData);
  };
  
  // Méthode PUT pour modifier une note existante
  export const editNote = (id, noteData) => {
    return api.put(`/${id}`, noteData);
  };
  
  // Méthode DELETE pour supprimer une note
  export const deleteNote = (id) => {
    return api.delete(`/${id}`);
  };
  
  export default api;
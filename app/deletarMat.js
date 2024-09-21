import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Pressable, } from 'react-native';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../src/firebase.config'; 
import { useRouter } from 'expo-router'; 
import { useNavigation } from '@react-navigation/native';
import { styles } from '../src/style';


const DeletarMat = () => {
  const [materiais, setMateriais] = useState([]);
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMateriais = async () => {
      const querySnapshot = await getDocs(collection(db, 'material'));
      const materiaisList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMateriais(materiaisList);
    };

    fetchMateriais();
  }, []);

  const handleDeleteMaterial = async (id) => {
    try {
      await deleteDoc(doc(db, 'material', id));
      setMateriais(materiais.filter(material => material.id !== id));
      alert('Material deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar material: ', error);
      alert('Erro ao deletar material.');
    }
  };

  return (
    <View style={styles.container2}>
      <Text style={styles.formTitle}>Tela para Editar/Deletar e Registrar Saída de Materiais</Text>
      <View style={styles.backButton}>
        <Pressable onPress={() => router.push("./home")}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </Pressable>
      </View>
      <FlatList
        data={materiais}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
            <View style={styles.item}>
            <Text>{item.nome}</Text>
            <Text>{item.descricao}</Text>
            <Text>{item.quantidade}</Text>
            <View style={styles.button3}>
            <Pressable
                onPress={() => router.push("./saidaMat")}
            >
                <Text style={styles.buttonText}>Saída de Material</Text>
            </Pressable>
            </View>
            <View style={styles.button2}>
            <Pressable
                onPress={() => router.push("./editarMat")}
            >
                <Text style={styles.buttonText}>Editar Material</Text>
            </Pressable>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleDeleteMaterial(item.id)}
            >
              <Text style={styles.buttonText}>Deletar Material</Text>
            </TouchableOpacity>
            
          </View>
        )}
      />
    </View>
  );
};


export default DeletarMat;
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Pressable, TextInput } from 'react-native';
import { doc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../src/firebase.config'; 
import { useRouter } from 'expo-router'; 
import { useNavigation } from '@react-navigation/native';
import { styles } from '../src/style';

const EditarMat = () => {
  const [materiais, setMateriais] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [unidade, setUnidade] = useState('');
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

  const handleSelectMaterial = (material) => {
    setSelectedMaterial(material);
    setNome(material.nome);
    setDescricao(material.descricao);
    setUnidade(material.unidade);
    setQuantidade(material.quantidade.toString());
  };

  const handleUpdateMaterial = async () => {
    if (!selectedMaterial) return;

    try {
      const docRef = doc(db, 'material', selectedMaterial.id);
      await updateDoc(docRef, {
        nome,
        descricao,
        quantidade: parseInt(quantidade, 10),
      });
      alert('Material editado com sucesso!');
      setSelectedMaterial(null);
      setNome('');
      setDescricao('');
      setQuantidade('');
      setUnidade('');
      navigation.goBack(); 
    } catch (error) {
      console.error('Erro ao editar material: ', error);
      alert('Erro ao editar material.');
    }
  };

  return (
    <View style={styles.container3}>
      <Text style={styles.formTitle}>Editar Materiais</Text>
      <View style={styles.backButton}>
        <Pressable onPress={() => router.push("./home")}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </Pressable>
      </View>
      <FlatList
        data={materiais}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleSelectMaterial(item)}>
            <Text>{item.nome}</Text>
            <Text>{item.descricao}</Text>
            <Text>{item.quantidade} {item.unidade}</Text>
          </TouchableOpacity>
        )}
      />
      {selectedMaterial && (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.formInput}
            value={nome}
            onChangeText={setNome}
            placeholder="Nome"
          />
          <TextInput
            style={styles.formInput}
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Descrição"
          />
          <TextInput
            style={styles.formInput}
            value={quantidade}
            onChangeText={setQuantidade}
            placeholder="Quantidade"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.formInput}
            value={unidade}
            onChangeText={setUnidade}
            placeholder="Unidade"
          />
          <TouchableOpacity style={styles.button} onPress={handleUpdateMaterial}>
            <Text style={styles.buttonText}>Salvar Alterações</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default EditarMat;
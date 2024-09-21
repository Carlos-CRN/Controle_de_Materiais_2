import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable, TouchableOpacity } from 'react-native';
import { doc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../src/firebase.config'; 
import { useNavigation } from '@react-navigation/native';
import { styles } from '../src/style';
import { useRouter } from 'expo-router'; 

const SaidaMat = () => {
  const [materiais, setMateriais] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [quantidadeSaida, setQuantidadeSaida] = useState('');
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
  };

  const handleSaidaMaterial = async () => {
    if (!selectedMaterial) return;

    const novaQuantidade = selectedMaterial.quantidade - parseInt(quantidadeSaida, 10);

    if (novaQuantidade < 0) {
      alert('Quantidade de saída excede a quantidade disponível!');
      return;
    }

    try {
      const docRef = doc(db, 'material', selectedMaterial.id);
      await updateDoc(docRef, {
        quantidade: novaQuantidade,
      });
      alert('Saída de material registrada com sucesso!');
      setSelectedMaterial(null);
      setQuantidadeSaida('');
      navigation.goBack(); 
    } catch (error) {
      console.error('Erro ao registrar saída de material: ', error);
      alert('Erro ao registrar saída de material.');
    }
  };

  return (
    <View style={styles.container5}>
      <Text style={styles.formTitle}>Saída de Material</Text>
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
          <Text style={styles.formTitle}>Nome: {selectedMaterial.nome}</Text>
          <Text style={styles.formTitle}>Quantidade Atual: {selectedMaterial.quantidade}</Text>
          <TextInput
            style={styles.formInput}
            value={quantidadeSaida}
            onChangeText={setQuantidadeSaida}
            placeholder="Quantidade de Saída"
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button3} onPress={handleSaidaMaterial}>
            <Text style={styles.textButton}>Registrar Saída</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SaidaMat;
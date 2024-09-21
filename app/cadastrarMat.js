import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../src/firebase.config';
import { useRouter } from 'expo-router'; 
import { styles } from '../src/style';

const CadastroMat = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [unidade, setUnidade] = useState('');
  const router = useRouter();

  const handleAddMaterial = async () => {
    try {
      await addDoc(collection(db, 'material'), {
        nome,
        descricao,
        quantidade,
        unidade,
      });
      alert('Material cadastrado com sucesso!');
      router.replace('/home'); 
    } catch (error) {
      console.error('Erro ao cadastrar material: ', error);
      alert('Erro ao cadastrar material.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../src/Logo.png')} style={styles.logo} />
      <Text style={styles.formTitle2}>Cadastro de Materiais</Text>
      <Text style={styles.formTitle}>Nome do Material ou Patrimoni.</Text>
      <TextInput
        style={styles.formInput}
        value={nome}
        onChangeText={setNome}
      />
      <Text style={styles.formTitle}>Descrição (Ex: Tipo, Tamanho, Cor...)</Text>
      <TextInput
        style={styles.formInput}
        onChangeText={setDescricao}
      />
      <Text style={styles.formTitle}>Quantidade</Text>
      <TextInput
        style={styles.formInput} 
        onChangeText={setQuantidade}
        keyboardType= "numeric"

      />
      <Text style={styles.formTitle}>Unidade (Ex: Caixa, Litro, Peças...)</Text>
      <TextInput
        style={styles.formInput} 
        onChangeText={setUnidade}
        
      />
      <TouchableOpacity style={styles.formButton} 
        onPress={handleAddMaterial}>
        <Text style={styles.textButton}>Cadastrar Material</Text>
      </TouchableOpacity>
        <View style={styles.subContainer}>
            <Pressable
                onPress={() => router.push("./home")}
            >
                <Text style={styles.subTextButton}>Voltar</Text>
            </Pressable>
        </View>
    </View>
  );
};

export default CadastroMat;
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, } from 'react-native';
import { collection, getDocs, } from 'firebase/firestore';
import { db } from '../src/firebase.config'; 
import { useRouter } from 'expo-router'; 
import { useNavigation } from '@react-navigation/native';
import { styles } from '../src/style';


const ListaMat = () => {
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

  
  return (
    <View style={styles.container4}>
      <Text style={styles.formTitle2}>Lista de Materiais</Text>
        <View style={styles.backButton}>
            <Pressable
                onPress={() => router.push("./home")}
            >
                <Text style={styles.backButtonText}>Voltar</Text>
            </Pressable>
        </View>
      <FlatList
        data={materiais}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
            <View style={styles.item}>
            <Text style={styles.formTitle}>{item.descricao} = {item.quantidade} {item.unidade}</Text>
            </View>
        )}
      />
    </View>
  );
};
 

export default ListaMat;
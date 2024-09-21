import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, TextInput, View, Image } from 'react-native';
import { styles } from '../src/style'
import { auth } from '../src/firebase.config'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';
import ReplacePass from './replacePass';

export default function App() {
  const [userMail, setUserMail] = useState('');
  const [userPass, setUserPass] = useState('');
  const router = useRouter();

  function replacePass() {
    router.replace('/replacePass');
  }

  function newUser() {
    router.replace('/newUser');
  }

  function userLogin() {
    signInWithEmailAndPassword(auth, userMail, userPass)
      .then (( userCredential) => {
        const user = userCredential.user;
        router.replace('/home');  
      })
      .catch ((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      })
    }

  return (
    <View style={styles.container}>
      <Image source={require('../src/Logo.png')} style={styles.logo} />
      <Text style={styles.formTitle2}>Login no Sistema</Text>
      <TextInput style={styles.formInput}
        placeholder='Informe seu E-mail'
        keyboardType='email-address'
        autoCapitalize='none'
        autoComplete='email'
        value={userMail}
        onChangeText={setUserMail}
      />
      <TextInput style={styles.formInput}
        placeholder='Informe sua Senha'
        autoCapitalize='none'
        secureTextEntry
        value={userPass}
        onChangeText={setUserPass}
      />
      <Pressable style={styles.formButton}
        onPress={userLogin}
      >
        <Text style={styles.textButton}>Logar</Text>
      </Pressable>
      <View style={styles.subContainer}>
        <Pressable style={styles.subButton}
          onPress={replacePass}
        >
          <Text style={styles.subTextButton}>Esqueci a senha</Text>
        </Pressable>
        <Pressable style={styles.subButton}
          onPress={newUser}
        >
          <Text style={styles.subTextButton}>Cadastrar Usúario</Text>
        </Pressable>
      </View>
      <StatusBar style='auto' />
    </View>

  );
}

import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../src/style";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";
import { auth } from "../src/firebase.config";

export default function NewUser() {
    const [userMail, setUserMail] = useState('');
    const [userPass, setUserPass] = useState('');
    const [userRePass, setUserRePass] = useState('');

    function newUser() {
        if(userMail === '' || userPass === '' || userRePass === ''){
            alert('Todos os campos devem ser preenchidos!');
            return;
        }
        if(userPass !== userRePass){
            alert('As senhas devem ser iguais!');
            return;
        } else {
            createUserWithEmailAndPassword(auth, userMail, userPass)
            .then((UserCredencial) => {
                const user = UserCredencial.user;
                alert('O usuário ' + userMail + 'Foi criado. Faça o login');
                router.replace('/');
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
                router.replace('/');
            });
        }
        
    }

    return (
        <View style={styles.container}>
            <Text style={styles.formTitle}>Novo Usúario</Text>
            <TextInput
                style={styles.formInput}
                placeholder="E-mail de usúario"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                value={userMail}
                onChangeText={setUserMail}
            />
            <TextInput
                style={styles.formInput}
                placeholder="Senha de usúario"
                autoCapitalize="none"
                secureTextEntry
                value={userPass}
                onChangeText={setUserPass}
            />
            <TextInput
                style={styles.formInput}
                placeholder="Repita a senha"
                autoCapitalize="none"
                secureTextEntry
                value={userRePass}
                onChangeText={setUserRePass}
            />
            <Pressable
                style={styles.formButton}
                onPress={newUser}
            >
                <Text style={styles.textButton}>Cadastrar</Text>
            </Pressable>
            <View style={styles.subContainer}>
                <Pressable
                    onPress={() => router.push("/")}
                >
                    <Text style={styles.subTextButton}>Voltar</Text>
                </Pressable>
            </View>
        </View>
    );
}
import { Pressable, Text, View, Image } from "react-native";
import { styles } from "../src/style";
import { auth } from "../src/firebase.config";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";

export default function Home() {
    const currentUser = auth.currentUser;
    const router = useRouter();

    if (currentUser != null) {

    } else {
        alert('É necessário estar logado para utilizar este recurso!');
        router.replace('/');
    }

    function logout() {
        signOut(auth)
            .then(() => {
                alert('Você desconectou-se do Sistema!');
                router.replace('/');
            })
            .catch((error) => {
                const errorMessage = error.errorMessage;
                alert(errorMessage);
            });
    }

    function Cadastrar() {
        router.replace('/cadastrarMat');
    }

    function Listar() {
        router.replace('/listaMat');
    }

    function Deletar() {
        router.replace('/deletarMat');
    }

    return (
        <View style={styles.internalContainer}>
            <View style={styles.topBar}>
                <Pressable onPress={logout}>
                    <Text style={styles.topBarButtonText}>Sair</Text>
                </Pressable>
            </View>
            <View style={styles.container}>
                <Image source={require('../src/Logo.png')} style={styles.logo} />
                <Text style={styles.formBarTitle2}>Página Inicial</Text>
                <Pressable style={styles.formButton} onPress={Cadastrar}>
                    <Text style={styles.textButton}>Cadastrar Novo Material</Text>
                </Pressable>
                <Pressable style={styles.formButton} onPress={Listar}>
                    <Text style={styles.textButton}>Listar Materiais</Text>
                </Pressable>
                <Pressable style={styles.formButton} onPress={Deletar}>
                    <Text style={styles.textButton}>Editar/Deletar e Registra Daída de Materiais</Text>
                </Pressable>
            </View>
        </View>
    );
}

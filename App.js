import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

const generatePassword = (length) => {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

const App = () => {
  const [passwordLength, setPasswordLength] = useState(12);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const handleGeneratePassword = () => {
    const password = generatePassword(passwordLength);
    setGeneratedPassword(password);
  };

  const handleCopyToClipboard = () => {
    Clipboard.setString(generatedPassword);
    alert('Senha copiada para a área de transferência!');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/cadeado.png')}
        style={styles.logo}
      />
      <View style={styles.content}>
        <Text style={styles.titulo}>Gerador de Senha</Text>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          placeholder="Comprimento da Senha"
          value={passwordLength.toString()}
          onChangeText={(text) => setPasswordLength(parseInt(text) || 0)}
        />
        <TouchableOpacity style={styles.btn} onPress={handleGeneratePassword}>
          <Text style={styles.btnText}>Gerar Senha</Text>
        </TouchableOpacity>
        {generatedPassword ? (
          <View>
            <Text style={styles.passwordText}>Senha: {generatedPassword}</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={handleCopyToClipboard}>
              <Text style={styles.btnText}>
                Copiar para a Área de Transferência
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#bcc38a',
    justifyContent: 'flex-start', // Alinhar no início verticalmente
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginTop: 200,
  },
  titulo: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#3B4016',
  },
  textInput: {
    height: 40,
    width: 300,
    borderColor: '#3B4016',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    padding: 5,
  },
  passwordText: {
    fontSize: 16,
    marginVertical: 10,
    color: '#3B4016',
  },
  btn: {
    backgroundColor: '#6B7334',
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
  },
};

export default App;
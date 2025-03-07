import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const CalculatorModal = ({ visible, onClose }) => {
  const [input, setInput] = useState('');

  const handlePress = (value) => {
    if (value === 'C') {
      setInput('');
    } else if (value === '=') {
      try {
        setInput(eval(input).toString()); // Evaluate expression
      } catch {
        setInput('Error');
      }
    } else {
      setInput((prev) => prev + value);
    }
  };

  const renderButton = (value, style = {}) => (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={() => handlePress(value)}
    >
      <Text style={styles.buttonText}>{value}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.result}>{input || '0'}</Text>

          <View style={styles.row}>
            {renderButton('C', styles.clearButton)}
            {renderButton('/', styles.operatorButton)}
            {renderButton('*', styles.operatorButton)}
          </View>

          <View style={styles.row}>
            {renderButton('7')} 
            {renderButton('8')} 
            {renderButton('9')}
            {renderButton('-', styles.operatorButton)}
          </View>

          <View style={styles.row}>
            {renderButton('4')} 
            {renderButton('5')} 
            {renderButton('6')}
            {renderButton('+', styles.operatorButton)}
          </View>

          <View style={styles.row}>
            {renderButton('1')} 
            {renderButton('2')} 
            {renderButton('3')}
            {renderButton('=', styles.equalButton)}
          </View>

          <View style={styles.row}>
            {renderButton('0', { flex: 2 })} 
            {renderButton('.')}
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  result: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'right',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    margin: 5,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  operatorButton: {
    backgroundColor: '#ff9500',
  },
  clearButton: {
    backgroundColor: '#ff3b30',
  },
  equalButton: {
    backgroundColor: '#34c759',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#aaa',
    borderRadius: 5,
  },
  closeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default CalculatorModal;

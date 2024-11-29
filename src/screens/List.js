import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
  ActivityIndicator
} from 'react-native';

import CarList from '../components/CarList';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import ModalPopup from '../components/Modal';

import { useSelector } from 'react-redux';
import { selectCars } from '../redux/reducers/cars';
import { selectUser } from '../redux/reducers/user';

const Colors = {
  primary: '#A43333',
  secondary: '#SCB85F',
  darker: '#121212',
  lighter: '#ffffff',
  button: '#5CB85F',
};

const List = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const navigation = useNavigation();
  const car = useSelector(selectCars);
  const user = useSelector(selectUser);

  useFocusEffect (
    React.useCallback(()=> {
      if (user.status === 'failed') {
        setModalVisible(true);
       setErrorMessage(car.message)
        setTimeout(() => {
          setModalVisible(false);
        }, 1000)
      }
    },[car])
  )

  return (
    <SafeAreaView style={backgroundStyle}>
      <FocusAwareStatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={Colors.primary}
      />

<ModalPopup visible={car.status === 'loading'}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <ActivityIndicator />
          </View>
        </ModalPopup>

      <FlatList
        data={car.data}
        renderItem={({ item }) => (
          <CarList
            key={item.toString()}
            image={{ uri: item.img }}
            carName={item.name}
            passengers={5}
            baggage={4}
            price={item.price}
            onPress={() =>
              navigation.navigate('Detail', {
                carId: item.id,
                carName: item.name,
              })
            }
          />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default List;
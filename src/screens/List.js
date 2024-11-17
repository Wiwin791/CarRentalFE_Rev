import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../redux/reducers/user';
import { useCallback } from 'react';
import {
    FlatList,
    SafeAreaView,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import CarList from '../components/CarList';
import Button from '../components/Button';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getCars, selectCars } from '../redux/reducers/cars';

function List() {
    const dispatch = useDispatch();
    const isDarkMode = useColorScheme() === 'dark';
    const user = useSelector(selectUser);
    const car = useSelector(selectCars);
    const navigation = useNavigation();

    const COLORS = {
        primary: '#A43333',
        secondary: '#5CB85F',
        darker: '#121212',
        lighter: '#ffffff'
    }

    useFocusEffect(
        useCallback(() => {
            if (user.token) {
                dispatch(getCars(user.token))
                console.log(car.data)
            }
        }, [user, dispatch]))

    const handleLogin = () => {
        dispatch(login());  // Disptach action login
    };

    return (
        <SafeAreaView style={{ backgroundColor: isDarkMode ? '#121212' : '#ffffff' }}>
            <FocusAwareStatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={COLORS.lighter}
            />
            {!user.isLogin ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 24, marginBottom: 20 }}>Silahkan Login untuk Melihat Daftar Mobil</Text>
                    <Button title="Login" onPress={handleLogin} />
                </View>
            ) : (
                <FlatList
                    data={car.data}
                    renderItem={({ item, index }) => (
                        <CarList
                            key={item.id}
                            image={{ uri: item.img }}
                            carName={item.name}
                            passengers={5}
                            baggage={4}
                            price={item.price}
                            onPress={() => navigation.navigate('Detail', { id: item.id })}
                        />
                    )}
                    keyExtractor={item => item.id}
                />
            )}
        </SafeAreaView>
    );
}

export default List;

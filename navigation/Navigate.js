import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { Image, TouchableOpacity } from 'react-native';
import { icons } from '../constants';

const Stack = createStackNavigator();

const StackNavigation = () =>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="home" component={Home}
            options={{
                title:"SHOE SELECTION",
                headerStyle: {
                            //  backgroundColor: 'dodgerblue',
                            elevation: 0,
                            shadowColor:0 
                        },
                headerTitleAlign:"center",
                headerTintColor: COLORS.lightGray,
                headerTitleStyle:{
                    ...FONTS.navTitle
                },
                headerLeft:({onPress}) =>(
                    <TouchableOpacity
                    style={{marginLeft: SIZES.padding}}
                    onPress={onPress}
                    >
                    <Image 
                        source={icons.menu}
                        resizeMode="contain"
                        style={{width:25, height:25}}
                    />
                    </TouchableOpacity>
                ),
                headerRight:() =>(
                    <TouchableOpacity
                    style={{marginRight:SIZES.padding}}
                    onPress={() => console.log("Pressed")}
                    >
                    <Image 
                        source={icons.search}
                        style={{width:25, height:25}}
                        resizeMode="contain"
                    />
                    </TouchableOpacity>
                ),
                
            }}
             />
           
        </Stack.Navigator>
    )
}

export {StackNavigation}
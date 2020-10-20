import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Image, Modal } from 'react-native';
import { Svg, Polygon } from 'react-native-svg';
import { BlurView } from 'expo-blur';

import { COLORS, FONTS, images, SIZES } from '../constants';
import {data, recentData} from "../data/dummy.data";

function Home(props) {
    const [trending, setTrending] = useState(data);
    const [recentlyViewed, setRecentlyViewed] = useState(recentData);
    const [showAddToBagModel, setShowAddToBagModel] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedSize, setSelectedSize] = useState("");

    // Render 
    function renderTrendingShoes(item, index){
        var trendingStyle = {};

        if(index == 0){
            trendingStyle = {marginLeft: SIZES.padding}
        }
        return(
            <TouchableOpacity style={{...styles.trending, ...trendingStyle}}
            onPress={() => {
                setSelectedItem(item)
                setShowAddToBagModel(true)
            }}
            >
                <Text style={styles.textTrending}>{item.type}</Text>
                <View
                style={[{
                    flex: 1,
                    justifyContent: 'flex-end',
                    marginTop: SIZES.base,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    marginRight: SIZES.padding,
                    paddingLeft: SIZES.radius,
                    paddingRight: SIZES.padding,
                    paddingBottom: SIZES.radius,
                    backgroundColor: item.bgColor
                }, styles.trendingShadow]}
                >
                    <View style={{height:"35%", justifyContent:"space-between"}}>
                        <Text style={{color:COLORS.white, ...FONTS.body4}}>{item.name}</Text>
                        <Text style={{color:COLORS.white, ...FONTS.h3}}>{item.price}</Text>
                    </View>
                </View>

                <View style={{position:"absolute", top:27, right:0, width:"97%", height:"100%"}}>
                    <Svg height="100%" width="100%">
                    <Polygon 
                        points="0,0 160,0 160,80"
                        fill="white"
                    />
                    </Svg>
                </View>

                <Image source={item.img} 
                resizeMode="cover"
                style={styles.trendingImg}
                 />

            </TouchableOpacity>
        )
    }

    {/**View recently */}
    const renderRecentlyViewed = (item,index) =>{
        return(
            <TouchableOpacity style={{
                flex: 1, flexDirection:"row"
            }}>
            <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
            <Image 
                source={item.img}
                resizeMode="contain"
                style={{width:130, height:100}}
            />
            </View>
            <View style={{flex:1.5, marginLeft:SIZES.radius, justifyContent:"center"}}>
                <Text style={{color:COLORS.gray, ...FONTS.body3}}>{item.name}</Text>
                <Text style={{...FONTS.h3}}>{item.price}</Text>
            </View>
            </TouchableOpacity>
        )
    }
    {/** renderShoeSizes */}
    function renderShoeSizes(){
        return(
            selectedItem.sizes.map((item, index) => {
                return(
                    <TouchableOpacity
                    key={index}
                    style={{
                        width:35,
                        height:25,
                        justifyContent:"center",
                        alignItems:"center",
                        marginHorizontal:5,
                        marginBottom:10,
                        backgroundColor: selectedItem.sizes[index] == selectedSize ? COLORS.white : null,
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: COLORS.white
                    }}
                    onPress={() =>{
                        setSelectedSize(item)
                    }}
                    >
                    <Text style={{
                        color: selectedItem.sizes[index] == selectedSize ? COLORS.black : COLORS.white, ...FONTS.body4
                    }}>
                    {item}
                    </Text>
                    </TouchableOpacity>
                )
            })
        )
    }

  return (
    <View style={styles.container}>
        <Text style={styles.text}>TRENDING</Text>
        {/**Trending */}
        <View style={{height:260, marginTop: SIZES.radius}}>
            <FlatList 
                horizontal
                showsHorizontalScrollIndicator={false}
                data={trending}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item, index}) => renderTrendingShoes(item, index)}
            />
        </View>
        {/**Recently Viewed */}
        <View style={[{
            flex: 1,
            flexDirection:"row",
            marginTop: SIZES.padding,
            borderTopLeftRadius:30,
            borderTopRightRadius:30,
            backgroundColor: COLORS.white
        }, styles.recentContainerShadow]}>
            <View style={{width:70, marginLeft: SIZES.base}}>
                <Image 
                    source={images.recentlyViewedLabel}
                    resizeMode="contain"
                    style={{
                        width:"100%",
                        height:"100%"
                    }}
                />
            </View>
            <View style={{flex: 1, paddingBottom:SIZES.padding}}>
                    <FlatList 
                        showsVerticalScrollIndicator={false}
                        data={recentlyViewed}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item,index})=>renderRecentlyViewed(item,index)}
                    />
            </View>
        </View>
        {/**Modal */}
        {selectedItem &&
        <Modal
        animationType="slide"
        transparent={true}
        visible={showAddToBagModel}
        >
            <BlurView style={{flex:1, alignItems:"center", justifyContent:"center"}}
            tint="light"
            blurAmount={20}
            reducedTransparencyFallbackColor="white"
            intensity={100}
            >
               {/**Button to close modal */}
               <TouchableOpacity
               style={styles.absolute}
               onPress={() =>{
                   setSelectedItem(null)
                   setSelectedSize("")
                   setShowAddToBagModel(false)
               }}
               >
               </TouchableOpacity>
               {/** Modal Content */}
               <View style={{justifyContent:"center", width:"85%", backgroundColor:selectedItem.bgColor}}>
                   <View>
                       <Image 
                       source={selectedItem.img}
                       resizeMode="contain"
                       style={{
                           width:"90%",
                           height:170,
                           transform:[
                               {rotate: '-15deg'}
                           ]
                       }}
                        />
                   </View>
                   <Text style={styles.name}>{selectedItem.name}</Text>
                   <Text style={styles.type}>{selectedItem.type}</Text>
                   <Text style={styles.price}>{selectedItem.price}</Text>
                   <View style={{flexDirection:"row", marginTop: SIZES.radius, marginHorizontal:SIZES.padding}}>
                       <View>
                           <Text style={{color:COLORS.white, ...FONTS.body3}}>
                           Select size
                           </Text>
                       </View>
                       <View style={{flex:1, flexWrap:"wrap", flexDirection:"row", marginLeft:SIZES.radius}}>
                       {renderShoeSizes()}
                       </View>
                   </View>   

                   <TouchableOpacity
                   style={{width:"100%", height:70, marginTop: SIZES.base,
                   alignItems:"center", justifyContent:"center", backgroundColor: 'rgba(0,0,0,0.5)'
                   }}
                   onPress={() => {
                       setSelectedItem(null)
                       setSelectedSize("")
                       setShowAddToBagModel(false)
                   }}
                   >
                       <Text style={{color:COLORS.white, ...FONTS.largeTitleBold}}>Add to Bag</Text>
                   </TouchableOpacity> 
               </View>
            </BlurView>
        </Modal>
        }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor:COLORS.white,
      
  },
  text:{
      marginTop: SIZES.radius, 
      marginHorizontal:SIZES.padding,
      ...FONTS.largeTitleBold
    },
    trending:{
        height:240,
        width:180,
        justifyContent:"center",
        marginHorizontal: SIZES.base,
        
    },
    textTrending:{
        color:COLORS.gray,
        ...FONTS.h5
    },

    trendingImg: {
        position:"absolute",
        top:50,
        right: 0,
        width:"98%",
        height: 80,
        transform:[
            {rotate: "-15deg"}
        ]
    },

    trendingShadow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
    },
    recentContainerShadow:{
        shadowColor:"#000",
        shadowOffset: {
            width:0,
            height: 7
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51
    },

    absolute:{
        position:"absolute",
        top:0,
        left:0,
        bottom:0,
        right:0
    },
    name:{
        marginTop:SIZES.padding, 
        marginHorizontal:SIZES.padding, 
        color:COLORS.white, 
        ...FONTS.body3
    },
    type:{
        marginTop: SIZES.base/2,
        marginHorizontal: SIZES.padding,
        color: COLORS.white,
        ...FONTS.body3
    },
    price:{
        marginTop:SIZES.radius,
        marginHorizontal:SIZES.padding,
        color: COLORS.white,
        ...FONTS.h1
    }

});

export default Home;
import { View, Text,StyleSheet, FlatList,Image, ListRenderItem, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

import data from '../../assets/images/data.json';
import useCartStore from '@/store/cartStore';



const TabOneScreen = () => {
  const{reduceProduct,addProduct} = useCartStore();


  const renderItem:ListRenderItem<any> = ({item})=>(
     <View style={styles.cartItemContainer}>
        <Image source={{uri:item.image}} style={styles.cartItemImage}/>
        <View style={styles.itemContainer}>
            <Text style={styles.cartItemName}>{item.title}</Text>
            <Text>Price: ${item.price}</Text>
          </View>

          <View
          style={styles.buttonContainer}>
            <TouchableOpacity style={{padding:10}}>
             <Ionicons name="remove" size={20} color="black" onPress={()=>{reduceProduct(item)}}/>
            </TouchableOpacity>

            <TouchableOpacity style={{padding:10}}>
             <Ionicons name="add" size={20} color="black" onPress={()=>{addProduct(item)}} />
            </TouchableOpacity>
           
          
            
         </View>
      </View>

      
    )
  
  return (
    <View style={styles.container}>
      
     <FlatList data={data}  renderItem={renderItem} />
    
    </View>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    padding:20,
  },cartItemImage:{
    width:50,
    height:50,
    
  },cartItemContainer:{
      marginBottom:10,
      flexDirection:'row',
      alignItems:'center',
      gap:20
  },itemContainer:{
    flex:1,

  },cartItemName:{
    fontSize:16,
    fontWeight:'bold',
  },buttonContainer:{
    flexDirection:'row',
    alignItems:'center',
  }
})

export default TabOneScreen
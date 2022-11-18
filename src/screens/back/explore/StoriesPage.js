import {StyleSheet, Text, View,Image} from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

const StoriesPage = () => {
  const Images = [
    'https://unsplash.com/photos/kFHz9Xh3PPU',
    'https://unsplash.com/photos/MI9AqYWeM24',
    'https://unsplash.com/photos/qQC8tyG_JVA',
    'https://unsplash.com/photos/7nrsVjvALnA',
  ];
  return (
    <View>
      <Text>Stories Page</Text>
      
      <View>
        <ScrollView>
        {/* {
         Images.map((image, index) => (
          <Image
             key={index}
               source={{ uri: image }} 
               style={styles.images}
            />
            ))
            } */}
            <Image  source={{ uri: 'https://images.unsplash.com/photo-1465447142348-e9952c393450?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTF8Mzk1NDUwfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'}} />
            </ScrollView>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  images:{
    height:"50%",
    width:"100%",
   
  }
});


export default StoriesPage;
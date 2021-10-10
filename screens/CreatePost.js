import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  Button,
  Alert
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import firebase from 'firebase';
let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
  'boomerang monkey deluxe': require('../assets/fonts/deluxe.ttf')
};
export default class CreateStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      previewImage: 'image_1',
      dropdownHeight: 40,
      caption: '',
      light_theme: true,

    };
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }
  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
    this.addPost();
    
  }
   async fetchUser() {
    let theme;
    await firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value",  snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({
      light_theme: theme === "light" 
     
    });
      });
   
  }  
   async addPost (){
   if(this.state.caption){
     let postData ={
     preview_images: this.state.previewImage,
     caption: this.state.caption,
     auth: firebase.auth().currentUser.displayName,
     create_on: new Date(),
     author_uid: firebase.auth().currentUser.uid,
     profile_image: this.state.preview_image,
     likes:0
         
     };
     await firebase.database().ref('/posts/'+ Math.random().toString(36).slice(2)).set(postData)
     .then( (snapShot) => {
           
     });
     this.props.setUpdateToTrue();
     this.props.navigtion.navigate("Feed")
   }else{
     Alert.alert("error","All Fields are Required",[{
       text:"ok",
       onPress:() => console.log("ok pressed")
     }]  ,  {cancelable:false}
     )
   }

 }
  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      let preview_images = {
        image_1: require('../assets/image_1.jpg'),
        image_2: require('../assets/image_2.jpg'),
        image_3: require('../assets/image_3.jpg'),
        image_4: require('../assets/image_4.jpg'),
        image_5: require('../assets/image_5.jpg'),
         image_6: require('../assets/image_6.jpg'),
        image_7: require('../assets/image_7.jpg'),
         
     
      };
      return (
        <View style={this.state.light_theme ?styles.lightContainer:styles.container}>
          
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            
            <View style={styles.appIcon}>
              
              <Image
                source={require('../assets/daily_pictures.png')}
                style={styles.iconImage}></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              
              <Text style={this.state.light_theme?styles.appTitleTextLight:styles.appTitleText}>New Post</Text>
            </View>
          </View>
          <View style={styles.fieldsContainer}>
            
            <ScrollView>
              
              <Image
                source={preview_images[this.state.previewImage]}
                style={styles.previewImage}></Image>
              
              <View style={{ height: RFValue(this.state.dropdownHeight) }}>
                
                <DropDownPicker
                  items={[
                    { label: 'Image 1', value: 'image_1' },
                    { label: 'Image 2', value: 'image_2' },
                    { label: 'Image 3', value: 'image_3' },
                    { label: 'Image 4', value: 'image_4' },
                    { label: 'Image 5', value: 'image_5' },
                    { label: 'Image 6', value: 'image_6' },
                    { label: 'Image 7', value: 'image_7' },
                  ]}
                  defaultValue={this.state.previewImage}
                  containerStyle={{
                    height: 40,
                    borderRadius: 20,
                    marginBottom: 40,

                  }}
                  onOpen={() => {
                    this.setState({ dropdownHeight: 200 });
                  }}
                  onClose={() => {
                    this.setState({ dropdownHeight: 40 });
                  }}
                  style={{ backgroundColor: 'transparent' }}
                  itemStyle={{ justifyContent: 'flex-start' }}
                  dropDownStyle={{ backgroundColor: '#2a2a2a' }}
                  labelStyle={{ color: 'white' }}
                  arrowStyle={{ color: 'white' }}
                  onChangeItem={item =>
                    this.setState({ previewImage: item.value })
                  }
                />
              </View>
              <TextInput
              onChangeText={caption => this.setState({caption})}
                style={this.state.light_theme?styles.inputFormLight:styles.inputForm}
                placeholder={'Caption'}
                placeholderTextColor={this.state.light_theme?'black':'white'}
                
              />
              <View style={{justifyContent:"center", marginTop:RFValue(20),alignItems:"center"}}> 
               <Button
                onPress={()=>{this.addPost}}
                title="summit"
                color="#841584"
                />
               </View>
              
            </ScrollView>
          </View> 
          <View style={{ flex: 0.08 }} />
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
    lightContainer: { flex: 1, backgroundColor: 'white' },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : 226,
  },
  appTitle: { flex: 0.07, flexDirection: 'row' },
  appIcon: { flex: 0.3, justifyContent: 'center', alignItems: 'center' },
  iconImage: { width: '100%', height: '100%', resizeMode: 'contain' },
  appTitleTextContainer: { flex: 0.7, justifyContent: 'center' },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(28),
    fontFamily: 'boomerang monkey deluxe',
  },
  
 appTitleTextLight: {
    color: 'black',
    fontSize: RFValue(28),
    fontFamily: 'boomerang monkey deluxe',
  },
  fieldsContainer: { flex: 0.85 },
  previewImage: {
    width: '93%',
    height: RFValue(250),
    alignSelf: 'center',
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: 'contain',
  },
  inputForm: {
   
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    marginTop:20,
    color: 'white',
    fontFamily: 'boomerang monkey deluxe',
    height: RFValue(40),
    borderColor:"white"
  },
    inputFormLight: {
   
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    marginTop:20,
    color: 'black',
    fontFamily: 'boomerang monkey deluxe',
    height: RFValue(40),
    borderColor:"black"
  },
 
});

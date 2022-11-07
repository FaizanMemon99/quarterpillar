import React, { useEffect } from 'react'
import { 
    View,
    Text,
    Image,
    StyleSheet,
    Pressable,
    TextInput,
    ActivityIndicator,
} from 'react-native'
import Images from '../../assets/images/Images'
import Constants from '../../shared/Constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'
// import { Badge } from 'react-native-elements'

const CustomAppBar=(props)=>{
    const navigation=useNavigation()
    const goBack = ()=>{
        props.navigation.goBack()
    }
    const gotoCart = ()=>{
        navigation.navigate('/cart',{userDetails:props?.userDetails})
    }
    const gotoCategory = ()=>{
        if(props?.userDetails?.role_id==3){
            navigation.navigate('/category', {
                userDetails: props?.userDetails,
              });
        }
        else 
        navigation.navigate('/my-requests',{page:'ongoing',userDetails:props?.userDetails})
    }
    const gotoDraft = ()=>{
        props.navigation.navigate('/draft',{userDetails:props?.userDetails})
    }

    return (
        <View style={styles.wrapper}>
            {
                props.isMainscreen?(
                    <View style={[styles.logoContainer, props.title?({alignItems: 'center'}):null]}>
                        <Pressable onPress={()=>props.openDrawer()} style={{zIndex: 999}}>
                            {
                                !props.showDrawer?<Image source={Images.hamburgerMenuIcon} style={{tintColor:props.isReel?'#FFF':'#000'}} />:<AntDesign name='close' style={{color:props.isReel?'#FFF':'#000'}} size={26} />
                            }
                            
                        </Pressable>
                        {
                            props.title?<Text style={[styles.title, {color: props.isReel?'#FFF':'#000'}]}>{props.title}</Text>:(
                                <View style={{marginStart: 20,marginTop: -12}}>
                                    
                                </View>
                            )
                        }
                    </View>
                    
                ):(
                    <View style={styles.titleBar}>
                        <View style={{display:'flex',alignItems:'center',flexDirection:'row'}}>
                        <Pressable onPress={goBack}><AntDesign name='left' size={24} style={props.isReel?styles.reelBackBtn:styles.backBtn} /></Pressable>
                        <Text style={{...styles.title, color: props.isReel?Constants.colors.whiteColor: 'rgba(0, 0, 0, 1)',}}>{props.title}</Text>
                        {
                            props.subtitle?<Text style={styles.subtitle}>{props.subtitle}</Text>:null
                        }
                        {
                            props.isDraft?<Text style={styles.draft}>Draft</Text>:null
                        }
                        </View>
                        {props.editable&&<Pressable onPress={()=>props.navigation.navigate('/edit-user-info',{userDetails:props?.userDetails,type:props?.type})}>
                            <FontAwesome5Icon name='pen' size={24} style={props.isReel?styles.reelBackBtn:styles.backBtn} /></Pressable>}
                    </View>
                )
            }
            {
                props.headerRight?(
                    <View style={{flexDirection: 'row',}}>
                        <Feather name='search' style={[styles.leftIocn,{color:props?.IconColor?props?.IconColor:'#fff'}]} />
                        {/* <View style={{position:'relative'}}> */}
                        <Feather name='shopping-cart' style={[styles.leftIocn,{color:props?.IconColor?props?.IconColor:'#fff'}]} onPress={gotoCart} />
                        {/* <View style={{position:'absolute',left:"90%",top:"-30%",backgroundColor:'white',zIndex:99999,width:20,height:20,borderRadius:20/2}}>
                        <Text style={{color:'black',textAlign:'center'}}>
                        {props.cartLoader?
                            <ActivityIndicator color='black'/>:
                            props.cartNumber
                        }
                       </Text>
                            </View>
                        </View> */}
                        
                        {!props?.explore&&<Feather name='plus-circle' style={[styles.leftIocn, {color:props?.IconColor?props?.IconColor:'#fff',zIndex: props.newPost?9999:9}]} onPress={()=>props.openPopup()} />}
                        {
                            props.newPost?<View style={styles.addnewPost}>
                                <Text style={styles.item} onPress={gotoCategory}>{
                                props?.userDetails?.role_id==3?'New Advertisement':
                                'New Post'}</Text>
                                <View style={styles.divider}></View>
                                <Text style={styles.item} onPress={gotoDraft}>Draft</Text>
                            </View>:null
                        }
                    </View>
                ):null
            }
            {
                props.searchbar?(
                    <View style={{width: '100%',}}>
                        <TextInput style={styles.searchbar} placeholder='Search' />
                        <AntDesign name='search1' style={styles.searchIcon} />
                    </View>
                ):null
            }
        </View>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        padding: Constants.padding,
        paddingTop: Constants.padding+20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoContainer: {
        flexDirection: 'row',
        zIndex: 99
    },
    title: {
        fontFamily: Constants.fontFamily,
        fontSize: 30,
        fontWeight: '800',
    },
    welcome: {
        fontFamily: Constants.fontFamily,
        fontSize: 32,
        fontWeight: '800',
    },
    companyName: {
        fontFamily: Constants.fontFamily,
        fontSize: 24,
        fontWeight: '500',
    },
    reelBackBtn: {
        color: Constants.colors.whiteColor,
        backgroundColor: Constants.colors.whiteColor,
        opacity: 0.4,
        padding: 12,
        borderRadius: Constants.borderRadius,
    },
    backBtn: {

    },
    titleBar: {
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 99,
        justifyContent:'space-between',
        width:'100%'
    },
    title: {
        fontFamily: Constants.fontFamily,
        fontSize: 26,
        fontWeight: '800',
        marginStart: 20,
    },
    leftIocn: {
        color: Constants.colors.whiteColor,
        fontSize: 28,
        marginLeft: 20,
        zIndex: 99,
    },
    searchbar: {
        padding: 12,
        width: '90%',
        backgroundColor: '#E5EBED',
        borderRadius: Constants.borderRadius,
    },
    searchIcon: {
        position: 'absolute',
        right: 50,
        top: 10,
        fontSize: 24,
    },
    addnewPost: {
        position: 'absolute',
        backgroundColor: Constants.colors.whiteColor,
        right: 20,
        top: 40,
        width: "100%",
        zIndex: 9999,
        borderTopLeftRadius: 12,
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
    },
    item: {
        padding: 13,
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#D1D1D1'
    },
    subtitle: {
        backgroundColor: '#BBFFDA',
        padding: 6,
        paddingLeft: 12,
        paddingRight: 12,
        marginLeft: 12,
        fontWeight: '700',
        color: '#04751F',
        fontFamily: Constants.fontFamily,
        borderRadius: 5,
    },
    draft: {
        backgroundColor: 'rgba(231, 204, 62, 0.22)',
        padding: 6,
        paddingLeft: 12,
        paddingRight: 12,
        marginLeft: 12,
        fontWeight: '700',
        color: '#BC9E00',
        fontFamily: Constants.fontFamily,
        borderRadius: 5,
    },
})
export default CustomAppBar
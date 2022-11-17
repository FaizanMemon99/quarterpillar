import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ImageBackground,
    ActivityIndicator,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/explore/CustomAppBar'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import axios from 'axios'
import showToastmsg from '../../../shared/showToastmsg'

const ProductDetails= (props)=>{
    const navigation=useNavigation()
    const [qty, setQty] = useState(1)
    const [color, setColor] = useState('')
    const [size, setSize] = useState('')
    const [like, setLike] = useState(false)
    const [loader,setLoader]=useState(false)
    const decreaseQty = ()=>{
        if(qty>1){
            setQty(qty-1)
        }
    }
    const increaseQty = ()=>{
        if(qty<props?.route?.params?.productDetails?.business_product?.qty)
        setQty(qty+1)
    }
    const getColor = (color)=>{
        setColor(color)
    }
    const getSize = (size)=>{
        setSize(size)
    }
    const gotoBuy=()=>{
        if(!color||color===''){
            showToastmsg('Please select color')
        }
        else if(!size||size==''){
            showToastmsg('Please select size')
        }
        else if(!(parseInt(props?.route?.params?.productDetails?.business_product?.qty)>=parseInt(props?.route?.params?.productDetails?.business_product?.warning_qty))){
            showToastmsg("Out of stock! You cannot buy this product now")
        }
        else{console.log("response==>",{
            product_id:props?.route?.params?.productDetails?.product_id,
            explore_id:props?.route?.params?.userDetails?.id,
            "color":color,
    "size":size,
    "qty":qty,
    "dis_amount":(parseFloat(props?.route?.params?.productDetails?.business_product?.sales_price)-
    (parseFloat(props?.route?.params?.productDetails?.business_product?.sales_price) - (parseFloat(props?.route?.params?.productDetails?.business_product?.sales_price) * (parseFloat(props?.route?.params?.productDetails?.business_product?.dicount)/100))))*qty,
    "total_amount":(parseFloat(props?.route?.params?.productDetails?.business_product?.sales_price) - (parseFloat(props?.route?.params?.productDetails?.business_product?.sales_price) * (parseFloat(props?.route?.params?.productDetails?.business_product?.dicount)/100)))*qty
        });
        setLoader(true)
        axios.post(`${Constants.BASE_URL}auth/add-to-cart`,{
            product_id:props?.route?.params?.productDetails?.product_id,
            user_id:props?.route?.params?.userDetails?.id,
            "color":color,
    "size":size,
    "qty":qty,
    "dis_amount":(parseFloat(props?.route?.params?.productDetails?.business_product?.sales_price)-
    (parseFloat(props?.route?.params?.productDetails?.business_product?.sales_price) - (parseFloat(props?.route?.params?.productDetails?.business_product?.sales_price) * (parseFloat(props?.route?.params?.productDetails?.business_product?.dicount)/100))))*qty,
    "total_amount":(parseFloat(props?.route?.params?.productDetails?.business_product?.sales_price) - (parseFloat(props?.route?.params?.productDetails?.business_product?.sales_price) * (parseFloat(props?.route?.params?.productDetails?.business_product?.dicount)/100)))*qty
        })
        .then((response)=>{
            setLoader(false)
            if(response.data.response==200){
                navigation.navigate('/cart',{userDetails:props?.route?.params?.userDetails})     
            }
        })
        .catch((error)=>{
            setLoader(false)
            console.log("error",error);
            showToastmsg('Error! Please try again')
        })}
        // navigation.navigate('/cart',{productDetails:props?.route?.params?.productDetails})
    }
    console.log("product details",props?.route?.params?.productDetails);
    return (
        <View style={styles.container}>
            <ImageBackground
                source={
                    JSON.parse(props?.route?.params?.productDetails?.image)[0]?
                    {uri:`${Constants.BASE_IMAGE_URL}${JSON.parse(props?.route?.params?.productDetails?.image)[0]}`}:    
                    Images.reelProduct
                }
                style={styles.bgImg}>
                <CustomAppBar navigation={navigation} isMainscreen={false} isReel={true} title={props?.route?.params?.productDetails?.title} headerRight={false} />
                <View style={styles.iconGroup}>
                    <AntDesign name={like ? 'heart' : 'hearto'} style={[styles.icon, { color: like ? '#f54295' : '#FFF' }]} onPress={() => setLike(!like)} />
                    <Text style={styles.iconText}>nnk</Text>
                    <AntDesign name='message1' style={styles.icon} 
                    // onPress={gotoComments} 
                    />
                    <Text style={styles.iconText}>00n</Text>
                    <Feather name='send' style={styles.icon} 
                    // onPress={gotoReview}
                     />
                    <Text style={styles.iconText}>00n</Text>
                    <Feather name='bookmark' style={styles.icon} 
                    // onPress={gotoDescription} 
                    />
                </View>
            </ImageBackground>
           
            <ScrollView style={styles.bottomContainer}>
                <View style={styles.header}>
                    <View style={styles.headerTop}>
                        <Text style={styles.productname}>
                            {props?.route?.params?.productDetails?.business_product?.product_name}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flexDirection: 'row'}}>
                                <FontAwesome name='rupee' size={16} style={styles.icons} /><Text style={{color: '#979797', fontWeight: '700', fontFamily: Constants.fontFamily}}> {props?.route?.params?.productDetails?.business_product?.sales_price}  </Text>
                                <View style={styles.strikethrough}></View>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <FontAwesome name='rupee' size={16} style={[styles.icons, {color: '#000000'}]} /><Text style={{fontWeight: '700', fontFamily: Constants.fontFamily}}> {
                                    parseFloat(props?.route?.params?.productDetails?.business_product?.sales_price) - (parseFloat(props?.route?.params?.productDetails?.business_product?.sales_price) * (parseFloat(props?.route?.params?.productDetails?.business_product?.dicount)/100))
                                }  </Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <FontAwesome name='rupee' size={16} style={[styles.icons, {color: Constants.colors.primaryColor}]} /><Text style={{ fontFamily: Constants.fontFamily,color: Constants.colors.primaryColor}}> 
                                {parseFloat(props?.route?.params?.productDetails?.business_product?.sales_price)-
                                (parseFloat(props?.route?.params?.productDetails?.business_product?.sales_price) - (parseFloat(props?.route?.params?.productDetails?.business_product?.sales_price) * (parseFloat(props?.route?.params?.productDetails?.business_product?.dicount)/100)))}
                                &nbsp;off</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.headerTop, {marginBottom: 0,}]}>
                        <Text style={{fontFamily: Constants.fontFamily, fontSize: 18,}}>Units {props?.route?.params?.productDetails?.business_product?.qty}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontFamily: Constants.fontFamily, fontSize: 18,}}>Availability: </Text>
                            {parseInt(props?.route?.params?.productDetails?.business_product?.qty)>=parseInt(props?.route?.params?.productDetails?.business_product?.warning_qty)?
                            <Text style={{fontFamily: Constants.fontFamily, fontSize: 18, color: Constants.colors.primaryColor}}>In Stock</Text>
                            :
                            <Text style={{fontFamily: Constants.fontFamily, fontSize: 18, color: "red"}}>Out of Stock</Text>}
                        </View>
                    </View>
                </View>
                <View style={globatStyles.divider}></View>
                <View style={styles.review}>
                    <FontAwesome name='star' style={styles.rattingStar} />
                    <FontAwesome name='star' style={styles.rattingStar} />
                    <FontAwesome name='star' style={styles.rattingStar} />
                    <FontAwesome name='star' style={styles.rattingStar} />
                    <FontAwesome name='star-o' style={[styles.rattingStar, {color: '#999999'}]} />
                    <Text style={styles.reviewText}>Reviews</Text>
                </View>
                <View style={styles.buynow}>
                    <View style={[styles.buynowBtn, {marginTop: -16}]}>
                        <Pressable onPress={gotoBuy} style={[globatStyles.button, {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},]}>
                            
                            {loader?
                            <View style={{display:'flex',alignItems:'center',width:'100%'}}>
                            <ActivityIndicator color={Constants.colors.whiteColor}/>
                            </View>
                            :<>
                            <Text style={globatStyles.btnText}>Buy</Text><FontAwesome name='angle-right' size={16} color={Constants.colors.whiteColor} />
                            </>
                            }
                            </Pressable>
                    </View>
                    <View style={styles.increaseDecreasebtn}>
                        <Pressable style={styles.increDecreBtn} onPress={decreaseQty}><Text style={{fontSize: 30, color: Constants.colors.whiteColor}}>-</Text></Pressable>
                        <Text style={styles.qty}>{qty}</Text>
                        <Pressable style={styles.increDecreBtn} onPress={increaseQty}><Text style={{fontSize: 30, color: Constants.colors.whiteColor}}>+</Text></Pressable>
                    </View>
                </View>
                <View style={{marginTop: 14}}>
                    <Text style={{fontFamily: Constants.fontFamily, fontSize: 18,}}>Colors</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Pressable onPress={()=>getColor('red')} style={[styles.variable, {backgroundColor: color==='red'?'#D1D1D1':'#FFF'}]}><Text style={styles.variableValue}>Red</Text></Pressable>
                        <Pressable onPress={()=>getColor('green')} style={[styles.variable, {backgroundColor: color==='green'?'#D1D1D1':'#FFF'}]}><Text style={styles.variableValue}>Green</Text></Pressable>
                        <Pressable onPress={()=>getColor('blue')} style={[styles.variable, {backgroundColor: color==='blue'?'#D1D1D1':'#FFF'}]}><Text style={styles.variableValue}>Blue</Text></Pressable>
                        <Pressable onPress={()=>getColor('black')} style={[styles.variable, {backgroundColor: color==='black'?'#D1D1D1':'#FFF'}]}><Text style={styles.variableValue}>Black</Text></Pressable>
                    </View>
                </View>
                <View style={{marginTop: 14}}>
                    <Text style={{fontFamily: Constants.fontFamily, fontSize: 18,}}>Size</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Pressable onPress={()=>getSize('s')} style={[styles.variable, {backgroundColor: size==='s'?'#D1D1D1':'#FFF'}]}><Text style={styles.variableValue}>S</Text></Pressable>
                        <Pressable onPress={()=>getSize('m')} style={[styles.variable, {backgroundColor: size==='m'?'#D1D1D1':'#FFF'}]}><Text style={styles.variableValue}>M</Text></Pressable>
                        <Pressable onPress={()=>getSize('l')} style={[styles.variable, {backgroundColor: size==='l'?'#D1D1D1':'#FFF'}]}><Text style={styles.variableValue}>L</Text></Pressable>
                        <Pressable onPress={()=>getSize('xl')} style={[styles.variable, {backgroundColor: size==='xl'?'#D1D1D1':'#FFF'}]}><Text style={styles.variableValue}>XL</Text></Pressable>
                        <Pressable onPress={()=>getSize('2xl')} style={[styles.variable, {backgroundColor: size==='2xl'?'#D1D1D1':'#FFF'}]}><Text style={styles.variableValue}>2XL</Text></Pressable>
                    </View>
                </View>
                <View style={{marginTop: 14,marginBottom:10}}>
                    <Text style={{fontFamily: Constants.fontFamily, fontSize: 18,}}>Description</Text>
                    <Text style={styles.productdescription}>
                        {
                            props?.route?.params?.productDetails?.description
                        }
                    </Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
    },
    iconGroup: {
        position: 'absolute',
        bottom: Constants.padding,
        right: Constants.padding + 20,
        zIndex: 99,
    },
    icon: {
        marginTop: 25,
        fontSize: 25,
        color: Constants.colors.whiteColor,
    },
    iconText: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
        fontSize: 12,
        marginTop: 6,
    },
    bgImg: {
        flex: 1,
        resizeMode: 'cover'
    },
    bottomContainer: {
        flex: 1,
        padding: Constants.padding,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 18,
    },
    productname: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        fontSize: 20,
        textTransform:'capitalize'
    },
    icons: {
        marginTop: 2,
        color: '#979797',
    },
    strikethrough: {
        width: 44,
        height: 2,
        backgroundColor: '#979797',
        position: 'absolute',
        left: 0,
        top: '35%'
    },
    review: {
        flexDirection: 'row',
    },
    rattingStar: {
        fontSize: 16,
        color: '#E7CC3E',
        marginRight: 6,
    },
    reviewText: {
        fontFamily: Constants.fontFamily,
        fontSize: 16,
        textDecorationLine: 'underline',
        marginTop: -5,
        fontWeight: '500',
    },
    buynow: {
        flex: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buynowBtn: {
        flex: 3,
    },
    increaseDecreasebtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1.6,
        marginLeft: 14,
        marginTop: 18,
    },
    increDecreBtn:{
        width: 40,
        height: 40,
        backgroundColor: '#999999',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    qty: {
        fontFamily: Constants.fontFamily,
        fontSize: 20,
        marginTop: 5,
    },
    variable: {
        padding: 5,
        paddingLeft: Constants.padding,
        paddingRight: Constants.padding,
        borderWidth: 1,
        borderColor: '#999999',
        borderRadius: 4,
    },
    variableValue: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
    },
    productdescription: {
        fontFamily: Constants.fontFamily,
        paddingBottom: Constants.padding,
    },
})


export default ProductDetails
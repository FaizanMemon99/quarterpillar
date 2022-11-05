import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    ActivityIndicator,
} from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import Images from '../../../assets/images/Images'
import Constants from '../../../shared/Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import globatStyles from '../../../shared/globatStyles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import axios from 'axios'
import showToastmsg from '../../../shared/showToastmsg'

const RenderCart = ({item,getCartData}) => {
    const [qty, setQty] = useState(item?.item?.data?.qty)
    const [apiLoader,setapiLoader]=useState(false)
    const [deleteLoader,setDeleteLoader]=useState(false)
    const [color,setColor]=useState(item?.item?.data?.color)
    const [size,setSize]=useState(item?.item?.data?.size)
    const [disAmount,setdiscountAmount]=useState(item?.item?.data?.dis_amount)
    const [totalAmount,settotalAmount]=useState(item?.item?.data?.total_amount)
    const discountAmount=parseFloat(item?.item?.data?.dis_amount)/parseInt(item?.item?.data?.qty)
    const totalAmountval=parseFloat(item?.item?.data?.total_amount)/parseInt(item?.item?.data?.qty)
    const updateCartApi=(tempcolor,tempsize,tempqty,tempdiscountAmt,temptotalAmt)=>{
        setapiLoader(true)
        console.log("response data=>",{
            "cart_id":item?.item?.data?.cart_id,
            "color":tempcolor,
            "size":tempsize,
            "qty":tempqty,
            "dis_amount":tempdiscountAmt,
            "total_amount":temptotalAmt
        });
        axios.post(`${Constants.BASE_URL}explore/update-cart-item`,{
            "cart_id":item?.item?.data?.cart_id,
            "color":tempcolor,
            "size":tempsize,
            "qty":tempqty,
            "dis_amount":tempdiscountAmt,
            "total_amount":temptotalAmt
        })
        .then((response)=>
        {
            setapiLoader(false)
            console.log("response=>",response.data);
            getCartData()
        })
        .catch((error)=>{
            setapiLoader(false)
            console.log("error=>",error);
            showToastmsg("Error while updating cart. Please try again.")
        })
    }
    const decreaseQty = ()=>{
        if(qty>1){
            let tempqty=parseInt(qty)
            tempqty=tempqty-1
            let tempdiscountAmt=parseFloat(disAmount)
            tempdiscountAmt=tempdiscountAmt-discountAmount
            let temptotalAmt=parseFloat(totalAmount)
            temptotalAmt=temptotalAmt-totalAmountval
            setQty(parseInt(qty)-1)
            setdiscountAmount(parseFloat(disAmount)-discountAmount)
            settotalAmount(parseFloat(totalAmountval)-totalAmount)
            updateCartApi(color,size,tempqty,tempdiscountAmt,temptotalAmt)
            // setprice(price-1200)
        }
    }
    const increaseQty = ()=>{
        let tempqty=parseInt(qty)
        tempqty=tempqty+1
        let tempdiscountAmt=parseFloat(disAmount)
        tempdiscountAmt=tempdiscountAmt+discountAmount
        let temptotalAmt=parseFloat(totalAmount)
        temptotalAmt=temptotalAmt+totalAmountval
        setQty(parseInt(qty)+1)
        setdiscountAmount(parseFloat(disAmount)+discountAmount)
        settotalAmount(parseFloat(totalAmountval)+totalAmount)
        updateCartApi(color,size,tempqty,tempdiscountAmt,temptotalAmt)
        // setprice(price+1200)
    }
    const sizes = ['s', 'm', 'l', 'xl', '2xl']
    const colors = ['red', 'green', 'blue', 'black']
    const deleteCartValue=()=>{
        setDeleteLoader(item?.item?.data?.cart_id)
        axios.post(`${Constants.BASE_URL}explore/remove-item-from-cart`,{
            cart_id:item?.item?.data?.cart_id
        }).then((response)=>
        {
            if(response.data.response==200){
                showToastmsg('Cart updated successfully')
                getCartData(true)
            }
        }).catch((error)=>{
            console.log("error",error);
            showToastmsg('Error! Please try again')
        })
    }
    useEffect(()=>{
        setQty(item?.item?.data?.qty)
        setSize(item?.item?.data?.size)
        setColor(item?.item?.data?.color)
        setdiscountAmount(item?.item?.data?.dis_amount)
        settotalAmount(item?.item?.data?.total_amount)
    },[item])
    return (
        <View style={styles.container}>
            <Image source={JSON.parse(item?.item?.data?.product_details?.product_image)[0]?
                    {uri:`${Constants.BASE_IMAGE_URL}${JSON.parse(item?.item?.data?.product_details?.product_image)[0]}`}:
                Images.cartImg} style={styles.pimg} />
            <View style={{marginLeft: 12, justifyContent: 'space-between' }}>
                <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
                <Text style={styles.pname}>{item?.item?.data?.product_details?.product_name}</Text>
                {deleteLoader==item?.item?.data?.cart_id?
                    <ActivityIndicator/>:
                <Pressable onPress={deleteCartValue}>
                <FontAwesome  name='trash' size={18} style={[styles.icons,{color:'red'}]} />
                </Pressable>
                }
                </View>
                <View style={{ flexDirection: 'row', marginTop: 6, marginBottom: 6,}}>
                    <View style={{ flexDirection: 'row',marginRight:5 }}>
                        <FontAwesome name='rupee' size={16} style={styles.icons} /><Text style={{ color: '#979797', fontWeight: '700', fontFamily: Constants.fontFamily }}> {(parseFloat(item?.item?.data?.total_amount)+parseFloat(item?.item?.data?.dis_amount))/parseInt(item?.item?.data?.qty)}  </Text>
                        <View style={styles.strikethrough}></View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <FontAwesome name='rupee' size={16} style={[styles.icons, { color: '#000000' }]} /><Text style={{ fontWeight: '700', fontFamily: Constants.fontFamily }}> {
                                    (parseFloat(item?.item?.data?.total_amount))/parseInt(item?.item?.data?.qty)
                                }  </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <FontAwesome name='rupee' size={16} style={[styles.icons, { color: Constants.colors.primaryColor }]} /><Text style={{ fontFamily: Constants.fontFamily, color: Constants.colors.primaryColor }}> 
                        {(parseFloat(item?.item?.data?.dis_amount))/parseInt(item?.item?.data?.qty)}
                                &nbsp;off</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row',}}>
                    <SelectDropdown
                        data={sizes}
                        defaultButtonText='XL'
                        buttonStyle={styles.dropDownBox}
                        buttonTextStyle={globatStyles.dropdownTextStyle}
                        rowTextStyle={globatStyles.dropDownListStyle}
                        renderDropdownIcon={()=><AntDesign name='down' />}
                        onSelect={(e)=>{
                            updateCartApi(color,e,qty,disAmount,totalAmount);
                            setSize(e)}}
                        defaultValue={size}
                        />
                    
                    <SelectDropdown
                        data={colors}
                        defaultButtonText='RED'
                        buttonStyle={styles.dropDownBox}
                        buttonTextStyle={globatStyles.dropdownTextStyle}
                        rowTextStyle={globatStyles.dropDownListStyle}
                        renderDropdownIcon={()=><AntDesign name='down' />}
                        onSelect={(e)=>{
                            updateCartApi(e,size,qty,disAmount,totalAmount);
                            setColor(e)}}
                        defaultValue={color}
                        />
                </View>
                <View style={styles.increaseDecreasebtn}>
                    <Pressable style={styles.increDecreBtn} onPress={decreaseQty}><Text style={{fontSize: 20, color: Constants.colors.whiteColor}}>{apiLoader?<ActivityIndicator color={'white'}/>
                        :'-'}</Text></Pressable>
                    <Text style={styles.qty}>{qty}</Text>
                    <Pressable style={styles.increDecreBtn} onPress={increaseQty}><Text style={{fontSize: 20, color: Constants.colors.whiteColor}}>
                    {apiLoader?<ActivityIndicator color={'white'}/>
                        :'+'}
                        </Text></Pressable>
                </View>
                <View style={{ flexDirection: 'row',marginTop:6 }}>
                            <Text>
                                Total Amt :
                            </Text>
                        <FontAwesome name='rupee' size={16} style={[styles.icons, { paddingLeft:5,color: '#000000' }]} /><Text style={{ fontWeight: '700', fontFamily: Constants.fontFamily }}> {
                                    (parseFloat(item?.item?.data?.total_amount))
                                }  </Text>
                    </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Constants.colors.whiteColor,
        padding: 12,
        marginTop: 12,
        borderRadius: Constants.borderRadius,
        flexDirection: 'row',
    },
    icons: {
        marginTop: 2,
        color: '#979797',
    },
    strikethrough: {
        width: 44,
        height: 1,
        backgroundColor: '#979797',
        position: 'absolute',
        left: 0,
        top: '45%'
    },
    pname: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        textTransform:'capitalize'
    },
    dropDownBox: {
        padding: 0,
        height: 35,
        backgroundColor: '#F5FFFA',
        borderWidth: 1,
        borderColor: '#F1F1F1',
        width: '35%',
        marginRight: '2%',
        borderRadius: 5,
    },
    increaseDecreasebtn: {
        flexDirection: 'row',
        flex: 1.6,
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
        paddingLeft: 10,
        paddingRight: 10,
    },
    pimg: {
        flex: 1,
        resizeMode: 'cover',
        // height: 150,
    },
})

export default RenderCart
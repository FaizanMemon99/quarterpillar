import React, { useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ImageBackground,
    StatusBar,
    Pressable,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/advertiser/CustomAppBar'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import showToastmsg from '../../../shared/showToastmsg'

const Businessproductpreview = (props) => {
    var imageUrl = `${Constants.BASE_IMAGE_URL}${JSON.parse(props?.route?.params?.products?.item?.product_image)[0]}`
    const navigation = useNavigation()

    const Deleteproduct = () => {
        axios.post(`${Constants.BASE_URL}business/Delete/Product`, {
            product_id: props?.route?.params?.products?.item?.id

        }).then((response) => {
            if (response.status == 200) {
                console.log("resopnse of delete product=>", response.data.msg)
                navigation.navigate("/productScreen")
                showToastmsg("Product Deleted Succesfully")
            } else {
                showToastmsg("Something went wrong.Please try again")
            }
        })
            .catch((error) => {
                showToastmsg("Something went wrong.Please try again")
            })

    }

    const Editproduct = () => {
        navigation.navigate('/Product-edit', { getProductEdit: props?.route?.params?.products })
        console.log("edit")
    }
  

 return (
        <View style={globatStyles.wrapper}>
            {console.log("this is products details", props?.route?.params?.products)}
            <ImageBackground source={{ uri: imageUrl }} style={styles.nature}>
                <StatusBar translucent={true} backgroundColor='transparent' />
                <CustomAppBar navigation={props.navigation} isMainscreen={false} isReel={true} headerRight={false} title={props?.route?.params?.products?.item?.product_name} />
                <View style={globatStyles.overlay}></View>
                <View style={{ alignItems: 'flex-end', marginRight: '4%' }}>
                    <Feather name='edit-2' size={26} color={'white'} style={{ marginTop: "5%" }} onPress={Editproduct} />
                    <MaterialIcons name='delete-outline' size={26} color={'white'} style={{ marginTop: "5%" }} onPress={() => Deleteproduct()} />
                    <MaterialCommunityIcons name='file-multiple-outline' size={26} color={'white'} style={{ marginTop: "5%" }} />
                </View>
                <View style={styles.productDetailsContainer}>

                    <LinearGradient style={styles.productInfoContainer} colors={['#FFFFFF', '#A4A4B2']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                        <ScrollView>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.productName}>{props?.route?.params?.products?.item?.product_name}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flexDirection: 'row', }}>
                                        <View style={parseInt(props?.route?.params?.products?.item?.qty) >= parseInt(props?.route?.params?.products?.item?.warning_qty) ? styles.inStockOuter : styles.outOfStockOuter}>
                                            <View style={parseInt(props?.route?.params?.products?.item?.qty) >= parseInt(props?.route?.params?.products?.item?.warning_qty) ? styles.inStockInner : styles.outOfStockInner}></View>
                                        </View>
                                        <Text style={styles.productName}>{parseInt(props?.route?.params?.products?.item?.qty) >= parseInt(props?.route?.params?.products?.item?.warning_qty) ? `In` : `Out of`} Stock</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.divider}></View>
                            <View style={{ marginLeft: 4 }} >
                                <View style={styles.lavelAndValue}>
                                    <Text style={styles.lavel}>Color: </Text>
                                    <Text style={styles.value}>{props?.route?.params?.products?.item.color_id}</Text>
                                </View>
                                <View style={styles.lavelAndValue}>
                                    <Text style={styles.lavel}>Unit Price: </Text>
                                    <FontAwesome5Icon name='rupee' style={styles.rupeeIcon} /><Text style={styles.value}>{props?.route?.params?.products?.item?.unit_price}</Text>
                                </View>
                                <View style={styles.lavelAndValue}>
                                    <Text style={styles.lavel}>Qty: </Text>
                                    <Text style={styles.value}>{props?.route?.params?.products?.item.qty}</Text>
                                </View>


                            </View>
                            <View style={{ position: 'absolute', right: 15, marginTop: '15%' }}>
                                <View style={styles.lavelAndValue}>
                                    <Text style={styles.lavel}>Size: </Text>
                                    <Text style={styles.value}>
                                        {props?.route?.params?.products?.item?.size_id}
                                    </Text>
                                </View>
                                <View style={styles.lavelAndValue}>
                                    <Text style={styles.lavel}>Selling Price: </Text>
                                    <FontAwesome5Icon name='rupee' style={styles.rupeeIcon} /><Text style={styles.value}>{props?.route?.params?.products?.item?.sales_price}</Text>
                                </View>
                                <View style={styles.lavelAndValue}>
                                    <Text style={styles.lavel}>Available Qty: </Text>
                                    <Text style={styles.value}>{props?.route?.params?.products?.item?.minimum_qty}</Text>
                                </View>
                            </View>
                            <View style={styles.divider}></View>
                            <View>
                                <Text style={{ fontFamily: Constants.fontFamily, fontSize: 16, }}>
                                    {props?.route?.params?.products?.item?.product_description}
                                </Text>
                                <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                                    <Text>Tags: </Text>
                                    <Text>#{props?.route?.params?.products?.item?.product_tags}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                                    <LinearGradient style={styles.productInfoContainer} colors={['#FFFFFF', '#A4A4B2']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                        <Text style={{ color: '#04751F', fontWeight: '700' }}>{props?.route?.params?.products?.item?.product_category}</Text>
                                    </LinearGradient>
                                </View>

                            </View>
                        </ScrollView>
                    </LinearGradient>

                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    nature: {
        flex: 1
    },
    productDetailsContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        padding: Constants.padding,
        bottom: 20,
    },
    productInfoContainer: {
        padding: Constants.padding,
        borderRadius: 8,
        opacity: 0.7,
    },
    tags: {
        fontFamily: Constants.fontFamily,
        marginRight: 12,
        fontWeight: '700',
    },
    productName: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        fontSize: 16,
        textTransform: 'capitalize',
        lineHeight: 37,
    },
    lavelAndValue: {
        flexDirection: 'row',
        marginTop: 5,
    },
    lavel: {
        fontFamily: Constants.fontFamily,
    },
    value: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        textTransform: 'capitalize'
    },
    divider: {
        height: 2,
        width: "100%",
        backgroundColor: '#979797',
        marginRight: 2,
        marginBottom: 3,
        marginTop: 5,
    },
    inStockOuter: {
        width: 42,
        height: 22,
        borderRadius: 20,
        backgroundColor: Constants.colors.primaryColor,
        marginTop: 2,
        marginRight: 6,
    },
    inStockInner: {
        width: 18,
        height: 18,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: 18,
        position: 'absolute',
        top: 2,
        right: 2,
    },
    outOfStockOuter: {
        width: 42,
        height: 22,
        borderRadius: 20,
        marginTop: 2,
        backgroundColor: Constants.colors.inputBgColor,
    },
    outOfStockInner: {
        width: 18,
        height: 18,
        backgroundColor: Constants.colors.whiteColor,
        borderWidth: 1,
        borderColor: Constants.colors.bodyBg,
        borderRadius: 18,
        position: 'absolute',
        top: 2,
        left: 2,
    },
})

export default Businessproductpreview
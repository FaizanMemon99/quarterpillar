import React, { useState } from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    Pressable,
    TextInput,
} from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import { launchCamera } from 'react-native-image-picker'
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/business/CustomAppBar'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import AntDesign from 'react-native-vector-icons/AntDesign'

const AddProduct=({navigation})=>{
    const [cameraImg, setCameraImg]= useState(null)
    const [isRefundable, setIsrefundalbe]=useState(true)
    const [cod, setCod]=useState(true)
    const productUnits = ['CM', 'IN', 'GM']
    const productType = ['Type A', 'Type B', 'Type C']
    const productColors = ['Red', 'Green', 'Blue', 'White', 'Black']
    const vatType = ['12%', '18%', '27%']
    const openCamera = async ()=>{
		try{
			const result = await launchCamera()
			setCameraImg(result.assets[0].uri)
		}
        catch(err){
			console.log(err)
		}
    }
    const removeImg = ()=>{
        setCameraImg(null)
    }
    const gotoProducts = ()=>{
        navigation.navigate('/product-overview')
    }
    return (
        <View style={styles.wrapper}>
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Add Product' />
            <ScrollView style={styles.container}>
                <Text style={styles.normalText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
                <Text style={styles.heading}>Product images/videos</Text>
                {
                    cameraImg?(
                                <View style={styles.cameraContainer}>
                                    <Image source={{uri: cameraImg}} alt='Img' style={styles.userInfoLogo} />
                                    <Pressable onPress={removeImg} style={styles.removeImg}><Text style={styles.removeIcon}>X</Text></Pressable>
                                </View>
                            ):(
                                <Pressable style={styles.cameraContainer} onPress={openCamera}>
                                    <Image source={Images.cameraIcon} alt='Img' />
                                    <Text style={styles.addCameraText}>Add</Text>
                                </Pressable>
                            )
                }
                <TextInput style={globatStyles.inputText} placeholder='Product Video URL' />
                <Text style={styles.sectionHeading}>Basic Information</Text>
                <TextInput style={globatStyles.inputText} placeholder='Product Name' />
                <TextInput style={globatStyles.inputText} placeholder='Brand' />
                <TextInput style={globatStyles.inputText} placeholder='Brand' />
                <SelectDropdown
                    data={productUnits}
                    defaultButtonText='Select Unit'
                    buttonStyle={globatStyles.dropDownBox}
                    buttonTextStyle={globatStyles.dropdownTextStyle}
                    rowTextStyle={globatStyles.dropDownListStyle}
                    renderDropdownIcon={()=><AntDesign name='down' />}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                }} />
                <TextInput style={globatStyles.inputText} placeholder='Minimum Qty' />
                <TextInput style={globatStyles.inputText} placeholder='Tags' />
                <View style={styles.isStockCodContainer}>
                    <Pressable style={styles.codContainer} onPress={()=>setIsrefundalbe(!isRefundable)}>
                        <View style={isRefundable?styles.inStockOuter:styles.outOfStockOuter}>
                            <View style={isRefundable?styles.inStockInner:styles.outOfStockInner}></View>
                        </View>
                        <Text style={styles.inStockText}>Refundable</Text>
                    </Pressable>
                    <Pressable style={[styles.codContainer, {marginStart: Constants.margin+16}]} onPress={()=>setCod(!cod)}>
                        <View style={cod?styles.inStockOuter:styles.outOfStockOuter}>
                            <View style={cod?styles.inStockInner:styles.outOfStockInner}></View>
                        </View>
                        <Text style={styles.inStockText}>COD</Text>
                    </Pressable>
                </View>
                <TextInput
                    multiline={true}
                    numberOfLines={4}
                    placeholder='Product Description'
                    style={globatStyles.inputText}/>
                <TextInput style={globatStyles.inputText} placeholder='Unit Price' />
                <TextInput style={globatStyles.inputText} placeholder='Selling Price' />
                <TextInput style={globatStyles.inputText} placeholder='Discount' />
                <SelectDropdown
                    data={productType}
                    defaultButtonText='Product Type'
                    buttonStyle={globatStyles.dropDownBox}
                    buttonTextStyle={globatStyles.dropdownTextStyle}
                    rowTextStyle={globatStyles.dropDownListStyle}
                    renderDropdownIcon={()=><AntDesign name='down' />}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                }} />
                <Text style={styles.sectionHeading}>Product Variation</Text>
                <SelectDropdown
                    data={productColors}
                    defaultButtonText='Colors'
                    buttonStyle={globatStyles.dropDownBox}
                    buttonTextStyle={globatStyles.dropdownTextStyle}
                    rowTextStyle={globatStyles.dropDownListStyle}
                    renderDropdownIcon={()=><AntDesign name='down' />}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                }} />
                <TextInput style={globatStyles.inputText} placeholder='Size' />
                <SelectDropdown
                    data={productUnits}
                    defaultButtonText='Units'
                    buttonStyle={globatStyles.dropDownBox}
                    buttonTextStyle={globatStyles.dropdownTextStyle}
                    rowTextStyle={globatStyles.dropDownListStyle}
                    renderDropdownIcon={()=><AntDesign name='down' />}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                }} />
                <TextInput style={globatStyles.inputText} placeholder='Quantity' />
                <Text style={styles.sectionHeading}>Low stock quantity warning</Text>
                <TextInput style={globatStyles.inputText} placeholder='Quantity' />
                <Text style={styles.sectionHeading}>VAT & TAX</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TextInput style={[globatStyles.inputText, {width: '48%',}]} placeholder='Tax' />
                    <SelectDropdown
                        data={vatType}
                        defaultButtonText='Select Type'
                        buttonStyle={styles.dropDownBox}
                        buttonTextStyle={globatStyles.dropdownTextStyle}
                        rowTextStyle={globatStyles.dropDownListStyle}
                        renderDropdownIcon={()=><AntDesign name='down' />}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                    }} />
                </View>
                <Text style={styles.sectionHeading}>Shipping Details</Text>
                <SelectDropdown
                    data={productUnits}
                    defaultButtonText='Service Company'
                    buttonStyle={globatStyles.dropDownBox}
                    buttonTextStyle={globatStyles.dropdownTextStyle}
                    rowTextStyle={globatStyles.dropDownListStyle}
                    renderDropdownIcon={()=><AntDesign name='down' />}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                }} />
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <SelectDropdown
                        data={vatType}
                        defaultButtonText='Delivery Type'
                        buttonStyle={styles.dropDownBox}
                        buttonTextStyle={globatStyles.dropdownTextStyle}
                        rowTextStyle={globatStyles.dropDownListStyle}
                        renderDropdownIcon={()=><AntDesign name='down' />}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                    }} />
                    <TextInput style={[globatStyles.inputText, {width: '48%',}]} placeholder='Pin Code' />
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable style={[globatStyles.button, styles.btnOutline]}><Text style={[globatStyles.btnText, {color: Constants.colors.primaryColor,}]}>PREVIEW</Text></Pressable>
                    <Pressable onPress={gotoProducts} style={[globatStyles.button, , {width: '48%'}]}><Text style={globatStyles.btnText}>ADD </Text></Pressable>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        padding: Constants.padding,
        flex: 1,
    },
    normalText: {
        fontFamily: Constants.fontFamily,
    },
    heading: {
        fontFamily: Constants.fontFamily,
        fontSize: 18,
        fontWeight: '700',
        marginTop: Constants.margin, 
    },
    cameraContainer: {
        marginTop: Constants.margin,
        marginBottom: 12,
        width: 90,
        height: 90,
        backgroundColor: Constants.colors.inputBgColor,
        borderWidth: 0.7,
        borderColor: '#D2D2D2',
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Constants.borderRadius,
    },
    cameraImgContainer: {
        marginTop: Constants.margin,
        marginBottom: 12,
        width: 90,
        height: 90,
        backgroundColor: Constants.colors.inputBgColor,
        borderWidth: 0.7,
        borderColor: '#D2D2D2',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Constants.borderRadius,
    },
    removeImg: {
        position: 'absolute',
        left: 80,
        top: 10,
        width: 25,
        height: 25,
        borderRadius: 25,
        backgroundColor: Constants.colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Constants.colors.whiteColor,
    },
    removeIcon: {
        fontSize: 16,
        color: Constants.colors.inputBgColor,
    },
    addCameraText: {
        marginTop: 10,
        color: '#007635',
        fontWeight: '700'
    },
    sectionHeading: {
        paddingTop: Constants.padding+8,
        paddingBottom: Constants.padding,
        fontFamily: Constants.fontFamily,
        fontSize: 16,
        fontWeight: '700',
    },
    inStockText: {
        fontFamily: Constants.fontFamily,
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 12,
    },
    inStockOuter: {
        width: 42,
        height: 22,
        borderRadius: 20,
        backgroundColor: Constants.colors.primaryColor,
        marginTop: 2,
    },
    outOfStockOuter: {
        width: 42,
        height: 22,
        borderRadius: 20,
        marginTop: 2,
        backgroundColor: Constants.colors.inputBgColor,
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
    isStockCodContainer: {
        flexDirection: 'row',
        marginBottom: Constants.margin,
    },
    codContainer: {
        flexDirection: 'row',
    },
    dropDownBox: {
        width: '48%',
        backgroundColor: Constants.colors.inputBgColor,
        borderRadius: 5,
        marginBottom: Constants.margin,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 26,
    },
    btnOutline: {
        width: '48%',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Constants.colors.primaryColor,
    },
})

export default AddProduct
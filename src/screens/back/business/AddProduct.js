import React, { useState } from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    Pressable,
    TextInput,
    Modal,
    ActivityIndicator,
} from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/business/CustomAppBar'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ImagePicker, { cleanSingle } from 'react-native-image-crop-picker';
import Feather from 'react-native-vector-icons/Feather'
import showToastmsg from '../../../shared/showToastmsg'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

const AddProduct=(props)=>{
    const navigation=useNavigation()
    const [cameraImg, setCameraImg]= useState([])
    const [isRefundable, setIsrefundalbe]=useState(true)
    const [cod, setCod]=useState(true)
    const [productVideoUrl,setproductVideoUrl]=useState()
    const [productName,setproductName]=useState()
    const [productBrand,setproductBrand]=useState()
    const [productUnit,setproductUnit]=useState()
    const [minimumQuantity,setminimumQuantity]=useState()
    const [productTags,setproductTags]=useState()
    const [productDescription,setproductDescription]=useState()
    const [productUnitPrice,setproductUnitPrice]=useState()
    const [productSellingPrice,setproductSellingPrice]=useState()
    const [productDiscount,setproductDiscount]=useState()
    const [productType,setproductType]=useState()
    const [productColor,setproductColor]=useState()
    const [productSize,setproductSize]=useState()
    const [productVUnits,setproductVUnits]=useState()
    const [productQuantity,setproductQuantity]=useState()
    const [productLowStock,setproductLowStock]=useState()
    const [productTax,setproductTax]=useState()
    const [productTaxType,setproductTaxType]=useState()
    const [productCompany,setproductCompany]=useState()
    const [productDeliveryType,setproductDeliveryType]=useState()
    const [productPincode,setproductPincode]=useState()
    const [buttonLoader,setbuttonLoader]=useState(false)
    const productUnits = ['CM', 'IN', 'GM']
    const productTypes = ['Type A', 'Type B', 'Type C']
    const productColors = ['Red', 'Green', 'Blue', 'White', 'Black']
    const vatType = ['gst', 'sgst', 'igst']
    const deliveryTypes=['cod','online']
    const openCamera = async ()=>{
		try{
			const result = await launchCamera()
            console.log("images",result.assets[0])

			cameraImg.push(result.assets[0])
            setCameraImg([...cameraImg])
		}
        catch(err){
			console.log("err")
		}
    }
    const removeImg = (ind)=>{
        cameraImg.splice(ind,1)
        setCameraImg([...cameraImg])
    }
    const productUrlRegex=/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    const gotoProducts = ()=>{
        if(!cameraImg.length>0){
            showToastmsg('Please add atleast one product image')
        }
        else if(productVideoUrl==''||productVideoUrl==null){
            showToastmsg('Please add product video url')
        }
        else if(!productUrlRegex.test(productVideoUrl)){
            showToastmsg('Please enter valid product video url')
        }
        else if(productName==''||productName==null){
            showToastmsg('Please add product name')
        }
        else if(productBrand==''||productBrand==null){
            showToastmsg('Please add product brand')
        }
        else if(productUnit==''||productUnit==null){
            showToastmsg('Please select product unit')
        }
        else if(minimumQuantity==''||minimumQuantity==null){
            showToastmsg('Please add product minimum quantity')
        }
        else if(productTags==''||productTags==null){
            showToastmsg('Please add product tags')
        }
        else if(productDescription==''||productDescription==null){
            showToastmsg('Please add product description')
        }
        else if(productUnitPrice==''||productUnitPrice==null){
            showToastmsg('Please add product unit price')
        }
        else if(productSellingPrice==''||productSellingPrice==null){
            showToastmsg('Please add product selling price')
        }
        else if(productDiscount==''||productDiscount==null){
            showToastmsg('Please add product discount')
        }
        else if(productType==''||productType==null){
            showToastmsg('Please select product type')
        }
        else if(productColor==''||productColor==null){
            showToastmsg('Please select product color')
        }
        else if(productSize==''||productSize==null){
            showToastmsg('Please add product size')
        }
        else if(productVUnits==''||productVUnits==null){
            showToastmsg('Please select product units')
        }
        else if(productQuantity==''||productQuantity==null){
            showToastmsg('Please add product quantity')
        }
        else if(productLowStock==''||productLowStock==null){
            showToastmsg('Please add product low stock quantity')
        }
        else if(productTax==''||productTax==null){
            showToastmsg('Please add product tax')
        }
        else if(productTaxType==''||productTaxType==null){
            showToastmsg('Please select product tax type')
        }
        else if(productCompany==''||productCompany==null){
            showToastmsg('Please select product service company')
        }
        else if(productDeliveryType==''||productDeliveryType==null){
            showToastmsg('Please select product delivery type')
        }
        else if(productPincode==''||productPincode==null){
            showToastmsg('Please add pincode')
        }
        else 
        { 
            const headers = {
                'x-device-id': 'stuff',
                'Content-Type': 'multipart/form-data',
              }
            var formdata = new FormData();
            for(let i=0;i<cameraImg.length;i++ ){    
                formdata.append('product_image[]', { uri: cameraImg[i].uri, name: cameraImg[i].fileName, type:cameraImg[i].type });
              }
            formdata.append("product_category",props?.route?.params?.userDetails?.business?.catorige)
            formdata.append("product_video_url",productVideoUrl)
            formdata.append("product_name",productName)
            formdata.append("product_brand",productBrand)
            formdata.append("unit_id",productUnit)
            formdata.append("minimum_qty",minimumQuantity)
            formdata.append("product_tags",productTags)
            formdata.append("is_refundable",isRefundable)
            formdata.append("is_cod",cod)
            formdata.append("product_description",productDescription)
            formdata.append("unit_price",productUnitPrice)
            formdata.append("sales_price",productSellingPrice)
            formdata.append("dicount",productDiscount)
            formdata.append("product_type",productType)
            formdata.append("colors",productColor)
            formdata.append("sizes",productSize)
            formdata.append("units",productVUnits)
            formdata.append("qty",productQuantity)
            formdata.append("warning_qty",productLowStock)
            formdata.append("product_tax",productTax)
            formdata.append("tax_type",productTaxType)
            formdata.append("service_company",productCompany)
            formdata.append("delivery_type",productDeliveryType)
            formdata.append("pin_code",productPincode)
            formdata.append("business_id",props?.route?.params?.userDetails?.business?.business_id)
            setbuttonLoader(true)
            console.log("form data object",formdata._parts[0])
          
            axios.post(`${Constants.BASE_URL}business/add-product`,formdata,{
                headers: headers
              }).then((res)=>{
                if(res.status==200){
                    navigation.navigate('/productScreen',{userDetails:props?.route?.params?.userDetails})
                    setbuttonLoader(false)
                }
                else {
                    setbuttonLoader(false)
                    console.log("data1",res.data)
                    showToastmsg(res.data.msg)
                }
                
            }).catch((err)=>{
                setbuttonLoader(false)
                console.log("product regsitration",err.response)
            })
            
        }
    }
    const choosePhotoFromLibrary = async ()=>{
		try{
			const result = await launchImageLibrary()
console.log("folder image",result.assets[0]);
			cameraImg.push(result.assets[0])
            setCameraImg([...cameraImg])
		}
        catch(err){
			console.log("err")
		}
    }
    
     
    return (
        <View style={styles.wrapper}>
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Add Product' />
            <ScrollView style={styles.container}>
         
                <Text style={styles.normalText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
                <Text style={styles.heading}>Product images</Text>
                {
                    cameraImg?.length>0?(
                        <>
                        
                        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap',padding: Constants.padding,}}>
                            
                        {cameraImg.map((item,index)=>
                                <View style={styles.cameraContainer}>
                                    <Image source={{uri: item.uri}} alt='Img' style={{
                    width: '100%',
                    height: 100,
                    resizeMode: 'contain',
                    margin: 5,marginBottom:20
                  }}  />
                         <Pressable onPress={()=>removeImg(index)} style={styles.removeImg}><Text style={styles.removeIcon}>X</Text></Pressable>
                                </View>
                        )}
                        </View>
                        
                        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                                <Pressable style={styles.cameraContainer} onPress={openCamera}>
                                    <Image source={Images.cameraIcon} alt='Img' />
                                    <Text style={styles.addCameraText}>Add more</Text>
                                </Pressable>
                                 <Pressable style={styles.cameraContainer} onPress={choosePhotoFromLibrary}>
                                 <Feather name="folder-plus" style={{fontSize:20}}/>
                                 <Text style={styles.addCameraText}>Add more</Text>
                             </Pressable>
                             </View>
                        </>
                        
                            ):( <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                            <Pressable style={styles.cameraContainer} onPress={openCamera}>
                                <Image source={Images.cameraIcon} alt='Img' />
                                <Text style={styles.addCameraText}>Add</Text>
                            </Pressable>
                             <Pressable style={styles.cameraContainer} onPress={choosePhotoFromLibrary}>
                             <Feather name="folder-plus" />
                             <Text style={styles.addCameraText}>Add</Text>
                         </Pressable>
                         </View>
                            )
                }
                <TextInput style={globatStyles.inputText} onChangeText={text=>setproductVideoUrl(text)} placeholder='Product Video URL' />
                <Text style={styles.sectionHeading}>Basic Information</Text>
                <TextInput style={globatStyles.inputText} onChangeText={text=>setproductName(text)} placeholder='Product Name' />
                <TextInput style={globatStyles.inputText} onChangeText={text=>setproductBrand(text)} placeholder='Brand' />
                <SelectDropdown
                    data={productUnits}
                    defaultButtonText='Unit'
                    buttonStyle={globatStyles.dropDownBox}
                    buttonTextStyle={globatStyles.dropdownTextStyle}
                    rowTextStyle={globatStyles.dropDownListStyle}
                    renderDropdownIcon={()=><AntDesign name='down' />}
                    onSelect={(selectedItem, index) => {
                        setproductUnit(selectedItem)
                }} />
                <TextInput style={globatStyles.inputText} onChangeText={text=>setminimumQuantity(text)} placeholder='Minimum Qty' />
                <TextInput style={globatStyles.inputText} onChangeText={text=>setproductTags(text)} placeholder='Tags' />
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
                    onChangeText={text=>setproductDescription(text)}
                    style={globatStyles.inputText}/>
                <TextInput style={globatStyles.inputText} onChangeText={text=>setproductUnitPrice(text)} placeholder='Unit Price' />
                <TextInput style={globatStyles.inputText} onChangeText={text=>setproductSellingPrice(text)} placeholder='Selling Price' />
                <View style={{flex: 1, width: '100%',justifyContent:"center",position:"relative"}}>
                        <TextInput style={globatStyles.inputText} keyboardType={'number-pad'} placeholder='Discount' onChangeText={text=>setproductDiscount(text)} />
                        <FontAwesome name='percent' style={styles.eyeIcon}/>
                    </View>
                                    <SelectDropdown
                    data={productTypes}
                    defaultButtonText='Product Type'
                    buttonStyle={globatStyles.dropDownBox}
                    buttonTextStyle={globatStyles.dropdownTextStyle}
                    rowTextStyle={globatStyles.dropDownListStyle}
                    renderDropdownIcon={()=><AntDesign name='down' />}
                    onSelect={(selectedItem, index) => {
                        setproductType(selectedItem)
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
                        setproductColor(selectedItem)
                }} />
                <TextInput style={globatStyles.inputText} placeholder='Size' onChangeText={text=>setproductSize(text)}/>
                <SelectDropdown
                    data={productUnits}
                    defaultButtonText='Units'
                    buttonStyle={globatStyles.dropDownBox}
                    buttonTextStyle={globatStyles.dropdownTextStyle}
                    rowTextStyle={globatStyles.dropDownListStyle}
                    renderDropdownIcon={()=><AntDesign name='down' />}
                    onSelect={(selectedItem, index) => {
                        setproductVUnits(selectedItem)
                }} />
                <TextInput keyboardType={'number-pad'} style={globatStyles.inputText} onChangeText={text=>setproductQuantity(text)} placeholder='Quantity' />
                <Text style={styles.sectionHeading}>Low stock quantity warning</Text>
                <TextInput keyboardType='number-pad' onChangeText={text=>setproductLowStock(text)} style={globatStyles.inputText}  placeholder='Quantity' />
                <Text style={styles.sectionHeading}>VAT & TAX</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TextInput keyboardType='number-pad' style={[globatStyles.inputText, {width: '48%',}]} placeholder='Tax' onChangeText={text=>setproductTax(text)}/>
                    <SelectDropdown
                        data={vatType}
                        defaultButtonText='Select Type'
                        buttonStyle={styles.dropDownBox}
                        buttonTextStyle={globatStyles.dropdownTextStyle}
                        rowTextStyle={globatStyles.dropDownListStyle}
                        renderDropdownIcon={()=><AntDesign name='down' />}
                        onSelect={(selectedItem, index) => {
                            setproductTaxType(selectedItem)
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
                        setproductCompany(selectedItem)
                }} />
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <SelectDropdown
                        data={deliveryTypes}
                        defaultButtonText='Delivery Type'
                        buttonStyle={styles.dropDownBox}
                        buttonTextStyle={globatStyles.dropdownTextStyle}
                        rowTextStyle={globatStyles.dropDownListStyle}
                        renderDropdownIcon={()=><AntDesign name='down' />}
                        onSelect={(selectedItem, index) => {
                            setproductDeliveryType(selectedItem)
                    }} />
                    <TextInput style={[globatStyles.inputText, {width: '48%',}]} keyboardType={'number-pad'} onChangeText={text=>setproductPincode(text)} placeholder='Pin Code' />
                </View>
                {console.log("see-preview=>",props.route.params.userDetails)}
                <View style={styles.buttonContainer}>
                    <Pressable onPress={()=>navigation.navigate("/product-preview",{userDetails:props.route.params.userDetails})}
                     style={[globatStyles.button, styles.btnOutline]}><Text style={[globatStyles.btnText, {color: Constants.colors.primaryColor,}]}>PREVIEW</Text></Pressable>
                    <Pressable onPress={!buttonLoader&&gotoProducts} style={[globatStyles.button, , {width: '48%'}]}>{buttonLoader?<ActivityIndicator size={20} color={Constants.colors.whiteColor} />:<Text style={globatStyles.btnText}>ADD </Text>}</Pressable>
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
    },eyeIcon: {
        position: 'absolute',
        top: 20,
        right: 25,
        // color: '#999999',
        // fontSize: 24,
    },
})

export default AddProduct
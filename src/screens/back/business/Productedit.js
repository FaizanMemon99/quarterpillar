import React, { useEffect, useMemo, useState } from 'react'
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
    Alert,
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
import { MultiSelect } from 'react-native-element-dropdown'
const Productedit = ({ route }, props) => {

    const navigation = useNavigation()

    const [cameraImg, setCameraImg] = useState([]);
    console.log("this is camera img=>", cameraImg);
    const [StoredImage, SetStoredImage] = useState([])
    console.log("this is stored image ", StoredImage);
    // const [imageStored, setImageStored] = useState(JSON.parse(productData?.item?.product_image));
    // // setCameraImg(images);
    // console.log("this is images stored", imageStored);

    useEffect(() => {
        if (productData && productData.item) {
            const images = JSON.parse(productData.item.product_image);
            SetStoredImage(images);
            console.log("this is images", images);
        }
    }, [productData]);
    const productData = route.params.getProductEdit;
    console.log('this is products data from navigation=>', productData);
    const BusinessId = productData.item.business_id
    console.log("this is business id",BusinessId);

    // const images = productData.item.product_image
    // const images = JSON.parse(productData.item.product_image);
    // console.log("image checking with base url=>", images);
    const [productId, setProductId] = useState(productData.item.id)
    console.log("This is product Id=>", productId);
    const [productName, setproductName] = useState(productData.item.product_name)
    // console.log("this is product Name=>", productName);
    const [productVideoUrl, setproductVideoUrl] = useState(productData.item.product_video_url)
    console.log("this is video url=>", productVideoUrl);
    const [productBrand, setproductBrand] = useState(productData.item.product_brand)
    // console.log("brand=>", productBrand);
    const [productUnit, setproductUnit] = useState(productData.item.unit_id)
    // console.log("productUnit =>", productUnit);
    const [minimumQuantity, setminimumQuantity] = useState(productData.item.minimum_qty)
    // console.log("minimumQuantity =>", minimumQuantity);
    const [productTags, setproductTags] = useState(productData.item.product_tags)
    // console.log("productTags =>", productTags);
    const [isRefundable, setIsrefundalbe] = useState(productData.item.is_refundable)
    // console.log("checking isRefundable=>", isRefundable);
    const [cod, setCod] = useState(productData.item.is_cod)
    // console.log("checking cod=>", cod);
    const [productDescription, setproductDescription] = useState(productData.item.product_description)
    // console.log("productDescription =>", productDescription);
    const [productUnitPrice, setproductUnitPrice] = useState(productData.item.unit_price)
    // console.log("productUnitPrice =>", productUnitPrice);
    const [productSellingPrice, setproductSellingPrice] = useState(productData.item.sales_price)
    // console.log("productSellingPrice =>", productSellingPrice);
    const [productDiscount, setproductDiscount] = useState(productData.item.dicount)
    // console.log("productDiscount =>", productDiscount);
    const [productType, setproductType] = useState(productData.item.product_type)
    // console.log("productType =>", productType);





    const [productSize, setproductSize] = useState(productData.item.size_id)
    // console.log("productSize =>", productSize);
    const [productVUnits, setproductVUnits] = useState(productData.item.units_id)
    // console.log("productVUnits =>", productVUnits);
    const [productQuantity, setproductQuantity] = useState(productData.item.qty)
    // console.log("productQuantity =>", productQuantity);
    const [productLowStock, setproductLowStock] = useState(productData.item.warning_qty)
    // console.log("productLowStock =>", productLowStock);
    const [productTax, setproductTax] = useState(productData.item.product_tax)
    // console.log("productTax =>", productTax);
    const [productTaxType, setproductTaxType] = useState(productData.item.tax_type)
    // console.log("productTaxType =>", productTaxType);
    const [productCompany, setproductCompany] = useState(productData.item.service_company)
    // console.log("productCompany =>", productCompany);
    // const productDeliveryType = 1
    const [productDeliveryType, setproductDeliveryType] = useState(productData.item.delivery_type_id)
    // console.log("productDeliveryType =>", productDeliveryType);
    const [productPincode, setproductPincode] = useState(productData.item.pin_code)
    // console.log("productPincode =>", productPincode);
    const [buttonLoader, setbuttonLoader] = useState(false)
    // console.log("buttonLoader =>", buttonLoader);

    const productUnits = ['CM', 'IN', 'GM']
    const productTypes = ['Type A', 'Type B', 'Type C']
    // const productColors = ['Red', 'Green', 'Blue', 'White', 'Black']
    const vatType = ['gst', 'sgst', 'igst']
    // const deliveryTypes = ['cod', 'online']
    const deliveryTypes = ['cod', 1]

    const productUrlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    const gotoProducts = () => {
        const Console = () => {
            console.log("product Nmae", productName);
            // console.log("this is video url=>", productVideoUrl);
            console.log("Camera image", cameraImg);
            console.log("brand=>", productBrand);

            console.log("productUnit =>", productUnit);

            console.log("minimumQuantity =>", minimumQuantity);

            console.log("productTags =>", productTags);

            console.log("checking isRefundable=>", isRefundable);

            console.log("checking cod=>", cod);

            console.log("productDescription =>", productDescription);

            console.log("productUnitPrice =>", productUnitPrice);

            console.log("productSellingPrice =>", productSellingPrice);

            console.log("productDiscount =>", productDiscount);

            console.log("productType =>", productType);

            console.log("productSize =>", productSize);

            console.log("productVUnits =>", productVUnits);

            console.log("productQuantity =>", productQuantity);

            console.log("productLowStock =>", productLowStock);

            console.log("productTax =>", productTax);

            console.log("productTaxType =>", productTaxType);

            console.log("productCompany =>", productCompany);

            console.log("productDeliveryType =>", productDeliveryType);

            console.log("productPincode =>", productPincode);

            console.log("buttonLoader =>", buttonLoader);
        }
        if (!cameraImg.length > 0) {
            showToastmsg('Please add atleast one product image')
        }

        else if (productVideoUrl == '' || productVideoUrl == null) {
            showToastmsg('Please add product video url')
        }
        else if (!productUrlRegex.test(productVideoUrl)) {
            showToastmsg('Please enter valid product video url')
        }
        if (productName == '' || productName == null) {
            showToastmsg('Please add product name')
        }
        else if (productBrand == '' || productBrand == null) {
            showToastmsg('Please add product brand')
        }
        else if (productUnit == '' || productUnit == null) {
            showToastmsg('Please select product unit')
        }
        else if (minimumQuantity == '' || minimumQuantity == null) {
            showToastmsg('Please add product minimum quantity')
        }
        else if (productTags == '' || productTags == null) {
            showToastmsg('Please add product tags')
        }
        else if (productDescription == '' || productDescription == null) {
            showToastmsg('Please add product description')
        }
        else if (productUnitPrice == '' || productUnitPrice == null) {
            showToastmsg('Please add product unit price')
        }
        else if (productSellingPrice == '' || productSellingPrice == null) {
            showToastmsg('Please add product selling price')
        }
        else if (productDiscount == '' || productDiscount == null) {
            showToastmsg('Please add product discount')
        }
        else if (productType == '' || productType == null) {
            showToastmsg('Please select product type')
        }
        else if (colorsString == '' || colorsString == null) {
            showToastmsg('Please select product color')
        }
        else if (productSize == '' || productSize == null) {
            showToastmsg('Please add product size')
        }
        else if (productVUnits == '' || productVUnits == null) {
            showToastmsg('Please select product units')
        }
        else if (productQuantity == '' || productQuantity == null) {
            showToastmsg('Please add product quantity')
        }
        else if (productLowStock == '' || productLowStock == null) {
            showToastmsg('Please add product low stock quantity')
        }
        else if (productTax == '' || productTax == null) {
            showToastmsg('Please add product tax')
        }
        else if (productTaxType == '' || productTaxType == null) {
            showToastmsg('Please select product tax type')
        }
        else if (productCompany == '' || productCompany == null) {
            showToastmsg('Please select product service company')
        }
        else if (productDeliveryType == '' || productDeliveryType == null) {
            showToastmsg('Please select product delivery type')
        }
        else if (productPincode == '' || productPincode == null) {
            showToastmsg('Please add pincode')
        }
        else {
            const headers = {
                'x-device-id': 'stuff',
                'Content-Type': 'multipart/form-data',
            }
            var formdata = new FormData();
            for (let i = 0; i < cameraImg.length; i++) {
                formdata.append('product_image[]', { uri: cameraImg[i].uri, name: cameraImg[i].fileName, type: cameraImg[i].type });
            }
            // if (productData && productData.item) {
            //     const images = JSON.parse(productData.item.product_image);
            //     for (let i = 0; i < images.length; i++) {
            //         formdata.append('product_image[]', { uri: images[i].uri, name: images[i].fileName, type: images[i].type });
            //     }
            // }
            for (let i = 0; i < StoredImage.length; i++) {
                formdata.append(`Old_product_image[${i}]`,StoredImage[i]);
            }
            // formdata.append('Old_product_image[]', StoredImage);
            // formdata.append("product_category", props?.route?.params?.userDetails?.business?.catorige)
            formdata.append("product_id", productId)
            formdata.append("product_category", checkingCategorytwo)
            formdata.append("product_video_url", productVideoUrl)
            formdata.append("product_name", productName)
            formdata.append("product_brand", productBrand)
            formdata.append("unit_id", productUnit)
            formdata.append("minimum_qty", minimumQuantity)
            formdata.append("product_tags", productTags)
            formdata.append("is_refundable", isRefundable)
            formdata.append("is_cod", cod)
            formdata.append("product_description", productDescription)
            formdata.append("unit_price", productUnitPrice)
            formdata.append("sales_price", productSellingPrice)
            formdata.append("dicount", productDiscount)
            formdata.append("product_type", productType)
            formdata.append("color_id", colorsString)
            formdata.append("size_id", productSize)
            formdata.append("units_id", productVUnits)
            formdata.append("qty", productQuantity)
            formdata.append("warning_qty", productLowStock)
            formdata.append("product_tax", productTax)
            formdata.append("tax_type", productTaxType)
            formdata.append("service_company", productCompany)
            formdata.append("delivery_type_id", productDeliveryType)
            formdata.append("pin_code", productPincode)
            formdata.append("business_id", BusinessId)
            setbuttonLoader(true)
            console.log("form data object", formdata._parts[0])

            axios.post(`${Constants.BASE_URL}business/Update/Product`, formdata, {
                headers: headers
            }).then((res) => {
                if (res.status == 200) {
                    // navigation.navigate('/productScreen', { userDetails: props?.route?.params?.userDetails })
                    Alert.alert("product Updated")
                    setbuttonLoader(false)
                }
                else {
                    setbuttonLoader(false)
                    Alert.alert("error in product Updated")
                    console.log("data1", res.data)
                    showToastmsg(res.data.msg)
                }

            }).catch((err) => {
                setbuttonLoader(false)
                console.log("product regsitration", err.response)
            })

        }
    }
    const choosePhotoFromLibrary = async () => {
        try {
            const result = await launchImageLibrary()
            console.log("folder image", result.assets[0]);
            cameraImg.push(result.assets[0])
            setCameraImg([...cameraImg])
        }
        catch (err) {
            console.log("err")
        }
    }

    // hbdaskjhfhjkashdfjkahdjkfshakjsdhfjkahsdfkjhasdkfhkasdhfklahsdjkfhaklsdhfkjahsdfkjhakjsldhfjkahdfskjlahkjdlfhjkasdhfkjafdjskklja
    // by mujtaba
    // const checkingCategory = props?.route?.params?.userDetails?.business?.catorige
    const checkingCategorytwo = "56223"
    // console.log("category=>",checkingCategory);
    console.log("category two =>", checkingCategorytwo);
    const productColors = [
        { id: 1, name: 'Red' },
        { id: 2, name: 'Green' },
        { id: 3, name: 'Blue' },
        { id: 4, name: 'White' },
        { id: 5, name: 'Black' }
    ];
    const selectedColors = productData.item.color_id;
    const selectedColorArray = selectedColors.split(",");
    const [selectedItem, setSelectedItem] = useState(selectedColorArray);
    console.log("selectedItem =>", selectedItem);
    const [colorsString, setColorsString] = useState('');
    useEffect(() => {
        setColorsString(selectedItem.join(','));
    }, [selectedItem]);
    console.log("Color String", colorsString); // "red, blue"
    let selectedText = "";
    // console.log("this is seleceted text",selectedText);
    if (Array.isArray(selectedItem) && selectedItem.length > 0) {
        selectedText = selectedItem.map(id => {
            return id;
        });
    }
    const [productColor, setproductColor] = useState(productData.item.color_id)
    // const [productColor, setproductColor] = useState([{ name: productData.item.color_id }]);
    console.log("productColor =>", productColor);

    const colorChecker = productData.item.color_id;
    console.log("this is color checker", colorChecker);
    const [colorCheckerArray, setcolorCheckerArray] = useState(colorChecker.replace(/^"|"$/g, '').split('", "'))
    // const colorCheckerArray = colorChecker.replace(/^"|"$/g, '').split('", "');
    const productColorsData = colorCheckerArray.map((name, index) => ({
        id: index + 1,
        name
    }));
    console.log("this is color checker array", colorCheckerArray);

    const openCamera = async () => {
        try {
            const result = await launchCamera()
            console.log("images", result.assets[0])

            cameraImg.push(result.assets[0])
            setCameraImg([...cameraImg])
        }
        catch (err) {
            console.log("err")
        }
    }
    const removeImg = (ind) => {
        cameraImg.splice(ind, 1)
        setCameraImg([...cameraImg])
    }
    const removeStoreImg = (ind) => {
        StoredImage.splice(ind, 1)
        SetStoredImage([...StoredImage])
    }



    return (
        <View style={styles.wrapper}>
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Edit Product' />
            <ScrollView style={styles.container}>

                <Text style={styles.normalText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
                <Text style={styles.heading}>Product images</Text>

                {/* <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', padding: Constants.padding, }}>
                    {images.map((image, index) => (
                        <View key={index} style={styles.cameraContainer}>
                            <Image
                                source={{ uri: `${Constants.BASE_IMAGE_URL}${image}` }}
                                alt="Img"
                                style={{
                                    width: "100%",
                                    height: 100,
                                    resizeMode: "contain",
                                    margin: 5,
                                    marginBottom: 20,
                                }}
                            />
                            <Pressable onPress={() => removeImg(index)} style={styles.removeImg}><Text style={styles.removeIcon}>X</Text>
                            </Pressable>
                        </View>
                    ))}
                </View> */}
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', padding: Constants.padding, }}>
                    {StoredImage.map((item, index) =>
                        <View style={styles.cameraContainer}>
                            <Image source={{ uri: typeof item === 'object' ? item.uri : `${Constants.BASE_IMAGE_URL}${item}` }} alt='Img' style={{
                                width: '100%',
                                height: 100,
                                resizeMode: 'contain',
                                margin: 5, marginBottom: 20
                            }} />
                            <Pressable onPress={() => removeStoreImg(index)} style={styles.removeImg}><Text style={styles.removeIcon}>X</Text></Pressable>
                        </View>
                    )}
                </View>
                {
                    cameraImg?.length > 0 ? (
                        <>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', padding: Constants.padding, }}>

                                {cameraImg.map((item, index) =>
                                    <View style={styles.cameraContainer}>
                                        <Image source={{ uri: typeof item === 'object' ? item.uri : `${Constants.BASE_IMAGE_URL}${item}` }} alt='Img' style={{
                                            width: '100%',
                                            height: 100,
                                            resizeMode: 'contain',
                                            margin: 5, marginBottom: 20
                                        }} />
                                        <Pressable onPress={() => removeImg(index)} style={styles.removeImg}><Text style={styles.removeIcon}>X</Text></Pressable>
                                    </View>
                                )}
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                <Pressable style={styles.cameraContainer} onPress={openCamera}>
                                    <Image source={Images.cameraIcon} alt='Img' />
                                    <Text style={styles.addCameraText}>Add more</Text>
                                </Pressable>
                                <Pressable style={styles.cameraContainer} onPress={choosePhotoFromLibrary}>
                                    <Feather name="folder-plus" style={{ fontSize: 20 }} />
                                    <Text style={styles.addCameraText}>Add more</Text>
                                </Pressable>
                            </View>
                        </>

                    ) : (<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
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
                <TextInput style={globatStyles.inputText} value={productVideoUrl} onChangeText={text => setproductVideoUrl(text)} placeholder='Product Video URL' />
                <Text style={styles.sectionHeading}>Basic Information</Text>
                <TextInput style={globatStyles.inputText} onChangeText={(text) => setproductName(text)} value={productName} placeholder='Product Name' />
                <TextInput style={globatStyles.inputText} onChangeText={text => setproductBrand(text)} value={productBrand} placeholder='Brand' />
                <SelectDropdown
                    defaultValue={productUnit}
                    data={productUnits}
                    defaultButtonText='Unit'
                    buttonStyle={globatStyles.dropDownBox}
                    buttonTextStyle={globatStyles.dropdownTextStyle}
                    rowTextStyle={globatStyles.dropDownListStyle}
                    renderDropdownIcon={() => <AntDesign name='down' />}
                    onSelect={(selectedItem, index) => {
                        setproductUnit(selectedItem)
                    }} />
                <TextInput style={globatStyles.inputText} value={minimumQuantity} onChangeText={text => setminimumQuantity(text)} placeholder='Minimum Qty' />
                <TextInput style={globatStyles.inputText} value={productTags} onChangeText={text => setproductTags(text)} placeholder='Tags' />
                <View style={styles.isStockCodContainer}>
                    <Pressable style={styles.codContainer} onPress={() => setIsrefundalbe(!isRefundable)}>
                        <View style={isRefundable ? styles.inStockOuter : styles.outOfStockOuter}>
                            <View style={isRefundable ? styles.inStockInner : styles.outOfStockInner}></View>
                        </View>
                        <Text style={styles.inStockText}>Refundable</Text>
                    </Pressable>
                    <Pressable style={[styles.codContainer, { marginStart: Constants.margin + 16 }]} onPress={() => setCod(!cod)}>
                        <View style={cod ? styles.inStockOuter : styles.outOfStockOuter}>
                            <View style={cod ? styles.inStockInner : styles.outOfStockInner}></View>
                        </View>
                        <Text style={styles.inStockText}>COD</Text>
                    </Pressable>
                </View>
                <TextInput
                    multiline={true}
                    value={productDescription}
                    numberOfLines={4}
                    placeholder='Product Description'
                    onChangeText={text => setproductDescription(text)}
                    style={globatStyles.inputText} />
                <TextInput style={globatStyles.inputText} value={productUnitPrice} onChangeText={text => setproductUnitPrice(text)} placeholder='Unit Price' />
                <TextInput style={globatStyles.inputText} value={productSellingPrice} onChangeText={text => setproductSellingPrice(text)} placeholder='Selling Price' />
                <View style={{ flex: 1, width: '100%', justifyContent: "center", position: "relative" }}>
                    <TextInput style={globatStyles.inputText} value={productDiscount} keyboardType={'number-pad'} placeholder='Discount' onChangeText={text => setproductDiscount(text)} />
                    <FontAwesome name='percent' style={styles.eyeIcon} />
                </View>
                <SelectDropdown
                    defaultValue={productType}
                    data={productTypes}
                    defaultButtonText='Product Type'
                    buttonStyle={globatStyles.dropDownBox}
                    buttonTextStyle={globatStyles.dropdownTextStyle}
                    rowTextStyle={globatStyles.dropDownListStyle}
                    renderDropdownIcon={() => <AntDesign name='down' />}
                    onSelect={(selectedItem, index) => {
                        setproductType(selectedItem)
                    }} />
                <Text style={styles.sectionHeading}>Product Variation</Text>



                {/* jsdhafjkhajksdfhkjlasdhfjklahsdfkjhakjsdfhkjahsdfkjhaskjldhfkjlashdfkjhasdkjfhjkahsdflh */}

                <MultiSelect
                    style={styles.dropdown}
                    placeholderStyle={{ fontSize: 16, color: 'grey', }}
                    selectedTextStyle={{ fontSize: 16, color: 'black' }}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={productColors}
                    labelField="name"
                    valueField="name"
                    placeholder="Color"
                    value={selectedItem}
                    // value={productColor}
                    onChange={item => {
                        setSelectedItem(item);
                    }}
                    selectedStyle={styles.selectedStyle}
                />
                <TextInput style={globatStyles.inputText} value={productSize} placeholder='Size' onChangeText={text => setproductSize(text)} />
                <SelectDropdown
                    defaultValue={productVUnits}
                    data={productUnits}
                    defaultButtonText='Units'
                    buttonStyle={globatStyles.dropDownBox}
                    buttonTextStyle={globatStyles.dropdownTextStyle}
                    rowTextStyle={globatStyles.dropDownListStyle}
                    renderDropdownIcon={() => <AntDesign name='down' />}
                    onSelect={(selectedItem, index) => {
                        setproductVUnits(selectedItem)
                    }} />
                <TextInput keyboardType={'number-pad'} value={productQuantity} style={globatStyles.inputText} onChangeText={text => setproductQuantity(text)} placeholder='Quantity' />
                <Text style={styles.sectionHeading}>Low stock quantity warning</Text>
                <TextInput keyboardType='number-pad' value={productLowStock} onChangeText={text => setproductLowStock(text)} style={globatStyles.inputText} placeholder='Quantity' />
                <Text style={styles.sectionHeading}>VAT & TAX</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextInput keyboardType='number-pad' value={productTax} style={[globatStyles.inputText, { width: '48%', }]} placeholder='Tax' onChangeText={text => setproductTax(text)} />
                    <SelectDropdown
                        defaultValue={productTaxType}
                        data={vatType}
                        defaultButtonText='Select Type'
                        buttonStyle={styles.dropDownBox}
                        buttonTextStyle={globatStyles.dropdownTextStyle}
                        rowTextStyle={globatStyles.dropDownListStyle}
                        renderDropdownIcon={() => <AntDesign name='down' />}
                        onSelect={(selectedItem, index) => {
                            setproductTaxType(selectedItem)
                        }} />
                </View>
                <Text style={styles.sectionHeading}>Shipping Details</Text>
                <SelectDropdown
                    defaultValue={productCompany}
                    data={productUnits}
                    defaultButtonText='Service Company'
                    buttonStyle={globatStyles.dropDownBox}
                    buttonTextStyle={globatStyles.dropdownTextStyle}
                    rowTextStyle={globatStyles.dropDownListStyle}
                    renderDropdownIcon={() => <AntDesign name='down' />}
                    onSelect={(selectedItem, index) => {
                        setproductCompany(selectedItem)
                    }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <SelectDropdown
                        defaultValue={productDeliveryType}
                        data={deliveryTypes}
                        defaultButtonText='Delivery Type'
                        buttonStyle={styles.dropDownBox}
                        buttonTextStyle={globatStyles.dropdownTextStyle}
                        rowTextStyle={globatStyles.dropDownListStyle}
                        renderDropdownIcon={() => <AntDesign name='down' />}
                        onSelect={(selectedItem, index) => {
                            setproductDeliveryType(selectedItem)
                        }} />
                    <TextInput style={[globatStyles.inputText, { width: '48%', }]} keyboardType={'number-pad'} value={productPincode} onChangeText={text => setproductPincode(text)} placeholder='Pin Code' />
                </View>
                {/* {console.log("see-preview=>",userDetails)} */}
                <View style={styles.buttonContainer}>
                    <Pressable onPress={!buttonLoader && gotoProducts} style={[globatStyles.button, , { width: '100%' }]}>{buttonLoader ? <ActivityIndicator size={20} color={Constants.colors.whiteColor} /> : <Text style={globatStyles.btnText}>UPDATE </Text>}</Pressable>
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
        paddingTop: Constants.padding + 8,
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
    }, eyeIcon: {
        position: 'absolute',
        top: 20,
        right: 25,
        // color: '#999999',
        // fontSize: 24,
    },
    dropdown: {
        height: 50,
        borderColor: '#F5FFFA',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: '#F5FFFA',
        marginBottom: 18,
    },
})

export default Productedit
import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    FlatList,
} from 'react-native'
import SearchBar from '../../../components/business/SearchBar'
import LinearGradient from 'react-native-linear-gradient'
import { LineChart } from 'react-native-chart-kit'
import { DonutChart } from 'react-native-circular-chart'
import CustomAppBar from '../../../components/business/CustomAppBar'
import Constants from '../../../shared/Constants'
import Images from '../../../assets/images/Images'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import globatStyles from '../../../shared/globatStyles'
import RenderRecentOrders from './RenderRecentOrders'
import { useNavigation } from '@react-navigation/native'
import CustomTabNavigationAdmin from '../../../navigations/CustomTabNavigationAdmin'

const HomeScreen=(props)=>{
    const [tabs, setTabs] = useState('city')
    const [showSwitchAcountModal, setShowSwitchAcountModal] = useState(props.route.params?props.route.params.switchAccount: false)
    const navigation = useNavigation()
    const [showDrawer, setShowDrawer] = useState(false)
    const openDrawer = ()=>{
        setShowDrawer(!showDrawer)
    }
    const chartConfig = {
        backgroundGradientFrom: "#FFFFFF",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#FFFFFF",
        backgroundGradientToOpacity: 0.5,
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 10,
        useShadowColorFromDataset: false // optional
    }
    
    const data = {
        labels: ["15-25", "26-35", "36-45", "46-55", "56-65", "65+"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43],
                color: (opacity = 1) => `#00A928`, // optional
                strokeWidth: 2 // optional
            },
            {
                data: [10, 25, 35, 26, 34, 15],
                color: (opacity = 1) => `#70CF87`, // optional
                strokeWidth: 2 // optional
            }
        ],
    }
    const orders = [
        {
            id: 1,
            img: Images.recentOrdersOne,
            name: 'Statue of Boris',
            quantity: 23,
            buyers: 45
        },
        {
            id: 2,
            img: Images.recentOrdersTwo,
            name: 'Statue of Boris',
            quantity: 12,
            buyers: 25
        },
        {
            id: 3,
            img: Images.recentOrdersOne,
            name: 'Statue of Boris',
            quantity: 10,
            buyers: 55
        },
        {
            id: 4,
            img: Images.recentOrdersTwo,
            name: 'Statue of Boris',
            quantity: 16,
            buyers: 40
        },
    ]
    const gotoAllOrders = ()=>{
        navigation.navigate('/all-orders')
    }
    return (
        <View>
            <CustomAppBar name={props.route.params.userDetails.name} navigation={props.navigation} isMainscreen={true} isReel={false} openDrawer={openDrawer} showDrawer={showDrawer}/>
            <ScrollView style={styles.container}>
                <SearchBar />
                <View style={styles.totalRevenue}>
                    <View>
                        <Text style={styles.totalRTevinueText}>Total Revenue</Text>
                        <LinearGradient colors={['rgba(1, 170, 41, 0.09)', 'rgba(196, 196, 196, 0) 102.22%)']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.gradientBg}>
                            <Image source={Images.lineGraphIcon} />
                        </LinearGradient>
                    </View>
                    <View>
                        <Text style={styles.totalRevinue}><FontAwesome size={18} name='rupee' style={styles.rupeeIcon} /> 12,001</Text>
                        <View style={styles.percentage}>
                            <AntDesign name='arrowup' size={22} color={Constants.colors.primaryColor} />
                            <Text style={styles.numberInPercentage}>5.86%</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.impression}>
                    <View style={styles.impressionBox}>
                        <Text style={styles.impressionText}>Impressions</Text>
                        <Text style={styles.impressionValue}><FontAwesome size={18} name='rupee' style={styles.rupeeIcon} /> 12,001</Text>
                        <View style={{flexDirection: 'row', marginTop: 12,}}>
                            <AntDesign name='arrowup' size={18} color={Constants.colors.primaryColor} />
                            <Text style={styles.impressionInPercentage}>8.6%</Text>
                        </View>
                    </View>
                    <View style={styles.impressionBox}>
                        <Text style={styles.impressionText}>Conversions</Text>
                        <Text style={styles.impressionValue}><FontAwesome size={18} name='rupee' style={styles.rupeeIcon} /> 12,001</Text>
                        <View style={{flexDirection: 'row', marginTop: 12,}}>
                            <AntDesign name='arrowup' size={18} color={Constants.colors.primaryColor} />
                            <Text style={styles.impressionInPercentage}>5.86%</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.orderSalesReturn}>
                    <View style={styles.orderSlaseBox}>
                        <Text style={styles.impressionText}>Orders</Text>
                        <Text style={styles.salesValue}>101</Text>
                        <View style={{flexDirection: 'row', marginTop: 12,}}>
                            <AntDesign name='arrowup' size={18} color={Constants.colors.primaryColor} />
                            <Text style={styles.impressionInPercentage}>8.6%</Text>
                        </View>
                    </View>
                    <View style={styles.orderSlaseBox}>
                        <Text style={styles.impressionText}>Sales</Text>
                        <Text style={styles.salesValue}><FontAwesome size={18} name='rupee' style={styles.rupeeIcon} /> 12,001</Text>
                        <View style={{flexDirection: 'row', marginTop: 12,}}>
                            <AntDesign name='arrowup' size={18} color={Constants.colors.primaryColor} />
                            <Text style={styles.impressionInPercentage}>5.86%</Text>
                        </View>
                    </View>
                    <View style={styles.orderSlaseBox}>
                        <Text style={styles.impressionText}>Returns</Text>
                        <Text style={styles.salesValue}><FontAwesome size={18} name='rupee' style={styles.rupeeIcon} /> 12,001</Text>
                        <View style={{flexDirection: 'row', marginTop: 12,}}>
                            <AntDesign name='arrowup' size={18} color={Constants.colors.primaryColor} />
                            <Text style={styles.impressionInPercentage}>5.86%</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.countryWise}>
                    <View style={styles.tabContainer}>
                        <Pressable onPress={()=>setTabs('city')} style={{...styles.tabs, backgroundColor: tabs==='city'?Constants.whiteColor:'rgba(229, 235, 237, 0.38)',}}><Text style={{...styles.tabText, fontWeight: tabs==='city'?'800':'400',}}>Cities</Text></Pressable>
                        <Pressable onPress={()=>setTabs('country')} style={{...styles.tabs, backgroundColor: tabs==='country'?Constants.whiteColor:'rgba(229, 235, 237, 0.38)',}}><Text style={{...styles.tabText, fontWeight: tabs==='country'?'800':'400',}}>Countries</Text></Pressable>
                    </View>
                    {
                        tabs==='city'?(
                            <View style={styles.tabContent}>
                                <Text style={styles.cityName}>Pune</Text>
                                <View style={styles.progressBar}>
                                    <View style={styles.progressBarBg}></View>
                                    <View style={{...styles.progressBarFront, width: '30%'}}></View>
                                    <Text>5.86%</Text>
                                </View>
                                <Text style={styles.cityName}>Mubmai</Text>
                                <View style={styles.progressBar}>
                                    <View style={styles.progressBarBg}></View>
                                    <View style={{...styles.progressBarFront, width: '20%'}}></View>
                                    <Text>4.32%</Text>
                                </View>
                                <Text style={styles.cityName}>Delhi</Text>
                                <View style={styles.progressBar}>
                                    <View style={styles.progressBarBg}></View>
                                    <View style={{...styles.progressBarFront, width: '0%'}}></View>
                                    <Text>4.32%</Text>
                                </View>
                                <Text style={styles.cityName}>Banglore</Text>
                                <View style={styles.progressBar}>
                                    <View style={styles.progressBarBg}></View>
                                    <View style={{...styles.progressBarFront, width: '0%'}}></View>
                                    <Text>4.32%</Text>
                                </View>
                                <Image source={Images.indiaMap} style={{alignSelf: 'center',}} />
                            </View>
                        ):(
                            <View style={styles.tabContent}>
                                <View style={globatStyles.noData}>
                                    <AntDesign name='delete' size={36} color='#F1F1F1' />
                                    <Text>No Data Found</Text>
                                </View>
                            </View>
                        )
                    }
                </View>
                <View style={styles.ageAndGender}>
                    <Text style={styles.ageAndGenderHeading}>Age Range & Gender</Text>
                    <LineChart
                        data={data}
                        width={Constants.width}
                        height={220}
                        chartConfig={chartConfig}
                        yAxisSuffix='%'
                        barPercentage='10'
                        withInnerLines={false}
                        withOuterLines={true}
                        withShadow={false}
                        style={{
                            marginLeft: -26,
                        }}
                    />
                    <View style={styles.circularChartContainer}>
                        <View>
                            <View style={styles.circularBarLabel}>
                                <View style={styles.graphColorMale}></View>
                                <Text style={styles.label}>Men</Text>
                                <Text styles={styles.value}>68%</Text>
                            </View>
                            <View style={styles.circularBarLabel}>
                                <View style={styles.graphColorFemale}></View>
                                <Text style={styles.label}>Women</Text>
                                <Text styles={styles.value}>32%</Text>
                            </View>
                        </View>
                        <DonutChart
                            data={[{name: 'Male', value: 68, color: '#00A928'},{name: 'Female', value: 32, color: '#70CF87'}]}
                            strokeWidth={10}
                            radius={28}
                            containerWidth={120}
                            containerHeight={90}
                            type="butt"
                            startAngle={0}
                            endAngle={360}
                            labelWrapperStyle={{width: 200}}
                            labelTitleStyle={{
                                display: 'none',
                            }}
                            labelValueStyle={{
                                display: 'none'
                            }}
                            animationType="slide"/>
                    </View>
                </View>
                <View style={styles.recentOrderContainer}>
                    <View style={styles.orderHeading}>
                        <Text style={styles.heading}>Recent Orders</Text>
                        <Pressable onPress={gotoAllOrders}><Text style={styles.viewAll}>View All</Text></Pressable>
                    </View>
                    <View style={styles.tableContainer}>
                        <Text style={styles.orderTableHeading}>Image</Text>
                        <Text style={styles.orderTableHeading}>Product Name</Text>
                        <Text style={styles.orderTableHeading}>Quantity</Text>
                        <Text style={styles.orderTableHeading}>Buyers</Text>
                    </View>
                    <View style={styles.divider}></View>
                    <FlatList
                        data={orders}
                        keyExtractor={item=>item?.id?.toString()}
                        renderItem={(item)=><RenderRecentOrders order={item} />}
                    />
                </View>
            </ScrollView>
            {
                showSwitchAcountModal?<View style={styles.switchContainer}>
                    <View style={globatStyles.overlay}></View>
                    <View style={styles.switchAccountContainer}>
                        <View style={styles.switchHeading}>
                            <Text style={styles.heading}>Switch View As</Text>
                            <AntDesign name='close' size={20} color='#000000' onPress={()=>setShowSwitchAcountModal(false)} />
                        </View>
                        <Text style={styles.switchText}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                        </Text>
                        <View style={styles.accountContainer}>
                            <View style={styles.account}>
                                <Image source={Images.avatar} style={{marginRight: 20,}} alt='Img'/>
                                <View>
                                    <Text style={styles.accountName}>Robert Phan</Text>
                                    <Text style={styles.accountType}>Account Type</Text>
                                </View>
                            </View>
                            <View>
                                <Image source={Images.switchAc} style={styles.switchAc} />
                            </View>
                            <View style={[styles.account, {backgroundColor: Constants.colors.inputBgColor,}]}>
                                <Image source={Images.avatar} style={{marginRight: 20,}} alt='Img'/>
                                <View>
                                    <Text style={styles.accountName}>Robert_Phan123</Text>
                                    <Text style={styles.accountType}>Advertiser Account</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>:null
            }
                <CustomTabNavigationAdmin navigation={navigation} showDrawer={showDrawer} activeTab='home'/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: Constants.padding,
        paddingBottom: 100,
    },
    totalRevenue: {
        backgroundColor: Constants.colors.whiteColor,
        padding: Constants.padding,
        borderRadius: 20,
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    totalRTevinueText: {
        fontFamily: Constants.fontFamily,
        fontSize: 24,
        fontWeight: '400',
    },
    gradientBg: {
        padding: 10,
    },
    totalRevinue: {
        fontSize: 22,
        fontFamily: Constants.fontFamily,
        fontWeight: '800',
        marginBottom: 12,
    },
    percentage: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    numberInPercentage: {
        fontFamily: Constants.fontFamily,
        fontSize: 20,
        color: Constants.colors.primaryColor,
        fontWeight: '400',
    },
    impression: {
        marginTop: Constants.margin,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    impressionBox: {
        padding: Constants.padding,
        backgroundColor: Constants.colors.whiteColor,
        width: '48%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    impressionText: {
        fontFamily: Constants.fontFamily,
        fontSize: 20,
        fontWeight: '400',
    },
    impressionValue: {
        fontWeight: '800',
        fontSize: 22,
        fontFamily: Constants.fontFamily,
    },
    impressionInPercentage: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.primaryColor,
    },
    orderSalesReturn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Constants.margin,
    },
    orderSlaseBox: {
        padding: 16,
        width: '31%',
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    salesValue: {
        fontFamily: Constants.fontFamily,
        fontWeight: '800',
        fontSize: 18,
    },
    countryWise: {
        marginTop: 50,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: 20,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tabs: {
        padding: Constants.padding,
        fontFamily: Constants.fontFamily,
        fontSize: 20,
        width: '50%',
        backgroundColor: 'rgba(229, 235, 237, 0.38)'
    },
    tabText: {
        fontFamily: Constants.fontFamily,
        fontSize: 19,
    },
    tabContent: {
        padding: Constants.padding,
    },
    cityName: {
        fontFamily: Constants.fontFamily,
        fontSize: 18,
    },
    progressBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    progressBarBg: {
        width: '82%',
        height: 8,
        backgroundColor: '#E1E1E1',
        borderRadius: Constants.borderRadius,
    },
    progressBarFront: {
        backgroundColor: Constants.colors.primaryColor,
        borderRadius: Constants.borderRadius,
        height: 8,
        position: 'absolute',
    },
    ageAndGender: {
        marginTop: 50,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: 20,
        padding: Constants.padding,
    },
    ageAndGenderHeading: {
        fontFamily: Constants.fontFamily,
        fontSize: 18,
        fontWeight: '700',
        marginBottom: Constants.margin,
    },
    circularChartContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    circularBarLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    graphColorMale: {
        width: 10,
        height: 10,
        backgroundColor: '#00A928',
        borderRadius: 10,
    },
    label: {
        fontFamily: Constants.fontFamily,
        marginStart: Constants.margin|+20,
        marginEnd: Constants.margin,
        fontSize: 16,
    },
    value: {
        fontFamily: Constants.fontFamily,
        marginStart: Constants.margin,
        fontWeight: '800',
        fontSize: 16,
    },
    graphColorFemale: {
        width: 10,
        height: 10,
        backgroundColor: '#70CF87',
        borderRadius: 10,
    },
    recentOrderContainer: {
        marginTop: 50,
        paddingBottom: 220,
    },
    orderHeading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    heading: {
        fontFamily: Constants.fontFamily,
        fontSize: 20,
        fontWeight: '800',
    },
    viewAll: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.primaryColor,
        fontSize: 16,
        textDecorationColor: Constants.colors.primaryColor,
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
    },
    tableContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
    },
    orderTableHeading: {
        fontFamily: Constants.fontFamily,
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#9F9F9F',
        marginTop: 16,
        marginBottom: 16,
    },
    switchContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        zIndex: 999,
        alignItems: 'center',
        justifyContent: 'center',
    },
    switchAccountContainer: {
        backgroundColor: Constants.colors.whiteColor,
        padding: Constants.padding,
        width: '85%',
        left: '0%',
        right: '10%',
        backgroundColor: Constants.colors.bodyBg,
    },
    switchHeading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    heading: {
        fontSize: 22,
        fontFamily: Constants.fontFamily,
        fontWeight: '800',
    },
    switchText: {
        fontFamily: Constants.fontFamily,
        marginTop: Constants.margin,
        marginBottom: Constants.margin,
    },
    account: {
        backgroundColor: Constants.colors.whiteColor,
        padding: 10,
        borderRadius: Constants.borderRadius,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    accountName: {
        fontFamily: Constants.fontFamily,
        fontSize: 20,
        fontWeight: '800',
    },
    accountType: {
        fontFamily: Constants.fontFamily,
        color: '#A4A4B2',
        fontSize: 18,
    },
    switchAc: {
        alignSelf: 'center',
        width: 20,
        height: 20,
        marginTop: 20,
        marginBottom: 20,
    },
})
export default HomeScreen
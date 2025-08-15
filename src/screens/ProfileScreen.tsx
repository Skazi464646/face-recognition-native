import React, { useMemo } from 'react'
import { View, Text, TouchableOpacity, Alert, FlatList } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Animated, { useAnimatedScrollHandler, useSharedValue, useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../components/profile/styles'

const HEADER_MAX = 180
const HEADER_MIN = 84

const actions = [
  { key: 'security', title: 'Security', subtitle: 'FaceID, 2FA, device login', icon: 'security' },
  { key: 'notifications', title: 'Notifications', subtitle: 'Price alerts, app updates', icon: 'notifications' },
  { key: 'payment', title: 'Payment Methods', subtitle: 'Cards and bank accounts', icon: 'credit-card' },
  { key: 'appearance', title: 'Appearance', subtitle: 'Theme and display', icon: 'palette' },
  { key: 'privacy', title: 'Privacy', subtitle: 'Permissions and data', icon: 'privacy-tip' },
  { key: 'about', title: 'About', subtitle: 'App version and licenses', icon: 'info', },
  { key: 'a', title: 'a', subtitle: 'App version and licenses', icon: 'info', },
  { key: "b", title: "b", subtitle: 'App version and licenses', icon: 'info', },
  { key: "b", title: "b", subtitle: 'App version and licenses', icon: 'info', },
  { key: "b", title: "b", subtitle: 'App version and licenses', icon: 'info', },
]

const ProfileScreen = () => {
  const y = useSharedValue(0)

  const onScroll = useAnimatedScrollHandler((event) => {
    y.value = event.contentOffset.y
  })

  const headerStyle = useAnimatedStyle(() => {
    const height = interpolate(y.value, [0, HEADER_MAX - HEADER_MIN], [HEADER_MAX, HEADER_MIN], Extrapolate.CLAMP)
    return { height }
  })

  const nameBlockStyle = useAnimatedStyle(() => ({
    opacity: interpolate(y.value, [0, 40], [1, 0], Extrapolate.CLAMP),
    transform: [
      { translateY: interpolate(y.value, [0, 60], [0, -12], Extrapolate.CLAMP) },
    ],
  }))

  const avatarSize = useAnimatedStyle(() => {
    const size = interpolate(y.value, [0, 100], [100, 1], Extrapolate.CLAMP)
    const translateY = interpolate(y.value, [0, 60], [0, -8], Extrapolate.CLAMP)
    const opacity = interpolate(y.value, [0, 60], [1, 0.6], Extrapolate.CLAMP)
    return { width: size, height: size, transform: [{ translateY }], opacity }
  })
  
  const editBtnAnimate = useAnimatedStyle(() => {
    const size = interpolate(y.value, [0, 100], [64, 0], Extrapolate.CLAMP);
    const translateX = interpolate(y.value, [0, 80], [0, size], Extrapolate.CLAMP);
    const opacity = interpolate(y.value, [0, 60], [1, 0], Extrapolate.CLAMP);

    return {
      width: size,
      height: size,
      opacity,
      transform: [{ translateX }],
    };
  });


  
  const statsStyle = useAnimatedStyle(() => ({
    opacity: interpolate(y.value, [0, 30, 80], [0.85, 1, 1], Extrapolate.CLAMP),
    transform: [
      { translateY: interpolate(y.value, [0, 80], [12, 0], Extrapolate.CLAMP) },
      { scale: interpolate(y.value, [0, 80], [0.98, 1], Extrapolate.CLAMP) },
    ],
  }))

  const renderRow = ({ item }: { item: typeof actions[number] }) => (
    <TouchableOpacity
      onPress={() => Alert.alert(item.title)}
      style={styles.row}
      activeOpacity={0.8}
    >
      <View style={styles.rowIconWrap}>
        <Icon name={item.icon} size={20} color="#ffd700" />
      </View>
      <View style={styles.rowTextWrap}>
        <Text style={styles.rowTitle}>{item.title}</Text>
        <Text style={styles.rowSubtitle}>{item.subtitle}</Text>
      </View>
      <Icon name="chevron-right" size={22} color="#6b7280" style={styles.chevron} />
    </TouchableOpacity>
  )

  const ListHeader = useMemo(() => (
    <>
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={styles.sectionTitle}>Account</Text>
      </View>
    </>
  ), [])

  return (
    <SafeAreaView style={styles.screen}>
      <Animated.View style={[styles.headerContainer, headerStyle]}>
        <LinearGradient colors={["#111827", "#0a0a0a"]} style={styles.headerGradient}>
          <View style={styles.headerRow}>
            <Animated.View style={[styles.avatar, avatarSize]}>
              <Icon name="person" size={28} color="#fff" />
            </Animated.View>
            <Animated.View style={[styles.nameBlock, nameBlockStyle]}>
              <Text style={styles.name}>Shantanu Bhosale</Text>
              <Text style={styles.subtitle}>ID: 9Z3-21A-7FQ</Text>
            </Animated.View>
            <TouchableOpacity style={[styles.editBtn,editBtnAnimate]} onPress={() => Alert.alert('Edit Profile')}>
              <Text style={styles.editBtnText}>Edit</Text>
            </TouchableOpacity>
          </View>

          <Animated.View style={[styles.statsContainer, statsStyle]}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Portfolio</Text>
              <Text style={styles.statValue}>$12,540</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>PnL (30d)</Text>
              <Text style={styles.statValue}>+4.2%</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Badges</Text>
              <Text style={styles.statValue}>3</Text>
            </View>
          </Animated.View>
        </LinearGradient>
      </Animated.View>

      <Animated.FlatList
        data={actions}
        keyExtractor={(i, idx) => `${i.key}-${idx}`}
        renderItem={renderRow}
        contentContainerStyle={styles.list}
        ListHeaderComponent={ListHeader}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
    </SafeAreaView>
  )
}

export default ProfileScreen
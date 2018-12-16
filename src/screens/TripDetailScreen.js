import React, { Component } from 'react';
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	Image,
	AsyncStorage
} from 'react-native';

import styles from './styles/TripDetailScreenStyles';

import { assets } from '../themes';

import isIphoneX from '../utils/IsIphoneX';

class TripDetailScreen extends Component {
	static navigationOptions = {
		header: null
	};

	state = {
		trip: [],
		points: []
	};

	componentDidMount() {
		this.loadData();
	}

	loadData = async () => {
		const id = this.props.navigation.state.params.id;

		const tripsAS = await AsyncStorage.getItem('trips');
		let trips = [];
		if (tripsAS) {
			trips = JSON.parse(tripsAS);
		}

		const pointsAS = await AsyncStorage.getItem('trip-' + id);
		let points = [];
		if (pointsAS) {
			points = JSON.parse(pointsAS);
		}

		let trip = {
			trip: '',
			price: 0
		};
		trips.forEach(t => {
			if (t.id === id) {
				(trip.trip = t.trip), (trip.price = t.price ? t.price : 0);
			}
		});

		this.setState({
			trip,
			points
		});
	};

	_renderItem = item => {
		return (
			<View style={styles.item}>
				<View style={styles.wrapperInfo}>
					<Text style={styles.itemName}>{item.item.pointName}</Text>
					<Text>{item.item.description}</Text>
				</View>
				<View style={styles.wrapperItemPrice}>
					<Text style={styles.itemPrice}>
						{'R$ ' + item.item.price.toFixed(2)}
					</Text>
				</View>
			</View>
		);
	};
	render() {
		const { points, trip } = this.state;
		const id = this.props.navigation.state.params.id;
		return (
			<View style={styles.wrapper}>
				<View style={styles.header}>
					<View
						style={[styles.backButton, isIphoneX() ? { paddingTop: 16 } : null]}
					>
						<TouchableOpacity
							onPress={() => {
								this.props.navigation.state.params.refresh();
								this.props.navigation.goBack();
							}}
						>
							<Image source={assets.iconChevronLeft} />
						</TouchableOpacity>
					</View>
					<Text style={styles.tripName}>{trip.trip}</Text>
					<Text style={styles.tripPrice}>
						{'R$ ' + parseFloat(trip.price).toFixed(2)}
					</Text>
					<TouchableOpacity
						onPress={() =>
							this.props.navigation.navigate('AddPoint', {
								id: id,
								refresh: this.loadData
							})
						}
						style={{
							position: 'absolute',
							bottom: 100,
							right: 20,
							padding: 10
						}}
					>
						<Image source={assets.iconPlus} />
					</TouchableOpacity>
				</View>
				<FlatList
					style={styles.list}
					contentContainerStyle={styles.containerList}
					data={points}
					renderItem={this._renderItem}
					keyExtractor={item => item.id.toString()}
				/>
			</View>
		);
	}
}

export default TripDetailScreen;

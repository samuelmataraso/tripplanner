import { StyleSheet } from 'react-native';
// import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/';

export default StyleSheet.create({
	containerBackground: {
		flex: 1,
		alignItems: 'stretch',
		justifyContent: 'space-between',
		flexDirection: 'column'
	},
	wrapperLogoTripPlanner: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	wrapperLogoDevPleno: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'center',
		paddingBottom: 32
	},
	buttonBackground: {
		backgroundColor: '#fff',
		paddingBottom: 16,
		paddingTop: 16
	},
	buttonText: {
		textAlign: 'center',
		fontSize: 18
	}
});
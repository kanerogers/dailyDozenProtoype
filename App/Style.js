import { Dimensions } from 'react-native';

const WHITE = '#FFFFFF';
const LIGHT_GREY = '#F5F5F5';
const DARK_GREY = '#CCCCCC';
const BLACK = '#292B2C';
const THEME_BLUE = '#00B1B3';
const THEME_GREEN = '#A0CC71';

const { width } = Dimensions.get('window');

const shadowProperties = {
  shadowColor: BLACK,
  shadowOpacity: 0.16,
  shadowRadius: 3,
  shadowOffset: {
    height: 3,
    width: 3,
  },
};

export default {
  outerContainer: {
    marginTop: 64,
    backgroundColor: LIGHT_GREY,
  },
  container: {
    paddingTop: 32,
    flex: 1,
    alignItems: 'center',
    backgroundColor: LIGHT_GREY,
  },
  header: {
    color: BLACK,
    textAlign: 'left',
    fontWeight: '700',
    fontSize: 16,
    paddingBottom: 8,
  },
  subContainer: {
    marginBottom: 16,
    padding: 8,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginHorizontal: 8,
    width: width - 16,
    backgroundColor: WHITE,
    ...shadowProperties,
  },
  progressBar: {
    marginVertical: 8,
    height: 16,
    borderRadius: 4,
    backgroundColor: THEME_BLUE,
    width: (width - 16) / 2,
  },
  progressBarRemaining: {
    height: 16,
    borderRadius: 4,
    backgroundColor: LIGHT_GREY,
    width: width - 32,
    top: -24,
    zIndex: -1,
    marginBottom: -16,
  },
  foodProgressBar: {
    marginVertical: 4,
    backgroundColor: THEME_GREEN,
    height: 8,
  },
  foodProgressBarRemaining: {
    top: -12,
    width: width - 178,
    marginBottom: -8,
    height: 8,
    borderRadius: 2,
  },
  progressBoxContainer: {
    justifyContent: 'space-between',
    width: width - 8,
    flexDirection: 'row',
    borderRadius: 2,
  },
  progressBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    height: 64,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  headerText: {
    fontSize: 17,
    color: BLACK,
  },
  foodContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  foodImage: {
    height: 30,
    width: 30,
  },
  foodImageContainer: {
    height: 52,
    width: 52,
    borderRadius: 52 / 2,
    borderColor: LIGHT_GREY,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  foodSubContainer: {
    flex: 1,
  },
  subHeader: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  minusButton: {
    width: 32,
    height: 32,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32 / 2,
    borderColor: LIGHT_GREY,
    borderWidth: 2,
  },
  minusButtonText: {
    color: DARK_GREY,
  },
  plusButton: {
    width: 32,
    height: 32,
    marginHorizontal: 4,
    backgroundColor: THEME_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32 / 2,
  },
  plusButtonText: {
    color: WHITE,
  },
  detailImage: {
    ...shadowProperties,
    borderRadius: 4,
    width: width - 16,
    marginHorizontal: 8,
    marginBottom: 16,
    marginTop: 8,
    height: width * (2 / 3),
  },
  completedFoodContainer: {
    borderColor: THEME_GREEN,
    borderWidth: 2,
  },
  listItem: {
    marginTop: 4,
    fontSize: 13,
    color: BLACK,
  },
  underline: {
    marginTop: 4,
    backgroundColor: LIGHT_GREY,
    height: 1,
    width: width - 48,
    marginBottom: 4,
  },
  listItemContainer: {
    marginHorizontal: 4,
  },
};

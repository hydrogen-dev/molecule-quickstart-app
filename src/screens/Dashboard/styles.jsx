import { makeStyles } from '@material-ui/styles';
import { pink } from '@material-ui/core/colors';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 12,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  orangeAvatar: {
    textDecoration: 'capitalize',
    margin: 10,
    color: '#fff',
    backgroundColor: pink[500],
  },
  navbar: {
    flexGrow: 1,
  },
  image: {
    // width: '10%',
    alignItems: 'center',
  },
  footerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 25,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    fontFamily: 'Avenir Next',
  },
  settingsButton: {
    fontFamily: 'Avenir Next',
    marginRight: 0,
  },
  rootContainer: {
    marginTop: 0,
    padding: 50,
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  title: {
    fontFamily: 'Avenir Next',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  card: {
    height: 450,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  cardContent: {
    fontFamily: 'Avenir Next',
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  cardHeader: {
    fontFamily: 'Avenir Next',
  },
  modalButton: {
    flexGrow: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
}));

export default useStyles;
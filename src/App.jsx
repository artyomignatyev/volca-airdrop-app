import React, { Component } from 'react';
import { connect } from 'react-redux';
import Web3StatusBar from './components/common/Web3StatusBar';
import web3Service from './services/web3Service';
import DeployAirdropScreen from './components/DeployAirdropScreen/DeployAirdropScreen';
import ClaimScreen from './components/ClaimScreen/ClaimScreen';
import AuthScreen from './components/AuthScreen/AuthScreen';
import TransferComponent from './components/Transfer';
import Header from './components/common/Header/ReferalHeader';
import NoWalletHeader from './components/common/NoWalletHeader';
import { Loader } from './components/common/Spinner';
import HistoryScreen from './components/HistoryScreen';
import { HashRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import NoWalletScreen from './components/NotConnectedScreens/NoWalletScreen';
import UnsupportedNetwork from './components/NotConnectedScreens/UnsupportedNetwork';
import ReactGA from 'react-ga';


// initialize google analytics
ReactGA.initialize('UA-126363137-2');


class App extends Component {
    _renderWrongNetwork() {
        return (
            <div>
              <Header {...this.props} />
              <UnsupportedNetwork />
            </div>
        );
    }

    _renderNoWalletScreen() {
        return (
                <div>
                  <Header {...this.props} />
                  <NoWalletScreen />
                </div>
        );
    }

    render() {
        const path = window.location.hash;
        const isAuthScreen = path.includes('/auth');
        if (!this.props.loaded) {
            return (<Loader />);
        }


	
	// auth screen doesn't need web3 to be connected
	if (!isAuthScreen) { 
            if (!this.props.connected || !this.props.address) {
		return this._renderNoWalletScreen();
            }
	    
            if (this.props.networkId != "3"
		&& this.props.networkId != "1"
	       ) {
		   return this._renderWrongNetwork();
               }
	}

	
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/transfers/:transferId" component={TransferComponent} />
                        <Route path='/demo' component={DeployAirdropScreen}/>
                        <Route path='/receive' component={ClaimScreen} />	
                        <Route path='/auth' component={AuthScreen} />		                        		
                        <Route path='/r' render={(props) => {
                            return (
                                <Redirect to={{
                                    pathname: '/receive',
                                    search: props.location.search
                                }} />
                            );
                        }} />

                <Route render={(props) => {
		    window.location.replace("https://volca.tech");
		}}/>
                    </Switch>

                </div>
            </Router>

        );
    }
}


function mapStateToProps(state) {
    let balance, contractAddress;
    const web3 = web3Service.getWeb3();
    if (state.web3Data.balance) {
        balance = web3.fromWei(state.web3Data.balance, 'ether').toNumber();
    }
    return {
        address: state.web3Data.address,
        balance,
        connected: state.web3Data.connected,
        networkId: state.web3Data.networkId,
        networkName: state.web3Data.networkName,
        loaded: state.web3Data.loaded
    };
}


export default connect(mapStateToProps)(App);

import React, { Component } from 'react';
import { CSVLink, CSVDownload } from 'react-csv';
import { getEtherscanLink } from './../Transfer/components';
import { SpinnerOrError, Loader } from './../common/Spinner';
import styles from './styles';
import RetinaImage from 'react-retina-image';


export const DownloadLinksButton = ({ links, claimAmount, tokenSymbol }) => {
    return (
        <div>
            <div style={{ display: 'flex', fontSize: 26, marginTop: 80, marginBottom: 60 }}>
                <div style={{ fontFamily: 'Inter UI Regular', color: '#979797', marginRight: 10 }}>3/3</div>
                <div style={{ fontFamily: 'Inter UI Black', color: '#0099FF', }}>Get the links</div>
            </div>
            <div style={{ ...styles.airdropBalanceContainer, width: 850, height: 238, flexDirection: 'column', padding: '40px 0px 40px 40px' }}>
                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: 30, marginBottom: 30, fontSize: 20, fontFamily: 'Inter UI Medium' }}>
                            <div>Download CSV file</div>
                        </div>
                        <CSVLink data={links} filename="airdrop-links.csv" style={{ ...styles.approveButton, margin: 0, paddingTop: 8, textDecoration: 'none' }}>Download</CSVLink>
                        <div style={{ width: 250, textAlign: 'center', marginTop: 15, fontFamily: 'Inter UI Regular', fontSize: 14, color: '#979797' }}>CSV file with 100 links</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 70 }}>
                        <div style={{ fontFamily: 'Inter UI Regular', fontSize: 16, marginTop: 30 }}>Links generated:
                <div style={{ display: 'inline', color: '#0099FF', fontFamily: 'Inter UI Medium' }}> {links.length} </div>
                        </div>
                        <div style={{ fontFamily: 'Inter UI Regular', fontSize: 16, marginTop: 15 }}>Free claim links:
                <div style={{ display: 'inline', color: '#0099FF', fontFamily: 'Inter UI Medium' }}> 30 </div>
                        </div>
                        <div style={{ fontFamily: 'Inter UI Regular', fontSize: 16, marginTop: 15 }}>Tokens in one link:
                <div style={{ display: 'inline', color: '#0099FF', fontFamily: 'Inter UI Medium' }}> {claimAmount} <div style={{ display: 'inline', fontFamily: 'Inter UI Bold' }}>{tokenSymbol}</div></div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{marginTop: 70, marginLeft: 47}}>
                <div style={{marginBottom: 35}}>
                    <div style={{...styles.label, fontFamily: 'Inter UI Regular'}}>Unlock advanced features</div>
                        <div style={{ fontFamily: 'Inter UI Regular', fontSize: 18, color: '#979797' }}>
                            <div style={{marginBottom: 8}}><span style={{color: '#0078FF'}}>•</span> Unlimited links with a branded claiming page</div>
                            <div style={{marginBottom: 8}}><span style={{color: '#0078FF'}}>•</span> Referral programs with easy sharing</div>
                            <div style={{marginBottom: 8}}><span style={{color: '#0078FF'}}>•</span> Onboarding to your mobile app</div>
                            <div><span style={{color: '#0078FF'}}>•</span> Priority support 24/7</div>
                        </div>
                   </div>
                   <a href='mailto: hi@volca.tech' style={{height: 42, width: 191, padding: '10px 47px', marginTop: 30, border: 'solid', borderRadius: 5, borderWidth: 1, borderColor: '#0078FF', backgroundColor: 'white', textAlign: 'center', color: '#0078FF', fontSize: 18, fontFamily: 'Inter UI Regular', textDecoration: 'none'}}>Contact Us</a>
                </div>
            </div>  
    );
}

 
const StatusDetailsAndApproveButton = ({ txHash, networkId, contractAddress, onSubmit, disabled }) => {
    //if (!txHash) { return null; }
    let stepLabel = "Deploy Tx: ";
    if (!contractAddress) {
        disabled = true
    }
    let buttonColor;
    if (disabled) {
        buttonColor = '#B2B2B2'
    }
    else {
        buttonColor = '#0078FF'
    }
    const etherscanLink = getEtherscanLink({ txHash, networkId });
    return (
        <div>
            <div style={{ display: 'flex', fontSize: 26, marginTop: 80, marginBottom: 30 }}>
                <div style={{ fontFamily: 'Inter UI Regular', color: '#979797', marginRight: 10 }}>2/3</div>
                <div style={{ fontFamily: 'Inter UI Black', color: '#0099FF', }}>Approve smart contract</div>
            </div>
            <div style={{height: 30, width: 354, marginLeft: 25, marginBottom: 30, paddingTop: 5, borderRadius: 5, backgroundColor: 'rgba(255, 163, 0, 0.2)', textAlign: 'center', fontFamily: 'Inter UI Regular', fontSize: 14, color: 'rgba(0, 0, 0, 0.5)'}}>Don't close this page, it may take a few minutes</div>

            <div style={{ ...styles.airdropBalanceContainer, width: 850, height: 238, display: 'block', flexDirection: 'column', padding: '40px 0px 40px 40px' }}>
                {!contractAddress ?
                    <div style={{ height: 30, marginBottom: 25, display: 'flex', fontSize: 20, fontFamily: 'Inter UI Medium' }}>
                        <div style={{ marginRight: 15 }}>Creating Smart Contract</div>
                        <Loader _className='' text="" size="small" />
                        {/* <a href={etherscanLink} className="link" target="_blank">{txHash}</a> */}
                    </div>
                    :
                    <div style={{ height: 30, marginBottom: 25, display: 'flex', fontSize: 20, fontFamily: 'Inter UI Medium' }}>
                        <div style={{ marginRight: 15 }}>Smart Contract created</div>
                        <RetinaImage src={`https://raw.githubusercontent.com/Eth2io/eth2-assets/master/images/done_small.png`} style={{ display: 'inline', height: 'auto' }} />
                    </div>
                }
                <div style={{ marginBottom: 20, fontFamily: 'Inter UI Regular', fontSize: 18 }}>Setup TX: <a href={etherscanLink} style={{ color: '#0078FF', textDecoration: 'none' }} target="_blank">{txHash}</a></div>
                <div style={{ marginBottom: 30, fontFamily: 'Inter UI Regular', fontSize: 18 }}>Smart Contract: {contractAddress ? <a href={etherscanLink} style={{ color: '#0078FF', textDecoration: 'none' }} target="_blank">{contractAddress}</a> : <span style={{ color: '#979797' }}>Transaction is processing</span>}</div>
                <div style={{ fontFamily: 'Inter UI Regular', fontSize: 14, color: '#979797' }}>It may take a few minutes, don't close this page</div>
            </div>
            <div style={styles.button}>
                <button
                    style={{ ...styles.approveButton, backgroundColor: buttonColor }}
                    onClick={onSubmit}
                    disabled={disabled}
                >
                    Approve
	      </button>
            </div>
        </div>
    );
}


export const ContractDetails = ({ contractAddress, networkId, disabled, onSubmit, txHash, links, claimAmount, tokenSymbol }) => (
    <div>
        {links.length > 0 && contractAddress ?
            <DownloadLinksButton links={links} claimAmount={claimAmount} tokenSymbol={tokenSymbol} /> :
            <StatusDetailsAndApproveButton txHash={txHash} networkId={networkId} contractAddress={contractAddress} onSubmit={onSubmit} disabled={disabled}/>}
    </div>
);

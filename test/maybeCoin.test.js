const assert = require('assert');
const expect = require('expect');
const HDWalletProvider = require("@truffle/hdwallet-provider");

const Web3 = require('web3');

const provider = new HDWalletProvider({
    mnemonic: "wide page grab obtain advance comic stand ranch ripple scrub choice thought",
    providerOrUrl: "https://ropsten.infura.io/v3/29c51a2261c3427cb73a90dec424421a"
});

const web3 = new Web3(provider);

const coin = require('../build/Coin.json');
const notCoin = require('../build/NotCoin.json');
const collectorCoin = require('../build/CoinCollector.json');


let accounts;
let coinAddress = '0x9fC268Fb0C1dC7739Ba9ef54DC9d82fB53b220c0';
let notCoinAddress = '0x1226E52e1AAEf27b2210E440754bCb454ec4Eb9E';
let coinCollectorAddress = '0x6F630485cE637539c8c38E97EcC7BCd234264b3E';

beforeEach(async () => {

    accounts = await web3.eth.getAccounts();

    coinDeployed = new web3.eth.Contract(coin.abi, coinAddress);
    notCoinDeployed = new web3.eth.Contract(notCoin.abi, notCoinAddress);
    coinCollectorDeployed = new web3.eth.Contract(collectorCoin.abi, coinCollectorAddress);

});

describe('Test CoinCollector', () => {

    it('CoinCollector collects Real Coin', async () => {

        await coinCollectorDeployed.methods.collectCoin(coinAddress).send({from: accounts[1], gas: '1000000'});
        expect(await coinCollectorDeployed.methods.isCollected(coinAddress).call()).toEqual(true);;

    });

    it('CoinCollector rejects Fake Coin', async () => {

        await coinCollectorDeployed.methods.collectCoin(notCoinAddress).send({from: accounts[1], gas: '1000000'});
        expect(await coinCollectorDeployed.methods.isCollected(notCoinAddress).call()).toEqual(false);

    });
});


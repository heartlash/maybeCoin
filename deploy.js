const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const compiledCoinContract = require('./build/Coin.json');
const compiledNotCoinContract = require('./build/NotCoin.json');
const compiledCoinCollectorContract = require('./build/CoinCollector.json');


const provider = new HDWalletProvider({
    mnemonic: "wide page grab obtain advance comic stand ranch ripple scrub choice thought",
    providerOrUrl: "https://ropsten.infura.io/v3/29c51a2261c3427cb73a90dec424421a"
  });

  const web3 = new Web3(provider);

  const deploy = async () => {
    console.log("comes here yoo");

    try{
        const accounts = await web3.eth.getAccounts();
        const balance = await web3.eth.getBalance(accounts[0]);
        console.log("get balance for account 0: ", balance);

        console.log("attempting to deploy Coin from account", accounts[0]);

        var deployedCoinContract = await new web3.eth.Contract(compiledCoinContract.abi, )
        .deploy({data: '0x' + compiledCoinContract.evm.bytecode.object, arguments: ["0x7465737400000000000000000000000000000000000000000000000000000011", 11]})
        .send({gas: '5000000', from: accounts[0]});

        console.log('Coin contract deployed at: ', deployedCoinContract._address);

        deployedCoinContract = await new web3.eth.Contract(compiledNotCoinContract.abi, )
        .deploy({data: '0x' + compiledNotCoinContract.evm.bytecode.object, arguments: ["0x7465737400000000000000000000000000000000000000000000000000000022", 22]})
        .send({gas: '5000000', from: accounts[0]});

        console.log('NotCoin contract deployed at: ', deployedCoinContract._address);

        deployedCoinContract = await new web3.eth.Contract(compiledCoinCollectorContract.abi, )
        .deploy({data: '0x' + compiledCoinCollectorContract.evm.bytecode.object})
        .send({gas: '5000000', from: accounts[0]});

        console.log('CoinCollector contract deployed at: ', deployedCoinContract._address);
    }

    catch (err){
        console.log(err)
    }

  };

  deploy();
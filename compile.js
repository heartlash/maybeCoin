const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const contractPath = path.resolve(__dirname, 'contracts', 'maybeCoin.sol');


const source = fs.readFileSync(contractPath, 'utf8');

var input = {
    language: 'Solidity',
    sources: {
        'maybeCoin.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}; 


const compiledContracts = JSON.parse(solc.compile(JSON.stringify(input))).contracts;

console.log("checking the compiledContracts here: ", compiledContracts);

fs.ensureDirSync(buildPath);

for(let contract in compiledContracts['maybeCoin.sol']){
    console.log("see the contract here: ", contract);
    fs.outputJSONSync(
        path.resolve(buildPath, contract + '.json'),
        compiledContracts['maybeCoin.sol'][contract]
    );
}
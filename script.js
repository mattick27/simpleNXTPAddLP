window.onload=function(){

    const mintTokenButton = document.querySelector('.mintTokenButton');
    const approveTokenButton = document.querySelector('.approveTokenButton');
    const addLPButton = document.querySelector('.addLPButton');
    const routerAddressInput = document.querySelector('.routerAddressInput');
    const addressText = document.querySelector('.addressText');
    const testnetSelector = document.querySelector('.testnetSelector');
    const matamaskStatusText = document.querySelector('.matamaskStatusText');
    const TESTNETCONTRACTADDRESS = {
        'RINBEKY': '979588965099F4DEA3CAd850d67ca3356284591e',
        'GOERLI': 'Dc495507b830E5D1d8C073D4B12D144e76100816',
        'KOVAN': '71a52104739064bc35bED4Fc3ba8D9Fb2a84767f',
    }
    const TESTNETTOKENADDRESS = {
        'RINBEKY': 'B7b1d3cC52E658922b2aF00c5729001ceA98142C',
        'GOERLI': 'D426e23A6a9524101CDC017e01dDc3262B7aA65D',
        'KOVAN': 'B5AabB55385bfBe31D627E2A717a7B189ddA4F8F',
    }
    const CHAINID = {
        'RINBEKY': '0x4',
        'GOERLI': '0x5',
        'KOVAN': '0x2A',
    }
    let accounts = [];
    let ethereum = window.ethereum
    let testnet = undefined
    let routerAddress = undefined
    
    mintTokenButton.addEventListener('click', () => {
        let contractAddress = getContractAddress(testnet)
        let tokenAddress = getTokenAddress(testnet)
        let amount = '4563918244F40000'
        if ((contractAddress != `0`) && (tokenAddress != '0')) {
            ethereum
                .request({
                    method: 'eth_sendTransaction',
                    params: [
                        {
                            from: accounts[0],
                            to: `${tokenAddress}`,
                            value: '0',
                            data: `0x40c10f19000000000000000000000000${accounts[0].slice(2, accounts[0].length)}000000000000000000000000000000000000000000000000${amount}`,
                            gasPrice: '0x27236A47F',
                            gas: '0x3EC78',
                        },
                    ],
                })
                .then((txHash) => {
                    console.log(txHash)
                })
                .catch((error) => {
                    alert(`Couldn't request web3provider`)
                    console.error
                })
        } else if (contractAddress == '0') {
            alert(`Couldn't match testnet with contract`)
        } else {
            alert('999')
        }
    });
    addLPButton.addEventListener('click', () => {
        let contractAddress = getContractAddress(testnet)
        let tokenAddress = getTokenAddress(testnet)
        if ((contractAddress != `0`) && (tokenAddress != '0')) {
            ethereum
                .request({
                    method: 'eth_sendTransaction',
                    params: [
                        {
                            from: accounts[0],
                            to: `${contractAddress}`,
                            value: '0',
                            data: `0xe070da090000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000${tokenAddress}000000000000000000000000${routerAddress}`,
                            gasPrice: '0x27236A47F',
                            gas: '0x3EC78',
                        },
                    ],
                })
                .then((txHash) => {
                    console.log(txHash)
                })
                .catch((error) => {
                    alert(`Couldn't request web3provider`)
                    console.error
                })
        } else if (contractAddress == '0') {
            alert(`Couldn't match testnet with contract`)
        } else {
            alert('999')
        }
    });
    approveTokenButton.addEventListener('click', () => {
        let contractAddress = getContractAddress(testnet)
        let tokenAddress = getTokenAddress(testnet)
        if ((contractAddress != `0`) && (tokenAddress != '0')) {
            ethereum
                .request({
                    method: 'eth_sendTransaction',
                    params: [
                        {
                            from: accounts[0],
                            to: `${tokenAddress}`,
                            value: '0',
                            data: `0x095ea7b3000000000000000000000000${contractAddress}000000000000000000000000000000000000000000000000F563918244f40000`,
                            gasPrice: '0x27236A47F',
                            gas: '0x3EC78',
                        },
                    ],
                })
                .then((txHash) => {
                    console.log(txHash)
                })
                .catch((error) => {
                    alert(`Couldn't request web3provider`)
                    console.error
                })
        } else if (contractAddress == '0') {
            alert(`Couldn't match testnet with contract`)
        } else {
            alert('999')
        }
    });
    
    routerAddressInput.addEventListener('change', (e) => {
        addressText.innerHTML = e.target.value;
        routerAddress = e.target.value
    });
    
    testnetSelector.addEventListener('change', (e) => {
        testnet = e.target.value;
        getAccount()
    });
    function getContractAddress(testnet) {
        if (typeof testnet == 'string') {
            let testnetUpper = testnet.toUpperCase()
            return TESTNETCONTRACTADDRESS[testnetUpper]
        } else {
            return '0'
        }
    }
    function getTokenAddress(testnet) {
        if (typeof testnet == 'string') {
            let testnetUpper = testnet.toUpperCase()
            return TESTNETTOKENADDRESS[testnetUpper]
        } else {
            return '0'
        }
    }
    
    async function getAccount() {
        if (typeof testnet == 'string') {
            const chainId = CHAINID[testnet.toUpperCase()] // Polygon Mainnet
            try {
                accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                if (ethereum.networkVersion !== chainId) {
                    try {
                        await ethereum.request({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: chainId }]
                        });
                        matamaskStatusText.innerHTML = "MetaMask Status : Connected"
                    } catch (err) {
                        // This error code indicates that the chain has not been added to MetaMask
                        if (err.code === 4902) {
                            await ethereum.request({
                                method: 'wallet_addEthereumChain',
                                params: [
                                    {
                                        chainName: 'Goerli Testnet',
                                        chainId: chainId,
                                        nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
                                        rpcUrls: ['https://goerli.infura.io/v3/']
                                    }
                                ]
                            });
                        }
                        matamaskStatusText.innerHTML = "MetaMask Status : Please change your network"
                    }
                }
    
            } catch (error) {
                alert('connect error')
                matamaskStatusText.innerHTML = "MetaMask Status : Not Connect"
            }
        } else {
            console.log('please select network')
        }
    }
}
  

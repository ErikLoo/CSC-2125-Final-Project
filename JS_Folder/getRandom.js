	//the default current provider is metamask for some reason
    if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
     } else {
            // set the provider you want from Web3.providers
			// obtain this parameter from 
            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }

	var userAccount=null;

    window.addEventListener('load', connectMetaMask);

    async function connectMetaMask(){
        // Wait for loading completion to avoid race conditions with web3 injection timing.
    if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      // Acccounts now exposed
      return web3;
    } catch (error) {
      console.error(error);
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    // Use Mist/MetaMask's provider.
    const web3 = window.web3;
    console.log('Injected web3 detected.');
    return web3;
  }
  // Fallback to localhost; use dev console port by default...
  else {
    const provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
    const web3 = new Web3(provider);
    console.log('No web3 instance injected, using Local web3.');
    return web3;
  }
    }
      //create some fake users to demo redistribution
		// var userAccount;

    var accountTimer = setInterval(() => {
            web3.eth.getAccounts().then(e => {
                userAccount = e[0];
                console.log("user account: " + userAccount);
    
                if(userAccount!=null){
                    // startRequestingTime();
                }
            }) 	
            if (userAccount!=null){
                clearInterval(accountTimer); 
            }
          }, 1000);

        var myContract = new web3.eth.Contract(
            [
                {
                    "inputs": [],
                    "name": "getRandomNum",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ]
            ,'0x1a8ba777E2D9D87a6949B7761b79FA825E481236'

		)


    function getRandomNum(){
        myContract.methods.getRandomNum().call(function(error, result){
            if(!error)
                {   
                    console.log("returned num: " + result);
                    $(".currentRandomNum").text(result);
                    numLog.push(result); 

                }
            else{
                console.error(error);
            }
        });
    }


   
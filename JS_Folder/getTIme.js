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
                    "name": "getBlockTime",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "probeContract",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "returnNum",
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
            ,'0x5466ac37c644677DC67F7BC54821bdB06E92dD7e'

		)

		// find contract address from Remix ide
    // var test = testContract.at('0x18f5625bCD7e2FDE57FC69B8C98d7e93738A57A8');
	// console.log(testContract); 
    function submitTime(year,month,day,hr,min,sec){
        //convert your local time to UTC
        myContract.methods.calSubmissionDiff(year,month,day,hr,min,sec).send({from: userAccount},function(error, result){
            if(!error)
                {   
                    var time = year + "-" + month + "-" + day + " " + hr + ":" + min + ":" + sec;
                    console.log("submit time " + time + " to smart contract");      
                    getTime();            
                }
            else {
                console.error(error);
            }
        });

    }
    function probeContract(){
        myContract.methods.probeContract().send({from: userAccount},function(error, result){
            if(!error)
                {   
                    console.log("probing contract");      
                }
            else {
                console.error(error);
            }
        });
    }


    function getNum(){
        myContract.methods.returnNum().call(function(error, result){
            if(!error)
                {   
                    console.log("returned num: " + result);
                }
            else{
                console.error(error);
            }
        });
    }

    // function getTime(){
    //     //request the current task created by the smart contract
    //     myContract.methods.getSubmissionDiff().call({from: userAccount},function(error, result){
    //         if(!error)
    //             {   
    //                 console.log("Block: " + result);
    //                 setTimeDisplay(result);
    //             }
    //         else{
    //             console.error(error);
    //         }
    //     });
    // }

    function updateTime(){
        //request the current task created by the smart contract
        myContract.methods.getBlockTime().call(function(error, result){
            if(!error)
                {   
                    // console.log("Block: " + result);
                    //display block time
                    setBlockTimeDisplay(convertUNIXToLocal(result));
                    //display local time
                    setLocalTimeDisplay(getCurrentDateTimeInStr());
                    calDiff($(".currentBlockTime").text(),$(".currentLocalTime").text());

                }
            else{
                console.error(error);
            }
        });
    }

    function setBlockTimeDisplay(currentTime){
        $(".currentBlockTime").text(currentTime);
    }

    
    function setLocalTimeDisplay(currentTime){
        $(".currentLocalTime").text(currentTime);
    }

    function calDiff(blockT, localT){
        var blockT_int = strToInt(blockT);
        var localT_int = strToInt(localT);
        var diff = (blockT_int[0] - localT_int[0])*3600 + (blockT_int[1] - localT_int[1])*60 + blockT_int[2] - localT_int[2];
        console.log(diff);
        //save the diff to local txt
        timeLog.push(diff);
        return diff
    }
    
    function strToInt(input_str){
        input_list = input_str.split(":");
        return [parseInt(input_list[0]),parseInt(input_list[1]),parseInt(input_list[2])];
    }

    function convertUNIXToLocal(unix_timestamp){
                // Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return formattedTime;
    }


   
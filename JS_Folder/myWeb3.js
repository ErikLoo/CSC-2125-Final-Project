    	//the default current provider is metamask for some reason
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
     } else {
            // set the provider you want from Web3.providers
			// obtain this parameter from 
            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }

        // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

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
    // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
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
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "user",
                            "type": "address"
                        }
                    ],
                    "name": "addUser",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "checkInUse",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "clockEndIn",
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
                    "name": "createCurrentTaskID",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getAccountBalance",
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
                    "name": "getCurrentTaskID",
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
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "range",
                            "type": "uint256"
                        }
                    ],
                    "name": "getRandom",
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
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "exclude",
                            "type": "address"
                        }
                    ],
                    "name": "getRandomUserAddress",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "returnFunds",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "cTimeStamp",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "todayTaskTimeStamp",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "fTimeStamp",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "today",
                            "type": "bool"
                        }
                    ],
                    "name": "setAlarm",
                    "outputs": [],
                    "stateMutability": "payable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "submission",
                            "type": "string"
                        }
                    ],
                    "name": "submitAndVerify",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "taskStartIn",
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
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "transfer",
                    "outputs": [],
                    "stateMutability": "payable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "name": "users",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "balance",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "inUse",
                            "type": "bool"
                        },
                        {
                            "internalType": "uint256",
                            "name": "unlockAfter",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "timeOffset",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "numTaskToDo",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "numTaskComp",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "currentTaskId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "currentTaskAttempted",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "taskStartAt",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "active",
                            "type": "bool"
                        },
                        {
                            "internalType": "bool",
                            "name": "endOfContract",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ]
            ,'0x7675ebBd863817c5Ba98665F4a92f0FEB2895C70'

		)

		// find contract address from Remix ide
    // var test = testContract.at('0x18f5625bCD7e2FDE57FC69B8C98d7e93738A57A8');
	// console.log(testContract); 
	function createAndRequestTaskID(){
       
        //request the smart contract to create a task id
        myContract.methods.createCurrentTaskID().send({from: userAccount,gas:3000000},function(error, result){
            if(!error)
                {   
                    alert("Time to work on the task");
                    //if succesuffly created task id then get the current task id
                    getTaskID();
                }
            else
                console.error(error);
        });

    }

    function getTaskID(){
        //request the current task created by the smart contract
        myContract.methods.getCurrentTaskID().call({from: userAccount},function(error, result){
            if(!error)
                {   
                    console.log("Current task id: " + result);
                    switch_src_to(result);
                }
            else{
                console.error(error);
            }
        });
    }

    function getTimestamp(){
        myContract.methods.checkDateAndTime().call(function(error, result){
            if(!error)
                {   
                    console.log("time stamp");
                    console.log(result);
                }
            else
                console.error(error);
        });
    }

    //get account balance before withdrawing the money
    function getAccountBalance(){
        myContract.methods.getAccountBalance().call(function(error, result){
            if(!error)
                {   
                    // console.log("account balance: "+ result);
                    // console.log(result);
                    // $(".balanceLeft").text(parseInt(result));
                }
            else
                console.error(error);
        });
    }

    var task_id; 
    function switch_src_to(src_id){
        task_id = src_id; 
        var aud = document.getElementById('myAudio');
        $("#audio_src").attr("src","audios/audio_"+src_id +".mp3");
        aud.load(); 
      }


    function setAlarm(c_year,c_month,c_day,c_hr,c_min,c_sec,f_year,f_month,f_day,f_hr,f_min,f_sec,today){
        var cTimeStamp = convertToUnix(c_year,c_month,c_day,c_hr,c_min,c_sec);
        var todayTaskTimeStamp = convertToUnix(c_year,c_month,c_day,f_hr,f_min,f_sec);
        var fTimeStamp = convertToUnix(f_year,f_month,f_day,f_hr,f_min,f_sec);

        //convert your local time to UTC
        myContract.methods.setAlarm(cTimeStamp, todayTaskTimeStamp,fTimeStamp,today).send({from: userAccount,value:parseFloat($(".deposit").val())*10**18,gas:3000000},function(error, result){
            if(!error)
                {   
                    console.log("Future time set");                        
                }
            else {
                console.error(error);
            }
        });

    }

    function checkGas(){
        myContract.methods.setAlarm(2021,4,3,11,30,30,true).estimateGas({gas: 3000000}, function(error, gasAmount){
            if(gasAmount == 3000000){
                console.log('Method ran out of gas');
            }else{
                console.log('there is still gas left'); 
            }
        });
    }


    function claimDeposit(){
        //attemp to claim the funds
        // if not successfully try it in 10 seconds  
        setTimeout(function(){ 
            console.log("attemp to reclaim deposit");
            myContract.methods.checkInUse().call(function(error, result){
                if(!error)
                    {      
                        //start withdraw if the amount of larger than zero
                        //reclaim funds when the smart contract has finsished its use
                        if(result==false){                     
                             myContract.methods.returnFunds().send({from: userAccount},function(error, result){
                            if(!error)
                                {                                   
                                   alert("Deposit successfully returned");
                                }
                            else{
                                   alert("You have no balance to be returned");
                                // console.log(error);
                            }    
                    });
                        }else{
                            console.log("The contract is in use. Wait for it to finish.");
                        }
    
                  }
                else{
                    console.log(error);
                }
            });
            
        }
            , 10*1000);       
        
    }

    //can attempt to solutions three times in total, 2 local and 1 smart contract
    var numTrials=2;
    function localVerification(){
        if(verifySubmission($("#answer").val())||numTrials==0)
        {
            submitResults();
            numTrials=2;
        }else{
            alert("Incorrect answer. You have " + numTrials + " trials left");
            numTrials--; 
        }
    }


    function verifySubmission(input_str){
        if(convertToHash(stringStripper(input_str))==answers[task_id]){
            return true; 
        }
        return false;
    }

    function convertToHash(input_str){
        return parseInt(web3.utils.keccak256(input_str));
    }

    function submitResults(){
        //verify the submission locally first
        //submit to smart contract
        myContract.methods.submitAndVerify(stringStripper($("#answer").val())).send({from: userAccount,gas:3000000},function(error, result){
            if(!error)
                {   
                    alert("Results submitted to blockchain");
                    //if succesuffly created task id then get the current task id
                }
            else{
                console.log("Error when submitting results");
                console.log(error);
            }
        });
        clearInterval(countDownTimer);

        //disable submission
        $("#answer").prop("disabled",true); 
        $(".confirm_but").prop("disabled",true)
        //clear the answer box
        $("#answer").val("");
        getTaskTime(); 

        $(".timeLeft").text('120 s');

        //attemp to claim the deposit after each submission
        claimDeposit(); 
    }


    function stringStripper(input_str){
        //remove all punctuations
        return input_str.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`'~ ()]/g,"");
    }


    function getTaskTime(){
        var myTimer = setInterval(() => {
            myContract.methods.taskStartIn().call(function(error, result){
                if(!error)
                    {   
                        console.log("obtained task start time" + result);
                        if (result>0){
                            startTaskTimer(result);
                            clearInterval(myTimer);
                        }else{
                            // startTaskTimer(getFutureDateTimeInSecs()-getCurrentDateTimeInSecs());
                            // clearInterval(myTimer);
                        }
                    }                        
                else{
                    console.log("Failed to get task time")
                    // console.log(error);

                }
            });
    }, 1*1000);
    }


    function getClockTime(){
        var myTimer = setInterval(() => {
            myContract.methods.clockEndIn().call(function(error, result){
                if(!error)
                    {   
                        console.log("obtained clock end time: " + result);
                        if (result>0){
                            startClockTimer(result);
                            clearInterval(myTimer);
                        }
                        }                        
                else{
                    console.log("Failed to get clock time");
                    // console.log(error);

                }
            });
    }, 1*1000);

    }

    

    function checkInUse(){
        myContract.methods.checkInUse().call({from:userAccount},function(error, result){
            if(!error)
                    {   
                        
                        if (result == false){
                            console.log("contract not in use");
                            enable_clock();
                            show_clock_hide_pow(); 
                            disable_submission();
                        }else{
                            console.log("contract in use");
                            hide_clock_show_pow(); 
                            disable_clock();
                            // disable_submission();
                        }
                        // console.log("alarm in use: " + result);
                    }                        
            else{
                console.log(error);
                }
            });
  
    }


    function convertToUnix(yr,mon,day,hr,min,sec){
        var mon_array = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

        if(hr<10){hr = '0' + hr;}

        if(min<10){min = '0' + min;}

        if(min<10){sec = '0' + sec;}

        Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };
        if(!Date.now) Date.now = function() { return new Date(); }
        Date.time = function() { return Date.now().getUnixTime(); }
        
        var dateString = day + " " + mon_array[mon-1] + " " + yr + " " +hr + ":" +min + ":" +sec + " GMT";
        // var today =  new Date('6 Apr 2021 16:58:00 GMT').getUnixTime();
        // console.log(dateString);
        var unixTime =  new Date(dateString).getUnixTime();

        // return convertUNIXToLocal(unixTime);
        return unixTime; 
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
        // console.log("Y: " + date.getFullYear() + " M: " + parseInt(date.getMonth()+1)+ " D: " + date.getDate() + " | " + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2));
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        return formattedTime;
}


    var answers = [
        75803203127182387464257581521261784097993205909827921866785100753497825982342,
        59815314260982107531550902032105512557016869562124523781114973427070226406843,
        12729216420213914057136486716082152021723905350404134353453115119157222175635
    ];


    function currentTimeInUnix(){
        var c_time = getCurrentDateTime();
        return convertToUnix(c_time[0],c_time[1],c_time[2],c_time[3],c_time[4],c_time[5]);
    }
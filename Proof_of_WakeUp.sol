// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.1;

contract PoW{
    
    //need to add public other state variables won't update
     mapping(address => User) public users;
    //create an array that stores all the hashes
    
    struct User {
     uint256 balance;
     bool inUse; //0: not in use 1: in use. 
     //withdraw are prohibited until the set time in the future
     uint256 unlockAfter;
     //time offset used to adjust different time zones to UTC
     uint256 timeOffset;
     //the number of tasks for the user to do. Determine how much deposit to be returned
     uint256 numTaskToDo;
     //the number of tasks that have been successfully completed
     uint256 numTaskComp; 
     //the current task id that points to an auido file
     uint256 currentTaskId;
     uint256 currentTaskAttempted;// 0: not attemped 1:attempted
     //the start time for the next task
     uint256 taskStartAt;
     bool active; //check if the user's account has been activated
     bool endOfContract; //check if the end of the contract has been reached

     }
     
     mapping(address => uint256) public unlockAfter;
      
     
     //record all the user addresses. used for reward redistribution
     address[] userList;
    //  address[] userList;

     
     //the correct hashes for the submission
     uint256[] answers = [
         75803203127182387464257581521261784097993205909827921866785100753497825982342,
         59815314260982107531550902032105512557016869562124523781114973427070226406843,
         12729216420213914057136486716082152021723905350404134353453115119157222175635
     ];
     

   function getAccountBalance() public view returns (uint256){
      //get the balance for an account
      return  users[msg.sender].balance;
   }
   
    
    function addUser(address user) public {
        //add a new user to user_list
        if(users[user].active==false){
            userList.push(user); 
            users[user].active=true;
        }
    }
    
//   send the future time to the contract
    function setAlarm(uint256 cTimeStamp, uint256 todayTaskTimeStamp, uint256 fTimeStamp,bool today) public payable{
        require(users[msg.sender].inUse==false,"The contract is in use");
      //setOffset first
        addUser(msg.sender); 
        users[msg.sender] = User(0,false,0,0,0,0,0,0,0,true,false); 
        users[msg.sender].timeOffset=cTimeStamp-block.timestamp;

        //deposit the funds
        uint256 amount = msg.value; 
        //uncomment this following line for the final implementation
        require(amount>0,"Deposited amount cannot be zero");
        users[msg.sender].balance+=amount; 
        users[msg.sender].unlockAfter = fTimeStamp -  users[msg.sender].timeOffset;  
        
        unlockAfter[msg.sender] = fTimeStamp -  users[msg.sender].timeOffset;  
        
        //convert to utc adjusted for different time zones
        uint256 taskTimeToday = todayTaskTimeStamp- users[msg.sender].timeOffset;
        
        users[msg.sender].numTaskToDo = uint256((users[msg.sender].unlockAfter-block.timestamp)/24 hours)+1;
         //do the first task today
        if (taskTimeToday> block.timestamp){
                //determine whether to day the task today or not
              if (today==true){
                users[msg.sender].numTaskToDo = uint256((users[msg.sender].unlockAfter-block.timestamp)/24 hours)+1;
                //do the first task today
                users[msg.sender].taskStartAt = taskTimeToday; 
                }else{
                users[msg.sender].numTaskToDo = uint256((users[msg.sender].unlockAfter-block.timestamp)/24 hours);
                //do the first task the next day
                users[msg.sender].taskStartAt = taskTimeToday +24 hours;
            }            
        }else{
                users[msg.sender].numTaskToDo = uint256((users[msg.sender].unlockAfter-block.timestamp)/24 hours)+1;
                users[msg.sender].taskStartAt = taskTimeToday+24 hours; 
        }
        
        users[msg.sender].inUse = true;
    }
    
    
    function submitAndVerify(string memory submission) public {
        //make sure the task was not attempted twice on the same day
        require(users[msg.sender].currentTaskAttempted == 0,"You have already submitted today");
        
    
        //make sure the solution is submitted ontime not too late or too early and the submission matches the answer
        if(block.timestamp<users[msg.sender].taskStartAt + 5 minutes && block.timestamp>=users[msg.sender].taskStartAt - 5 minutes && converToHash(submission)==answers[users[msg.sender].currentTaskId]){
            users[msg.sender].numTaskComp+=1;
        }
        //set the tasks status to "attempted"
        users[msg.sender].currentTaskAttempted = 1;
        //advance the timer by another 24 hours
        //do not advance if it's the last day
        if ( users[msg.sender].taskStartAt+24 hours<users[msg.sender].unlockAfter + 5 hours){
                users[msg.sender].taskStartAt+=24 hours; 
        }else{
                //call redistrbution if it is the last day
                redistribution(msg.sender);
        }   
    }
    

    
    function createCurrentTaskID() public{
            //uncomment this following line for the final implementation
            require( users[msg.sender].endOfContract==false,"You cannot no longer request a new task ID. Please set up a new alarm!");
            require (block.timestamp<users[msg.sender].taskStartAt + 5 minutes && block.timestamp>=users[msg.sender].taskStartAt - 5 minutes,"Not yet time for the task");
            //get a random task id from a random num generator
            uint taskID = getRandom(3);
            //update current task id for each address
            users[msg.sender].currentTaskId = taskID;
            //restore the current task status to "not attempted"
            users[msg.sender].currentTaskAttempted = 0; 

    }
    
    function getRandom(uint range) public view returns (uint) {
        //generate a random number between 0 and 3 for the purpose of the demo
        uint randomHash = uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty)));
        return randomHash % range;
    } 
      
    function getCurrentTaskID() public view returns(uint256){
        return users[msg.sender].currentTaskId;
    }
    
    
    
    function returnFunds() public {
        require( users[msg.sender].endOfContract==true,"Waiting for redistribution");
        require(block.timestamp>=users[msg.sender].unlockAfter,"Not yet unlocked");
        require(users[msg.sender].balance>0,"Your have no balance!");
        //return what's left and empty the user account
        uint256 amount = users[msg.sender].balance; 
        users[msg.sender].balance-=amount; 
        
        payable(msg.sender).transfer(amount);
    }
    
    function redistribution(address exclude) private {
        
        //redistribute the reward only when there is more than one user
        //return the funds to the orginal user if no one else is using the contract
        if(userList.length>1){
             uint256 amount_left = uint256(users[msg.sender].balance*users[msg.sender].numTaskComp/users[msg.sender].numTaskToDo);
             //redistribute the money to someone else using a random selector to select someone
            uint256 amount_transfer = users[msg.sender].balance - amount_left;
            if(amount_transfer>0){
                address recipient = getRandomUserAddress(exclude);
                transfer(recipient,amount_transfer);
            }
        //set the user's balance to what is left
            users[msg.sender].balance  = amount_left;     

        }
        
        users[msg.sender].endOfContract = true;
              //restore the contract to not-in-use
        users[msg.sender].inUse = false;
      
    }
    
     function transfer(address to, uint256 amount) payable public{
        // transfer ether to an address
        payable(to).transfer(amount); 
    }
    
     //pick a winnder to receive the reward
    function getRandomUserAddress(address exclude) public view returns(address){
        //
        uint256 userID = getRandom(userList.length);
        
        //if the current user is selected
        //then select the user next to him
        if(userList[userID]==exclude){
            if(userID==userList.length-1){
                userID-=1; 
            }else{
                userID+=1; 
            }
        }
        
        return userList[userID]; 
    } 
    
    //return the time between now and the next task
    function taskStartIn() public view returns(uint256){
        return users[msg.sender].taskStartAt-block.timestamp; 
    }
    
    //return the time between now and the end of the alarm 
    function clockEndIn() public view returns(uint256){
        return users[msg.sender].unlockAfter-block.timestamp;
    }
    //check if the contract is in use
    function checkInUse() public view returns(bool){
        return users[msg.sender].inUse;   
        // return inUse[msg.sender];
    }
    

    
    function converToHash(string memory txt) private pure returns(uint256){
        return uint256(keccak256(abi.encodePacked(txt)));
    }
    
  
    
   
}
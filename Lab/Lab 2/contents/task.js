//importing crypto-js package which is needed for generating hash
const SHA256 = require("crypto-js/sha256");

//  create a function that create block. You can assume it as a template like class in OOP which create block from a blueprint
// it takes blockNo, timestamp, userData, previousHash as parameters to create a new single block
function createNewBlock( blockNo, timestamp, userData, previousHash){
    const newBlock = {
        blockNo: blockNo,
        timestamp: timestamp,
        userData: userData,
        previousHash: previousHash,
    }
    newBlock.blockHash = generateHash( newBlock )

    return newBlock
}


// this function taskes block object as parameters and create a hash from the content of the provided block object
function generateHash( block ){
    const hash = SHA256( block.blockNo + block.timestamp + block.previousHash + JSON.stringify( block.userData )).toString()
    return hash
  }

// creating the genesis block
// genesis block is the very first block of a chain
function createGenesisBlock(){
    const genesis = createNewBlock(0, new Date(), "Genesis block is the first block of a blockchain network", "0");
    return genesis
}

// this function takes a chain network and returns the last block of a the chain
function getTheLatestBlock( chainNetwork ){
    return chainNetwork.blockchain[ chainNetwork.blockchain.length - 1 ];
}

// this function create a sample network of blockchain
// this network holds: a blockchain and a miningPool where pending block stays to be added into the chain by miners 
function chainNetworkTemplate(){
    const chainNetwork = {
        blockchain: [ createGenesisBlock() ], 
        miningPool: []
    }
    return chainNetwork
} 


// this function will create an account and return the account details
// Here an account holds the address and balance
function createUserAccount( userAddress ){
    const address = userAddress
    const balance = 100
    return { address, balance }
}

// this function takes miner and chainNetwork info and start mining block
function mine( miner, chainNetwork ){
    console.log(`**************************************************************** 
                *************************** Mining Started **********************
                ****************************************************************`)
    setTimeout( () => {
        /* ############################################
        **
        **    YOU HAVE TO COMPLETE THIS IN STEP 5
        **
        #################################################*/
        /*TO COMPLETE THIS STEP YOU HAVE TO:
            1) loop through the miningPool of chainNetwork. EVery loop you will get one Block. Consider this as pending block | SUGGESTION: you can utilize forEach loop
            2) add the blockHash reference of the previous block to the previousHash property of the pending block | Bonus for you: Utilize getTheLatestBlock function
            3) push the pending block into the blockchain property of the chainNetwork
            4) loop through all the property of the miningPool of chainNetwork and repeat 1 - 4
        */  

        chainNetwork.miningPool.forEach(poolData => {
            const pendingBlock = poolData.newBlock;
            pendingBlock.previousHash = getTheLatestBlock(chainNetwork).blockHash;
            chainNetwork.blockchain.push(pendingBlock);

            // balance deduct [Checkpoint 4]
            appUser.balance -= 5;
            miner.balance += 5;
        });

        
        
        
        // YOU SHOULD WRITE CODE FOR STEP 5 ABOVE THIS LINE

        /*#######################################
        *
        *   WRITE CODE FOR STEP 7 FROM BELOW
        *
        * #####################################*/
       
        //  code here for step 7...........
        // Clear the mining pool after mining
        chainNetwork.miningPool = [];

        // YOU SHOULD WRITE CODE FOR STEP 7 ABOVE THIS LINE 
        console.log('******** Blockchain Updated **********')
        checkNetWorkStatus( bracuChainNetwork, appUser, miner )
    }
    , 3000)
}


// this function takes userData, sender, chainNetwork info and send the request that came from user(sender) into the mining pool
function sendReqToPool( userData, sender, chainNetwork ){
    /*##############################################################################################
         THIS FUNCTION IS INCOMPLETE. YOU WILL COMPLETE THE FUNCTION IN STEP 3 
            - YOU HAVE TO CREATE A NEW BLOCK AND STORE IT IN A VARIABLE CALLED newBlock
            - WHILE CREATING THE NEW BLOCK, THE blockNo PARAMETER OF THE NEW BLOCK WILL BE EQUAL TO THE SUM OF THE LENGHT OF blockchain and miningPool ARRAY WHICH IS AVAILABLE IN chainNetwork  
    ##########################################################################################################################################################################*/

    // Code Here..........
    const blockNo = chainNetwork.blockchain.length + chainNetwork.miningPool.length;
    const newBlock = createNewBlock(blockNo, new Date(), userData, getTheLatestBlock(chainNetwork).blockHash);

    // YOU CODE SHOULD BE AVOBE THIS LINE
    const poolData = { newBlock, sender }
    chainNetwork.miningPool.push( poolData )
}


// This function send a request to the pool. For this, user(sender) need a minimal amount of crypto.  
function  createTransactionRequest( userData, sender, chainNetwork ){
    if( sender.balance > 5 ){
        // if user has enough balance, can send request to pool so the block can be mined by miners
        sendReqToPool( userData, sender, chainNetwork )
    }
    else{
        // if balance in not suffeciant, request will be rejected
        console.log( `User do not have enough balance. Request failed` )
    }
}


// this function takes bracuChainNetwork, appUser, miner as parameters and console/print the current status of the chain, miner and user
function checkNetWorkStatus( bracuChainNetwork, appUser, miner ){
    console.log( JSON.stringify({ bracuChainNetwork, appUser, miner }, 'null', 4 ))
}

/************************************************************
**************** Function Definition Ends Here **************
*************************************************************/

/****************************************************************
*************  Code To Run The Program Starts From Here  ********
*****************************************************************/
// ###########################################################################
//                                                                          ##
// #### NOTE: First open the Lab02 folder in VSCode and Run command: npm i         ##
//                                                                          ##
// ###########################################################################


// To interact with any blockchain we need a network. Therefore, first create a chain network.   
// You can imagine this similar to the Ethereum Mainnet/Goerli Testnet that we used in our first lab 
const bracuChainNetwork = chainNetworkTemplate()

// To complete transaction or sending data we need a user account. Therefore, create a user account. 
// To make it simple you need to pass a dummy address here. However, in real blockchain the address is created autometically by the system
// You can imagine this similar to the metamask account that we used in our last lab 
const appUser = createUserAccount('0x1234') 


// ****************************************************************
//                                                               **
//                  LAB TASK STARTS FROM BELOW                   **
//                                                               **
// ****************************************************************

/*****************************************************************
############################ STEP 1 ##############################
**** CREATE A MINER IN A SIMILAR WAY THAT WE CREATED appUser *****
#################################################################*/

// To validate and add a block into the chain we need miners. Miners also have account. Therefore, create an account for a miner. 
// To create and make it simple you need to pass a dummy address as parameters such as : '0x11111', '0xabcd' etc. However, in real blockchain the address is created autometically by the system
/* In our last lab, we saw after sending transaction request, the transaction remains in pending status. After a while, the transaction is
     added into the blockchain by some miners. If you can remember, we saw the miners name in etherscan.io. */

// Create a miner from here:

// code here........
const miner = createUserAccount('0x11111');

// Your code should be above this line


// creating student data for the first transaction
const firstStudentData =  {
    studentID: "11111111",
    cgpa: '3.5'
}

/**##############################################################################################
**************************************** STEP 2 *************************************************
**
**  CREATE YOUR FIRST TRANSACTION REQUEST BY CALLING THE createTransactionRequest FUNCTION *****
**
################################################################################################*/
// ############## check the createTransactionRequest function how it is defined. Now call the function below: 
// This function will send student data, appUser(wallet user/ sender) and bracuChainNetwork

// This function will send student data, appUser(wallet user/ sender) and bracuChainNetwork
createTransactionRequest(firstStudentData, appUser, bracuChainNetwork, 0);


//  Code for createTransactionRequest function call should be above this line



/**###########################################################################################################################
**************************************** STEP 3 ******************************************************************************
**
** NOW CHECK THE createTransactionRequest FUNCTION WHICH CALLS ANOTHER FUNCTION NAME: sendReqToPool.
** CURRENTLY, sendReqToPool FUNCTION IS INCOMPLETE. YOU HAVE TO COMPLETE THAT FUNCTION **
**
#############################################################################################################################*/




/**##############################################################################################
**************************************** STEP 4 *************************************************
**
*********** NOW CHECK THE NETWORK STATUS BY CALLING THE checkNetWorkStatus FUNCTION *************
**
################################################################################################*/
// ############## check the checkNetWorkStatus function how it is defined. Now call the function below: 

// code here........
checkNetWorkStatus(bracuChainNetwork, appUser, miner);

// ################# Code for checkNetWorkStatus function call should be ablove this line.


// NOW, RUN THE COMMAND IN YOUR TERMINAL: node task.js 
// YOU SHOULD HAVE A ANSWER SIMILAR TO THE IMAGE_1
// YOU WILL SEE YOUR NEW BLOCK IS NOW IN "miningPool" AND THERE IS ONE BLOCK  "blockchain" WHICH IS THE GENESIS BLOCK
// IF YOU GET A SIMILAR ANSWER, SHOW IT TO YOUR TEACHER ( CP-1 )
// AFTER SHOWING YOUR TEACHER, REMOVE/COMMENT THE checkNetWorkStatus function call
//
//  $$$$$$$$$$$$$$$$$$$$$$$$ CHECKPOINT: 1 $$$$$$$$$$$$$$$$$$$$$$$$



/**#####################################################################################################
**************************************** STEP 5 ********************************************************
**
** THE BLOCK IS NOW PENDING IN THE MINING POOL. NOW YOU HAVE TO MINE IT, SO THAT IT CAN BE ADDED IN THE CHAIN.
** TO DO THAT, YOU HAVE TO COMPLETE THE FUNCTION CALLED: mine()
**
#######################################################################################################*/



/**#####################################################################################################
**************************************** STEP 6 ********************************************************
**
** NOW, CALL THE mine FUNCTION AND RUN THE PROGRAM USING THE COMMAND: node task.js AND 
** YOU SHOULD SEE A RESPONSE LIKE IMAGE_2 IN YOUR TERMINAL
** IF YOU GET IT RIGHT SHOW THIS TO YOUR TEACHER ( CP-2 )
**
** $$$$$$$$$$$$$$$$$$$$$$$$ CHECKPOINT: 2 $$$$$$$$$$$$$$$$$$$$$$$$
**
#######################################################################################################*/
// CALL mine FUNCTION BELOW

// code here...
mine(miner, bracuChainNetwork);

// YOUR FUNCTION CALL SHOULD BE DONE BY THIS LINE



/**#####################################################################################################
**************************************** STEP 7 ********************************************************
**
** IN THE IMAGE_2, YOU CAN SEE THAT THE blockchain OBJECT HAS A NEW BLOCK WHICH IS ALSO AVAILABLE IN THE miningPool. 
** THIS HAPPEND BECAUSE IN STEP 6 WE MINED THE NEW BLOCK FROM miningPool BUT DIDN'T REMOVE THAT BLOCK FROM miningPool.
** THEREFORE, WE SEE THIS AS A DUPLICATE VALUE IN THE miningPool. YOU SHOULD KNOW THAT, WHEN BLOCKs GET MINED FROM miningPool. IT GETS EMPTY   
** THEREFORE, NOW YOU HAVE TO MODIFY THE mine FUNCTION FOR STEP 7, SO THAT the miningPool GETS EMPTY.
** AFTER MODIFICATION FOLLOW THE INSTRUCTIONS BELOW:
** NOW, AGAIN RUN task.js FILE IN THE TERMINAL AND YOU SHOULD SEE RESPONSE LIKE IMAGE_3
** THE miningPool IS EMPTY NOW. IF YOU GET IT RIGHT SHOW THIS TO YOUR TEACHER
**
** $$$$$$$$$$$$$$$$$$$$$$$$ CHECKPOINT: 3 $$$$$$$$$$$$$$$$$$$$$$$$
**
#######################################################################################################*/




/**#####################################################################################################
**************************************** STEP 8 ********************************************************
**
** TILL NOW, YOU HAVE SUCCESSFULLY MINED A NEW BLOCK AND UNDERSTOOD HOW THE BLOCK CREATIION, PENDING, MINING PROCESS WORK
** BUT DO YOU REMEMBER, WE EXCHANGED SOME CRYPTO IN THE LAST LAB ?
** NOW, NOTICE IMAGE_3 AND YOU WILL SEE THE BALANCE OF appUser( sender ) AND miner ARE STILL 100
** BUT WE KNOW, SENDER PAY FOR TRANSACTION/STORING DATA AND MINER GETS PAID FOR MINING
** THEREFORE, NOW YOU HAVE TO MODIFY THE LOOP YOU CREATED IN STEP 5.
** INSIDE THAT LOOP, YOU HAVE TO DEDUCT BALANCE: 5 FROM sender( appUser ) FOR EACH BLOCK AND ADD BALANCE: 5 TO miner FOR EACH BLOCK THEY MINE
** NOW, AGAIN RUN THE task.js AND YOU SHOULD SEE SOMETHING LIKE IMAGE_4 IN THE TERMINAL, WHERE, appUser's balance: 95 and miner's balance: 105
** IF YOU GET IT RIGHT, SHOW THIS TO YOUR TEACHER
**
** $$$$$$$$$$$$$$$$$$$$$$$$ CHECKPOINT: 4 $$$$$$$$$$$$$$$$$$$$$$$$
**
#######################################################################################################*/




/**#####################################################################################################
**************************************** STEP 9 ********************************************************
** NOW, ADD TWO MORE BLOCK AND MINE IT. YOU WILL SEE SOMETHING LIKE IMAGE_5 
** SHOW IT TO YOUR TEACHER WHEN YOUR ARE DONE.

//  Your code goes here....

/**#####################################################################################################
** $$$$$$$$$$$$$$$$$$$$$$$$ CHECKPOINT: 5 $$$$$$$$$$$$$$$$$$$$$$$$
**
#######################################################################################################*/


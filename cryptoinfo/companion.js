$(document).ready(function(){
    var coin = "Ethereum"
    var wallet = ""
    var etherchain = "https://etherchain.org/api/account/" + wallet
    var coinmarketcap = "https://api.coinmarketcap.com/v1/ticker/" + coin + "/?convert=EUR"
    


    // function to recieve wallet info
    function ajaxwallet(url, wallet){
        $.ajax({
            url: url + wallet,
            method: "get",
            dataType: "json",
            success: function(data){

                //if fetched array is not empty
                if (!jQuery.isEmptyObject(data.data)){
                    var decimalbalance = data.data[0].balance / 1000000000000000000
                    console.log("You have " + decimalbalance + ' ' + coin + ' in your wallet')
                    
                    return decimalbalance
                //if fetched array is empty 
                }else{
                    
                    $("#wallet").val("")
                    $("#wallet").attr("placeholder", "Invalid address!");
                    console.log("address not found!")
                    return false 
                }     
            }
        })
    }

    //function to recieve coin info
    function ajaxcoin(){
        $.ajax({
            url: coinmarketcap,
            method: "get",
            dataType: "json",
            success: function(data){
                console.log("This is price of 1 " + coin )
                var round = parseFloat(data[0].price_eur).toFixed(2)
                console.log(round + ' EUR')
                
                     
            }
        })
    }
    //grabing wallet from page search
    function searchWallet(){
            wallet = $("#wallet").val()
        if (/^0x[a-fA-F0-9]{40}$/.test(wallet)){
            //console.log()
            coin = "Ethereum"
            $("#wallet").val("")
            $("#wallet").attr("placeholder", "Enter your Wallet address");
            ajaxwallet(etherchain, wallet)

        }else{
            $("#wallet").val("")
            $("#wallet").attr("placeholder", "Invalid address!");
            console.log("ivalid address")
        }


    }



    $(".getcoin").on("click", function(){  
        ajaxcoin()
    })

    
   $(".getaddres").on("click", function(){
        searchWallet()
       
    })
})

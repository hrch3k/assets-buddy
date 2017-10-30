$(document).ready(function(){
    var coin = "Ethereum"
    var wallet = ""
    var etherchain = "https://etherchain.org/api/account/" + wallet
    var coinmarketcap = "https://api.coinmarketcap.com/v1/ticker/" + coin + "/?convert=EUR"
    



    function ajaxwallet(url, wallet){
        $.ajax({
            url: url + wallet,
            method: "get",
            dataType: "json",
            success: function(data){
                if (data.length == 0){
                    parsed = JSON.stringify(data)
                    console.log("This is Wallet info")
                    console.log(data)
                }else{
                    $("#wallet").val("")
                    $("#wallet").attr("placeholder", "Invalid address!");
                    console.log("ivalid address") 
                }     
            }
        })
    }


    function ajaxcoin(){
        $.ajax({
            url: coinmarketcap,
            method: "get",
            dataType: "json",
            success: function(data){
                parsed = JSON.stringify(data)
                console.log("This is coin info")
                console.log(data)     
            }
        })
    }

    function searchWallet(){
            wallet = $("#wallet").val()
        if (/^0x[a-fA-F0-9]{40}$/.test(wallet)){
            //console.log()
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

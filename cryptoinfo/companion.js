$(document).ready(function(){
    coin = "Ethereum"
    function getCoininfo(coin_name){
        $.ajax({
            url: "https://api.coinmarketcap.com/v1/ticker/" + coin_name + "/?convert=EUR",
            method: "get",
            data: {q: coin },
            dataType: "json",
            success: function(data){
                parsed = JSON.stringify(data)

                console.log(data[0])     
            }
        })
    }
    
   $(".getaddres").on("click", function(){
        var wallet = $("#wallet").val()
        if (/^0x[a-fA-F0-9]{40}$/.test(wallet)){
            console.log(wallet)
            $("#wallet").val("")
            $("#wallet").attr("placeholder", "Enter your Wallet address");
        }else{
            console.log("ivalid address")
        }

    })
})

$(document).ready(function(){
    var coin = ""
    var wallet = ""
    var etherchain = "https://etherchain.org/api/account/" + wallet
    //var coinmarketcap = "https://api.coinmarketcap.com/v1/ticker/" + coin + "/?convert=EUR"
    var coinmarketcapall = "https://api.coinmarketcap.com/v1/ticker/"
    var bitcoinchain = "https://blockchain.info/q/addressbalance/"
    var decimalbalance = 1
    var floate = 0
    var allcoins = []
    var coinsid = {}


    
    
    
    // function to recieve wallet info
    function ajaxwallet(url, wallet, coin){
        $.ajax({
            url: url + wallet,
            method: "get",
            dataType: "json",
            async: false,
            success: function(data){
                
                //if fetched array is not empty
                if (coin != "Bitcoin"){
                    if (!jQuery.isEmptyObject(data.data)){
                        decimalbalance = data.data[0].balance / 1000000000000000000
                        ajaxcoin("ethereum")
                        console.log("1 " + coin + " is curently worth " + floate + " EUR"  )
                        console.log("You have " + decimalbalance + ' ' + coin + ' in your wallet')
                        console.log("This is currently " + (floate * decimalbalance).toFixed(2) + " EUR")
                    //if fetched array is empty 
                    }else{
                        
                        $("#wallet").val("")
                        $("#wallet").attr("placeholder", "Invalid address!");
                        console.log("address not found!")
                        return false 
                    }
                }else{
                    decimalbalance = data
                    ajaxcoin("bitcoin")
                    console.log("1 " + coin + " is curently worth " + floate + " EUR"  )
                    console.log("You have " + decimalbalance + ' ' + coin + ' in your wallet')
                    console.log("This is currently " + (floate * decimalbalance).toFixed(2) + " EUR")
                }
            }
        })
       
        
    }


    //function to recieve coin info
    function ajaxcoin(coin){
        $.getJSON("https://api.coinmarketcap.com/v1/ticker/" + coin + "/?convert=EUR", function( data ) {
            floate = parseFloat((data[0]).price_eur) 
            console.log(floate + " EUR")
            return floate
        })

    }



      /*  Stari request

        $.ajax({
            url: "https://api.coinmarketcap.com/v1/ticker/" + coin + "/?convert=EUR", 
            method: "get",
            dataType: "json",
            async: false,
            success: function(data){
                floate = parseFloat((data[0]).price_eur) 
                console.log(floate + "EUR")
                return floate       
            }
        })*/
        
    


    //grabing wallet from page search
    function searchWallet(){
            wallet = $("#wallet").val()
        if (/^0x[a-fA-F0-9]{40}$/.test(wallet)){
            //console.log()
            
            $("#wallet").val("")
            $("#wallet").attr("placeholder", "Enter your Wallet address");
            coin = "Ethereum"
            coinmarketcap = "https://api.coinmarketcap.com/v1/ticker/" + coin + "/?convert=EUR"
            ajaxwallet(etherchain, wallet, coin)
        }else if(wallet[0] == 1){
            if(!(wallet.legth < 26) && !(wallet.legth > 37)){
                console.log("jop this is bitcoin address")
                $("#wallet").val("")
                $("#wallet").attr("placeholder", "Enter your Wallet address");
                coin = "Bitcoin"
                coinmarketcap = "https://api.coinmarketcap.com/v1/ticker/" + coin + "/?convert=EUR"
                ajaxwallet(bitcoinchain, wallet, coin)
            }
            //(wallet.legth < 26 || wallet.legth > 35) && /^[a-zA-Z0-9]+$/i.test(wallet)
            
        }else{
            $("#wallet").val("")
            $("#wallet").attr("placeholder", "Invalid address!");
            console.log("ivalid address")
        }
        return coin = "Ethereum"
    }
    
     $.getJSON(coinmarketcapall, function( data ) {
        $.each(data, function(index){
            allcoins.push(data[index].name)
            var id = data[index].id
            var name = data[index].name
            coinsid[name] = id
            //var altname = $('<p>' + '<span>' + data[index].id  + '</span>' + '</p>');
            //$("#main").append(altname);
            //console.log(data[index].id)   

        })

        
        //floate = parseFloat((data[0]).price_eur) 
        //console.log(floate)

        return allcoins
    });

    //working coin search autocomplete but it is slow
    $("#selector").autocomplete({
        source: allcoins,
        minLength: 3 
    });


/* auto complete function need to repair  

    console.log(allcoins)
    var states = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      // `states` is an array of state names defined in "The Basics"
      local: allcoins
    });
    console.log(allcoins)
    $('#selector').typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    },
    {
      name: 'allcoins',
      source: states
    });
*/




    $(".getcoin").on("click", function(){
        input = $("#selector").val()
        console.log(input)
        //$("#selector").attr("placeholder", "Enter crypto currency");
        if (jQuery.inArray( input, allcoins) >= 0){
            coin = input
            ajaxcoin(coinsid[input])
            input = ""
            coin = ""
        }else{
            
            $("#selector").val("")
            $("#selector").attr("placeholder", "Coin does not exist");
            console.log("coin does not exist")
            input = ""
        } 
    })
    
   $(".getaddres").on("click", function(){
        searchWallet()
       
    })
})





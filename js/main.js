/**
 * Created by Земляничка on 20.01.2016.
 */

$(function(){
    var BASKET = $(".basket");
    var ITEM_TEMPLATE ='<div class="item">'+$(".item").html()+'</div>';
    var LIST_TEMPLATE = '<div class="li list_need">'+$(".li").html()+'</div>';
    var LIST = $('.shelf');
    var AMOUNT_CIRCLE = '<span class="list_amount">1</span>';

    $("#input").find("input").focus();

    $("#add").click(function(){
        var title = $("#input").find(":input").val();
        addItem(title);
        $("#input").find(":input").val("");

    });

    $(".item").each(function(i, item) {
        item = $(item); //to have access to all jQuery functions
        item.find(".de").click(function(){decrement(item);});
        item.find(".in").click(function(){increment(item);});
        item.find(".buy").click(function(){bought(item);});
        item.find(".n_buy").click(function(){notBought(item);});
        item.find(".close").click(function(){deleteItem(item);});
    });


    /*
    function updateNode(node, fn) {
        node.fadeOut(250, function(){
            fn();
            node.fadeIn(250);
        });
    }
    */
    function bought(node) {
        node.addClass("bought");
        node.find(".name").hide();
        //node.find(".name").addClass("hidden");
        //node.find(".but").hide();
        node.find(".amount").css("margin-left", "30px");
        node.find(".name_crossed").show();
        node.find(".close").hide();
        node.find(".n_buy").show();
        node.find(".buy").hide();

        $(".list_need").each(function(i, item) {
            var name = $(item).find(".liname").text();
            console.log(name);
            if(name == node.find(".name_crossed").text()){
                var temp = '<div class="li list_done">'+$(item).html()+'</div>';
                $(item).remove();
                $(".shelf_done").append(temp);
            }
        });
    }
    function notBought(node){
        node.removeClass("bought");
        /*
        node.find(".but").show();
        */
        node.find(".name").show();
        node.find(".name_crossed").hide();

        node.find(".amount").css("margin-left", "0px");
        node.find('.close').show();
        node.find(".buy").show();
        node.find(".n_buy").hide();

        $(".list_done").each(function(i, item) {
            var name = $(item).find(".liname").text();
            if (name == node.find(".name_crossed").text()) {
                var temp = '<div class="li list_need">' + $(item).html() + '</div>';
                $(item).remove();
                $(".shelf").append(temp);
            }
        });
    }
    function decrement(node){
        var old = parseInt($(node).find('.amount').text());
        if(old>1) old--;
        if(old==1){
            node.find(".de").attr("disabled", true);
        }
        node.find(".amount").text(old);
        $(".list_need").find(".liname").each(function(i, item) {
           var name = $(item).text();
            if(name == node.find(".name_crossed").text()){
                $(this).parent().find(".list_amount").text(old);
            }
        });
    }
    function increment(node){
        var old = parseInt($(node).find(".amount").text());
        if(old==1){
            node.find(".de").removeAttr("disabled");
        }
        old++;
        node.find(".amount").text(old);
        $(".list_need").find(".liname").each(function(i, item) {
            var name = $(item).text();
            if(name == node.find(".name_crossed").text()){
                $(this).parent().find(".list_amount").text(old);
            }
        });
    }
    function deleteItem(node){
        node.remove();
        var name = node.find(".name_crossed").text();
        $(".liname").each(function(i, item) {
            var title = $(item).text();
            if (name == title) {
                $(item).parent().remove();
            }
        });
    }
    function addItem(title) {
        var node = $(ITEM_TEMPLATE); //Create new HTML node
        node.addClass("item");
        node.find(".name").val(title); //Set product title
        node.find(".name_crossed").text(title);
        node.find(".amount").text(1);
//Changing amount
        node.find(".de").click(function(){decrement(node);});
        node.find(".in").click(function(){increment(node);});
        node.find(".buy").text("Куплено");
//Bought Action
        node.find(".buy").click(function(){bought(node); });
        node.find(".n_buy").click(function(){ notBought(node); });
//Delete Action
        node.find(".close").click(function(){deleteItem(node);});
        var linode = $(LIST_TEMPLATE);
        console.log(LIST_TEMPLATE);
        linode.find(".liname").text(title);
        BASKET.append(node); //Add to the end of the list
        LIST.append(linode);
    }


});
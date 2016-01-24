/**
 * Created by Земляничка on 20.01.2016.
 */

$(function(){
    var BASKET = $(".basket");
    var ITEM_TEMPLATE ='<div class="item">'+$(".item").html()+'</div>';
    var LIST_TEMPLATE = '<div class="li list_need">'+$(".li").html()+'</div>';
    var LIST = $('.list');

    $("#input").find("input").focus();

    $("#add").click(function(){
        var title = $("#input").find(":input").val();
        addItem(title);
        $("#input").find(":input").dele;
    });
/*
    $(".item").each(function(i, item) {
        item = $(item); //to have access to all jQuery functions
        item.find(".de").click(decrement(item));
        item.find(".in").click(increment(item));
        item.find(".buy").click(bought(item));
        item.find(".close").click(function(){
            item.remove();
        });
    });
*/

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

        $(".list_need").find(".li").each(function(i, item) {
            var name = item.text();
            if(name == node.find(".name_crossed").text()){
                var temp = item.html();
                item.remove();
                $(".list_done").append(item);
            }
        });
    }
    function notBought(node){
        node.removeClass("bought");
        /*
        node.find(".but").show();
        node.find(".name").show();
        node.find(".name_crossed").hide();
        */
        node.find(".amount").css("margin-left", "0px");
        node.find('.close').show();
        node.find(".buy").show();
        node.find(".n_buy").hide();

        $(".list_done").find(".li").each(function(i, item) {
            var name = item.text();
            if(name == node.find(".name_crossed").text()){
                var temp = item.html();
                item.remove();
                $(".list_need").append(temp);
            }
        });
    }
    function decrement(node){
        var old = parseInt($(node).find('.amount').text());
        old--;
        if(old==1){
            this.attr("disabled", true);
        }
        node.find(".amount").text(old);
        $(".list_need").find(".li").each(function(i, item) {
           var name = item.text();
            if(name == node.find(".name_crossed").text()){
                this.find(".list_amount").text(old);
            }
        });
    }
    function increment(node){
        var old = parseInt($(node).find(".amount").text());
        if(old==1){
            this.attr("disabled", false);
        }
        old++;
        node.find(".amount").text(old);
        $(".list_need").find(".li").each(function(i, item) {
            var name = item.text();
            if(name == node.find(".name_crossed").text()){
                this.find(".list_amount").text(old);
            }
        });
    }
    function addItem(title) {
        console.log(ITEM_TEMPLATE);
        var node = $(ITEM_TEMPLATE); //Create new HTML node
        node.addClass("item");
        node.find(".name").val(title); //Set product title
        node.find(".name_crossed").text(title);
        node.find(".amount").text(1);
        node.find(".buy").text("Куплено");
//Bougght Action
        node.find(".buy").click(function(){
            bought(node);
        });
        node.find(".n_buy").click(function(){
            notBought(node);
        });
//Delete Action
        node.find(".close").click(function(){
            node.remove();
        });
        var linode = $(LIST_TEMPLATE);
        linode.text(title);
        linode.find(".list_amount").text(2);
        BASKET.append(node); //Add to the end of the list
        LIST.append(linode);
    }


});
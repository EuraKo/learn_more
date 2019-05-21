(function($){


$("li a").each(function(){

var winHref = window.location.href;
console.log(winHref);
var liAttr = $(this).attr("href");

console.log(liAttr)

if(winHref.indexOf(liAttr) !== -1){
  console.log("aa")
  $(this).css({"background-color":"#add"})
}else{
  console.log("nn")
}

})







})(this.jQuery);
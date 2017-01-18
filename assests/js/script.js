var logo = [];
var ref = firebase.database().ref();

      ref.on("value", function(snapshot) {
      // snapshot.forEach(function(snapshot){
      logo = snapshot.val();
      console.log(logo);
      // });
      generateAllIPLTeamHTML(logo);
      $(window).trigger('hashchange');
}, function (error) {
     console.log("Error: " + error.code);
});

function generateAllIPLTeamHTML(data){

  var list = $('.IPL-team');

  var theTemplateScript = $("#products-template").html();
  //Compile the template​
  var theTemplate = Handlebars.compile (theTemplateScript);
  // console.log(theTemplate(data));
  list.append (theTemplate(data));

  list.find('span').on('click', function (e) {
		e.preventDefault();

		var productIndex = $(this).data('index');
		window.location.hash = 'product/' + productIndex;
    console.log(productIndex);
	})
}

function generateAllPlayersHTML(data){

  var list1 = $('.modal-body');

  var theTemplateScript = $("#players-template").html();
  //Compile the template​
  var theTemplate = Handlebars.compile (theTemplateScript);
  // console.log(theTemplate(data));
  list1.append (theTemplate(data));
  // console.log(theTemplate(data));
}

$(window).on('hashchange', function(){
  render(decodeURI(window.location.hash));
});

function render(url) {
  // Get the keyword from the url.
  var temp = url.split('/')[0];
  var	map = {
  '#product': function() {
    // Get the index of which product we want to show and call the appropriate function.
    var index = url.split('#product/')[1];
    $("#refresh").replaceWith("<span></span>");
     generateAllPlayersHTML(logo[index].team_players);
    //  console.log(index,);
  }
}
if(map[temp]){
  map[temp]();
}
// If the keyword isn't listed in the above - render the error page.
else {
console.log("error");
}

};

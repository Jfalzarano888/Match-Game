var settings = {
  async: true,
  crossDomain: true,
  url: "https://api.gettyimages.com/v3/search/images?fields=id%2Ctitle%2Cthumb%2Creferral_destinations&sort_order=best&phrase=puppies",
  method: "GET",
  headers: {
    apikey: "jb366azpdwc9yyfwwhz89nkp",
    cacheControl: "no-cache",
    postmanToken: "d71acb46-b1a7-96be-edf8-617cdf974d0b"
  }
}

// let imgRoot="https://api.gettyimages.com/v3/search/images?fields=id,title,thumb,referral_destinations&sort_order=best&phrase=puppies";
let matchCards = [];
let displayRow1 = [];
let $match = "";

$(window).load(function() {
    console.log('hello');
    displayGameCards();
});

$(document).on("click", ".card-frame", function(){
  const $cardFrame = $(this);
  const $cardName = $cardFrame.attr("name");
  const $index = $cardFrame.attr("index");
  $(this).addClass("selected");
  const $cardBack = $(".selected").find(".card-back");
  $cardBack.addClass("hidden");
  $(this).find(".card-front").removeClass("hidden");
  if (!$match) {
    $match = $cardName;
    $matchIndex = $index;
    console.log($match);
  } else {
    if ($cardName === $match && $index !== $matchIndex) {
      // setTimeout(cardRemoval, 750);
      cardRemoval();
    } else {
        setTimeout(cardFlip, 750);
    }
    $match = "";
  }
})

function cardRemoval () {
  let card = $(".selected");
  // card.remove();
  card.removeClass("selected");
}

function cardFlip (){
  let cardFront = $(".selected").find(".card-front");
  let card = $(".selected");
  let cardBack = $(".selected").find(".card-back");
  cardFront.addClass("hidden");
  card.removeClass("selected");
  cardBack.removeClass("hidden");
}

function getRandomInt(array) {
  	let max = array.length;
  	let randomIndex = Math.floor(Math.random() * (max));
    let randomElement = array[randomIndex];
    return randomElement;
}

function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}
function displayGameCards() {
  $.ajax(settings).done(function(results){
    for(let i=0; i<6; i++){
      let randoShit = getRandomInt(results.images);
      // matchCards.push(randoShit.display_sizes[0].uri);
      displayRow1.push(`
          <div name="card${i}" index="${i}" class="card-frame">
            <img name="card${i}" class="hidden card-front" src="${randoShit.display_sizes[0].uri}" alt="card-front">
            <img class="card-back" src="pictures/face.svg" alt="card-back">
          </div>`);
      displayRow1.push(`
        <div name="card${i}" index="${i+6}" class="card-frame">
          <img name="card${i}" class="hidden card-front" src="${randoShit.display_sizes[0].uri}" alt="card-front">
          <img class="card-back" src="pictures/face.svg" alt="card-back">
        </div>
        `)
    }
    shuffle(displayRow1);
    $("#match-row1").append(displayRow1);
  });
}

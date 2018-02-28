//$(document).ready(function() {
  var vinURL = "http://vinguiden-webapp-develop.seals.schibsted.pl/api/product?ids=1";
  var $pages = $("#pages");
  var $vin = $('#vin');
  var countryArray;
  var jsonData;
  var i;
  var jsonDataFiltered;
  var sortOrder = 'asc';

  $('body').on('load', getDefault());

  function getDefault(){
    $.getJSON(vinURL, function(data){

      var html = "",
      star,
      cat,
      logo;

      jsonData = data;
      jsonDataFiltered = jsonData;

      data.forEach(function showItems(val){
        //setting placeholder if no img given
        val.imageUrl !== null ? logo = val.imageUrl : logo ='./assets/img/placeholder.png';
        //number of stars
        val.rate === null ? star = 'null': star = Math.floor(val.rate);
        //setting icon for wine type
        val.product === "Rött vin" ? cat = 1 : val.product === "Vitt vin" ? cat = 2 : val.product === "Rosévin" ? cat = 3 : cat = 0;

        html += "<div class='vinItem'>";
        html += "<div class='vinItem__photo'>";
        html += "<img src='" + logo + "'>";
        html += "<div class='vinItem__id'>" + val.id + "</div>";
        html += "</div>";
        html += "<div class='vinItem__info'>";
        html += "<p class='vinItem__country'>" + val.country + " | " + val.region + "</p>";
        html += "<p><h3>" + val.name + "</h3></p>";
        html += "<p class='vinItem__category'><span class='cat-" + cat + "'>"+val.product+ "</span> | " + val.grapes + " | " + val.productionYear + "</p>";
        html += "<p class='vinItem__rate'><span class='star-" + star +"'></span>Rate: " + Math.floor(val.rate*100)/100 + "</p>";
        html += "<div class='vinItem__small'><p >Sold Bottles: " + val.soldBottles + "   <a href='" + val.productUrl + "'>Product's Link</a> ";
        html += "Availability: " + val.availability + "    Ecological: " + val.ecological + "    Packaging: " + val.packaging + "</p></div></div>";
        html += "<div  class='vinItem__price'><div class='vinItem__price--tag'>Price:</div><div class='vinItem__price--val'>" + val.price + " kr </div></div></div>";
      });
      $vin.html(html);

      //Array of all countries sorted a-z, filtered for duplicates
  //    let countryArr = $.map(data, (el) => { return el.country }).filter((elem, index, self) => { return index == self.indexOf(elem) }).sort((a,b) => { return a.localeCompare(b)});

      }, "json");
  }
// on multiple select change
  $pages.change(function(){
    var selectedPages = [];
    $("#pages :selected").each(function(){
      selectedPages.push($(this).val());
    });
    vinURL = "http://vinguiden-webapp-develop.seals.schibsted.pl/api/product?ids="+selectedPages;
    getDefault();
    $('#country').val("default");
  });

  // select change
  $('#country').change(function(){
    var selectedItem = $("#country :selected");
    $.getJSON(vinURL, function(data){jsonData = data});
    if(selectedItem.val() === "default"){
      jsonDataFiltered = jsonData;
      getDefault();
    }else{
      jsonDataFiltered = jsonData.filter(function(i){
       return  i.country === selectedItem.val();
      });
      jsonData = jsonDataFiltered;
      showJson();
    }
  });

//***** Menu buttons **********//
  function sortPrice(){
     if(sortOrder === 'asc'){
       jsonData = jsonDataFiltered.sort(function(a,b) {return a.price - b.price});
       sortOrder = 'desc';
     }else if(sortOrder === 'desc'){
       jsonData = jsonDataFiltered.sort(function(a,b){return b.price - a.price});
       sortOrder = 'asc';
     }
  }

function sortName(){
  if(sortOrder === 'asc'){
    jsonData = jsonDataFiltered.sort(function(a,b){ return a.name.localeCompare(b.name)});
    sortOrder = 'desc';
  }else if(sortOrder === 'desc'){
    jsonData = jsonDataFiltered.sort(function(a,b){ return b.name.localeCompare(a.name)});
    sortOrder = 'asc';
  }
}

function showJson(){
  html = "";
  for(i in jsonData){
    itemLayout();
  }
  $vin.html(html);
}

  function itemLayout(){
    jsonData[i].imageUrl !== null ? logo = jsonData[i].imageUrl : logo ='./assets/img/placeholder.png';
    jsonData[i].rate === null ? star = 'null': star = Math.floor(jsonData[i].rate);
    jsonData[i].product === "Rött vin" ? cat = 1 : jsonData[i].product === "Vitt vin" ? cat = 2 : jsonData[i].product === "Rosévin" ? cat = 3 : cat = 0;

    html += "<div class='vinItem'>";
    html += "<div class='vinItem__photo'>";
    html += "<img src='" + logo + "'>";
    html += "<div class='vinItem__id'>" + jsonData[i].id + "</div>";
    html += "</div>";
    html += "<div class='vinItem__info'>";
    html += "<p class='vinItem__country'>" + jsonData[i].country + " | " + jsonData[i].region + "</p>";
    html += "<p><h3>" + jsonData[i].name + "</h3></p>";
    html += "<p class='vinItem__category'><span class='cat-" + cat + "'>"+jsonData[i].product+ "</span> | " + jsonData[i].grapes + " | " + jsonData[i].productionYear + "</p>";
    html += "<p class='vinItem__rate'><span class='star-" + star +"'></span>Rate: " + Math.floor(jsonData[i].rate*100)/100 + "</p>";
    html += "<div class='vinItem__small'><p >Sold Bottles: " + jsonData[i].soldBottles + "   <a href='" + jsonData[i].productUrl + "'>Product's Link</a> ";
    html += "Availability: " + jsonData[i].availability + "    Ecological: " + jsonData[i].ecological + "    Packaging: " + jsonData[i].packaging + "</p></div></div>";
    html += "<div  class='vinItem__price'><div class='vinItem__price--tag'>Price:</div><div class='vinItem__price--val'>" + jsonData[i].price + " kr </div></div></div>";
  }

  $('.sort__price').click(function(){
    $(this).find('i').toggleClass('fa-sort-numeric-desc fa-sort-numeric-asc');
     sortPrice();
     showJson();
  });

  $('.sort__name').click(function(){
    $(this).find('i').toggleClass('fa-sort-alpha-desc fa-sort-alpha-asc');
    sortName();
    showJson();
  });

  $(".styled-select").on({
    click:(function(){$pages.slideDown()}), mouseleave:(function(){ $pages.slideUp()})
  });
//});//ready

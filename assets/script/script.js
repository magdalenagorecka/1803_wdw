//$(document).ready(function() {

  var rssUrl = "https://www.vg.no/rss/feed/",
      $rssItem = $(".rssItem"),
      sortArr =[],
      $sort = $("#sort"),
      html="";

  $.get(rssUrl, function(data){
    var xmlData = $(data).find("item");
  //sort desc by default
    xmlData.sort(function(a,b){
      a = $(a).find("pubDate").text();
      b = $(b).find("pubDate").text();
      return new Date(b).getTime() - new Date(a).getTime();
    });
  //make an array
    xmlData.each(function() {
      var item={
          title: $(this).find("title").text(),
          pubDate: $(this).find("pubDate").text()
        }
      sortArr.push(item);
    });
    showItem();
  });

  //display rss items
  function showItem(){
    for(var i=0; i<sortArr.length; i++){
      html += "<div  class='rss'><p><h3>" + sortArr[i].title + "</h3></p>";
      html += "<p class='pubDate'>" + sortArr[i].pubDate + "</p></div>";
    }
    $rssItem.html(html);
  }

  //sorting button
  $sort.click(function(){
    html='';
    $(this).find('i').toggleClass('fa-caret-down fa-caret-up');
    sortArr.reverse();
    showItem();
  });
//})

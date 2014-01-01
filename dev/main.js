var diff = new DiffBot("a1634c532f36ebb5661588c73f1461d0", "http://google.com");

// The same
// var diff = new DiffBot("a1634c532f36ebb5661588c73f1461d0");
// diff.setURL("http://google.com");

diff.setAPI("analyze");
diff.setVersion(2);

// setOptions is just API demo. Not work. Look at source code.
diff.setOptions({
    "title": false,
    "links": false
});
diff.setOptions("author", false);

diff.getData(function(){
    $("#content").html(JSON.stringify(diff.responce));
});



// Submit other link
$("#submitButton").on("click", function(){
    diff.setURL($("#inputField").val());
    diff.getData(function(){
        $("#content").html(JSON.stringify(diff.responce));
    });
})
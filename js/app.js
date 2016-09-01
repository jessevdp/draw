var app = {};
app.updateInterval = 1500;
var two;
app.go = function() {
  this.myTextArea = document.getElementById('editor');
  this.editor = CodeMirror.fromTextArea(this.myTextArea, {
    lineNumbers: true,
    lineWrapping: true,
    mode: "javascript",
    theme: "material",
    scrollbarStyle: "overlay",
    styleActiveLine: true,
    matchBrackets: true
  });

  var elem = document.getElementById('output');
  two = new Two({width: $('#output').width(), height: $('#output').height()}).appendTo(elem);
}

// THIS FUNCTION IS WIP
// Does NOT work yet.
app.updateTwo = function() {
  var svg = $('svg');

  app.interval = window.setInterval(function() {

    oldWidth = svg.width();
    oldHeight = svg.height();

    newWidth = $('#output').width();
    newHeight = $('#output').height();

    //if either the height or width changes the size is adjusted
    if (oldWidth === newWidth && oldHeight === newHeight ) {
      // nothing needs to happen
    } else {
      //Setting size.
      two.renderer.setSize(newWidth, newHeight);
      //Setting the variables (this needs to be done manually)
      two.height = newHeight;
      two.width = newWidth;
      //Logging (for dev purposes)
      console.log('updated size');
    }
  }, app.updateInterval);

}

$(document).ready(function() {
  app.go();
  app.updateTwo();

  $(document).on('click', '#play',  function() {
    two.clear();
    var code = app.editor.getValue();
    eval(code);
    two.update();
  });

  $(document).on('click', '#trash',  function() {
    app.editor.setValue("");
    app.editor.clearHistory();
  });


  $(document).on('click', '#changeMode',  function() {
    $('#code').toggleClass('notDisplayed');
    $('#result').toggleClass('notDisplayed');
  });
});


function dog() {
  var dogCode = "var position = new Two.Vector(two.width/2, two.height/2); var head = two.makeCircle(position.x, position.y, 100); head.fill = '#52C5DC'; head.noStroke(); var nose = two.makeCircle(position.x, position.y+30, 32); nose.fill = '#EFB8D2'; nose.noStroke(); var eyeRight = two.makeCircle(position.x-42, position.y-26, 32); eyeRight.fill = '#FFFFFF'; eyeRight.noStroke(); var pupilRight = two.makeCircle(position.x-42, position.y-26, 20); pupilRight.fill = '#7FC35E'; pupilRight.noStroke(); var eyeLeft = two.makeCircle(position.x+42, position.y-26, 32); eyeLeft.fill = '#FFFFFF'; eyeLeft.noStroke(); var pupilLeft = two.makeCircle(position.x+42, position.y-26, 20); pupilLeft.fill = '#7FC35E'; pupilLeft.noStroke(); var earLeft = two.makeEllipse(position.x-100, position.y-80, 26, 46); earLeft.fill = '#52C5DC'; earLeft.noStroke(); earLeft.rotation = Math.PI / 4; var earRight = two.makeEllipse(position.x+100, position.y-80, 26, 46); earRight.fill = '#52C5DC'; earRight.noStroke(); earRight.rotation = -Math.PI / 4; var tongue = two.makePolygon(0,0,  100,0,  100,0,  90,58,  50,80,  10,58,  0,0); tongue.curved = true; tongue.fill = '#EE3E36'; tongue.noStroke(); tongue.translation.x = position.x-40; tongue.translation.y = position.y+86; tongue.scale = 0.25; tongue.rotation = 10;"
  app.editor.setValue(dogCode)
}

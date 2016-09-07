// Empty app obj, Used to attach functions and store settings.
var app = {};

// Empty settings object stored on the app object, used to store settings.
app.settings = {};
// The settings
app.settings.updateInterval = 1500;
app.settings.textAreaId = 'editor';
app.settings.twoId = 'output'

// The two variable. used by the user to acces two.js functions.
var two;


/**
 * Creates a CodeMirror from our textarea and sets the settings.
 * @param 'string': the textarea ID.
 */
app.createCodemirror = function(textAreaId) {
  // Getting our textarea by ID.
  myTextArea = document.getElementById(textAreaId);

  // Creating the CodeMirror from our textarea as well as attaching it to the app obj.
  this.editor = CodeMirror.fromTextArea(myTextArea, {
    // CodeMirror settings:
    lineNumbers: true,
    lineWrapping: true,
    mode: "javascript",
    theme: "material",
    scrollbarStyle: "overlay",
    styleActiveLine: true,
    matchBrackets: true
  });
}

/**
 * Creates an two.js instance inside the element with an ID of twoId.
 * @param 'string': ID of the element to which two.js should be appended.
 */
app.creatTwo =  function(twoId) {
  // Getting the parent element of the two.js svg by ID.
  var elem = document.getElementById(twoId);

  // Creating the two.js instance. Setting its height and width and then appending it to the element (from above).
  two = new Two({width: $('#'+app.settings.twoId).width(), height: $('#'+app.settings.twoId).height()}).appendTo(elem);
}

/**
 * Updates the size of the two.js created svg if needed.
 * Updates ever app.settings.updateInterval miliseconds.
 */
app.updateTwo = function() {
  // DOM refference to the svg (this will select all svg elements, unfortunatly two.js does not add an ID to their svg's)
  var svg = $('svg');

  // Setting the interval
  app.interval = window.setInterval(function() {

    // Getting the current width and height of the svg.
    oldWidth = svg.width();
    oldHeight = svg.height();

    // Getting the current height and width of the parent element.
    newWidth = $('#'+app.settings.twoId).width();
    newHeight = $('#'+app.settings.twoId).height();

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
  }, app.settings.updateInterval);

}

/**
 * Register all event listeners.
 * Returns all listener objects.
 * @return Object
 */
app.registerEvents = function() {

  // Runes value of CodeMirror on click.
  $(document).on('click', '#play',  function() {
    // Clearing the two.js canvas.
    two.clear();
    // Getting the value of CodeMirror.
    var code = app.editor.getValue();
    // Running the passed-in js code.
    eval(code);

    // updating the canavas (normally the user would do this in their code)
    two.update();
  });

  // Empties the CodeMirror on click
  $(document).on('click', '#trash',  function() {
    app.editor.setValue("");
    app.editor.clearHistory();
  });

  // toggles the notDisplayed class on click.
  // (Switch from code to output and back on smaller displays)
  $(document).on('click', '#changeMode',  function() {
    $('#code').toggleClass('notDisplayed');
    $('#result').toggleClass('notDisplayed');
  });

  /*Menu-toggle*/
  $(document).on('click','.menu', function(e) {
      console.log('menu toggle')
      e.preventDefault();
      $("#wrapper").toggleClass("active");
      $(".menu").toggleClass("menucolor");

      $('.menu-button').toggle()
      $('.close-button').toggle()

  });
  // Hiding the close button at default.
  $('.close-button').hide();
}

/**
 * Creating the CodeMirror and two.js as well as invoking all the functions needed.
 */
function go() {
  // Creating the CodeMirror.
  app.createCodemirror(app.settings.textAreaId);
  // Creating the two.js.
  app.creatTwo(app.settings.twoId);

  // Calling the update function to make sure the two.js created svg resizes when needed.
  app.updateTwo();

  // Invoking the eventListeners.
  app.registerEvents();
}

// Calling the go function when the document is ready!
$(document).ready(function() {
  go();
});

/**
 * Sets the value of the CodeMirror to the js needed to draw a dog.
 * Easter egg
 */
function dog() {
  var dogCode = "var position = new Two.Vector(two.width/2, two.height/2); var head = two.makeCircle(position.x, position.y, 100); head.fill = '#52C5DC'; head.noStroke(); var nose = two.makeCircle(position.x, position.y+30, 32); nose.fill = '#EFB8D2'; nose.noStroke(); var eyeRight = two.makeCircle(position.x-42, position.y-26, 32); eyeRight.fill = '#FFFFFF'; eyeRight.noStroke(); var pupilRight = two.makeCircle(position.x-42, position.y-26, 20); pupilRight.fill = '#7FC35E'; pupilRight.noStroke(); var eyeLeft = two.makeCircle(position.x+42, position.y-26, 32); eyeLeft.fill = '#FFFFFF'; eyeLeft.noStroke(); var pupilLeft = two.makeCircle(position.x+42, position.y-26, 20); pupilLeft.fill = '#7FC35E'; pupilLeft.noStroke(); var earLeft = two.makeEllipse(position.x-100, position.y-80, 26, 46); earLeft.fill = '#52C5DC'; earLeft.noStroke(); earLeft.rotation = Math.PI / 4; var earRight = two.makeEllipse(position.x+100, position.y-80, 26, 46); earRight.fill = '#52C5DC'; earRight.noStroke(); earRight.rotation = -Math.PI / 4; var tongue = two.makePolygon(0,0,  100,0,  100,0,  90,58,  50,80,  10,58,  0,0); tongue.curved = true; tongue.fill = '#EE3E36'; tongue.noStroke(); tongue.translation.x = position.x-40; tongue.translation.y = position.y+86; tongue.scale = 0.25; tongue.rotation = 10;"
  app.editor.setValue(dogCode)
}

function menuToggle(speed) {

}

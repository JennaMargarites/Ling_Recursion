PennController.ResetPrefix(null);

PennController.Sequence( "welcome" , randomize("experiment") , "send" , "final" )

PennController( "welcome" ,
    // Load welcome Screen
    defaultText     //implicitly inserts .print below each newText command
        .print()
    ,
    newText("<p>Welcome!<p>")   // <p> and </p> indicate beginning and end of a paragraph
    ,
    newText("<p>In this experiment, you will have to report which of three pictures matches the audio description.</p>")
    ,
    newText("<p>Click on whichever picture best matches the audio description.")     // <strong> </strong> makes typeface bold 
    ,
    newText("<p>Audio will only play once. Please turn your speakers or headphones on in order to properly complete this experiment</p>")
    ,
    // Create a button named Start
    newButton("Start")  
        .print()
        .wait()
    ,
    // Creates a variable in cache of trial named ID
    newVar("ID")
        .settings.global()  // Makes variable available for all trials
)
// save user's ID in the log
.log( "ID" , PennController.GetURLParameter( "id") );

// Makes a template that can be reused across multiple trials
PennController.Template(
    variable => PennController( "experiment" ,
        // makes user pause before new trial starts
        newTimer(500)
            .start()
            .wait()
        ,
        // Play new audio named description
        newAudio("description" , variable.AudioFile)
            .play()
        ,
        // Creates images to be loaded into Canvas
        newImage("one", variable.ImageOne) // name image "two"
            .settings.size(200, 280) // adjusts size of image
        ,
        newImage("two", variable.ImageTwo)
            .settings.size(200, 280)
        ,
        newImage("three", variable.ImageThree)
            .settings.size(200, 280)
        ,
        // Loads images into a new Canvas and prints
        newCanvas( 700 , 500 )  // creates new 700x500 Canvas
            .settings.add( 0 , 85 , getImage("one"), 0 )    // loads image into Canvas
            .settings.add( 250 , 85 , getImage("two"), 1 )
            .settings.add( 500 , 85 , getImage("three"), 2)
            .print()
        ,
        // User clicks or pressed "F" or "J" to indicate their respose
        newSelector()
            .settings.add( getImage("three") , getImage("two") , getImage("one") )
            .shuffle() // randomize presentation of stimuli (needs to be after add and before key assignment)
            .settings.log() // Logs which key user presses
            .settings.once() // Allows user to make only one choice
            .wait()
        ,
        getAudio("description")
            .stop() // makes audio stop playing when key is pressed
            // could also put "wait("first") which would wait to execute the key press after audio is finished
        ,
        // makes user pause before next trial
        newTimer(500)
        .start()
        .wait()
    )
    .log( "ID" , getVar("ID") )
    .log( "Group" , variable.Group )
 )
 
 // Save results 
PennController.SendResults( "send" )

// Create a completion page
PennController( "final" ,
    newText("<p>Thank you for your participation!</p>")
        .print()
    ,
    newText("<p>Click here to validate your participation.</p>")
        .print()
    ,
    newButton("void")
        .wait()
)
 
 
 
    
    
let mapbox_config;

function setup ()
{
    console.log ( "setup" );

    mapbox_config = loadJSON ( "mapbox.json" );
}

function draw ()
{
    console.log ( mapbox_config );
    noLoop ();
}


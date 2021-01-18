let mapbox_config;
let mapimg;

function preload ()
{
    console.log ( "setup" );

    mapbox_config = loadJSON ( "mapbox.json",
        () => mapimg = loadImage ( get_map_url () )
    );

    
}

function setup ()
{
    createCanvas ( 600, 600 );

    image ( mapimg, 0, 0 );
}


function draw ()
{
    noLoop ();
}

function get_map_url ()
{
    let href = "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/";

    let gps = "-122.4241,37.78,14.25,0,60";

    let size = "600x600";

    let key = mapbox_config [ "api_key" ];

    return `${href}${gps}/${size}?access_token=${key}`;
}

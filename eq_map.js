let mapbox_config;
let mapimg;

let width = 1024;
let height = 512;

function preload ()
{
    console.log ( "setup" );

    mapbox_config = loadJSON ( "mapbox.json",
        () => mapimg = loadImage ( get_map_url () )
    );

    
}

function setup ()
{
    createCanvas ( width, height );

    image ( mapimg, 0, 0 );
}


function draw ()
{
    noLoop ();
}

function get_map_url ()
{
    let href = "https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/";

    let gps = "0,0,1,0,0";

    let size = `${width}x${height}`;

    let key = mapbox_config [ "api_key" ];

    return `${href}${gps}/${size}?access_token=${key}`;
}

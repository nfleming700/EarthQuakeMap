let mapbox_config;
let mapimg;
let earthquakes;

let width = 1024;
let height = 512;

let clat = 0;
let clon = 0;
let zoom = 1;

let london_lat = 51.5074;
let london_lon =  0.1278;

function preload ()
{
    console.log ( "setup" );

    mapbox_config = loadJSON ( "mapbox.json",
        () => mapimg = loadImage ( get_map_url () )
    );

    earthquakes = loadStrings ( "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv" );

    
}

function setup ()
{
    createCanvas ( width, height );

}


function draw ()
{
    translate ( width/2, height/2 );
    imageMode ( CENTER );
    image ( mapimg, 0, 0 );

    let cx = mercX(clon);
    let cy = mercY(clat);

    for ( const i of earthquakes )
    {
        let data = i.split ( /,/ );

        let e_lat = data [ 1 ];
        let e_lon = data [ 2 ];
        let e_mag = data [ 4 ];

        let x = mercX ( e_lon ) - cx;
        let y = mercY ( e_lat ) - cy;

        let size = map ( e_mag, 0, 8, 2, 20 );

        fill(255,255,0,255);
        ellipse(x,y,size,size);

    }

    noLoop ();
}

function get_map_url ()
{
    let href = "https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/";

    let gps = `${clat},${clon},${zoom},0,0`;

    let size = `${width}x${height}`;

    let key = mapbox_config [ "api_key" ];

    return `${href}${gps}/${size}?access_token=${key}`;
}

function mercX ( lon )
{
    lon = radians ( lon );

    let a = ( 256 / PI ) * pow ( 2, zoom );

    let b = lon + PI;

    return a * b;
}

function mercY ( lat )
{
    lat = radians ( lat );

    let a = ( 256 / PI ) * pow ( 2, zoom );

    let b = tan ( PI/4 + lat/2 );

    let c = PI - log ( b );

    return a * c;
}

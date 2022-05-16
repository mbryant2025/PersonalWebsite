import shutil
import time
import pydeck as pdk
import pandas as pd
import numpy as np
import json



while True:
    shutil.copy2("/run/dump1090-fa/aircraft.json", "/var/www/html/PiWebsite/aircraft")
    time.sleep(5)

    layers = []

    f = open('/var/www/html/PiWebsite/aircraft/aircraft.json')
    data = json.load(f)
    f.close()

    a = data['aircraft']

    pts = []

    for p in a:
        if 'lat' and 'lon' not in p.keys():
            continue
        pts.append([p['hex'], (p['lon'], p['lat'])])



    df = pd.DataFrame(pts, columns=['name', 'pos'])

    # Define a layer to display on a map
    points = pdk.Layer(
        "ScatterplotLayer",
        df,
        pickable=True,
        opacity=0.1,
        stroked=True,
        filled=True,
        radius_scale=1,
        radius_min_pixels=5,
        radius_max_pixels=5,
        line_width_min_pixels=0,
        get_position="pos",
        get_radius=60,
        get_fill_color=[255, 140, 0],
        get_line_color=[0, 0, 0],
    )

    layers.append(points)

    tracked_aircraft_ids = [x[0] for x in pts]

    f = open('/var/www/html/PiWebsite/aircraft/paths.json')
    data = json.load(f)
    f.close()

    remove = []

    #Remove any paths that are no longer tracked
    for e in data:
        if e not in tracked_aircraft_ids:
            remove.append(e)

    for r in remove:
        del data[r]

    #Add new ids
    for tracked_aircraft in tracked_aircraft_ids:
        if tracked_aircraft not in data:
            data[tracked_aircraft] = []

    #Add current data point
    for path in data:
        loc = [x[1] for x in pts if x[0] == path]
        data[path].append(loc[0])

    #Save JSON
    with open("/var/www/html/PiWebsite/aircraft/paths.json", "w") as outfile:
        json.dump(data, outfile)

    #Make path objects
    for path in data:

        p = {'pos':[data[path]]}    

        df = pd.DataFrame(p, columns=['pos'])

        layer = pdk.Layer(
            "TripsLayer",
            df,
            get_path="pos",
            get_timestamps=100,
            get_color=[153, 50, 204],
            opacity=1,
            width_min_pixels=5,
            rounded=True,
            trail_length=600,
            current_time=500,
        )

        layers.append(layer)

    # Set the viewport location
    view_state = pdk.ViewState(latitude=41.62167472370139, longitude=-72.74676075892226, zoom=7, bearing=0, pitch=0)

    # Render
    r = pdk.Deck(layers=layers, initial_view_state=view_state, tooltip={"text": "{name}\n{address}"})
    r.to_html("/var/www/html/PiWebsite/aircraft/map.html")
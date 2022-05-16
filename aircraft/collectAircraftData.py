import shutil
import time
import pydeck as pdk
import pandas as pd
import numpy as np
import json

while True:
    shutil.copy2("/run/dump1090-fa/aircraft.json", "/var/www/html/PiWebsite/aircraft")
    time.sleep(5)

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

    # Set the viewport location
    view_state = pdk.ViewState(latitude=41.62167472370139, longitude=-72.74676075892226, zoom=7, bearing=0, pitch=0)

    # Render
    r = pdk.Deck(layers=[points], initial_view_state=view_state, tooltip={"text": "{name}\n{address}"})
    r.to_html("map.html")
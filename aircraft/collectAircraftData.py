import shutil
import time
import pydeck as pdk
import pandas as pd
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
        if 'lat' not in p.keys() or 'lon' not in p.keys():
            continue
        flight = p['flight'] if 'flight' in p.keys() else 'Flight Number Unavailable'
        speed = str(p['gs']) + 'mph' if 'gs' in p.keys() else 'Speed Unavailable'
        alt = str(p['alt_geom']) + '\'' if 'alt_geom' in p.keys() else 'Altitude Unavailable'
        pts.append([p['hex'], (p['lon'], p['lat']), flight, speed, alt])

    pts_df = pd.DataFrame(pts, columns=['id', 'pos', 'flight', 'speed', 'alt'])

    # Define a layer to display on a map
    points = pdk.Layer(
        "ScatterplotLayer",
        pts_df,
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
        get_fill_color=[255, 165, 0],
        get_line_color=[0, 0, 0],
    )

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

    def altitudeColor(path):
        plane_data = [x for x in a if x['hex'] == path][0]
        alt = plane_data['alt_geom'] if 'alt_geom' in plane_data else 0

        # <10000' is white, >40000' is dark blue
        rg = int(255 if alt < 10_000 else 0 if alt > 40_000 else 255 - (alt - 10_000) / (40_000 - 10_000) * 255)

        return [rg, rg, 255]

    #Make path objects
    for path in data: 

        p = {'pos':[data[path]]}    

        df = pd.DataFrame(p, columns=['pos'])

        layer = pdk.Layer(
            "TripsLayer",
            df,
            get_path="pos",
            get_timestamps=100,
            get_color=altitudeColor(path),
            opacity=1,
            width_min_pixels=5,
            rounded=True,
            trail_length=600,
            current_time=500,
        )

        layers.append(layer)

    layers.append(points)

    # Set the viewport location
    view_state = pdk.ViewState(latitude=41.62167472370139, longitude=-72.74676075892226, zoom=7, bearing=0, pitch=0)

    # Render
    r = pdk.Deck(layers=layers, initial_view_state=view_state, tooltip={"text": "{flight}\n{speed}\n{alt}\n({pos})"})
    r.to_html("/var/www/html/PiWebsite/aircraft/map.html")

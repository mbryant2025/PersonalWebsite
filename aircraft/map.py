#local file for testing purposes only. Used as local equivalent to collectAircraftData.py

import pydeck as pdk
import pandas as pd
import json

layers = []

f = open('aircraft/aircraft.json')
data = json.load(f)
f.close()

a = data['aircraft']

pts = []

for p in a:
    if 'lat' not in p.keys() or 'lon' not in p.keys():
        continue
    flight = p['flight'] if 'flight' in p.keys() else 'flight number unavailable'
    speed = str(p['gs']) + 'mph' if 'gs' in p.keys() else 'speed unavailable'
    alt = str(p['alt_geom']) + '\'' if 'alt_geom' in p.keys() else 'altitude unavailable'
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

#Plot record planes on map
with open('aircraft/showRecords.txt') as f:
    show_records = f.read()

if show_records == "1":
    
    with open('aircraft/records.json') as f:
        records = json.load(f)

    #Plot record plane points
    record_labels = {'max_speed': 'Max Speed', 'min_speed': 'Min Speed', 'max_alt': 'Max Altitude', 'min_alt': 'Min Altitude', 'max_dist': 'Max Distance', 'min_dist': 'Min Distance'}

    r_pts = []

    for r_p in records.keys():

        if records[r_p][4] is None:
            continue
        
        pos = records[r_p][4][-1] if type(records[r_p][4][-1]) == list else records[r_p][4]
        pos = (pos[0], pos[1])

        record_name = str(record_labels[r_p]) + " - " + (str(records[r_p][2]) if records[r_p][2] is not None else "Flight Number Unavailable")
        r_pts.append([r_p, pos, record_name])
        record_value = str(round(records[r_p][0], 4)) + ('mph' if 'Speed' in record_name else '\'' if 'Alt' in record_name else ' miles')
        timestamp = records[r_p][3]

        #Hex, pos, record name, record value, timestamp
        r_pts.append([records[r_p][1], pos, record_name, record_value, timestamp])  

    #Remap labels here for record planes --> variable names look unintiutiive here for this reason
    r_pts_df = pd.DataFrame(r_pts, columns=['id', 'pos', 'flight', 'speed', 'alt'])

    print(r_pts_df)

    # Define a layer to display on a map
    r_points = pdk.Layer(
        "ScatterplotLayer",
        r_pts_df,
        pickable=True,
        opacity=1,
        stroked=True,
        filled=True,
        radius_scale=1,
        radius_min_pixels=5,
        radius_max_pixels=5,
        line_width_min_pixels=0,
        get_position="pos",
        get_radius=60,
        get_fill_color=[50, 168, 81],
        get_line_color=[0, 0, 0],
    )

    #Plot record plane paths
    for r_p in records.keys():

        r_p_pos = {'pos': [records[r_p][4]]}    

        r_p_df = pd.DataFrame(r_p_pos, columns=['pos'])

        print(r_p_df)

        layer = pdk.Layer(
            "TripsLayer",
            r_p_df,
            get_path="pos",
            get_timestamps=100,
            get_color=[50, 168, 81],
            opacity=1,
            width_min_pixels=5,
            rounded=True,
            trail_length=600,
            current_time=500,
        )

        layers.append(layer)
            

tracked_aircraft_ids = [x[0] for x in pts]

f = open('aircraft/paths.json')
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
with open("aircraft/paths.json", "w") as outfile:
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
layers.append(r_points)

# Set the viewport location
view_state = pdk.ViewState(latitude=41.62167472370139, longitude=-72.74676075892226, zoom=7, bearing=0, pitch=0)

# Render
r = pdk.Deck(layers=layers, initial_view_state=view_state, tooltip={"text": "{flight}\n{speed}\n{alt}\n({pos})"})
r.to_html("aircraft/map.html")

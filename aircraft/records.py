#local test file -- this script is implemented into collectAircraftData.py

import json
from datetime import datetime

station_location = (41.63337614922577, -72.79574959855289)

def dist(p1, p2):
    if p2[0] is None or p2[1] is None: return None
    return 68.9393939 * ((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2)**0.5

def get_path(hex):
    with open('aircraft/paths.json') as f:
        paths = json.load(f)
    path = paths[hex]
    return path

def in_path(hex):
    with open('aircraft/paths.json') as f:
        paths = json.load(f)
        return hex in paths.keys()

with open('aircraft/showRecords.txt') as f:
    show_records = f.read()
    

now = datetime.now()
t = now.strftime("%m/%d/%Y %H:%M:%S")

with open('aircraft/aircraft.json') as f:
    data = json.load(f)

records = {}

with open('aircraft/records.json') as f:
    prev_records = json.load(f)

records['max_speed'] = prev_records['max_speed']
records['min_speed'] = prev_records['min_speed']
records['max_alt'] = prev_records['max_alt']
records['min_alt'] = prev_records['min_alt']
records['max_dist'] = prev_records['max_dist']
records['min_dist'] = prev_records['min_dist']

max_speed = prev_records['max_speed'][0]
min_speed = prev_records['min_speed'][0]
max_alt = prev_records['max_alt'][0]
min_alt = prev_records['min_alt'][0]
max_dist = prev_records['max_dist'][0]
min_dist = prev_records['min_dist'][0]

for a in data['aircraft']:
    hex = a['hex']
    flight = a['flight'] if 'flight' in a.keys() else None
    speed = a['gs'] if 'gs' in a.keys() else None #mph
    alt = a['alt_geom'] if 'alt_geom' in a.keys() else None #feet
    lat = a['lat'] if 'lat' in a.keys() else None
    lon = a['lon'] if 'lon' in a.keys() else None
    d = dist(station_location, (lat, lon)) #miles

    if speed is not None:
        if speed > max_speed:
            max_speed = speed
            records['max_speed'] = [speed, hex, flight, t, get_path(hex)] if in_path(hex) else [speed, hex, flight, t, [lat, lon]] if lat is not None and lon is not None else [speed, hex, flight, t, []] 

    if speed is not None:
        if speed < min_speed:
            min_speed = speed
            records['min_speed'] = [speed, hex, flight, t, get_path(hex)] if in_path(hex) else [speed, hex, flight, t, [lat, lon]] if lat is not None and lon is not None else [speed, hex, flight, t, []] 

    if alt is not None:
        if alt > max_alt:
            max_alt = alt
            records['max_alt'] = [alt, hex, flight, t, get_path(hex)] if in_path(hex) else [alt, hex, flight, t, [lat, lon]] if lat is not None and lon is not None else [alt, hex, flight, t, []] 

    if alt is not None:
        if alt < min_alt:
            min_alt = alt
            records['min_alt'] = [alt, hex, flight, t, get_path(hex)] if in_path(hex) else [alt, hex, flight, t, [lat, lon]] if lat is not None and lon is not None else [alt, hex, flight, t, []] 

    if d is not None:
        if d > max_dist:
            max_dist = d
            records['max_dist'] = [d, hex, flight, t, get_path(hex)] if in_path(hex) else [d, hex, flight, t, [lat, lon]] if lat is not None and lon is not None else [d, hex, flight, t, []] 

    if d is not None:
            if d < min_dist:
                min_dist = d
                records['min_dist'] = [d, hex, flight, t, get_path(hex)] if in_path(hex) else [d, hex, flight, t, [lat, lon]] if lat is not None and lon is not None else [d, hex, flight, t, []] 


with open('aircraft/records.json', 'w') as outfile:
        json.dump(records, outfile)

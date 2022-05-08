import shutil
import time

while True:
    shutil.copy2("/run/dump1090-fa/aircraft.json", "/var/www/html/PiWebsite/aircraft")
    time.sleep(5)
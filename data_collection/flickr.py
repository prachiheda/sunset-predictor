import os
import time
import csv
import flickrapi
from dotenv import load_dotenv
from flickrapi.exceptions import FlickrError

# Load API key
load_dotenv()
API_KEY = os.getenv("FLICKR_API_KEY")

flickr = flickrapi.FlickrAPI(API_KEY, "", format='parsed-json')

CSV_FILE = "sunset_photos.csv"
HEADERS = ["id", "title", "datetaken", "latitude", "longitude", "url_l", "ownername", "tags"]

def safe_search(flickr, **kwargs):
    MAX_RETRIES = 3
    for attempt in range(MAX_RETRIES):
        try:
            return flickr.photos.search(**kwargs)
        except FlickrError as e:
            if "504" in str(e) and attempt < MAX_RETRIES - 1:
                wait = 2 ** attempt
                print(f"⚠️ Flickr 504 error, retrying in {wait} seconds...")
                time.sleep(wait)
            else:
                raise e

# Find the oldest date already in the file (if resuming)
def get_oldest_date_taken(csv_file):
    if not os.path.exists(csv_file):
        return None
    with open(csv_file, newline='', encoding="utf-8") as file:
        reader = csv.DictReader(file)
        rows = list(reader)
        if not rows:
            return None
        dates = [row["datetaken"] for row in rows if row["datetaken"]]
        return min(dates) if dates else None

# Prepare to append or write
file_exists = os.path.exists(CSV_FILE)
mode = "a" if file_exists else "w"

with open(CSV_FILE, mode=mode, newline="", encoding="utf-8") as file:
    writer = csv.DictWriter(file, fieldnames=HEADERS)
    if not file_exists:
        writer.writeheader()

    max_taken_date = get_oldest_date_taken(CSV_FILE)  # If resuming, use earliest date seen so far
    print(f"📅 Starting search with max_taken_date: {max_taken_date or 'most recent'}")

    while True:
        response = safe_search(
            flickr,
            tags='sunset',
            has_geo=1,
            extras='geo,date_taken,url_l,owner_name,tags',
            per_page=500,
            sort='date-taken-desc',
            media='photos',
            safe_search=1,
            max_taken_date=max_taken_date  # constrain to older photos
        )

        photos = response.get("photos", {}).get("photo", [])
        if not photos:
            print("✅ No more photos returned — stopping.")
            break

        print(f"📦 Fetched {len(photos)} photos through {photos[-1].get('datetaken')}")

        for photo in photos:
            writer.writerow({
                "id": photo.get("id"),
                "title": photo.get("title", ""),
                "datetaken": photo.get("datetaken", ""),
                "latitude": photo.get("latitude", ""),
                "longitude": photo.get("longitude", ""),
                "url_l": photo.get("url_l", ""),
                "ownername": photo.get("ownername", ""),
                "tags": photo.get("tags", "")
            })

        # Prepare next request
        max_taken_date = photos[-1].get("datetaken")
        if len(photos) < 500:
            print("✅ Fewer than 500 photos — likely at the end.")
            break

        time.sleep(1)

print(f"\n✅ Data saved and updated in {CSV_FILE}")

import requests
import json
from datetime import datetime

API_KEY = "AIzaSyB8Bo0MbPDM18D3wEXiiBky3LTSLTl4s54"

def fetch_latest_video(channel_id):
    url = f"https://www.googleapis.com/youtube/v3/search?key={API_KEY}&channelId={channel_id}&order=date&part=snippet&type=video&maxResults=1"
    res = requests.get(url).json()
    items = res.get("items", [])
    if items:
        video = items[0]
        video_id = video["id"]["videoId"]
        title = video["snippet"]["title"]
        thumbnail = video["snippet"]["thumbnails"]["high"]["url"]
        return {"video_id": video_id, "title": title, "thumbnail": thumbnail}
    return None

def fetch_video_stats(video_id):
    url = f"https://www.googleapis.com/youtube/v3/videos?key={API_KEY}&id={video_id}&part=statistics"
    res = requests.get(url).json()
    stats = res.get("items", [{}])[0].get("statistics", {})
    return stats
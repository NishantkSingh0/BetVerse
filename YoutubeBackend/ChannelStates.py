import os
import requests
import SharedMemory
from dotenv import load_dotenv
load_dotenv()
import random

YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

def get_latest_video(channel_id):
    url = "https://www.googleapis.com/youtube/v3/search"
    params = {
        "part": "snippet",
        "channelId": channel_id,
        "maxResults": 40,
        "order": "date",
        "type": "video",
        "key": YOUTUBE_API_KEY
    }
    SharedMemory.QuatCount += 100
    print('100 Quota deducted (get_latest_video)')
    response = requests.get(url, params=params).json()
    for item in response.get("items", []):
        if '#' not in item["snippet"]["title"].lower():
            return {
                "video_id": item["id"]["videoId"],
                "title": item["snippet"]["title"],
                "published": item["snippet"]["publishedAt"],
                "thumbnail": item["snippet"]["thumbnails"]["high"]["url"]
            }
        
    item=response.get("items", [])
    return random.choice(item)


def GetChannelInfo(channel_id):
    channel_url = "https://www.googleapis.com/youtube/v3/channels"
    channel_params = {
        "part": "snippet,statistics,brandingSettings",
        "id": channel_id,
        "key": YOUTUBE_API_KEY
    }
    SharedMemory.QuatCount += 1
    print("1 Quota deducted (GetChannelInfo)")
    channel_response = requests.get(channel_url, params=channel_params).json()

    if "items" not in channel_response or not channel_response["items"]:
        return None

    channel_data = channel_response["items"][0]
    return {
        "Name": channel_data["snippet"]["title"],
        "description": channel_data["snippet"].get("description", ""),
        "subscriberCount": channel_data["statistics"].get("subscriberCount", "0"),
        "viewCount": channel_data["statistics"].get("viewCount", "0"),
        "videoCount": channel_data["statistics"].get("videoCount", "0"),
        "Logo": channel_data["snippet"]["thumbnails"]['default']['url'],
        "customURL": channel_data['snippet'].get("customUrl", "null"),
        "started_in": channel_data['snippet'].get("publishedAt", "null").split('T')[0],
        "Country": channel_data['snippet'].get("country", "IN"),
    }


def get_video_stats(video_id):
    url = "https://www.googleapis.com/youtube/v3/videos"
    params = {
        "part": "statistics",
        "id": video_id,
        "key": YOUTUBE_API_KEY
    }
    SharedMemory.QuatCount += 1
    print('1 Quota deducted (get_video_stats)')
    response = requests.get(url, params=params).json()
    if response.get("items"):
        stats = response["items"][0]["statistics"]
        return {
            "views": stats.get("viewCount", "0"),
            "likes": stats.get("likeCount", "0"),
            "comments": stats.get("commentCount", "0")
        }
    return {"views": "0", "likes": "0", "comments": "0"}
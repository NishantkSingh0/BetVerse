from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from apscheduler.schedulers.background import BackgroundScheduler
import requests
import SharedMemory
from datetime import datetime, timedelta
import random
from ChannelStates import get_latest_video, GetChannelInfo, get_video_stats
import os
import ManageQuestions
from dotenv import load_dotenv

load_dotenv()
CurrentData=[]
VideoFetched = False

app = Flask(__name__)
CORS(app, origins=["https://bet-verse.vercel.app", "http://localhost:5173"])
socketio = SocketIO(app, cors_allowed_origins=["https://bet-verse.vercel.app", "http://localhost:5173"])

CHANNELS = {}  # Will be dynamically updated
SCHEDULE_TIMES = ["07:30", "11:00", "14:00", "17:00", "20:30"]

active_videos = {}
scheduler = BackgroundScheduler()

def is_sleep_time():
    now = datetime.now().time()
    return now >= datetime.strptime("23:30", "%H:%M").time() or now <= datetime.strptime("07:30", "%H:%M").time()

from datetime import datetime, timezone

def getTimeLapse(youtube_time_str):
    # Parse YouTube time
    video_time = datetime.strptime(youtube_time_str, "%Y-%m-%dT%H:%M:%SZ")
    video_time = video_time.replace(tzinfo=timezone.utc)

    # Get current time in UTC
    now = datetime.now(timezone.utc)

    # Compute time difference in hours
    delta = now - video_time
    hours = delta.total_seconds() / 3600

    return f"{int(hours)} hr ago"


channel_map = {
    "T-Series": "UCq-Fj5jknLsUf-MWSy4_brA", # Regular 2-3 videos
    "Zee Music Company": "UCFFbwnve3yF62-tVXkTyHqg", # Regular 1-2 videos
    "Sony Music India": "UC56gTxNs4f9xZ7Pa2i5xNzg", # Regular 1-2 videos
    "YRF (Yash Raj Films)": "UCbTLwN10NoCU4WDzLf1JMOA", # gaps of 3-4 days but hot *     X
    "CarryMinati": "UCj22tfcQrWG7EMEKS0qLeEg", # Gaps of 2-3 months
    "Amit Bhadana": "UC_vcKmg67vjMP7ciLnSxSHQ", # gaps of 1-2 months
    "The Viral Fever (TVF)": "UCQzdMyuz0Lf4zo4uGcEujFw", # gap of 5-6 days *  Channel id changed again!
    "Total Gaming": "UC5c9VlYTSvBSCaoMu_GI6gQ", # gap of a week
    "Techno Gamerz": "UCX8pnu3DYUnx8qy8V_c6oHg", # gap of a week 
    "Lokesh Gamer": "UCdQPeeJ0qGK6wWBiEJWcdsQ", # gap of 5-6 days      X
    # "Desi Gamers": "UCuApqv2tNQ73S7gcfrfCSDw", # gap of a week     X
    "Two Side Gamers": "UCiDikVE7Y4_KpQwsxarj38g", # gap of a week    X
}
nonMusic=[]

def selectRandom4():
    musicChannels=["T-Series", "Zee Music Company", "Sony Music India","YRF (Yash Raj Films)"]
    nonMusicChannels = ["CarryMinati", "Amit Bhadana", "The Viral Fever (TVF)", "Total Gaming", "Techno Gamerz", "Lokesh Gamer", "Two Side Gamers"]
    global nonMusic
    if not VideoFetched:
        nonMusic=random.sample(nonMusicChannels,2)
    RandomSelection=random.sample(musicChannels,2)+nonMusic
    selectedChannels={channel: channel_map[channel] for channel in RandomSelection}
    print(selectedChannels)
    return selectedChannels

def fetch_new_videos():
    global CHANNELS, VideoFetched, active_videos
    if is_sleep_time():
        print("Returned because it is sleep time")
        return
    
    CHANNELS = selectRandom4()

    # The first two channels will be fetched only once
    if VideoFetched:
        new={}
        for channel_name, channel_id in list(CHANNELS.items())[:2]:
            print(f"Searching for {channel_name}: {channel_id}")

            video = get_latest_video(channel_id)
            if not video:
                print("continue because no video found fetch_new_videos ifBlock")
                continue

            channel_info = GetChannelInfo(channel_id)
            if not channel_info:
                print("continue because no channelInfo found fetch_new_videos elseBlock")
                continue

            video.update(channel_info)
            video["added_time"] = datetime.utcnow()
            new[channel_name] = video
            
        active_videos=dict(list(new.items()) + list(active_videos.items())[2:])

    else:
        for channel_name, channel_id in CHANNELS.items():
            print(f"Searching for {channel_name}: {channel_id}")

            video = get_latest_video(channel_id)
            if not video:
                print("continue because no video found fetch_new_videos elseBlock")
                continue

            channel_info = GetChannelInfo(channel_id)
            if not channel_info:
                print("continue because no channelInfo found fetch_new_videos elseBlock")
                continue

            video.update(channel_info)
            video["added_time"] = datetime.utcnow()
            active_videos[channel_name] = video
            # print(f"[{datetime.now()}] New video for {channel_name}: {video['title']}")
        VideoFetched=True


def fetch_stats_periodically():
    if is_sleep_time() or not VideoFetched:
        print(f"Returned from fetch_stats_periodically due to isSleep: {is_sleep_time()} or VideoFetched: {VideoFetched}")
        return

    data = []
    for i,(_, video) in enumerate(list(active_videos.items())):
        elapsed = datetime.utcnow() - video["added_time"]
        if elapsed > timedelta(hours=3.5):
            # del active_videos[_] 
            continue 

        stats = get_video_stats(video["video_id"])
        SharedMemory.Stats[i]['ViewRate'].append(int(stats['views']))
        SharedMemory.Stats[i]['LikeRate'].append(int(stats['likes']))
        SharedMemory.Stats[i]['CommentRate'].append(int(stats['comments']))
        ManageQuestions.initialize_questions()
        # print("ManageQuestions.initialize_questions() called with stats", SharedMemory.Stats)

        data.append({
            "video_id": video["video_id"],
            "title": video["title"],
            "published": video["published"],
            "thumbnail": video["thumbnail"],
            "channelName": video['Name'],
            "description": video['description'],
            "subscriberCount": video['subscriberCount'],
            "viewCount": video['viewCount'],
            "videoCount": video['videoCount'],
            "Logo": video['Logo'],
            "customURL": video['customURL'],
            "started_in": video['started_in'],
            "Country": video['Country'],
            "Qns":{},
            "stats": SharedMemory.Stats[i],
            "QuotaUsed": SharedMemory.QuatCount
        })
        # print(f"[{datetime.now()}] Update for {channel_name}")
        

    if ManageQuestions.update_expired_questions():
        for i in range (len(data)):
            data[i]['Qns']=SharedMemory.GeneratedQuestions[i]

    global CurrentData
    CurrentData=data
    print('SharedSpace',SharedMemory.Stats[0]['ViewRate'], SharedMemory.Stats[0]['LikeRate'], SharedMemory.Stats[0]['CommentRate'])
    socketio.emit("video_update", data)

# Schedule trending fetch at specific times
for time_str in SCHEDULE_TIMES:
    h, m = map(int, time_str.split(":"))
    scheduler.add_job(fetch_new_videos, 'cron', hour=h, minute=m, misfire_grace_time=12600)

# Initial fetch at startup
print("Fetching new video's")
fetch_new_videos()

# Schedule periodic stats fetch every 30 seconds
scheduler.add_job(fetch_stats_periodically, 'interval',max_instances=3, seconds=150)
print("Starting schedule")
scheduler.start()


@socketio.on('disconnect')
def handle_disconnect():
    print("Client disconnected")

@app.route('/')
def home():
    return "YouTube Tracker API Running!"


@socketio.on('connect')
def handle_connect():
    print("Client connected")
    push=CurrentData
    for i in range(len(push)):
        push[i]['Qns'] = SharedMemory.GeneratedQuestions[i]

    emit("video_update", push)

if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=5000)
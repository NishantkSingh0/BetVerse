from fetcher import fetch_latest_video, fetch_video_stats
from threading import Thread
from datetime import datetime
import time
from flask_socketio import SocketIO

# SocketIO instance passed from your Flask app
socketio = None  # This will be set externally

MONITOR_INTERVAL = 30  # seconds

CHANNEL_IDS = {
    "T-Series": "UCq-Fj5jknLsUf-MWSy4_brA",
    "Zee Music": "UCFFbwnve3yF62-tVXkTyHqg",
    "Sony Music India": "UC56gTxNs4f9xZ7Pa2i5xNzg",
    "MrBeast": "UCX6OQ3DkcsbYNE6H8uQQuVA"
}

def monitor_video(video_id, label):
    while True:
        current_hour = datetime.now().hour
        if 7 <= current_hour < 23:
            stats = fetch_video_stats(video_id)
            print(f"[{label}] Stats: {stats}")

            # Send stats directly to frontend
            socketio.emit('video_stats', {
                "label": label,
                "video_id": video_id,
                "stats": stats,
                "timestamp": str(datetime.now())
            })
            time.sleep(MONITOR_INTERVAL)
        else:
            break

def fetch_and_monitor():
    print(f"[{datetime.now()}] Starting new cycle...")
    for name, channel_id in CHANNEL_IDS.items():
        video = fetch_latest_video(channel_id)
        if video:
            print(f"Found video for {name}: {video['title']}")
            label = f"{name}_{video['video_id']}"

            # Send basic video info to frontend
            socketio.emit('video_info', {
                "channel": name,
                "video_id": video["video_id"],
                "title": video["title"],
                "thumbnail": video["thumbnail"],
                "published": video["published"]
            })

            # Start background monitoring
            Thread(target=monitor_video, args=(video["video_id"], label)).start()
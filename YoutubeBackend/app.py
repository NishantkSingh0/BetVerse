from flask import Flask, render_template
from flask_socketio import SocketIO
from apscheduler.schedulers.background import BackgroundScheduler
from video_monitor import fetch_and_monitor

app = Flask(__name__)

socketio = SocketIO(app, cors_allowed_origins=[
    "https://bet-verse.vercel.app",
    "http://localhost:5173"
])

# Inject socketio into video_monitor module
import video_monitor
video_monitor.socketio = socketio

SCHEDULE_TIMES = ["07:30", "11:00", "14:30", "18:00", "21:30"]

def start_scheduler():
    scheduler = BackgroundScheduler(timezone="Asia/Kolkata")
    for t in SCHEDULE_TIMES:
        hour, minute = map(int, t.split(":"))
        scheduler.add_job(fetch_and_monitor, "cron", hour=hour, minute=minute)
    scheduler.start()

@app.route("/")
def index():
    return render_template("index.html")  # Your frontend that connects to SocketIO

if __name__ == "__main__":
    start_scheduler()
    socketio.run(app, host="0.0.0.0", port=5000)

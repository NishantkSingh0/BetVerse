from GenerateQuestions import GQ
import SharedMemory as sm
from datetime import datetime, timedelta

gq=GQ()
isUpdated=False

def initialize_questions():
    """Initialize the questions if they are not already generated."""
    if not sm.GeneratedQuestions or len(sm.GeneratedQuestions) == 0:
        for i in range(4):
            sm.GeneratedQuestions.append(gq.generate_questions(i, 5))
        print("Questions initialized Successfully.", sm.GeneratedQuestions)

def update_expired_questions():
    global isUpdated
    isUpdated=False
    current_time = datetime.now().time()

    while None in sm.GeneratedQuestions:
        sm.GeneratedQuestions.remove(None)
        
    for i in range(len(sm.GeneratedQuestions)):
        durations = sm.GeneratedQuestions[i]['duration']

        for j in range(len(durations)):
            try:
                # Parse the question's scheduled time (e.g., '12:20 PM')
                scheduled_time = datetime.strptime(durations[j], "%I:%M %p").time()

                if scheduled_time <= current_time:
                    print(f"[Expired] Q{i}-{j} at {durations[j]} — Updating...")

                    # Generate new question
                    newQn = gq.generate_questions(i, 1)

                    # Update this question and its scheduled time
                    sm.GeneratedQuestions[i]['duration'][j] = newQn['duration'][0]
                    sm.GeneratedQuestions[i]['Qn'][j] = newQn['Qn'][0]
                    isUpdated = True

            except Exception as e:
                print(f"Error parsing/updating Q{i}-{j}: {e}")
    
    return isUpdated


if __name__ == "__main__":
    initialize_questions()
import SharedMemory as sm
import time
from datetime import datetime, timedelta
from typing import List, Dict, Any

class GQ:
    def __init__(self):
        self.question_templates = {
            'short_term': {  # 5-10 minutes
                'templates': [
                    "Will this video maintain its current like rate '{avg_likerate:.2f}/Min' for the next {duration} minutes?",
                    "Will the view rate stay above {current_viewrate} views/min in the next {duration} minutes?",
                    "Will comment engagement increase by 5% in the next {duration} minutes?",
                    "Will the current View's momentum continue for the next {duration} minutes?"
                ],
                'duration_range': (5, 10),
                'metrics': ['LikeRate', 'ViewRate', 'CommentRate']
            },
            'medium_term': {  # 10-20 minutes
                'templates': [
                    "Based on current trend, will the video reach {projected_likes} likes by {target_time}?",
                    "Will this video reach {projected_views} views in the next {duration} minutes?",
                    "Will the engagement rate stay above 15% over the next {duration} minutes?",
                    "Is the video on track to break today's trending threshold in {duration} minutes?"
                ],
                'duration_range': (10, 20),
                'metrics': ['LikeRate', 'ViewRate', 'CommentRate']
            },
            'long_term': {  # 20-30 minutes
                'templates': [
                    "Will this be the most liked video from the channel by {target_time}?",
                    "Can this video outperform the previous video within the next {duration} minutes?",
                    "Will this become the top-performing video of the week if growth continues?",
                    "Is this video projected to surpass 2M views by {target_time}?"
                ],
                'duration_range': (20, 30),
                'metrics': ['LikeRate', 'ViewRate', 'CommentRate']
            }
        }
    
    def _get_current_stats(self,i) -> Dict:
        """Get current statistics from shared memory"""
        if not sm.Stats or len(sm.Stats) == 0:
            print('Returned due to sm.Stats empty _get_current_stats of GQ')
            return {}
        
        stats = sm.Stats[i]
        current_stats = {}
        
        for metric in ['LikeRate', 'ViewRate', 'CommentRate']:
            if metric in stats and stats[metric]:
                current_stats[f'current_{metric.lower()}'] = stats[metric][-1]
                current_stats[f'avg_{metric.lower()}'] = (stats[metric][-1]-stats[metric][0])/len(stats[metric])-1
                current_stats[f'total_{metric.lower()}'] = len(stats[metric])
        
        return current_stats

    def _calculate_projections(self, current_stats: Dict, duration: int) -> Dict:
        """Calculate projected values based on current trends"""
        projections = {} # {'projected_views': 151649, 'projected_likes': 373, 'target_time': '12:05 PM'}
        
        if 'avg_viewrate' in current_stats:
            projections['projected_views'] = int(current_stats['avg_viewrate'] * duration * 1.15) # Assuming a 15% growth factor

        if 'avg_likerate' in current_stats:
            projections['projected_likes'] = int(current_stats['avg_likerate'] * duration * 1.05) # Assuming a 5% growth factor
        
        # Calculate target time
        target_time = (datetime.now() + timedelta(minutes=duration)).strftime("%I:%M %p")
        projections['target_time'] = target_time
        
        return projections
    
    def generate_questions(self, i: int, question_count: int) -> dict[str]:
        """Generate dynamic questions with different time periods"""

        questions = {
            'Qn':[],
            'duration':[]
        }

        current_stats = self._get_current_stats(i)
        
        if not current_stats:
            return # ["No current statistics available for question generation"]

        # Generate questions from different time categories
        import random
        
        categories = list(self.question_templates.keys())
        
        for i in range(question_count):
            # Select category (ensuring variety)
            category = categories[i % len(categories)]
            template_data = self.question_templates[category]
            
            # Select random template from category
            template = random.choice(template_data['templates'])
            
            # Generate random duration within range
            duration = random.randint(*template_data['duration_range'])
            
            # Calculate projections
            projections = self._calculate_projections(current_stats, duration)
            questions['duration'].append(projections['target_time'])

            try:
                question_text = template.format(
                    duration=duration,
                    **current_stats,
                    **projections
                )
                
                questions['Qn'].append(question_text)
                
            except KeyError as e:
                # Fallback question if formatting fails
                print("FallBack Occured in generate_questions ---",e)
        
        return questions

# # Usage Example:
# if __name__ == "__main__":
#     # Initialize question generator
#     gq = GQ()
    
#     # Generate initial questions
#     questions = gq.generate_questions(0,1)
#     print("Generated Questions:",questions)
#     # for i in range(5):
#     #     print(f"{i+1}. {questions['Qn'][i]}",end=" || ")
#     #     print(f"Duration: {questions['duration'][i]}")
    
#     # print("\n" + "="*50)



# Sample Output:
    # Generated Questions:
    # 1. Will the view rate stay above 16090 views/min in the next 9 minutes? || Duration: 12:42
    # 2. Will this video reach 6560 views in the next 12 minutes? || Duration: 12:45
    # 3. Can this video outperform the previous video within the next 22 minutes? || Duration: 12:55
    # 4. Will comment engagement increase by 5% in the next 5 minutes? || Duration: 12:38
    # 5. Will this video reach 5466 views in the next 10 minutes? || Duration: 12:43

    # ==================================================
    # Generated Questions:
    # 1. Will comment engagement increase by 5% in the next 10 minutes? || Duration: 12:43
    # 2. Will the engagement rate stay above 15% over the next 13 minutes? || Duration: 12:46
    # 3. Can this video outperform the previous video within the next 21 minutes? || Duration: 12:54
    # 4. Will the current View's momentum continue for the next 8 minutes? || Duration: 12:41
    # 5. Based on current trend, will the video reach 3 likes by 12:45 PM? || Duration: 12:45

    # ==================================================
    # Generated Questions:
    # 1. Will the view rate stay above 16090 views/min in the next 7 minutes? || Duration: 12:40
    # 2. Is the video on track to break today's trending threshold in 12 minutes? || Duration: 12:45
    # 3. Is this video projected to surpass 2M views by 01:02 PM? || Duration: 01:02
    # 4. Will the current View's momentum continue for the next 7 minutes? || Duration: 12:40
    # 5. Is the video on track to break today's trending threshold in 20 minutes? || Duration: 12:53

    # ==================================================
    # Generated Questions:
    # 1. Will the view rate stay above 16090 views/min in the next 5 minutes? || Duration: 12:38
    # 2. Will the engagement rate stay above 15% over the next 15 minutes? || Duration: 12:48
    # 3. Can this video outperform the previous video within the next 30 minutes? || Duration: 01:03
    # 4. Will the view rate stay above 16090 views/min in the next 9 minutes? || Duration: 12:42
    # 5. Will the engagement rate stay above 15% over the next 14 minutes? || Duration: 12:47
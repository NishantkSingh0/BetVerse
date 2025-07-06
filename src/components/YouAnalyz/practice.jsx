import { useState, useEffect } from 'react';
import { Play, Pause, ArrowLeft, ThumbsUp, Eye, MessageCircle, Users, Calendar } from 'lucide-react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const YoutubeAnalyze = () => {
  const [channelData, setChannelData] = useState([]);
  const [expandedVideo, setExpandedVideo] = useState(null);
  const [socket, setSocket] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [predictions, setPredictions] = useState({});
  const [quotaUsed, setQuotaUsed] = useState(0);
  const navigate = useNavigate();

  const CountryMap = {
    "IN": "India",
    "US": "United States",
    "GB": "United Kingdom",
    "CA": "Canada",
    "AU": "Australia",
    "DE": "Germany",
    "FR": "France",
    "JP": "Japan",
    "KR": "South Korea",
    "BR": "Brazil",
    "IT": "Italy",
    "RU": "Russia",
    "CN": "China",
    "MX": "Mexico",
    "ZA": "South Africa",
    "ES": "Spain",
    "SE": "Sweden",
    "AR": "Argentina",
    "NL": "Netherlands",
    "TR": "Turkey",
    "FI": "Finland"
  };


  // Channel colors and info
  const channelConfig = [
    { 
      color: 'bg-red-700', 
      gradient:"bg-gradient-to-br from-red-900 via-red-800 to-red-950"
    },
    { 
      color: 'bg-blue-600', 
      gradient:"bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950"
    },
    { 
      color: 'bg-green-600', 
      gradient:"bg-gradient-to-br from-green-900 via-green-800 to-green-950"
    },
    { 
      color: 'bg-purple-600', 
      gradient:"bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950"
    }
  ]//.sort(() => Math.random() - 0.5);

  useEffect(() => {
    // Push a dummy state
    window.history.pushState(null, '', window.location.href);

    const onPopState = (event) => {
      event.preventDefault();

      // Call your custom back logic here
      setExpandedVideo(null)

      // Re-push state to prevent browser from going back
      window.history.pushState(null, '', window.location.href);
    };

    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  // Initialize WebSocket connection
  useEffect(() => {
    const socketConnection = io('http://127.0.0.1:5000');

    socketConnection.on('connect', () => {
      setConnectionStatus('Connected');
      console.log('Socket.IO connected');
    });

    // Listen for the correct event name from backend
    socketConnection.on('video_update', (data) => {
      console.log('Video update received:', data);
      setChannelData(data);
      generatePredictions(data);
      
      // Update quota count if available
      if (data.length > 0 && data[0].QuotaUsed) {
        setQuotaUsed(data[0].QuotaUsed);
      }
    });

    socketConnection.on('disconnect', () => {
      setConnectionStatus('Disconnected');
      console.log('Socket.IO disconnected');
    });

    socketConnection.on('connect_error', (error) => {
      setConnectionStatus('Error');
      console.error('Socket.IO connection error:', error);
    });

    setSocket(socketConnection);

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  // const Questions = data.map(item => item.Qns);

  // Generate prediction questions
  // const generatePredictions = (data) => {
  //   const newPredictions = {};
    
  //   data.forEach(video => {
  //     const currentViews = parseInt(video.stats.ViewRate.at(-1) || 0);
  //     const currentLikes = parseInt(video.stats.LikeRate.at(-1) || 0);
  //     const currentComments = parseInt(video.stats.CommentRate.at(-1) || 0);

  //     const now = new Date();
            
  //     newPredictions[video.video_id] = [
  //       {
  //         question: `Can this video climb from ${currentViews} to ${Math.floor(currentViews * 1.1)} views by 9:25 AM?`,
  //         type: 'views',
  //         target: Math.floor(currentViews * 1.1)
  //       },
  //       {
  //         question: `Will this video hit ${Math.floor(currentLikes * 1.2)} likes from the current ${currentLikes} by 10:10 AM?`,
  //         type: 'likes',
  //         target: Math.floor(currentLikes * 1.2)
  //       },
  //       {
  //         question: `Can it gather 50 more comments — from ${currentComments} to ${currentComments + 50} — in just 30 minutes?`,
  //         type: 'comments',
  //         target: currentComments + 50
  //       },
  //       {
  //         question: `Will it maintain its current momentum of 152.45 views/minute until 10:00 AM?`,
  //         type: 'engagement',
  //         target: 'maintain'
  //       },
  //       {
  //         question: `Will this video boost the subscriber count from ${video.subscriberCount} to at least ${Math.ceil(video.subscriberCount * 1.00001)}?`,
  //         type: 'trending',
  //         target: 'trending'
  //       }
  //     ];
  //   });
    
  //   setPredictions(newPredictions);
  // };

  // Format numbers
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // Format time ago
  const timeAgo = (dateString) => {
    const now = new Date();
    const published = new Date(dateString);
    const diffInHours = Math.floor((now - published) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  // Handle prediction vote
  const handlePredictionVote = (videoId, questionIndex, vote) => {
    console.log(`Voted ${vote} for question ${questionIndex} on video ${videoId}`);
    // Here you would typically send the vote to your server
  };

  if (expandedVideo) {
    const video = channelData.find(v => v.video_id === expandedVideo[0]);
    if (!video) return null;

    const channelColor = channelConfig[expandedVideo[1]]?.color || 'bg-pink-600';
    const videoPredictions = predictions[video.video_id] || [];
    const gradient=channelConfig[expandedVideo[1]]?.gradient || "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950"

    return (
      <div className="inset-0 z-50 overflow-auto">
        <div className="flex flex-col  md:flex-row min-h-screen">

          {/* Left / Top Panel */}
          <div className={`md:w-[40%] w-full p-4 ${channelColor} text-white`}>

            {/* Channel Info */}

            <div className="flex items-center gap-4 mb-4">
              {/* Back Button */}
              <button 
                onClick={() => setExpandedVideo(null)}
                className={`mb-4 flex items-center cursor-pointer gap-2 pt-5 py-2 ${channelColor} text-white rounded hover:scale-120 transition duration-200 font-semibold`}
              >
                <ArrowLeft className="w-4 h-4 md:w-7 md:h-7 lg:w-8 lg:h-8 transform scale-x-125" />
              </button>
              <img
                src={video.Logo}
                alt="Channel Logo"
                className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full shadow-lg"
              />
              <div>
                <h3 className="hidden md:block md:text-sm lg:text-lg font-bold">{video.channelName}</h3>
                <h3 className="block md:hidden md:text-sm lg:text-lg font-bold">{`${video.channelName.length>19?`${video.channelName.slice(0, 19)} ...`:video.channelName}`}</h3>
                <div className="flex items-center gap-1 text-sm opacity-90">
                  <Users className="w-4 h-4" />
                  <span>{(video.subscriberCount/1000000).toFixed(2)}M Subscribers</span>
                </div>
              </div>
            </div>

            {/* <p>About: {video.channelName} started in {video.started_in} originated from {CountryMap[video.Country]}</p> */}

            {/* Video Embed */}
            <div className="w-full aspect-video bg-black rounded-lg overflow-hidden mb-4">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video.video_id}?autoplay=0`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              {console.log(`https://www.youtube.com/embed/${video.video_id}?autoplay=0`)}
            </div>

            {/* Video Info */}
            <h2 className="text-xl font-bold mb-2">{video.title}</h2>
            <div className="flex pl-[5%] flex-wrap max-w-[90%] md:max-w-[100%] justify-between font-bold text-white/80 text-sm mt-2 gap-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{timeAgo(video.published)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span className='hidden md:block'>{formatNumber(parseInt(video.stats.ViewRate.at(-1) || 0))} views</span>
                <span className='md:hidden block'>{formatNumber(parseInt(video.stats.ViewRate.at(-1) || 0))}</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span className='hidden md:block'>{formatNumber(parseInt(video.stats.LikeRate.at(-1) || 0))} likes</span>
                <span className='md:hidden block'>{formatNumber(parseInt(video.stats.LikeRate.at(-1) || 0))}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span className='hidden md:block'>{formatNumber(parseInt(video.stats.CommentRate.at(-1) || 0))} comments</span>
                <span className='md:hidden block'>{formatNumber(parseInt(video.stats.CommentRate.at(-1) || 0))}</span>
              </div>
            </div>
            <div className='bg-gray-900/40 rounded-lg mt-5 p-2 border-gray-700'>{video.description.slice(0, 150)}...</div>
            <div className='hidden lg:flex justify-between mt-5 bg-gray-800/60 py-3 px-8 rounded-2xl'>
              <div><b>Founded in :</b> {video.started_in} <br /><b>Origin :</b> {CountryMap[video.Country]}</div>
              <div><b>Total Video's :</b> {video.videoCount} <br /><b>Total View's :</b> {(video.viewCount/1000000000).toFixed(2)}B</div>
            </div>
          </div>

          {/* Right / Bottom Panel */}
          <div className={`md:w-[60%] w-full ${gradient} p-6 overflow-auto`}>
            <h3 className="text-2xl font-bold mb-6 text-gray-100">What You Think...</h3>

            <div className="space-y-4">
              {videoPredictions.map((prediction, index) => (
                <div key={index} className="bg-gray-800/25 rounded-lg p-4 shadow-md">
                  <p className="text-gray-100 font-medium mb-4 text-lg leading-relaxed">
                    {prediction.question}
                  </p>
                  <div className="flex gap-2 md:gap-14 justify-center">
                    <button
                      onClick={() => handlePredictionVote(video.video_id, index, 'yes')}
                      className="flex-1 md:max-w-[40%] px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600 transition-colors font-medium"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handlePredictionVote(video.video_id, index, 'no')}
                      className="flex-1 px-4 py-2 md:max-w-[40%] bg-blue-700 text-white rounded hover:bg-blue-600 transition-colors font-medium"
                    >
                      No
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900/80 to-gray-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className='flex items-center'>
            <button 
              onClick={() => navigate('/Games')}
              className={`mb-4 flex items-center cursor-pointer mr-6 gap-2 pt-5 py-2 text-white rounded hover:scale-120 transition duration-200 font-semibold`}
            >   
              <ArrowLeft className="w-8 h-8 transform scale-x-125" />
            </button>
            <div className="flex items-center justify-center gap-4">
              <h1 className="hidden md:block text-xl md:text-2xl lg:text-4xl font-bold text-white mb-2">Youtube Analytical Prediction</h1> 
              <h1 className="block md:hidden text-xl md:text-2xl lg:text-4xl font-bold text-white mb-2">Analytical Prediction</h1>
              <div className={`w-4 h-4 rounded-full ${connectionStatus === 'Connected' ? 'bg-green-500' : 'bg-red-500'}`}></div>
              {quotaUsed > 0 && (
                <div className="text-white opacity-75">
                  <span className="text-lg">{quotaUsed}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            {/* <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${connectionStatus === 'Connected' ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-white opacity-75">{connectionStatus}</span>
            </div> 
            {quotaUsed > 0 && (
              <div className="text-white opacity-75">
                <span className="text-sm">Quota Used: {quotaUsed}</span>
              </div>
            )}*/}
          </div>
        </div>

        {/* Channel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {channelData.map((video,i) => {
            const channelColor = channelConfig[i]?.color || 'bg-pink-600';
            
            return (
              <div 
                key={video.video_id}
                className="bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                onClick={() => setExpandedVideo([video.video_id, i])}
              >
                {/* Top Colored Section */}
                <div 
                  className={`p-4 text-white ${channelColor}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={video.Logo}
                      alt="Logo"
                      className="w-8 h-8 rounded-full shadow-lg"
                    />
                    {/* <div className="text-2xl">{channelConfig[video.channelName]?.logo}</div> */}
                    <div className='flex flex-col gap-0.5 leading-none'>
                      <span className="font-bold text-lg">{video.channelName}</span>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{(video.subscriberCount / 1000000).toFixed(2)}M Subscribers</span>
                      </div>

                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    {/* <span>Origin : {CountryMap[video.Country]}</span> */}
                    <span className="hidden md:block text-sm">{video.customURL.length>15?`${video.customURL.slice(0,15)}...`:video.customURL}&nbsp; | </span> 
                    <span>Video's :&nbsp;{video.videoCount>10000?`${(video.videoCount/1000).toFixed(2)}K`:video.videoCount}+</span> | 
                    <span>View's :&nbsp;{(video.viewCount/1000000000).toFixed(2)}B+</span>
                  </div>
                </div>

                {/* Bottom White Section */}
                <div className="p-4">
                  <div className="flex gap-3 mb-0">
                    <img 
                      src={video.thumbnail} 
                      alt='Video Thumbnail'
                      // title={video.title}
                      className="w-40 h-22 sm:w-44.5 sm:h-25 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      
                      <h4 className="font-semibold text-sm leading-tight mb-2 line-clamp-2">
                        {video.title.length > 60 ? video.title.substring(0, 60) + '...' : video.title}
                      </h4>

                      <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
                        <Calendar className="w-3 h-3" />
                        <span>{timeAgo(video.published)}</span>
                      </div>

                      <div className="flex max-w-3xs justify-between text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{formatNumber(parseInt(video.stats.ViewRate.at(-1) || 0))}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          <span>{formatNumber(parseInt(video.stats.LikeRate.at(-1) || 0))}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          <span>{formatNumber(parseInt(video.stats.CommentRate.at(-1) || 0))}</span>
                        </div>
                      </div>

                    </div>
                  </div>
                 
                </div>
              </div>
            );
          })}
        </div>

        {(channelData.length === 0 && connectionStatus === 'Connected') && (
          <div className="text-center text-white opacity-75 mt-40">
            <div className="text-6xl mb-4">📺</div>
            <p className="text-2xl">Wait a while !!</p>
            <p className="text-sm mt-2">We are gathering data from backend</p>
          </div>
        )}
        {(connectionStatus !== 'Connected')&&(
          <div className="text-center text-white opacity-75 mt-40">
            <p className="text-2xl">it looks server is not running. and having any internal issue</p>
            <p className="text-sm mt-2">please report us at <a href="mailto:nishantsingh.talk@gmail.com">nishantsingh.talk</a> with attached screenshot and timing</p>
          </div>
        )}
      </div>
        {(channelData.length !== 0 && connectionStatus === 'Connected')&&(
          <footer>
            <div className="text-center text-white opacity-75 mt-10">
              <p className="text-sm">This platform is not affiliated with YouTube</p>
              <p className="text-sm"><a href="/youtube-ethics-policy/robots.txt" target='_blank'>Terms with youtube integration</a></p>
            </div>
          </footer>
        )}
    </div>
  );
};

export default YoutubeAnalyze;
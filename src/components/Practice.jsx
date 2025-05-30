import React, { useState, useEffect, useCallback } from 'react';
import { Clock, Users, ThumbsUp, Eye, Play, Calendar, AlertCircle, Search } from 'lucide-react';

const Practice = () => {
  const [channelData, setChannelData] = useState({});
  const [isActive, setIsActive] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [searchIds, setSearchIds] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);
  const apiKey="AIzaSyB8Bo0MbPDM18D3bnmioklwEXiiBky3LTSLTl4s54";
  // const [showApiInput, setShowApiInput] = useState(true);
  const [initializationTime, setInitializationTime] = useState(null);

  // YouTube channels configuration with actual channel IDs
  const channels = [
    { 
      name: 'T-Series', 
      id: 'UCq-Fj5jknLsUf-MWSy4_brA', 
      color: 'bg-red-500',
      handle: '@TSeries'
    },
    { 
      name: 'ZeeMusic Company', 
      id: 'UCFFbwnve3yF62-tVXkTyHqg', 
      color: 'bg-blue-500',
      handle: '@zeemusiccompany'
    },
    { 
      name: 'SET India', 
      id: 'UCpEhnqL0y41EpW2TvWAHD7Q', 
      color: 'bg-green-500',
      handle: '@SETIndia'
    },
    { 
      name: 'MrBeast', 
      id: 'UCX6OQ3DkcsbYNE6H8uQQuVA', 
      color: 'bg-purple-500',
      handle: '@MrBeast'
    }
  ];

  // Check if current time is within active hours (7:30 AM - 11:00 PM)
  const checkActiveHours = useCallback(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;
    const startTime = 7 * 60 + 30; // 7:30 AM
    const endTime = 23 * 60; // 11:00 PM
    
    return currentTime >= startTime && currentTime <= endTime;
  }, []);

  // Initial search and data fetch (called once at 7:30 AM)
  const initializeChannelData = async () => {

    try {
      setError(null);
      const newChannelData = {};
      const newSearchIds = {};

      for (const channel of channels) {
        try {
          // 1. Get channel basic info and stats
          const channelResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channel.id}&key=${apiKey}`
          );

          if (!channelResponse.ok) {
            throw new Error(`HTTP error! status: ${channelResponse.status}`);
          }

          const channelData = await channelResponse.json();
          
          if (channelData.error) {
            throw new Error(channelData.error.message);
          }

          if (!channelData.items || channelData.items.length === 0) {
            throw new Error('Channel not found');
          }

          const channelInfo = channelData.items[0];

          // 2. Search for latest video (ONCE per day)
          const videosResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel.id}&maxResults=1&order=date&type=video&key=${apiKey}`
          );

          let latestVideo = null;
          let videoId = null;

          if (videosResponse.ok) {
            const videosData = await videosResponse.json();
            if (videosData.items && videosData.items.length > 0) {
              const video = videosData.items[0];
              videoId = video.id.videoId;
              
              // Store the video ID for later use
              newSearchIds[channel.id] = videoId;

              // Get initial video statistics
              const videoStatsResponse = await fetch(
                `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${apiKey}`
              );

              if (videoStatsResponse.ok) {
                const videoStatsData = await videoStatsResponse.json();
                if (videoStatsData.items && videoStatsData.items.length > 0) {
                  latestVideo = {
                    id: videoId,
                    title: video.snippet.title,
                    thumbnail: video.snippet.thumbnails?.medium?.url || video.snippet.thumbnails?.default?.url,
                    publishedAt: video.snippet.publishedAt,
                    viewCount: videoStatsData.items[0].statistics.viewCount,
                    likeCount: videoStatsData.items[0].statistics.likeCount,
                    commentCount: videoStatsData.items[0].statistics.commentCount
                  };
                }
              }
            }
          }

          newChannelData[channel.id] = {
            ...channel,
            id: channelInfo.id,
            title: channelInfo.snippet.title,
            description: channelInfo.snippet.description,
            thumbnail: channelInfo.snippet.thumbnails?.default?.url,
            customUrl: channelInfo.snippet.customUrl,
            publishedAt: channelInfo.snippet.publishedAt,
            statistics: {
              viewCount: channelInfo.statistics.viewCount,
              subscriberCount: channelInfo.statistics.subscriberCount,
              videoCount: channelInfo.statistics.videoCount
            },
            latestVideo
          };

        } catch (err) {
          console.error(`Failed to initialize data for ${channel.name}:`, err);
          newChannelData[channel.id] = {
            ...channel,
            error: err.message,
            statistics: {
              viewCount: null,
              subscriberCount: null,
              videoCount: null
            },
            latestVideo: null
          };
        }
      }
      
      setChannelData(newChannelData);
      setSearchIds(newSearchIds);
      setIsInitialized(true);
      setInitializationTime(new Date());
      setLastUpdate(new Date());
      
    } catch (err) {
      setError('Failed to initialize channel data: ' + err.message);
      console.error('Error initializing channel data:', err);
    }
  };

  // Fetch live data only (views, likes) using stored search IDs
  const fetchLiveData = useCallback(async () => {
    if (!isActive || !apiKey || !isInitialized || Object.keys(searchIds).length === 0) return;

    try {
      setError(null);
      const updatedChannelData = { ...channelData };

      for (const channel of channels) {
        const videoId = searchIds[channel.id];
        if (!videoId || !updatedChannelData[channel.id]) continue;

        try {
          // Only fetch video statistics (1 unit per call)
          const videoStatsResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${apiKey}`
          );

          if (videoStatsResponse.ok) {
            const videoStatsData = await videoStatsResponse.json();
            if (videoStatsData.items && videoStatsData.items.length > 0) {
              const stats = videoStatsData.items[0].statistics;
              
              // Update only the live data (views, likes)
              if (updatedChannelData[channel.id].latestVideo) {
                updatedChannelData[channel.id].latestVideo = {
                  ...updatedChannelData[channel.id].latestVideo,
                  viewCount: stats.viewCount,
                  likeCount: stats.likeCount,
                  commentCount: stats.commentCount
                };
              }
            }
          }

          // Channel stats updated only once at initialization
          // Live updates focus only on video stats for efficiency

        } catch (err) {
          console.error(`Failed to fetch live data for ${channel.name}:`, err);
        }
      }
      
      setChannelData(updatedChannelData);
      setLastUpdate(new Date());
      
    } catch (err) {
      setError('Failed to fetch live data: ' + err.message);
      console.error('Error fetching live data:', err);
    }
  }, [isActive, apiKey, isInitialized, searchIds, channelData]);

  // Format large numbers
  const formatNumber = (num) => {
    if (num === null || num === undefined) return 'N/A';
    const number = parseInt(num);
    if (isNaN(number)) return 'N/A';
    
    if (number >= 1000000000) return (number / 1000000000).toFixed(1) + 'B';
    if (number >= 1000000) return (number / 1000000).toFixed(1) + 'M';
    if (number >= 1000) return (number / 1000).toFixed(1) + 'K';
    return number.toLocaleString();
  };

  // Time formatting
  const formatTime = (date) => {
    return date ? date.toLocaleTimeString() : 'Never';
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  // Handle API key submission
  // const handleApiKeySubmit = (e) => {
  //   e.preventDefault();
  //   if (apiKey.trim()) {
  //     setShowApiInput(false);
  //     setError(null);
  //   }
  // };

  // Reset for new day (reinitialize)
  const resetForNewDay = () => {
    setIsInitialized(false);
    setSearchIds({});
    setChannelData({});
    setInitializationTime(null);
  };

  // Effect to handle active hours and initialization
  useEffect(() => {
    const checkAndSetActive = () => {
      const active = checkActiveHours();
      const wasActive = isActive;
      setIsActive(active);
      
      // If becoming active and not initialized, initialize
      if (active && !wasActive && !isInitialized) {
        initializeChannelData();
      }
      
      // Reset at start of new day (7:30 AM)
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      if (hours === 7 && minutes === 30 && isInitialized) {
        resetForNewDay();
      }
    };

    checkAndSetActive();
    const interval = setInterval(checkAndSetActive, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [checkActiveHours, isActive, isInitialized]);

  // Effect to fetch live data every 30 seconds
  useEffect(() => {
    if (!isActive || !apiKey || !isInitialized) return;

    const interval = setInterval(fetchLiveData, 30000); // Every 30 seconds
    return () => clearInterval(interval);
  }, [isActive, apiKey, isInitialized, fetchLiveData]);

  // API Key Input Component
  // if (showApiInput) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
  //       <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
  //         <h2 className="text-2xl font-bold text-gray-800 mb-4">YouTube API Setup</h2>
  //         <p className="text-gray-600 mb-6">
  //           Enter your YouTube Data API v3 key to start fetching real-time data.
  //         </p>
          
  //         <form onSubmit={handleApiKeySubmit}>
  //           <div className="mb-4">
  //             <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
  //               YouTube Data API Key
  //             </label>
  //             <input
  //               type="password"
  //               id="apiKey"
  //               value={apiKey}
  //               onChange={(e) => setApiKey(e.target.value)}
  //               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //               placeholder="Enter your API key..."
  //               required
  //             />
  //           </div>
            
  //           <button
  //             type="submit"
  //             className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
  //           >
  //             Start Dashboard
  //           </button>
  //         </form>
          
  //         <div className="mt-6 text-sm text-gray-500">
  //           <p className="font-medium mb-2">Optimized API Usage:</p>
  //           <ul className="space-y-1">
  //             <li>• Search once at 7:30 AM startup</li>
  //             <li>• Live data updates every 30 seconds</li>
  //             <li>• ~2,880 units/day (within free limit)</li>
  //           </ul>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  const StatusIndicator = () => (
    <div className="mb-6 p-4 bg-gray-100 rounded-lg">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="font-medium">
              Status: {isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isInitialized ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
            <span className="text-sm">
              {isInitialized ? 'Initialized' : 'Waiting for 7:30 AM'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>Active: 7:30 AM - 11:00 PM</span>
          </div>
          {initializationTime && (
            <div className="flex items-center gap-1">
              <Search size={16} />
              <span>Init: {formatTime(initializationTime)}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>Last Update: {formatTime(lastUpdate)}</span>
          </div>
        </div>
        
        {/* <button
          onClick={() => setShowApiInput(true)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Change API Key
        </button> */}
      </div>
      
      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
      
      {isInitialized && (
        <div className="mt-2 text-xs text-green-600">
          ✓ Daily search completed • Live data updating every 30 seconds
        </div>
      )}
    </div>
  );

  const ChannelCard = ({ channel }) => {
    const data = channelData[channel.id];
    if (!data) return null;

    const hasError = data.error;

    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Header */}
        <div className={`${channel.color} p-4 text-white`}>
          <div className="flex items-center gap-3">
            <img 
              src={data.thumbnail || `https://via.placeholder.com/48x48/666/fff?text=${channel.name.charAt(0)}`}
              alt={channel.name}
              className="w-12 h-12 rounded-full bg-white/20"
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/48x48/666/fff?text=${channel.name.charAt(0)}`;
              }}
            />
            <div>
              <h3 className="font-bold text-lg">{data.title || channel.name}</h3>
              <p className="text-white/80 text-sm">
                {formatNumber(data.statistics?.subscriberCount)} subscribers
              </p>
              {data.customUrl && (
                <p className="text-white/60 text-xs">{data.customUrl}</p>
              )}
            </div>
          </div>
          {hasError && (
            <div className="mt-2 flex items-center gap-1 text-white/80 text-xs">
              <AlertCircle size={12} />
              <span>API Error: {data.error}</span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="p-4">
          {/* <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                <Eye size={16} />
                <span className="text-xs">Total Views</span>
              </div>
              <div className="font-bold text-lg">
                {formatNumber(data.statistics?.viewCount)}
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                <Play size={16} />
                <span className="text-xs">Videos</span>
              </div>
              <div className="font-bold text-lg">
                {formatNumber(data.statistics?.videoCount)}
              </div>
            </div>
          </div> */}

          {/* Channel Info */}
          {/* <div className="text-xs text-gray-500 mb-4">
            <p>Created: {formatDate(data.publishedAt)}</p>
          </div> */}

          {/* Latest Video */}
          <div className="border-t pt-4">
            <h4 className="font-semibold text-sm mb-2">Latest Video (Live Data)</h4>
            {data.latestVideo ? (
              <div className="flex gap-3">
                <img 
                  src={data.latestVideo.thumbnail || `https://via.placeholder.com/64x48/444/fff?text=Video`}
                  alt="Latest video"
                  className="w-16 h-12 rounded object-cover"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/64x48/444/fff?text=Video`;
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate mb-1">
                    {data.latestVideo.title}
                  </p>
                  <div className="flex gap-3 text-xs text-gray-600 mb-1">
                    <div className="flex items-center gap-1">
                      <Eye size={12} />
                      <span className="font-semibold text-green-600">
                        {formatNumber(data.latestVideo.viewCount)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp size={12} />
                      <span className="font-semibold text-blue-600">
                        {formatNumber(data.latestVideo.likeCount)}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    {formatDate(data.latestVideo.publishedAt)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                N/A - Unable to fetch latest video
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            YouTube Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Real-time analytics • Search once at 7:30 AM • Live data every 30 seconds
          </p>
        </div>

        {/* Status */}
        <StatusIndicator />

        {/* Channel Grid */}
        {isInitialized ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {channels.map((channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <Search size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">Waiting for initialization at 7:30 AM...</p>
              <p className="text-sm mt-2">Search will run once, then live data updates every 30 seconds</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Dashboard active from 7:30 AM to 11:00 PM daily</p>
          <p className="mt-1">Search once per day • Live data every 30 seconds • ~2,880 API units/day</p>
          <p className="mt-1">Powered by YouTube Data API v3</p>
        </div>
      </div>
    </div>
  );
};

export default Practice;
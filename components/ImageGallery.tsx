'use client';

import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Play } from 'lucide-react';
import { ImageViewer } from './ImageViewer';

type MediaItem = {
  name: string;
  publicUrl: string;
  mediaType: 'image' | 'video';
  created_at: string;
  message_id: string;
};

function VideoThumbnail({ src, className }: { src: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [thumbnailReady, setThumbnailReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 1; // Seek to 1 second to get a better thumbnail
      
      const handleLoaded = () => {
        setThumbnailReady(true);
      };
      
      video.addEventListener('loadeddata', handleLoaded);
      return () => video.removeEventListener('loadeddata', handleLoaded);
    }
  }, []);

  return (
    <div className={`relative ${className}`}>
      <video
        ref={videoRef}
        src={src}
        className={`object-cover w-full h-full transition-opacity duration-300 ${
          thumbnailReady ? 'opacity-100' : 'opacity-0'
        }`}
        preload="metadata"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black/50 rounded-full p-3 backdrop-blur-sm">
          <Play className="w-8 h-8 text-white" fill="white" />
        </div>
      </div>
      {!thumbnailReady && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
}

export function ImageGallery() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [gridSize, setGridSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const gridSizeClasses = {
    small: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4',
    medium: 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4',
    large: 'grid-cols-1 sm:grid-cols-2 gap-4',
  };

  useEffect(() => {
    // Initial fetch
    fetchMedia();

    // Set up real-time subscription for database changes
    const channel = supabase
      .channel('media_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'media_pmw',
        },
        () => {
          fetchMedia(); // Refetch when media_pmw table changes
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchMedia = async () => {
    try {
      // Fetch from media_pmwtable
      const { data: mediaUrls, error } = await supabase
        .from('media_pmw')
        .select('*')
        .order('timestamp', sortOrder === 'newest' ? { ascending: false } : { ascending: true });

      console.log('Media URLs from database:', mediaUrls);

      if (error) throw error;

      // Transform the database records into MediaItems
      const items: MediaItem[] = (mediaUrls || []).map((record) => ({
        name: record.storage_path,
        publicUrl: record.public_url,
        mediaType: record.media_type,
        created_at: record.timestamp,
        message_id: record.message_id,
      }));

      console.log('Transformed media items:', items);
      setMediaItems(items);
    } catch (error) {
      console.error('Detailed error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortedMediaItems = mediaItems; // No need to sort here as we're sorting in the query

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-6">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
            className="px-3 py-1 rounded border text-sm bg-background"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
        <div className="flex items-center gap-1 p-1 bg-muted rounded-lg w-full sm:w-auto">
          {(['small', 'medium', 'large'] as const).map((size) => (
            <button
              key={size}
              onClick={() => setGridSize(size)}
              className={`flex-1 sm:flex-none px-2 sm:px-3 py-1.5 rounded text-sm ${
                gridSize === size ? 'bg-background shadow' : ''
              }`}
            >
              {size === 'small' ? 'S' : size === 'medium' ? 'M' : 'L'}
            </button>
          ))}
        </div>
      </div>

      <div className={`grid ${gridSizeClasses[gridSize]}`}>
        {sortedMediaItems.map((item, index) => (
          <div 
            key={item.name} 
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity bg-muted/50"
            onClick={() => setSelectedIndex(index)}
          >
            {item.mediaType === 'video' ? (
              <VideoThumbnail
                src={item.publicUrl}
                className="w-full h-full"
              />
            ) : (
              <img
                src={item.publicUrl}
                alt={`Uploaded at ${item.created_at}`}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-black/10 text-white/50 text-[10px] p-1.5 backdrop-blur-[1px]">
              {new Date(item.created_at).toLocaleString()}
            </div>
          </div>
        ))}
        
        {mediaItems.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No images or videos uploaded yet. Upload media to see it here!
          </div>
        )}
      </div>

      {selectedIndex !== null && (
        <ImageViewer
          items={sortedMediaItems}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onNavigate={setSelectedIndex}
        />
      )}
    </>
  );
} 
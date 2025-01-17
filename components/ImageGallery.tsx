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
    small: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
    medium: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    large: 'grid-cols-1 md:grid-cols-2',
  };

  useEffect(() => {
    // Initial fetch
    fetchMedia();

    // Set up real-time subscription for storage changes
    const channel = supabase
      .channel('storage_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'storage',
          table: 'objects',
        },
        () => {
          fetchMedia(); // Refetch when storage changes
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchMedia = async () => {
    try {
      // Create the bucket if it doesn't exist
      const { error: bucketError } = await supabase.storage.createBucket('pmwweddings', {
        public: true,
        fileSizeLimit: 52428800, // 50MB
      });
      
      if (bucketError && bucketError.message !== 'Bucket already exists') {
        throw bucketError;
      }

      // List all files in the domo folder
      const { data: files, error } = await supabase.storage
        .from('pmwweddings')
        .list('domo', {
          sortBy: { column: 'created_at', order: 'desc' },
        });

      if (error) throw error;

      // Transform the files into MediaItems
      const items: MediaItem[] = await Promise.all(
        (files || []).map(async (file) => {
          const { data: { publicUrl } } = supabase.storage
            .from('pmwweddings')
            .getPublicUrl(`domo/${file.name}`);

          return {
            name: file.name,
            publicUrl,
            mediaType: file.metadata?.mimetype?.startsWith('video/') ? 'video' : 'image',
            created_at: file.created_at,
          };
        })
      );

      setMediaItems(items);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortedMediaItems = [...mediaItems].sort((a, b) => {
    const comparison = new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    return sortOrder === 'newest' ? comparison : -comparison;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between items-stretch sm:items-center">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
          className="bg-muted p-2 rounded text-sm"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
        
        <div className="flex gap-1 bg-muted p-1 rounded-lg">
          {(['small', 'medium', 'large'] as const).map((size) => (
            <button
              key={size}
              onClick={() => setGridSize(size)}
              className={`flex-1 sm:flex-none px-2 sm:px-3 py-1 rounded text-sm ${
                gridSize === size ? 'bg-background shadow' : ''
              }`}
            >
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className={`grid ${gridSizeClasses[gridSize]} gap-4`}>
        {sortedMediaItems.map((item, index) => (
          <div 
            key={item.name} 
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
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
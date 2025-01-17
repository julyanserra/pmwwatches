'use client';

import { ChevronLeft, ChevronRight, X, Download, Play, Pause } from "lucide-react";
import { useEffect, useRef, TouchEvent, useState } from "react";

interface MediaItem {
  name: string;
  publicUrl: string;
  mediaType: 'image' | 'video';
  created_at: string;
}

interface ImageViewerProps {
  items: MediaItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ImageViewer({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: ImageViewerProps) {
  const currentItem = items[currentIndex];
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const delta = e.deltaY * -0.01;
        const newScale = Math.min(Math.max(scale + delta, 1), 3);
        setScale(newScale);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('wheel', handleWheel);
    };
  }, [onClose, scale]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentIndex < items.length - 1) {
        handleNext();
      } else if (diff < 0 && currentIndex > 0) {
        handlePrevious();
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      onNavigate(currentIndex + 1);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleDownload = async () => {
    try {
      const response = await fetch(currentItem.publicUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = currentItem.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={onClose}
    >
      <div className="absolute top-4 right-4 flex gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDownload();
          }}
          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        >
          <Download className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={onClose}
          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrevious();
        }}
        className="absolute left-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        style={{ display: currentIndex === 0 ? 'none' : 'block' }}
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        style={{ display: currentIndex === items.length - 1 ? 'none' : 'block' }}
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <div 
        onClick={(e) => e.stopPropagation()} 
        className="relative max-w-[90vw] max-h-[90vh]"
        style={{ transform: `scale(${scale})` }}
      >
        {currentItem.mediaType === 'video' ? (
          <div className="relative">
            <video
              ref={videoRef}
              src={currentItem.publicUrl}
              controls={false}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={() => setIsPlaying(!isPlaying)}
            />
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white" fill="white" />
              )}
            </button>
          </div>
        ) : (
          <img
            src={currentItem.publicUrl}
            alt={currentItem.name}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          />
        )}
      </div>
    </div>
  );
} 
# Wedding Watch

A modern web application for tracking and celebrating our friend group's weddings. Built with Next.js and featuring real-time photo sharing through WhatsApp integration.

## Overview

Wedding Watch helps us keep track of upcoming weddings in our friend group and creates a shared experience during celebrations. The app maintains a timeline of all our friends' weddings and provides a collaborative platform for sharing moments during these special events.

## Core Features

### 🎯 Wedding Timeline
- Track upcoming and past weddings within our friend group
- Currently featuring Dominic Dithurbide's wedding (18/01/2025)
- Future celebrations for David Roemer, Alejandro Roemer, Daniel Chavez, and more

### 📸 Live Photo Sharing
- Real-time photo gallery updated through WhatsApp integration
- Easy sharing: Just send photos to our designated WhatsApp number
- Instant updates to the gallery visible to all guests

### 🖼️ Photo Gallery
- Browse all shared wedding photos in a beautiful, responsive gallery
- Organized by celebration
- Easy navigation and viewing experience

## Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Radix UI
- **Typography**: Playfair Display & Cormorant fonts
- **Icons**: Lucide Icons & React Icons

### Backend & Integration
- **WhatsApp Business API**: Real-time photo delivery system
- **Webhook System**: Automated photo processing pipeline
  - Instant message processing
  - Image extraction and optimization
  - Real-time gallery updates
- **Database**: Supabase for photo storage and wedding data
- **API Routes**: Next.js API routes for webhook handling

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up your environment variables in `.env.local`:
```
NEXT_PUBLIC_WHATSAPP_NUMBER=your_whatsapp_number
NEXT_PUBLIC_CELEBRATION_ENDED=false
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
app/
├── page.tsx          # Homepage with wedding timeline
├── photos/          # Photo gallery
├── domo/            # Dominic's wedding page
└── api/             # Backend API routes
```

## Contributing

This is a private project for our friend group. If you're part of the group and want to contribute, please reach out to get access to the repository.

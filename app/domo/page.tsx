'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Playfair_Display, Cormorant } from 'next/font/google'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ChevronRightIcon } from "@radix-ui/react-icons"

const playfair = Playfair_Display({ subsets: ['latin'] })
const cormorant = Cormorant({ subsets: ['latin'], weight: ['300', '400', '600'] })

type Friend = {
  name: string;
  message: string;
}

export default function WeddingGiftMemento() {
  const [open, setOpen] = useState(false)
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null)

  const friends: Friend[] = [
    { name: 'David Roemer', message: "Dominic, may your marriage be as precise and enduring as this timepiece. Just as a Longines watch marks the passage of time with unwavering accuracy, may your love grow stronger with each passing moment. Your journey together is like the intricate mechanism of a fine watch - complex, beautiful, and designed to last a lifetime." },
    { name: 'Alejandro Roemer', message: "Here's to a lifetime of adventures together, always in perfect time. Like the HydroConquest that can withstand the depths of the ocean, may your love be resilient and endure all of life's pressures. May each tick of this watch remind you of the precious moments you'll share and the memories you'll create together." },
    { name: 'Daniel Chavez', message: "Wishing you both a future filled with precious moments. This Longines is more than just a timepiece; it's a symbol of the endless love and commitment you share. May it serve as a constant reminder of this special day and the beautiful journey that lies ahead of you." },
    { name: 'Franco Niro', message: "May your love story be timeless, just like this Longines. As this watch will accompany you through life's adventures, big and small, may your love be the constant force that guides you. Here's to a marriage filled with joy, laughter, and countless moments worth cherishing." },
    { name: 'Alejandro Caraco', message: "To new beginnings and everlasting love. Congratulations! This HydroConquest represents the depth of your love and the strength of your bond. May your marriage be as precise and reliable as this magnificent timepiece, marking many happy years together." },
    { name: 'Marcos Ramirez', message: "Cheers to a marriage that stands the test of time. Like this Longines that's built to last, may your love endure through all of life's challenges. Here's to countless anniversaries, shared dreams, and a lifetime of happiness together." },
    { name: 'Julian Serra', message: "May your days together be countless and your love immeasurable. This watch symbolizes the precious time you'll spend together. May each second be filled with love, each minute with understanding, and each hour with happiness." },
    { name: 'Alex Berho', message: "Here's to love, laughter, and happily ever after. As this Longines keeps perfect time, may your hearts beat in perfect harmony. Wishing you a marriage full of beautiful moments, shared dreams, and endless love." },
    { name: 'Jeronimo Aguilar', message: "Wishing you a lifetime of love and happiness, synchronized perfectly. Like the precise movements of this HydroConquest, may your lives move together in perfect sync. Here's to a future filled with love, adventure, and countless reasons to celebrate." }
  ]

  return (
    <main className="min-h-screen bg-white text-black">
      <nav className="max-w-4xl mx-auto px-4 sm:px-8 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <ChevronRightIcon className="h-4 w-4" />
          <span className="text-black">Domo</span>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-4 sm:px-8 pb-8 sm:pb-16 space-y-8 sm:space-y-16">
        <div className="space-y-6 text-center">
          <h1 className={`${playfair.className} text-3xl sm:text-5xl md:text-6xl animate-fade-in`}>
            Dominic & Estefania
          </h1>
          <p className={`${cormorant.className} text-lg sm:text-xl md:text-2xl italic`}>
            January 18, 2025
          </p>
        </div>
        
        <div className="relative aspect-[4/3] w-full max-w-2xl mx-auto">
          <div className="absolute inset-0 border-4 border-black rotate-3 transition-transform hover:rotate-0 duration-300"></div>
          <Image
            src="https://zcvhywceufejkyhcmngh.supabase.co/storage/v1/object/public/miscellaneous/Screenshot%202025-01-05%20at%201.50.31%20PM.png?t=2025-01-05T19%3A51%3A15.172Z"
            alt="Dominic and Mariana"
            layout="fill"
            objectFit="cover"
            className="rounded-sm shadow-2xl animate-fade-in transition-transform hover:scale-105 duration-300"
          />
        </div>

        <div className="space-y-6">
          <h2 className={`${playfair.className} text-2xl sm:text-3xl text-center`}>
            Messages from Friends
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {friends.map((friend, index) => (
              <Card 
                key={index} 
                className="animate-fade-in hover:bg-gray-50 transition-all duration-300 hover:shadow-lg cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => {
                  setSelectedFriend(friend)
                  setOpen(true)
                }}
              >
                <CardContent className="p-4 sm:p-6 flex items-center justify-center min-h-[100px]">
                  <p className={`${cormorant.className} text-base sm:text-lg text-center font-medium`}>
                    {friend.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle className={`${playfair.className} text-xl sm:text-2xl text-center`}>
              Wedding Gift Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0">
                <Image
                  src="https://zcvhywceufejkyhcmngh.supabase.co/storage/v1/object/public/miscellaneous/longi.webp?t=2025-01-16T21%3A07%3A34.998Z"
                  alt="Longines HydroConquest Watch"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-sm"
                />
              </div>
              <div className="space-y-4 text-center sm:text-left">
                <div>
                  <h3 className={`${playfair.className} text-lg sm:text-xl`}>
                    Longines HydroConquest 41mm
                  </h3>
                  <p className={`${cormorant.className} text-gray-600`}>
                    Model: L37814566
                  </p>
                </div>
                <Separator className="hidden sm:block" />
                <div className={`${cormorant.className} space-y-2 text-sm`}>
                  <p>Serial Number: 1081387229</p>
                  <p>Purchase Date: January 7, 2025</p>
                  <p>Authorized Retailer: Liverpool STAFE</p>
                </div>
                <Separator className="my-4" />
                <div className={`${cormorant.className} space-y-4`}>
                  <div>
                    <p className="font-semibold">Special Engraving</p>
                    <p className="text-sm">PMW • 18-01-25</p>
                  </div>
                  <div>
                    <p className="font-semibold">PMW Meaning</p>
                    <p className="text-sm italic">Presence, Momentum, Wisdom</p>
                    <p className="text-sm text-gray-600 mt-1">Let your presence be felt, your momentum be strong, and your wisdom guide you.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle className={`${playfair.className} text-xl sm:text-2xl`}>
              {selectedFriend?.name}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] mt-4">
            <DialogDescription className={`${cormorant.className} text-base sm:text-lg text-black p-4`}>
              {selectedFriend?.message}
            </DialogDescription>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </main>
  )
} 
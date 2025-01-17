'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Playfair_Display, Cormorant } from 'next/font/google'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "@radix-ui/react-icons"

const playfair = Playfair_Display({ subsets: ['latin'] })
const cormorant = Cormorant({ subsets: ['latin'], weight: ['300', '400', '600'] })

type Wedding = {
  name: string;
  date?: string;
  path?: string;
  isActive: boolean;
}

export default function Home() {
  const allWeddings = [
    {
      name: 'Dominic Dithurbide',
      date: '18/01/2025',
      path: '/domo',
      isActive: true,
    },
    {
      name: 'David Roemer',
      date: '05/12/2025',
      path: '/david',
      isActive: false,
    },
    { name: 'Alejandro Roemer', isActive: false },
    { name: 'Daniel Chavez', isActive: false },
    { name: 'Franco Niro', isActive: false },
    { name: 'Alejandro Caraco', isActive: false },
    { name: 'Marcos Ramirez', isActive: false },
    { name: 'Julian Serra', isActive: false },
    { name: 'Alex Berho', isActive: false },
    { name: 'Jeronimo Aguilar', isActive: false }
  ]

  const activeWeddings = allWeddings.filter(wedding => wedding.isActive && wedding.date && wedding.path)
  const futureWeddings = allWeddings.filter(wedding => !wedding.isActive)

  return (
    <main className="min-h-screen bg-white text-black flex flex-col items-center p-4 sm:p-8">
      <section className="max-w-4xl w-full space-y-6 sm:space-y-10 mb-16">
        <div className="text-center space-y-2">
          <h1 className={`${playfair.className} text-4xl font-bold text-center mb-2`}>
            PMW Weddings
          </h1>
          <p className={`${cormorant.className} text-xl text-center mb-8`}>
            Celebrating Special Moments
          </p>

          <div className="flex justify-center mb-8">
            <Button variant="outline" asChild className="mr-4">
              <Link href="/photos">
                <CalendarIcon className="mr-2 h-4 w-4" />
                View Celebration Photos
              </Link>
            </Button>
          </div>
        </div>
        
        <Separator className="max-w-xs mx-auto" />
        
        <p className={`${cormorant.className} text-lg sm:text-xl text-center italic text-gray-600`}>
          "A collection of cherished moments and timeless celebrations"
        </p>

        <div className="space-y-6">
          {activeWeddings.map((wedding, index) => (
            <Card key={index} className="animate-fade-in">
              <CardHeader>
                <CardTitle className={`${playfair.className} text-2xl sm:text-4xl text-center`}>
                  {wedding.name}
                </CardTitle>
                <CardDescription className={`${cormorant.className} text-center text-lg`}>
                  <span className="inline-flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    {wedding.date}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center pt-2">
                <Button asChild className="w-full sm:w-auto" variant="outline">
                  <Link href={wedding.path}>
                    View Celebration Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="w-full max-w-4xl space-y-6">
        <div className="flex flex-col items-center gap-2">
          <h2 className={`${playfair.className} text-xl sm:text-2xl text-center`}>
            Future Celebrations
          </h2>
          <Separator className="w-24" />
        </div>
        
        <Card>
          <div className="p-4 sm:p-6">
            {futureWeddings.map((wedding, index) => (
              <div key={index}>
                <div className="py-4 space-y-2">
                  <h3 className={`${playfair.className} text-xl sm:text-2xl text-center ${!wedding.date ? 'opacity-50 italic' : ''}`}>
                    {wedding.name}
                  </h3>
                  {wedding.date && (
                    <p className={`${cormorant.className} text-gray-600 text-center flex items-center justify-center gap-2`}>
                      <CalendarIcon className="h-4 w-4" />
                      {wedding.date}
                    </p>
                  )}
                </div>
                {index < futureWeddings.length - 1 && (
                  <Separator className="my-2" />
                )}
              </div>
            ))}
          </div>
        </Card>
      </section>
    </main>
  )
}


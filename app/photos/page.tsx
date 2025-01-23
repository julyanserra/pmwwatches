'use client'

import { ImageGallery } from '@/components/ImageGallery'
import { Playfair_Display } from 'next/font/google'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RiWhatsappLine } from 'react-icons/ri'
import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"

const playfair = Playfair_Display({ subsets: ['latin'] })
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER!
const CELEBRATION_ENDED = process.env.NEXT_PUBLIC_CELEBRATION_ENDED == 'true'

export default function PhotosPage() {
  const scrollToInstructions = () => {
    const element = document.getElementById('how-to-use');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Celebration Photos</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 my-8">
        <h1 className={`${playfair.className} text-3xl sm:text-4xl font-bold`}>
          Celebration Photos
        </h1>
        {!CELEBRATION_ENDED && (
          <Button 
            variant="outline" 
            onClick={scrollToInstructions}
            className="gap-2 w-full sm:w-auto"
          >
            <HelpCircle className="h-4 w-4" />
            <span className="sm:inline">How to Add Photos</span>
          </Button>
        )}
      </div>

      {CELEBRATION_ENDED ? (
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle className={`${playfair.className} text-xl sm:text-2xl`}>Photo Gallery No Longer Available</CardTitle>
            <CardDescription>
              The celebration has ended and this gallery is now archived.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              To receive a copy of the photo album, please reach out to Julian Serra:
            </p>
            <div className="flex justify-center">
              <a
                href="https://wa.me/525547404053"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 justify-center rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <RiWhatsappLine className="h-5 w-5" />
                Contact on WhatsApp
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Thank you for being part of our celebration!
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <ImageGallery />
          <Card className="mx-auto max-w-2xl mt-16" id="how-to-use">
            <CardHeader>
              <CardTitle className={`${playfair.className} text-xl sm:text-2xl`}>How to Add Photos</CardTitle>
              <CardDescription className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <span>Send your photos to WhatsApp number:</span>
                <div className="flex items-center gap-2">
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                    {whatsappNumber.replace(/(\+\d{1})(\d{3})(\d{3})(\d{4})/, '$1($2)$3-$4')}
                  </code>
                  <a
                    href={`https://wa.me/${whatsappNumber.replace('+', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md bg-green-600 p-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 h-10 w-10"
                  >
                    <RiWhatsappLine className="h-6 w-6" />
                  </a>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Your photos will appear here automatically once they are received. The gallery updates in real-time!
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>You can send both photos and videos</li>
                  <li>Videos are supported up to 50MB in size</li>
                  <li>All media is stored securely and can be downloaded by anyone viewing the gallery</li>
                </ul>
              </div>

              <div className="flex flex-col items-center gap-2 pt-2">
                <p className="text-sm text-muted-foreground">
                  Scan this QR code with your phone's camera to start chatting on WhatsApp
                </p>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://wa.me/${whatsappNumber.replace('+', '')}`}
                  alt="WhatsApp QR Code"
                  className="rounded-lg shadow-md"
                  width={150}
                  height={150}
                />
                <p className="text-xs text-muted-foreground">
                  Note: Make sure your phone has WhatsApp installed
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
} 
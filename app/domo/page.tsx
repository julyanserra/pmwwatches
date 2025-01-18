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
    { 
      name: 'David Roemer', 
      message: `Domo,

Te admiro y te respeto por todo lo que eres y por lo que has logrado, pero especialmente porque sé que ha sido con un enorme esfuerzo. Hoy, en este día tan especial, te admiro por el camino que has decidido tomar con Estefanía y sé que será un camino lleno de felicidad y amor. 

Love you bro, 

David`
    },
    { 
      name: 'Alejandro Roemer', 
      message: `Domouuu!
Tengo tantas memorias de nosotros juntos, cada una de ellas me llena de cariño.
Ser tu best man es, sin exagerar, el mayor honor de mi vida.
You will always be my best friend.
I love you
-Chiquis
`
    },
    { 
      name: 'Daniel Chavez', 
      message: `My man Domo! I'm incredibly happy for you as you step into this new adventure! Thrilled de compartir tantos momentos increíbles desde aquel verano de camp de niños (te acuerdas? Haha) hasta hoy el día de tu boda, who would have imagined? Eres una persona que admiro mucho porque todo lo que te has propuesto lo has logrado y me ha tocado vivirlo. Me da mucho gusto que you've found your other half con quien vas a disfrutar the rest of your life. Beyond grateful for your friendship, you've always been there for your bros and today is your special day, honored to be here. Así que a celebrar perro que la vamos a pasar increíble en tu boda!

Love u bro 
Chavez`
    },
    { 
      name: 'Franco Niro', 
      message: `Domo, 

Contigo aprendí a esquiar en agua en Acapulco, que tu papá cannot let a 10-0 win against us go. 

Gracias a ti, por este día, tengo nueva novia y tu estas por empezar una nueva vida. Te queremos tanto. No. Te amamos tanto que viajamos con tux's y trajes en vez de ropa en la maleta. A ensayar 3 veces como caminar. I'd do it 1000 times more. 

All I can say is I love you. Thanks for making the playground of life this special and fun.`
    },
    { 
      name: 'Alejandro Caraco', 
      message: `Domo, the day has come and I couldn't be happier to be here celebrating such an important and beautiful milestone with you. It's been an honor growing up with you and seeing you go through life with such tenacity but more importantly a huge open heart. I am so grateful to call you my friend—you're the most authentic person I know and I admire you and your bravery for always staying true to your heart. I am so proud of the man you've become, but more importantly—the inner child you never let die. I love you, Caraco.`
    },
    { 
      name: 'Marcos Ramirez', 
      message: `Domo te amo wey. Tengo muchos recuerdos de nosotros. Siguele chingando eres grande. Te deseo todo lo mejor y siempre contaras conmigo.`
    },
    { 
      name: 'Julian Serra', 
      message: `Congratulations homie. I'm so happy and excited for both of you! I can't wait for you and Estefania to start this new journey on your path of life. You both will undoubtedly crush it together. I admire you a lot bro, you're a deeply authentic person, who cares for those around him, unconditionally. I'm a huge fan of your work ethic, and your by-the-horns approach to life. You're a legend!! I hope this little watch can act as a nice memento of this day and the love your homies have for you. Love you, Juli`
    },
    { 
      name: 'Alex Berho', 
      message: `Domo!!!
The big day is here! Qué emoción estar aquí para festejar este día tan importante. Qué bonita familia han creado y seguirán creando. Eres un gran ejemplo a seguir.

Hoy en la mañana me acordé de aquel día en el árbol en ASF que no paraba de llorar por irme a Miami. Como siempre, te acercaste y me animaste.

Eres un gran amigo, un hermano, y qué bendición es el tener a alguien así, incondicional, en la vida. Gracias por siempre estar!

Te quiero mucho! Deseo que sean muy felices siempre. Alex Berho

P.S. Te dejo el intento de un dibujo`
    },
    { 
      name: 'Jeronimo Aguilar', 
      message: `Dominic, 
I know we far away but always in my heart, my fellow WR. So excited to see you succeed in this new stage of life. Les deseo todo lo mejor a Bumblina y a ti. Stay close, stay happy. Happiest of days from here on!! I love you, man!`
    }
  ]

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-6 sm:space-y-12">
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

        <div className="flex justify-center">
          <Button variant="outline" asChild>
            <Link href="/photos">View Celebration Photos</Link>
          </Button>
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
          <CardContent className="space-y-8">
            <p className={`${cormorant.className} text-center text-gray-600 italic text-lg sm:text-xl max-w-2xl mx-auto pt-6`}>
              "Domo, whether you wear it or not, we hope this watch becomes a cherished part of your journey. A small token of our brotherhood and the countless memories we've shared together."
            </p>
            
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
                    Longines HydroConquest 43mm
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
                    <p className="text-sm">PMW - 18•01•25</p>
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
        <DialogContent className="sm:max-w-[425px] bg-white rounded-2xl fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[calc(100%-2rem)] sm:w-full">
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
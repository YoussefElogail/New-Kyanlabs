import type { Metadata } from 'next'
import './globals.css'
import { Tajawal } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import Navbar from '@/components/app/nav/Navbar'
import { Toaster } from '@/components/ui/toaster'
import Footer from '@/components/Footer'
import Script from 'next/script'

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Kyanlabs',
  description:
    'KyanLabs is a  company established by a group of youth to deliver digital solutions to help ease everyone’s life in various ways.',
  icons: 'favicon.png'
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()

  return (
    <html lang={locale} dir={locale == 'en' ? 'ltr' : 'rtl'}>
      <head>
        <Script
          id='inline-script'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
   <!--Start of Tawk.to Script-->

var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/6729fe2f2480f5b4f598ec0a/1ibu0hqod';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();

<!--End of Tawk.to Script-->
      // Additional inline script code
    `
          }}
        />
      </head>
      <body className={`${tajawal.className} `}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

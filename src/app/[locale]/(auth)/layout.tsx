import React from 'react'

export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <main className='container mx-auto mt-24 p-6 min-h-[calc(100vh-(94px+327.5px))]'>
    {children}
    </main>
  )
}

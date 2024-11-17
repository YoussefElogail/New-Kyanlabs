import { adminSignIn } from '@/APIS/end-point'
import SignInForm from '@/components/app/auth/SignInForm'
import React from 'react'

export default function AdminSignIn() {
  return <SignInForm type='Admin'  signInUrl={adminSignIn} />
}

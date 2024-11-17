import SignInForm from "@/components/app/auth/SignInForm";
import {  userSignIn } from "@/APIS/end-point";

export default function SignInPage() {
  return <SignInForm  signInUrl={userSignIn} />
}

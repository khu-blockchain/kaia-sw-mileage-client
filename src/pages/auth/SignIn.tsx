import { SignInForm } from "@/widget/auth"

export default function SignIn() {

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col p-6">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <SignInForm/>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
        />
      </div>
    </div>
  )
}
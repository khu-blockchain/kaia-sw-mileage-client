import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ISignInForm, signInSchema } from "@/features/auth/form"

const useSignInForm = () => {
  return useForm<ISignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      student_id: '',
      password: ''
    }
  })
}

export{
  useSignInForm
}
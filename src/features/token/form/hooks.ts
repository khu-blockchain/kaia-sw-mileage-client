import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ICreateTokenForm, createTokenSchema } from './schema';


const useCreateTokenForm = () => {
  return useForm<ICreateTokenForm>({
    resolver: zodResolver(createTokenSchema),
    defaultValues: {
      swMileageTokenName: '',
      symbol: '',
      description: ''
    }
  })
}

export{
  useCreateTokenForm
}
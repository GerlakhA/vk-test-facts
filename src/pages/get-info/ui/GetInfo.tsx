import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDebounce } from '../../../app/hooks/useDebounce'
import { IInfo } from '../model/types/info.type'
import { schema } from '../model/types/schema'

export const GetInfo = () => {
	const [age, setAge] = useState(0)
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm({
		defaultValues: {
			name: ''
		},
		resolver: yupResolver(schema)
	})

	const debouncedName = useDebounce(watch('name'), 3000)

	const searchURL =
		debouncedName &&
		'https://api.agify.io/?name=' + encodeURIComponent(debouncedName)

	const { data } = useQuery({
		queryKey: ['info', debouncedName],
		queryFn: async () => {
			if (errors.name) {
				return null
			}
			let res = await axios.get<IInfo>(searchURL)
			return res.data
		}
	})

	const submit = () => {
		if (data && data.age && searchURL) {
			setAge(data?.age)
		} else {
			return
		}
	}

	return (
		<div className='flex flex-col justify-center items-center p-2'>
			<div className='p-4 flex justify-center items-center'>
				<form onSubmit={handleSubmit(submit)} {...register}>
					<input
						{...register('name', {
							required: true
						})}
						className='p-2 w-[250px] rounded-md'
						placeholder='Введите имя'
					/>
					<button
						type='submit'
						className='bg-green-500 hover:bg-green-500/60 transition-colors rounded-lg p-2 mb-4 ml-2'
					>
						Узнать возраст
					</button>
				</form>
			</div>
			{errors.name && (
				<p className='text-red-500 flex justify-center text-xl font-semibold'>
					{errors.name.message}
				</p>
			)}
			{!errors.name && data?.age && (
				<div className='flex justify-center items-center'>
					<span className='text-xl font-semibold text-white'>
						Возраст {data?.name}: {data?.age} лет
					</span>
				</div>
			)}
		</div>
	)
}

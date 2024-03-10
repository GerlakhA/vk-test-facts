import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDebounce } from '../../../app/hooks/useDebounce'
import { IInfo } from '../model/types/info.type'
import { schema } from '../model/types/schema'

export const GetInfo = () => {
	const [name, setName] = useState('')
	const [age, setAge] = useState(0)
	// const [isLoading, setIsLoading] = useState(false)

	const debouncedName = useDebounce(name, 3000)
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {
			name: ''
		},
		resolver: yupResolver(schema)
	})

	const { mutateAsync } = useMutation({
		mutationKey: ['info', name],
		mutationFn: async () => {
			let res = await axios.get<IInfo>(
				`https://api.agify.io/?name=${encodeURIComponent(debouncedName)}`
			)
			return res.data
		},
		onMutate: () => {},
		onSuccess: data => {
			setAge(data.age)
		}
	})

	const submit = async () => {
		if (name.length > 0) {
			const response = await mutateAsync()
			if (response && response.age) {
				setAge(response.age)
			} else {
				console.error('Ошибка при получении данных')
			}
		}
	}

	useEffect(() => {
		const prevName = name

		if (name !== prevName) {
			submit()
		}
	}, [name])

	return (
		<div className='flex flex-col justify-center items-center p-2'>
			<div className='p-4 flex justify-center items-center'>
				<form onSubmit={handleSubmit(submit)} {...register} className=''>
					<input
						value={name}
						{...register('name', {
							minLength: 3
						})}
						className='p-2 w-[250px] rounded-md'
						placeholder='Введите имя'
						onChange={e => {
							setName(e.target.value)
						}}
					/>
					<button
						type='submit'
						// disabled={isLoading}
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
			{name && (
				<div className='flex justify-center items-center'>
					<span className='text-xl font-semibold text-white'>
						Возраст {name}: {age} лет
					</span>
				</div>
			)}
		</div>
	)
}

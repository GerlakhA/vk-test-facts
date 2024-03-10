import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useDebounce } from '../../app/hooks/useDebounce'
import { IInfo } from './model/info.type'

const schema = yup.object({
	name: yup
		.string()
		.required('Имя обязательное поле! И имя должно содержать минимум 3 символа')
		.min(3)
})

export const GetInfoPage = () => {
	const [name, setName] = useState('')
	const [age, setAge] = useState(0)

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

	const { mutate, mutateAsync } = useMutation({
		mutationKey: ['info', debouncedName],
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

	const submit = async (e: any) => {
		await mutateAsync()
			.then(data => setAge(data.age))
			.catch(error => {
				console.error(error)
			})

		// e.preventDefault()
	}

	return (
		<div className='flex justify-center items-center p-2'>
			<div className='p-4 flex justify-center items-center'>
				<form onSubmit={handleSubmit(submit)} {...register} className=''>
					<input
						// ref={textAreaRef}
						value={name}
						{...register('name', {
							minLength: 3
						})}
						className='p-2 w-[250px] rounded-md'
						placeholder='Введите имя'
						onChange={e => setName(e.target.value)}
					/>
					{errors.name && (
						<p className='text-red-500 text-sm flex justify-center w-[250px]'>
							{errors.name.message}
						</p>
					)}
					<button
						// ref={buttonRef}
						type='submit'
						className='bg-green-500 hover:bg-green-500/60 transition-colors rounded-lg p-2 mb-4 ml-2'
					>
						Узнать возраст
					</button>
				</form>
			</div>
			{age !== 0 && !errors ? (
				<span className='text-sm font-semibold text-white'>
					Возраст : {age}
				</span>
			) : null}
		</div>
	)
}

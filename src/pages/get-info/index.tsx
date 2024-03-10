import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useDebounce } from '../../app/hooks/useDebounce'
import { useGetInfo } from '../../app/hooks/useGetInfo'

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

	const { getInfo } = useGetInfo(debouncedName)

	const submit = (e: any) => {
		e.preventDefault()
		if (getInfo) {
			setAge(getInfo?.age)
		} else {
			return
		}
	}

	return (
		<form
			onSubmit={handleSubmit(submit)}
			{...register}
			className='flex flex-col gap-y-8'
		>
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
			{age && !errors ? (
				<span className='text-sm font-semibold text-white flex justify-center'>
					Возраст {getInfo?.name}: {getInfo?.age}
				</span>
			) : null}
			<button
				// ref={buttonRef}
				type='submit'
				className='bg-green-500 hover:bg-green-500/60 transition-colors rounded-lg w-full p-2'
			>
				Узнать возраст
			</button>
		</form>
	)
}

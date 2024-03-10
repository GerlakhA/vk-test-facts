import * as yup from 'yup'

export const schema = yup.object({
	name: yup
		.string()
		.matches(/^[a-zA-Z] */, 'Имя может содержать только буквы')
		.required('Имя обязательное поле! И имя должно содержать минимум 3 символа')
		.min(3)
})

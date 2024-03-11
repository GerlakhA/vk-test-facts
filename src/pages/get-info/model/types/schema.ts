import * as Yup from 'yup'

// export const schema = Yup.object().shape({
// 	name: Yup.string()
// 		.required('Введите имя')
// 		.matches(/^[a-zA-Z]{3,}$/, 'Имя может содержать только буквы')
// 		.min(3, 'Имя должно быть не менее 3 символов')
// })

export const schema = Yup.object().shape({
	name: Yup.string()
		.required('Введите имя')
		.min(3, 'Имя должно быть не менее 3 символов')
		.matches(/^[a-zA-Z]*$/, 'Имя может содержать только буквы')
})

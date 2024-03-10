import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { IFact } from '../../types/facts.type'

export const FactsPage = () => {
	const [fact, setFact] = useState('')
	const [cursorPosition, setCursorPosition] = useState(0)
	const textAreaRef = useRef<HTMLTextAreaElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)

	const { mutate } = useMutation({
		mutationKey: ['facts'],
		mutationFn: async () => {
			const response = await axios.get<IFact>('https://catfact.ninja/fact')
			return response.data
		},
		onSuccess: data => {
			setFact(data.fact)

			textAreaRef.current?.focus()
		}
	})

	const handleClick = () => {
		mutate()
	}

	useEffect(() => {
		if (fact) {
			const words = fact.split(' ')
			setCursorPosition(words.length)
		}
	}, [fact])

	useEffect(() => {
		if (fact && textAreaRef.current) {
			const firstWordIndex = fact.indexOf(' ')
			if (firstWordIndex !== -1) {
				textAreaRef.current.setSelectionRange(
					firstWordIndex + 1,
					firstWordIndex + 1
				)
			} else {
				textAreaRef.current.setSelectionRange(0, 0)
			}
		}
	}, [fact])

	return (
		<div className='flex justify-center'>
			<div className='flex flex-col w-[500px] gap-6 justify-center items-center'>
				<textarea
					ref={textAreaRef}
					value={fact}
					onChange={() => setFact(fact)}
					onFocus={() => setCursorPosition(fact.indexOf(' ') + 1)}
					onBlur={() => setCursorPosition(0)}
					className='p-2 w-full min-h-[250px]'
					placeholder='Нажми на кнопку чтобы получить факт'
				/>
				<button
					ref={buttonRef}
					onClick={handleClick}
					className='bg-green-500 w-full rounded-md hover:bg-green-500/60 transition-colors p-1 mb-4'
				>
					Получить факт
				</button>
			</div>
		</div>
	)
}

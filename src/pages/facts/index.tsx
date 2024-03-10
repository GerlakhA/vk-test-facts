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
		onMutate: () => {
			setFact('')
		},
		onSuccess: data => {
			setFact(data.fact)

			textAreaRef.current?.focus()
			setCursorPosition(fact.indexOf(' ') + 1)
		}
	})

	const handleClick = () => {
		mutate()
		if (buttonRef.current) {
			const firstWordIndex = fact.indexOf(' ')
			if (firstWordIndex !== -1) {
				textAreaRef.current?.setSelectionRange(
					firstWordIndex + 1,
					firstWordIndex + 1
				)
				textAreaRef.current?.focus()
			} else {
				textAreaRef.current?.setSelectionRange(0, 0)
			}
		}
	}

	useEffect(() => {
		setFact('')

		if (fact) {
			const words = fact.split(' ')
			setFact(fact)
			setCursorPosition(words.length)
		}
	}, [fact])

	return (
		<div className='flex justify-center'>
			<div className='flex flex-col w-[500px] min-h-[250px] gap-6 justify-center items-center'>
				<textarea
					ref={textAreaRef}
					value={fact}
					readOnly
					onChange={() => setFact(fact)}
					onFocus={() => setCursorPosition(cursorPosition + 1)}
					onBlur={() => setCursorPosition(0)}
					className='p-2 w-full'
				/>
				<button
					ref={buttonRef}
					onClick={handleClick}
					className='bg-green-500 w-full ml-4 rounded-md hover:bg-green-500/60 transition-colors p-1'
				>
					Получить факт
				</button>
			</div>
		</div>
	)
}

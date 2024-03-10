import { useQuery } from '@tanstack/react-query'
import { factsService } from '../../services/facts.service'

export const useFacts = () => {
	const { data: getFacts } = useQuery({
		queryKey: ['get-facts'],
		queryFn: () => factsService.getFacts()
	})
	return { getFacts }
}

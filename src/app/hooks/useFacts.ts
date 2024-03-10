import { useQuery } from '@tanstack/react-query'
import { factsService } from '../../pages/cat-facts/api/services/facts.service'

export const useFacts = () => {
	const { data: getFacts } = useQuery({
		queryKey: ['get-facts'],
		queryFn: () => factsService.getFacts()
	})
	return { getFacts }
}

import { useQuery } from '@tanstack/react-query'
import { infoService } from '../../services/info.service'

export const useGetInfo = (name: string) => {
	const { data: getInfo } = useQuery({
		queryKey: ['get-info', name],
		queryFn: async () => infoService.getInfo(name)
	})
	return { getInfo }
}

import axios from 'axios'
import { IInfo } from '../../model/types/info.type'

export const infoService = {
	async getInfo(name: string) {
		let res = await axios.get<IInfo>(`https://api.agify.io/${name}`)
		return res.data
	}
}

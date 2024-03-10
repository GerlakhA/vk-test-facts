import axios from 'axios'

export const factsService = {
	async getFacts() {
		let res = await axios.get('https://catfact.ninja/fact')
		return res.data
	}
}

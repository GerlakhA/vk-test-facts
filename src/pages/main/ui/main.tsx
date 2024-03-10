import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'

import { createRoot } from 'react-dom/client'
import App from '../../../app/layouts/App'
import './index.css'

const client = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 3000
		}
	}
})
const container = document.getElementById('root')
const root = createRoot(container!) // createRoot(container!) if you use TypeScript
root.render(
	<ConfigProvider>
		<AdaptivityProvider>
			<QueryClientProvider client={client}>
				<App />
			</QueryClientProvider>
		</AdaptivityProvider>
	</ConfigProvider>
)

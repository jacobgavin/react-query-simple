import Query from './query'

import { useContext, useState, useEffect, createContext} from 'react';

const QueryContext = createContext(undefined);
const query = new Query();

export default function QueryProvider({ children }) {

	return (
		<QueryContext.Provider value={{ query }}>
			{children}
		</QueryContext.Provider>
	);
}

export function useQuery(url) {
	const context = useContext(QueryContext)
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	
	useEffect(() => {
		setIsLoading(true);
		(async function() {
			const response = await context.query.callAsync(url);
			setData(response)
			setIsLoading(false);
		})();
	}, [url, context.query]);

	if (context === undefined) {
		throw new Error('useQuery must be used within a QueryProvider');
	}

	return {
		...context,
		data,
		isLoading
	};
}

/* export function useMutation(fetchFn) {
	const context = useContext(QueryContext)
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	return {
		mutate: (url, data) => {
			
		}
	}
} */
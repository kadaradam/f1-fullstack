import {
	MutationCache,
	QueryCache,
	QueryClient,
	QueryClientProvider as OriginalQueryClientProvider,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

type QueryClientProviderProps = {
	children?: React.ReactNode;
};

const handleError = (error: unknown) => {
	if (error instanceof AxiosError) {
		const typedError: AxiosError = error;

		const serverMessage = typedError?.response?.data;

		if (!serverMessage) {
			// TODO: show toast
			console.error('Unexpected error');
			return;
		}

		// TODO: show toast
		console.error(serverMessage);
	} else {
		// The type is literally unknown
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const unknownError = error as any;
		// Axios errors has message prop
		const errorToDisplay = unknownError?.message
			? unknownError.message
			: error;

		// TODO: show toast
		console.error(errorToDisplay);
	}
};

export const queryClient = new QueryClient({
	mutationCache: new MutationCache({
		onError: handleError,
	}),
	queryCache: new QueryCache({
		onError: handleError,
	}),
});

export const QueryClientProvider = ({ children }: QueryClientProviderProps) => (
	<OriginalQueryClientProvider client={queryClient}>
		{children}
	</OriginalQueryClientProvider>
);

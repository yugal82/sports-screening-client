import axios from 'axios';
import { BASE_API_URL } from '../utils/constants';
import type { CreatePaymentIntentRequest, CreatePaymentIntentResponse } from '../utils/types';

const apiClient = axios.create({
    baseURL: BASE_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const checkoutAPI = {
    createPaymentIntent: async (payload: CreatePaymentIntentRequest): Promise<CreatePaymentIntentResponse> => {
        try {
            const response = await apiClient.post<CreatePaymentIntentResponse>(
                '/payments/create-payment-intent',
                payload
            );
            return response.data;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to create payment intent');
            }
            throw new Error('Failed to create payment intent');
        }
    },
};

export default checkoutAPI; 
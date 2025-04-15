/**
 * Utilities for the Magma staking app
 */
export declare const STAKING_ABI: ({
    type: string;
    inputs: never[];
    stateMutability: string;
    name?: undefined;
    outputs?: undefined;
    anonymous?: undefined;
} | {
    type: string;
    name: string;
    inputs: never[];
    outputs: {
        name: string;
        type: string;
        internalType: string;
    }[];
    stateMutability: string;
    anonymous?: undefined;
} | {
    type: string;
    name: string;
    inputs: {
        name: string;
        type: string;
        internalType: string;
    }[];
    outputs: never[];
    stateMutability: string;
    anonymous?: undefined;
} | {
    type: string;
    name: string;
    inputs: {
        name: string;
        type: string;
        indexed: boolean;
        internalType: string;
    }[];
    anonymous: boolean;
    stateMutability?: undefined;
    outputs?: undefined;
} | {
    type: string;
    name: string;
    inputs: never[];
    stateMutability?: undefined;
    outputs?: undefined;
    anonymous?: undefined;
})[];

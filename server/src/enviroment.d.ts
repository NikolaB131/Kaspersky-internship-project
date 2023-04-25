declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string,
      LATENCY: string,
      MOCK_DATA_SIZE: '5k' | '50k',
    }
  }
}

export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number,
      MOCK_DATA_SIZE: '5k' | '50k',
    }
  }
}

export {};

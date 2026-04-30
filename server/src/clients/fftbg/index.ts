import { config } from '../../config.js';
import type { FftbgClient } from '../types.js';
import { realClient } from './real.js';
import { fakeClient } from './fake.js';

export const fftbgClient: FftbgClient =
  config.FFTBG_DATA_STRATEGY === 'real' ? realClient : fakeClient;

export type { FftbgClient, FftbgResponse } from '../types.js';

//this test will check for errors 
//if we get an error a response that is not 0 return an error 

import { expect, test, vi } from 'vitest'
import { Request } from './Request'


test('error because response code is not 0'), async () => {
  vi.global.fetch = vi.fn (() => 
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({response_code: 1}),
  })
);

  await expect(Request()).rejects.toThrow("no results found");
};
import { test, expect, APIResponse } from '@playwright/test';

const API_BASE = process.env.API_BASE_URL ?? 'https://automationexercise.com/api';

interface Category {
  usertype?: { usertype?: string };
  category?: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  brand: string;
  category?: Category;
}

interface ApiResponse {
  responseCode?: number;
  message?: string;
  products?: Product[];
}

async function parseJson<T>(res: APIResponse): Promise<T> {
  const text = await res.text();
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(
      `Expected JSON, got non-JSON response (status=${res.status()}, ` +
      `content-type=${res.headers()['content-type'] ?? 'n/a'}). ` +
      `Body preview: ${text.slice(0, 200)}`
    );
  }
}

test.describe('Products API', () => {
  test('GET /productsList returns a non-empty list with the expected shape', async ({ request }) => {
    const res = await request.get(`${API_BASE}/productsList`);

    expect(res.status(), 'expected HTTP 200 from /productsList').toBe(200);

    const body = await parseJson<ApiResponse>(res);

    expect(body).toHaveProperty('products');
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products!.length).toBeGreaterThan(0);

    for (const product of body.products!) {
      expect(product).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.any(String),
        brand: expect.any(String),
      });
      expect(product.name.trim().length).toBeGreaterThan(0);
    }
  });

  test('POST /searchProduct returns matches for a known term', async ({ request }) => {
    const term = 'top';
    const res = await request.post(`${API_BASE}/searchProduct`, {
      form: { search_product: term }, // application/x-www-form-urlencoded
    });

    expect(res.status()).toBe(200);
    const body = await parseJson<ApiResponse>(res);
    expect(body.products?.length ?? 0).toBeGreaterThan(0);

    const someResultMatches = body.products!.some((p) => {
      const haystack = [
        p.name,
        p.brand,
        p.category?.category,
        p.category?.usertype?.usertype,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(term);
    });
    expect(
      someResultMatches,
      `no returned product matched "${term}" in name/brand/category`
    ).toBe(true);
  });

  test('POST /searchProduct without the required field reports 400 in the body', async ({ request }) => {
    const res = await request.post(`${API_BASE}/searchProduct`); // no form payload

    expect(res.status()).toBe(200);

    const body = await parseJson<ApiResponse>(res);
    expect(body.responseCode).toBe(400);
    expect(body.message).toMatch(/parameter/i);
  });

  test('PUT /productsList is not supported (responseCode 405)', async ({ request }) => {
    const res = await request.put(`${API_BASE}/productsList`);

    expect(res.status()).toBe(200);

    const body = await parseJson<ApiResponse>(res);
    expect(body.responseCode).toBe(405);
    expect(body.message).toMatch(/not supported/i);
  });
});
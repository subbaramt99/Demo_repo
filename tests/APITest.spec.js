import { test, expect, request } from '@playwright/test';


test.describe('API tests', () => {

test('@regression @teamA GET API test', async({ request }) => {

  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
  console.log(await response.json());
  expect(response.status()).toBe(200);

});

test('@regression @teamA POST API test', async({ request }) => {

    const payload = {
        title: 'foo',
        body: 'bar',
        userId: 1
    };

  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {data: payload});
    const body = await response.json();
  console.log(body);
  expect(response.status()).toBe(201);

  expect(body).toMatchObject(payload);
  expect(body).toHaveProperty('id');
  expect(body.id).toEqual(101);
  expect(body.userId).toEqual(1);

   process.env.userID = body.userId;

});

test('@regression @teamB POST API test with incorrect url', async({ request }) => {

    const payload = {
        title: 'foo',
        body: 'bar',
        userId: process.env.userID
    };

    console.log('User ID from environment variable:', process.env.userID);

  const response = await request.post('https://jsonplaceholder.typicode.com/abcd', {data: payload});
    const body = await response.json();
  console.log(body);
  expect(response.status()).toBe(404);
});

test('@regression @teamB Network mocking and Interception', async({ page }) => {

    await page.route('https://jsonplaceholder.typicode.com/posts/1', route => {  // Intercepting the network request to mock the response
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ title: 'Mocked Title by umar', body: 'Mocked Body by umar' })
        });
        //route.continue();  // Continue the request without mocking
        //route.abort();  // Abort the request to simulate a network error
    });

    await page.goto('https://jsonplaceholder.typicode.com/posts/1');

    const titleAndBody = await page.locator('//pre').textContent();

    expect(titleAndBody).toContain('Mocked Title by umar');
    expect(titleAndBody).toContain('Mocked Body by umar');

    console.log('Title and Body:', titleAndBody);
});

test('@regression @teamA PUT API test', async({ request }) => {

  const payload = {
    id: 1,
    title: 'updated title',
    body: 'updated body',
    userId: 1
  };

  const response = await request.put('https://jsonplaceholder.typicode.com/posts/1', { data: payload });
  const body = await response.json();
  console.log('PUT response:', body);

  expect(response.status()).toBe(200);
  expect(body).toMatchObject(payload);
});

test('@regression @teamA PATCH API test', async({ request }) => {

  const payload = {
    title: 'patched title'
  };

  const response = await request.patch('https://jsonplaceholder.typicode.com/posts/1', { data: payload });
  const body = await response.json();
  console.log('PATCH response:', body);

  expect(response.status()).toBe(200);
  expect(body).toMatchObject(payload);
});

test('@regression @teamA DELETE API test', async({ request }) => {

  const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');
  console.log('DELETE status:', response.status());

  expect([200, 204]).toContain(response.status());
});

});
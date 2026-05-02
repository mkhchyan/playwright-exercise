/**
 * Utility function to generate a unique email for testing
 * Uses timestamp to ensure uniqueness
 */
export function generateUniqueEmail(baseEmail: string = 'testuser'): string {
    const timestamp = Date.now();
    return `${baseEmail}${timestamp}@testmail.com`;
}

/**
 * Utility function to generate test user data
 */
export function generateTestUserData() {
    const uniqueEmail = generateUniqueEmail();
    return {
        name: 'John Doe',
        email: uniqueEmail,
        password: 'TestPassword123!',
        title: 'Mr' as const,
        day: '15',
        month: '3',
        year: '1990',
        firstName: 'John',
        lastName: 'Doe',
        company: 'Test Company',
        address: '123 Test Street',
        address2: 'Apt 4B',
        country: 'United States',
        state: 'California',
        city: 'San Francisco',
        zipcode: '94102',
        mobile: '+1234567890',
    };
}

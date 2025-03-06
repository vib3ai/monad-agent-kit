# Monad Agent Kit Tests

This directory contains tests for the Monad Agent Kit, organized by app.

## Structure

```
test/
├── apps/                # Tests organized by app
│   ├── native/          # Tests for native ETH operations
│   │   └── index.ts     # Native app tests
│   ├── nadfun/          # Tests for nadfun protocol
│   │   └── index.ts     # Nadfun app tests
│   └── ... (other apps)
└── index.ts             # Main test runner
```

## Running Tests

You can run tests for all apps or for specific apps:

### Run all tests

```bash
yarn test
```

### Run tests for specific apps

```bash
# Test native app only
yarn test:native

# Test nadfun app only
yarn test:nadfun
```

Or using the main test runner with arguments:

```bash
# Test multiple specific apps
yarn tsx test/index.ts native nadfun
```

## Adding Tests for New Apps

To add tests for a new app:

1. Create a new directory under `test/apps/` for your app
2. Create an `index.ts` file with a test function
3. Export the test function
4. Update the main `test/index.ts` file to include your new test
5. Add a new script to `package.json` for running your app's tests

Example test function structure:

```typescript
import { MonadAgentKit } from '../../../src';
import { createYourAppTools } from '../../../src/apps/your-app/langchain';

async function testYourApp() {
    console.log('=== Testing Your App ===');
    
    // Test implementation here
    
    console.log('Your app test completed successfully!');
}

// Run the test if this file is executed directly
if (require.main === module) {
    testYourApp();
}

export { testYourApp };
``` 
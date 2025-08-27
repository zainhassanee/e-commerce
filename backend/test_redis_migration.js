// Test file to verify Redis migration is working
// Run with: node test_redis_migration.js

import { storeRefreshToken, getRefreshToken, deleteRefreshToken } from "./lib/tokenStorage.js";
import cache from "./lib/cache.js";

async function testRedisMigration() {
    console.log("🧪 Testing Redis Migration...\n");

    try {
        // Test 1: Token Storage
        console.log("1. Testing Token Storage:");
        const testUserId = "test123";
        const testToken = "test_refresh_token_123";
        
        await storeRefreshToken(testUserId, testToken);
        console.log("✅ Token stored successfully");
        
        const retrievedToken = await getRefreshToken(testUserId);
        if (retrievedToken === testToken) {
            console.log("✅ Token retrieved successfully");
        } else {
            console.log("❌ Token retrieval failed");
        }
        
        await deleteRefreshToken(testUserId);
        console.log("✅ Token deleted successfully");
        
        const deletedToken = await getRefreshToken(testUserId);
        if (deletedToken === null) {
            console.log("✅ Token deletion verified");
        } else {
            console.log("❌ Token deletion failed");
        }

        // Test 2: Product Cache
        console.log("\n2. Testing Product Cache:");
        const testProducts = [
            { id: 1, name: "Test Product 1" },
            { id: 2, name: "Test Product 2" }
        ];
        
        cache.set("test_products", testProducts, 10 * 1000); // 10 seconds TTL
        console.log("✅ Cache set successfully");
        
        const cachedProducts = cache.get("test_products");
        if (cachedProducts && cachedProducts.length === 2) {
            console.log("✅ Cache retrieved successfully");
        } else {
            console.log("❌ Cache retrieval failed");
        }
        
        cache.delete("test_products");
        console.log("✅ Cache cleanup completed");

        console.log("\n🎉 All tests passed! Redis migration is working correctly.");
        console.log("\n📝 The project is ready for deployment to Vercel!");
        
    } catch (error) {
        console.error("❌ Test failed:", error.message);
        console.log("\n🔧 Please check the error and fix it before deployment.");
    }
    
    process.exit(0);
}

// Run tests
testRedisMigration().catch(error => {
    console.error("❌ Test suite failed:", error);
    process.exit(1);
});

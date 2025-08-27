// Simple in-memory cache to replace Redis
class SimpleCache {
    constructor() {
        this.cache = new Map();
        this.ttl = new Map(); // Time to live for each cache entry
    }

    // Set cache with TTL (time to live in milliseconds)
    set(key, value, ttlMs = 5 * 60 * 1000) { // Default 5 minutes
        this.cache.set(key, value);
        this.ttl.set(key, Date.now() + ttlMs);
        
        // Clean up expired entries
        this.cleanup();
    }

    // Get cache value
    get(key) {
        const value = this.cache.get(key);
        const expiry = this.ttl.get(key);
        
        if (!value || !expiry) {
            return null;
        }
        
        // Check if expired
        if (Date.now() > expiry) {
            this.delete(key);
            return null;
        }
        
        return value;
    }

    // Delete cache entry
    delete(key) {
        this.cache.delete(key);
        this.ttl.delete(key);
    }

    // Clear all cache
    clear() {
        this.cache.clear();
        this.ttl.clear();
    }

    // Clean up expired entries
    cleanup() {
        const now = Date.now();
        for (const [key, expiry] of this.ttl.entries()) {
            if (now > expiry) {
                this.delete(key);
            }
        }
    }

    // Get cache size
    size() {
        return this.cache.size;
    }
}

// Create singleton instance
const cache = new SimpleCache();

// Clean up expired entries every minute
setInterval(() => cache.cleanup(), 60 * 1000);

export default cache;

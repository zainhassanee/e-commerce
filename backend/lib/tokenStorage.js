import User from "../models/user.model.js";

// In-memory storage for active refresh tokens
const tokenStore = new Map();

// Store refresh token in memory and optionally in database
export const storeRefreshToken = async (userId, refreshToken) => {
    try {
        // Store in memory for fast access
        tokenStore.set(userId, {
            token: refreshToken,
            expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
        });

        // Store in database as backup (optional, for persistence across server restarts)
        await User.findByIdAndUpdate(userId, {
            refreshToken: refreshToken,
            tokenExpiresAt: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000))
        }, { new: true });

        // Clean up expired tokens periodically
        cleanupExpiredTokens();
    } catch (error) {
        console.log("Error storing refresh token:", error.message);
        // Fallback to memory-only storage if database fails
        tokenStore.set(userId, {
            token: refreshToken,
            expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000)
        });
    }
};

// Get refresh token from memory
export const getRefreshToken = async (userId) => {
    try {
        const tokenData = tokenStore.get(userId);
        
        if (!tokenData) {
            // Fallback to database if not in memory
            const user = await User.findById(userId);
            if (user && user.refreshToken && user.tokenExpiresAt > new Date()) {
                // Restore to memory
                tokenStore.set(userId, {
                    token: user.refreshToken,
                    expiresAt: user.tokenExpiresAt.getTime()
                });
                return user.refreshToken;
            }
            return null;
        }

        // Check if token is expired
        if (tokenData.expiresAt < Date.now()) {
            tokenStore.delete(userId);
            return null;
        }

        return tokenData.token;
    } catch (error) {
        console.log("Error getting refresh token:", error.message);
        return null;
    }
};

// Delete refresh token
export const deleteRefreshToken = async (userId) => {
    try {
        // Remove from memory
        tokenStore.delete(userId);

        // Remove from database
        await User.findByIdAndUpdate(userId, {
            $unset: { refreshToken: 1, tokenExpiresAt: 1 }
        });
    } catch (error) {
        console.log("Error deleting refresh token:", error.message);
        // Ensure it's removed from memory even if database fails
        tokenStore.delete(userId);
    }
};

// Clean up expired tokens
const cleanupExpiredTokens = () => {
    const now = Date.now();
    for (const [userId, tokenData] of tokenStore.entries()) {
        if (tokenData.expiresAt < now) {
            tokenStore.delete(userId);
        }
    }
};

// Clean up expired tokens every hour
setInterval(cleanupExpiredTokens, 60 * 60 * 1000);

// Initial cleanup
cleanupExpiredTokens();

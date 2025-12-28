// Simple in-memory rate limiter
// For production, consider using Redis or a database

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export class RateLimiter {
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number = 5, windowMs: number = 15 * 60 * 1000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  async check(ip: string): Promise<{ success: boolean; remaining: number; resetTime: number }> {
    const now = Date.now();
    const entry = rateLimitStore.get(ip);

    // Clean up expired entries periodically
    if (Math.random() < 0.01) {
      this.cleanup(now);
    }

    if (!entry || now > entry.resetTime) {
      // Create new entry
      const newEntry: RateLimitEntry = {
        count: 1,
        resetTime: now + this.windowMs,
      };
      rateLimitStore.set(ip, newEntry);
      return {
        success: true,
        remaining: this.maxRequests - 1,
        resetTime: newEntry.resetTime,
      };
    }

    if (entry.count >= this.maxRequests) {
      return {
        success: false,
        remaining: 0,
        resetTime: entry.resetTime,
      };
    }

    // Increment count
    entry.count++;
    rateLimitStore.set(ip, entry);

    return {
      success: true,
      remaining: this.maxRequests - entry.count,
      resetTime: entry.resetTime,
    };
  }

  private cleanup(now: number) {
    for (const [ip, entry] of rateLimitStore.entries()) {
      if (now > entry.resetTime) {
        rateLimitStore.delete(ip);
      }
    }
  }
}


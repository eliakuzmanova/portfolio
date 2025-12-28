import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { RateLimiter } from '@/lib/rateLimiter';

// Rate Limiter: 5 requests per 15 minutes per IP
const rateLimiter = new RateLimiter(5, 15 * 60 * 1000);

// Input validation schema
const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-ZäöüÄÖÜß\s-]+$/, 'Name contains invalid characters'),
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email is too long'),
  subject: z.string()
    .min(3, 'Subject must be at least 3 characters')
    .max(200, 'Subject must be less than 200 characters'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
  csrfToken: z.string().min(1, 'CSRF token required'),
});

// CSRF token validation (simple implementation)
function validateCSRFToken(token: string, sessionToken: string | null): boolean {
  if (!sessionToken) return false;
  return token === sessionToken;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    const rateLimitResult = await rateLimiter.check(ip);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          resetTime: rateLimitResult.resetTime
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
          }
        }
      );
    }

    const body = await request.json();

    // Validate input
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.errors 
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message, csrfToken } = validationResult.data;

    // CSRF token validation
    const sessionToken = request.cookies.get('csrf-token')?.value;
    if (!validateCSRFToken(csrfToken, sessionToken || null)) {
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      );
    }


    // Sanitize inputs (basic XSS prevention)
    const sanitize = (str: string) => {
      return str
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
    };

    // Here you would typically send an email or save to database
    // For now, we'll just log it (replace with your email service)
    console.log('Contact form submission:', {
      name: sanitize(name),
      email: sanitize(email),
      subject: sanitize(subject),
      message: sanitize(message),
      timestamp: new Date().toISOString(),
    });

    // TODO: Integrate with your email service (e.g., SendGrid, Resend, Nodemailer)
    // Example:
    // await sendEmail({
    //   to: 'your-email@example.com',
    //   subject: `Portfolio Contact: ${subject}`,
    //   html: `<p>From: ${name} (${email})</p><p>${message}</p>`,
    // });

    return NextResponse.json(
      { 
        success: true,
        message: 'Message sent successfully!' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// Generate CSRF token endpoint
export async function GET() {
  const token = Math.random().toString(36).substring(2, 15) + 
                Math.random().toString(36).substring(2, 15);
  
  const response = NextResponse.json({ csrfToken: token });
  response.cookies.set('csrf-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600, // 1 hour
  });
  
  return response;
}


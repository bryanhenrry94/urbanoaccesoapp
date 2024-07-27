import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
  }

  try {
    const result = await sql`
      SELECT t.id, t.name, t.subdomain
      FROM users u
      JOIN tenants t ON u.tenant_id = t.id
      WHERE u.email = ${email}
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Tenant not found for the given email' }, { status: 404 });
    }

    const tenant = result.rows[0];
    
    // Create a new response with the tenant data
    const response = NextResponse.json({ id: tenant.id, name: tenant.name, subdomain: tenant.subdomain });
    
    // x-subdomain
    // Set the tenant's subdomain in the response headers
    response.headers.set('x-tenant-subdomain', tenant.subdomain);
    
    return response;
  } catch (error) {
    console.error('Error fetching tenant:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
